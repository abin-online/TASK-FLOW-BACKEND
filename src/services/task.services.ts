import { supabase } from '../util/db';

export const createTask = async (
  title: string,
  description: string,
  user_email: string
) => {
  const { data, error } = await supabase.from('tasks').insert([
    { title, description, user_email }
  ]).select().single();

  if (error) {
    console.error("❌ Supabase Insert Error:", error);
    throw new Error(error.message);
  }

  console.log("📦 Supabase Insert Success:", data);
  return data;
};


export const getTasks = async (user_email: string) => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_email', user_email)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

export const updateTaskStatus = async (id: string, completed: boolean) => {
  const { data, error } = await supabase
    .from('tasks')
    .update({ completed })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteTask = async (id: string) => {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
};


export const changeTaskStatus = async (id: string, completed: boolean) => {
  const { data, error } = await supabase
    .from('tasks')
    .update({ completed })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};