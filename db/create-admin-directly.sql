-- Этот скрипт можно использовать для создания администратора напрямую в базе данных
-- Замените значения на свои

-- 1. Создаем запись в auth.users (это должен делать Supabase Auth, но мы можем сделать это вручную)
-- Примечание: этот шаг может не сработать из-за ограничений доступа, лучше использовать UI Supabase

-- 2. Обновляем существующего пользователя до роли администратора
-- Замените 'user-id-here' на ID существующего пользователя
UPDATE profiles
SET role = 'admin'
WHERE id = 'user-id-here';

-- Или создаем нового пользователя с ролью администратора
-- Замените значения на свои
INSERT INTO profiles (id, email, full_name, role, created_at, updated_at)
VALUES (
  'user-id-here', -- ID пользователя из auth.users
  'admin@example.com',
  'Admin User',
  'admin',
  NOW(),
  NOW()
);

