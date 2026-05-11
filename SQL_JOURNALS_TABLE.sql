-- SQL untuk membuat tabel journals di Supabase
-- Jalankan kode ini di SQL Editor Supabase Dashboard

-- Buat tabel journals
CREATE TABLE journals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  mood VARCHAR(50) NOT NULL CHECK (mood IN ('Tenang', 'Fokus', 'Lelah')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Buat index untuk performa query
CREATE INDEX idx_journals_user_id ON journals(user_id);
CREATE INDEX idx_journals_created_at ON journals(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE journals ENABLE ROW LEVEL SECURITY;

-- Buat policy untuk memastikan user hanya bisa akses journals mereka sendiri
CREATE POLICY "Users can view their own journals" ON journals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own journals" ON journals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own journals" ON journals
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own journals" ON journals
  FOR DELETE USING (auth.uid() = user_id);

-- Buat trigger untuk otomatis update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_journals_updated_at 
  BEFORE UPDATE ON journals 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
