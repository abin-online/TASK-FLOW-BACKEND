import { Request, Response } from 'express';
import * as TaskService from '../services/task.services'

export const createTask = async (req: Request, res: Response) => {
  const { title, description, user_email } = req.body;
  try {
    const task = await TaskService.createTask(title, description, user_email);
    res.status(201).json(task);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  const { user_email } = req.query;
  try {
    const tasks = await TaskService.getTasks(user_email as string);
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
  const { id, completed } = req.body;

  try {
    const updated = await TaskService.changeTaskStatus(id, completed);
    res.status(200).json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};