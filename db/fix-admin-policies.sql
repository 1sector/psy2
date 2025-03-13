-- Добавляем политику, позволяющую пользователям обновлять свои профили
DROP POLICY IF EXISTS "Users can update their own profiles" ON profiles;

CREATE POLICY "Users can update their own profiles" 
ON profiles FOR UPDATE 
USING (auth.uid() = id);

-- Добавляем политику для вставки профилей (может потребоваться для регистрации)
DROP POLICY IF EXISTS "Service role can insert profiles" ON profiles;

CREATE POLICY "Service role can insert profiles" 
ON profiles FOR INSERT 
WITH CHECK (true);

-- Проверяем и обновляем триггер для создания профиля
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, created_at, updated_at)
  VALUES (NEW.id, NEW.email, '', 'client', NOW(), NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Убедимся, что триггер существует
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

