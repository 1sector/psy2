-- Create content table
CREATE TABLE content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('article', 'resource', 'tool', 'case-study')),
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  published BOOLEAN DEFAULT FALSE
);

-- Create trigger to update updated_at column
CREATE TRIGGER update_content_updated_at
BEFORE UPDATE ON content
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create RLS policies for content table
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Admin users can see all content
CREATE POLICY "Admins can see all content"
ON content FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'therapist'
  )
);

-- Admin users can create content
CREATE POLICY "Admins can create content"
ON content FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'therapist'
  )
);

-- Admin users can update their own content
CREATE POLICY "Admins can update their own content"
ON content FOR UPDATE
USING (author_id = auth.uid());

-- Admin users can delete their own content
CREATE POLICY "Admins can delete their own content"
ON content FOR DELETE
USING (author_id = auth.uid());

-- Create storage bucket for content images
INSERT INTO storage.buckets (id, name, public) VALUES ('content-images', 'content-images', true);

-- Set up storage policies
CREATE POLICY "Anyone can view content images"
ON storage.objects FOR SELECT
USING (bucket_id = 'content-images');

CREATE POLICY "Authenticated users can upload content images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'content-images' AND
  auth.role() = 'authenticated'
);

CREATE POLICY "Users can update their own content images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'content-images' AND
  owner = auth.uid()
);

