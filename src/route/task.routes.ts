import { Router } from 'express';
import { createTask, getTasks,  deleteTask , changeTaskStatus} from '../controller/task.controller';
import { authenticate } from '../middlewares/authentication';
const router = Router();

router.post('/', authenticate,  createTask);
router.get('/', authenticate,  getTasks);
router.delete('/:id', authenticate,  deleteTask);
router.patch('/:id', authenticate, changeTaskStatus)

export default router;
