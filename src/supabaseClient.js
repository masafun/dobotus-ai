import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://czofcyoyslnuvlowucuc.supabase.co'; // ← あなたのURL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6b2ZjeW95c2xudXZsb3d1Y3VjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwOTUxNDYsImV4cCI6MjA2MzY3MTE0Nn0.w1iWINZnDhMYYGaqfhDhT5hrchzattgVlKLrn5yM6LM'; // ← anon publicキー

export const supabase = createClient(supabaseUrl, supabaseKey);
