-- Включаем расширение UUID для генерации уникальных идентификаторов
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Создаем таблицу профилей пользователей
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL CHECK (role IN ('client', 'therapist'))
);

-- Создаем таблицу связей между терапевтами и клиентами
CREATE TABLE therapist_clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  therapist_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('active', 'inactive', 'pending')),
  diagnosis TEXT,
  goals TEXT[],
  UNIQUE(therapist_id, client_id)
);

-- Создаем таблицу сессий
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  therapist_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  time TIME NOT NULL,
  duration INTEGER NOT NULL DEFAULT 60,
  type TEXT NOT NULL CHECK (type IN ('online', 'in-person')),
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  notes TEXT
);

-- Создаем таблицу тестов
CREATE TABLE tests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  questions JSONB NOT NULL
);

-- Создаем таблицу назначенных тестов
CREATE TABLE assigned_tests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  test_id UUID NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  therapist_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'expired')),
  assigned_date DATE NOT NULL,
  completed_date DATE,
  results JSONB
);

-- Создаем таблицу записей о прогрессе
CREATE TABLE progress_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  therapist_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  anxiety_level INTEGER NOT NULL CHECK (anxiety_level BETWEEN 0 AND 10),
  sleep_quality INTEGER NOT NULL CHECK (sleep_quality BETWEEN 0 AND 10),
  mood_score INTEGER NOT NULL CHECK (mood_score BETWEEN 0 AND 10),
  notes TEXT
);

-- Создаем таблицу сообщений
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT FALSE
);

-- Создаем функцию для обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Создаем триггеры для обновления updated_at
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Создаем политики безопасности для RLS (Row Level Security)

-- Включаем RLS для всех таблиц
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE therapist_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE assigned_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Политики для profiles
CREATE POLICY "Пользователи могут видеть свой профиль"
ON profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Терапевты могут видеть профили своих клиентов"
ON profiles FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM therapist_clients
    WHERE therapist_id = auth.uid() AND client_id = profiles.id
  )
);

CREATE POLICY "Клиенты могут видеть профили своих терапевтов"
ON profiles FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM therapist_clients
    WHERE client_id = auth.uid() AND therapist_id = profiles.id
  )
);

-- Политики для therapist_clients
CREATE POLICY "Терапевты могут видеть своих клиентов"
ON therapist_clients FOR SELECT
USING (therapist_id = auth.uid());

CREATE POLICY "Клиенты могут видеть своих терапевтов"
ON therapist_clients FOR SELECT
USING (client_id = auth.uid());

CREATE POLICY "Терапевты могут добавлять клиентов"
ON therapist_clients FOR INSERT
WITH CHECK (therapist_id = auth.uid());

CREATE POLICY "Терапевты могут обновлять связи с клиентами"
ON therapist_clients FOR UPDATE
USING (therapist_id = auth.uid());

-- Политики для sessions
CREATE POLICY "Терапевты могут видеть свои сессии"
ON sessions FOR SELECT
USING (therapist_id = auth.uid());

CREATE POLICY "Клиенты могут видеть свои сессии"
ON sessions FOR SELECT
USING (client_id = auth.uid());

CREATE POLICY "Терапевты могут создавать сессии"
ON sessions FOR INSERT
WITH CHECK (therapist_id = auth.uid());

CREATE POLICY "Терапевты могут обновлять сессии"
ON sessions FOR UPDATE
USING (therapist_id = auth.uid());

-- Политики для tests
CREATE POLICY "Терапевты могут видеть свои тесты"
ON tests FOR SELECT
USING (created_by = auth.uid());

CREATE POLICY "Клиенты могут видеть назначенные им тесты"
ON tests FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM assigned_tests
    WHERE test_id = tests.id AND client_id = auth.uid()
  )
);

CREATE POLICY "Терапевты могут создавать тесты"
ON tests FOR INSERT
WITH CHECK (created_by = auth.uid());

CREATE POLICY "Терапевты могут обновлять свои тесты"
ON tests FOR UPDATE
USING (created_by = auth.uid());

-- Политики для assigned_tests
CREATE POLICY "Терапевты могут видеть назначенные ими тесты"
ON assigned_tests FOR SELECT
USING (therapist_id = auth.uid());

CREATE POLICY "Клиенты могут видеть назначенные им тесты"
ON assigned_tests FOR SELECT
USING (client_id = auth.uid());

CREATE POLICY "Терапевты могут назначать тесты"
ON assigned_tests FOR INSERT
WITH CHECK (therapist_id = auth.uid());

CREATE POLICY "Клиенты могут обновлять результаты своих тестов"
ON assigned_tests FOR UPDATE
USING (client_id = auth.uid());

-- Политики для progress_records
CREATE POLICY "Терапевты могут видеть прогресс своих клиентов"
ON progress_records FOR SELECT
USING (therapist_id = auth.uid());

CREATE POLICY "Клиенты могут видеть свой прогресс"
ON progress_records FOR SELECT
USING (client_id = auth.uid());

CREATE POLICY "Терапевты могут добавлять записи о прогрессе"
ON progress_records FOR INSERT
WITH CHECK (therapist_id = auth.uid());

CREATE POLICY "Терапевты могут обновлять записи о прогрессе"
ON progress_records FOR UPDATE
USING (therapist_id = auth.uid());

-- Политики для messages
CREATE POLICY "Пользователи могут видеть свои сообщения"
ON messages FOR SELECT
USING (sender_id = auth.uid() OR recipient_id = auth.uid());

CREATE POLICY "Пользователи могут отправлять сообщения"
ON messages FOR INSERT
WITH CHECK (sender_id = auth.uid());

CREATE POLICY "Получатели могут отмечать сообщения как прочитанные"
ON messages FOR UPDATE
USING (recipient_id = auth.uid());

-- Создаем триггер для автоматического создания профиля при регистрации
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, created_at, updated_at)
  VALUES (NEW.id, NEW.email, '', 'client', NOW(), NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

