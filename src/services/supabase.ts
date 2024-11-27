import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabaseTypes";

export const supabaseUrl = "https://axeeqltwbfwhrhqtqxwh.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4ZWVxbHR3YmZ3aHJocXRxeHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxMjM2NTAsImV4cCI6MjA0NzY5OTY1MH0.caD0PY7zjwxjzX5Z8vlrsyz1lh2cVqDHT_ojOQUKyaA";
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
