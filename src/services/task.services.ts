import { supabase } from '../util/db';


interface TaskPayload {
  title: string;
  description: string;
  dueDate: string;
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
    .from('todos')
    .select('*')
    .eq('user_id', user_id)
    .order('created_at', { ascending: false });

  if (error) {
console.log(error)
    throw new Error(error.message);
  }
  return data;
};

export const updateTaskStatus = async (id: string, completed: boolean) => {
  const { data, error } = await supabase
    .from('todos')
    .update({ completed })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteTask = async (id: string) => {
  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
};


export const changeTaskStatus = async (id: string) => {

  const { data: currentTask, error: fetchError } = await supabase
    .from('tasks')
    .select('completed')
    .eq('id', id)
    .single();

  if (fetchError) throw new Error(fetchError.message);

  // Toggle the status
  const newStatus = !currentTask?.completed;

  // Update with the toggled status
  const { data, error: updateError } = await supabase
    .from('tasks')
    .update({ completed: newStatus })
    .eq('id', id)
    .select()
    .single();

  if (updateError) throw new Error(updateError.message);

  return data;
};
