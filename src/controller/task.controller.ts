import { Request, Response } from 'express';
import * as TaskService from '../services/task.services'


export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, dueDate, completed } = req.body;
    const user_id = (req as any).user?.userId; // assuming user is attached by auth middleware
console.log(user_id)
    if (!user_id) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    const task = await TaskService.createTask({
      title,
      description,
      dueDate,
      completed,
      user_id,
    });

    res.status(201).json(task);
  } catch (err: any) {
    console.error("❌ Error Creating Task:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const getTasks = async (req: Request, res: Response) => {
  try {
    
        const user_id = (req as any).user?.userId; // assuming user is attached by auth middleware
console.log(user_id)
    const tasks = await TaskService.getTasks(user_id);
    console.log(tasks)
    res.status(200).json(tasks);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};


export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await TaskService.deleteTask(id);
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};


export const changeTaskStatus = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    console.log('params ID ', id)
    const updated = await TaskService.changeTaskStatus(id);
    res.status(200).json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};