-- Обновляем проверку ограничения для поля role в таблице profiles
ALTER TABLE profiles 
DROP CONSTRAINT IF EXISTS profiles_role_check;

ALTER TABLE profiles 
ADD CONSTRAINT profiles_role_check 
CHECK (role IN ('client', 'therapist', 'admin'));

-- Удаляем существующие политики, если они есть
DROP POLICY IF EXISTS "Admins can see all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can manage all content" ON content;

-- Создаем новые политики безопасности для админов
CREATE POLICY "Admins can see all profiles" 
ON profiles FOR SELECT 
USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "Admins can update all profiles" 
ON profiles FOR UPDATE 
USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- Обновляем политики для контента
CREATE POLICY "Admins can manage all content" 
ON content FOR ALL 
USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

