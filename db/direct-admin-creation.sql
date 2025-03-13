-- Этот скрипт создает администратора напрямую в базе данных
-- ВНИМАНИЕ: Используйте этот скрипт только если другие методы не работают

-- 1. Создаем запись в auth.users (требуются права суперпользователя)
-- Замените значения на свои
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  role
) VALUES (
  gen_random_uuid(), -- генерируем UUID
  '00000000-0000-0000-0000-000000000000', -- замените на ваш instance_id
  'admin@example.com', -- замените на ваш email
  crypt('your_password_here', gen_salt('bf')), -- замените на ваш пароль
  now(),
  now(),
  now(),
  'authenticated'
);

-- 2. Получаем ID созданного пользователя
-- Выполните этот запрос после выполнения предыдущего
SELECT id FROM auth.users WHERE email = 'admin@example.com';

-- 3. Создаем профиль администратора
-- Замените 'user-id-here' на ID, полученный в предыдущем шаге
INSERT INTO profiles (
  id,
  email,
  full_name,
  role,
  created_at,
  updated_at
) VALUES (
  'user-id-here', -- ID пользователя из предыдущего шага
  'admin@example.com', -- тот же email
  'Администратор',
  'admin',
  now(),
  now()
);

