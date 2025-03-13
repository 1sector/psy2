-- Add missing timestamp columns
ALTER TABLE messages ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE messages ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Add missing foreign key constraints
ALTER TABLE messages 
  ADD CONSTRAINT fk_sender 
  FOREIGN KEY (sender_id) 
  REFERENCES profiles(id) 
  ON DELETE CASCADE;

ALTER TABLE messages 
  ADD CONSTRAINT fk_recipient 
  FOREIGN KEY (recipient_id) 
  REFERENCES profiles(id) 
  ON DELETE CASCADE;

-- Add trigger for messages updated_at
DROP TRIGGER IF EXISTS update_messages_updated_at ON messages;
CREATE TRIGGER update_messages_updated_at
  BEFORE UPDATE ON messages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add missing foreign key constraints for therapist_clients
ALTER TABLE therapist_clients 
  ADD CONSTRAINT fk_therapist 
  FOREIGN KEY (therapist_id) 
  REFERENCES profiles(id) 
  ON DELETE CASCADE;

ALTER TABLE therapist_clients 
  ADD CONSTRAINT fk_client 
  FOREIGN KEY (client_id) 
  REFERENCES profiles(id) 
  ON DELETE CASCADE;

-- Add missing foreign key constraints for sessions
ALTER TABLE sessions 
  ADD CONSTRAINT fk_session_therapist 
  FOREIGN KEY (therapist_id) 
  REFERENCES profiles(id) 
  ON DELETE CASCADE;

ALTER TABLE sessions 
  ADD CONSTRAINT fk_session_client 
  FOREIGN KEY (client_id) 
  REFERENCES profiles(id) 
  ON DELETE CASCADE;

-- Add missing foreign key constraints for tests
ALTER TABLE tests 
  ADD CONSTRAINT fk_test_creator 
  FOREIGN KEY (created_by) 
  REFERENCES profiles(id) 
  ON DELETE CASCADE;

-- Add missing foreign key constraints for assigned_tests
ALTER TABLE assigned_tests 
  ADD CONSTRAINT fk_assigned_test 
  FOREIGN KEY (test_id) 
  REFERENCES tests(id) 
  ON DELETE CASCADE;

ALTER TABLE assigned_tests 
  ADD CONSTRAINT fk_assigned_test_client 
  FOREIGN KEY (client_id) 
  REFERENCES profiles(id) 
  ON DELETE CASCADE;

ALTER TABLE assigned_tests 
  ADD CONSTRAINT fk_assigned_test_therapist 
  FOREIGN KEY (therapist_id) 
  REFERENCES profiles(id) 
  ON DELETE CASCADE;

-- Add missing foreign key constraints for progress_records
ALTER TABLE progress_records 
  ADD CONSTRAINT fk_progress_client 
  FOREIGN KEY (client_id) 
  REFERENCES profiles(id) 
  ON DELETE CASCADE;

ALTER TABLE progress_records 
  ADD CONSTRAINT fk_progress_therapist 
  FOREIGN KEY (therapist_id) 
  REFERENCES profiles(id) 
  ON DELETE CASCADE;

-- Add missing foreign key constraint for content
ALTER TABLE content 
  ADD CONSTRAINT fk_content_author 
  FOREIGN KEY (author_id) 
  REFERENCES profiles(id) 
  ON DELETE CASCADE;

-- Add missing check constraints
ALTER TABLE sessions 
  ADD CONSTRAINT check_session_type 
  CHECK (type IN ('online', 'in-person'));

ALTER TABLE sessions 
  ADD CONSTRAINT check_session_status 
  CHECK (status IN ('scheduled', 'completed', 'cancelled'));

ALTER TABLE assigned_tests 
  ADD CONSTRAINT check_assigned_test_status 
  CHECK (status IN ('pending', 'completed', 'expired'));

ALTER TABLE therapist_clients 
  ADD CONSTRAINT check_therapist_client_status 
  CHECK (status IN ('active', 'inactive', 'pending'));

-- Add missing indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_recipient ON messages(recipient_id);
CREATE INDEX IF NOT EXISTS idx_sessions_date ON sessions(date);
CREATE INDEX IF NOT EXISTS idx_progress_records_date ON progress_records(date);
CREATE INDEX IF NOT EXISTS idx_assigned_tests_status ON assigned_tests(status);
CREATE INDEX IF NOT EXISTS idx_content_type ON content(type);

