import { Router } from 'express';
import { createTask, getTasks, updateTaskStatus, deleteTask } from '../controller/task.controller';
const router = Router();

router.post('/', createTask);
router.get('/', getTasks);
router.patch('/:id', updateTaskStatus);
router.delete('/:id', deleteTask);

export default router;
