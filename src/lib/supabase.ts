
import { createClient } from '@supabase/supabase-js';

// Using direct values instead of environment variables
const supabaseUrl = 'https://hfgpqfanqxljurimsreb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmZ3BxZmFucXhsanVyaW1zcmViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4MDQ2MzgsImV4cCI6MjA1NjM4MDYzOH0._AsuI4k1YSxe1zgNeK8IbMvNrkCPiGUJxHA2xjCmRjY';

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
