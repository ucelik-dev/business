"use client";

import { createBrowserClient } from "@supabase/ssr";
import { Database } from "./database.types";


/**
 * In client components, import the `supabaseForClientComponent` variable and use it like this:
 * @example
 * const { data, error } = await supabase
 *   .from('users')
 *   .select();
 */
export const supabaseForClientComponent = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);