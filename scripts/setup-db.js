import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials are missing in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function setupDatabase() {
  console.log('Setting up database...');

  // Create notes table if it doesn't exist
  const { error } = await supabase.rpc('create_notes_table');

  if (error) {
    console.error('Error creating notes table:', error);
    
    // Try creating the table using SQL query
    console.log('Trying to create table using SQL query...');
    
    const { error: sqlError } = await supabase.from('notes').select('*').limit(1);
    
    if (sqlError && sqlError.code === '42P01') {
      console.log('Creating notes table...');
      
      const { error: createError } = await supabase.query(`
        CREATE TABLE IF NOT EXISTS notes (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          title TEXT NOT NULL,
          content TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `);
      
      if (createError) {
        console.error('Error creating notes table with SQL:', createError);
        process.exit(1);
      } else {
        console.log('Notes table created successfully!');
      }
    } else if (sqlError) {
      console.error('Error checking notes table:', sqlError);
      process.exit(1);
    } else {
      console.log('Notes table already exists.');
    }
  } else {
    console.log('Notes table created successfully!');
  }
}

setupDatabase()
  .then(() => {
    console.log('Database setup completed.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Unexpected error:', err);
    process.exit(1);
  });
