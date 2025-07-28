import { Router } from 'express';
import { createTask, getTasks,  deleteTask , changeTaskStatus} from '../controller/task.controller';
const router = Router();

router.post('/', createTask);
router.get('/', getTasks);
router.delete('/:id', deleteTask);
router.patch('/', changeTaskStatus)

export default router;
