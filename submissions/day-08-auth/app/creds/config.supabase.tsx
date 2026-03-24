import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fthdnzetjjhsdgjoxurz.supabase.co";
const supabaseAnonKey = "sb_publishable_NK7h8c2Y4jwjRhFD-i_zTA_I7VpuFqN";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);