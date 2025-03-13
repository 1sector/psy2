-- Включаем расширение UUID для генерации уникальных идентификаторов
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Создаем функцию для обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Создаем таблицу профилей пользователей (если она еще не существует)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL CHECK (role IN ('client', 'therapist'))
);

-- Создаем триггер для обновления updated_at для profiles
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Создаем таблицу контента
CREATE TABLE IF NOT EXISTS content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('article', 'resource', 'tool', 'case-study')),
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  author_id UUID NOT NULL,
  published BOOLEAN DEFAULT FALSE
);

-- Создаем триггер для обновления updated_at для content
DROP TRIGGER IF EXISTS update_content_updated_at ON content;
CREATE TRIGGER update_content_updated_at
BEFORE UPDATE ON content
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Включаем RLS для таблицы profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Создаем политики безопасности для profiles
DROP POLICY IF EXISTS "Пользователи могут видеть свой профиль" ON profiles;
CREATE POLICY "Пользователи могут видеть свой профиль"
ON profiles FOR SELECT
USING (auth.uid() = id);

-- Включаем RLS для таблицы content
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Создаем политики безопасности для content
DROP POLICY IF EXISTS "Anyone can see content" ON content;
CREATE POLICY "Anyone can see content"
ON content FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Authenticated users can create content" ON content;
CREATE POLICY "Authenticated users can create content"
ON content FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can update their own content" ON content;
CREATE POLICY "Users can update their own content"
ON content FOR UPDATE
USING (author_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete their own content" ON content;
CREATE POLICY "Users can delete their own content"
ON content FOR DELETE
USING (author_id = auth.uid());

-- Создаем триггер для автоматического создания профиля при регистрации
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, created_at, updated_at)
  VALUES (NEW.id, NEW.email, '', 'client', NOW(), NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Создаем хранилище для изображений контента (если оно еще не существует)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'content-images') THEN
    INSERT INTO storage.buckets (id, name, public) VALUES ('content-images', 'content-images', true);
  END IF;
END $$;

-- Устанавливаем политики для хранилища
DROP POLICY IF EXISTS "Anyone can view content images" ON storage.objects;
CREATE POLICY "Anyone can view content images"
ON storage.objects FOR SELECT
USING (bucket_id = 'content-images');

DROP POLICY IF EXISTS "Authenticated users can upload content images" ON storage.objects;
CREATE POLICY "Authenticated users can upload content images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'content-images' AND
  auth.role() = 'authenticated'
);

DROP POLICY IF EXISTS "Users can update their own content images" ON storage.objects;
CREATE POLICY "Users can update their own content images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'content-images' AND
  owner = auth.uid()
);

