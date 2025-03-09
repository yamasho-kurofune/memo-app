import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials are missing in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createNotesTable() {
  console.log('Creating notes table...');

  try {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .limit(1);

    if (error && error.code === '42P01') {
      console.log('Notes table does not exist. Creating it...');

      // Create the notes table using Supabase's REST API
      const { error: createError } = await supabase
        .from('notes')
        .insert([
          {
            title: 'サンプルメモ',
            content: 'これはサンプルメモです。このアプリでメモを作成、編集、削除できます。'
          }
        ]);

      if (createError) {
        console.error('Error creating notes table:', createError);
      } else {
        console.log('Notes table created successfully with sample note!');
      }
    } else if (error) {
      console.error('Error checking notes table:', error);
    } else {
      console.log('Notes table already exists.');
    }
  } catch (err) {
    console.error('Error in createNotesTable:', err);
    throw err;
  }
}

createNotesTable()
  .then(() => {
    console.log('Done!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Unexpected error:', err);
    process.exit(1);
  });
