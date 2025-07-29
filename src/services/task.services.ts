import { supabase } from '../util/db';


interface TaskPayload {
  title: string;
  description: string;
  due_date: string;
  completed: boolean;
  user_id: string;
}

export const createTask = async (payload: TaskPayload) => {
  const { data, error } = await supabase
    .from("todos")
    .insert([payload])
    .select()
    .single();

  if (error) {
    console.error("❌ Supabase Insert Error:", error.message);
    throw new Error("Failed to create task");
  }

  return data;
}


export const getTasks = async (user_id: string) => {
  console.log('in the service', user_id)
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', user_id)
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