import express from 'express';
import { addProject, getAllProjects, removeProject, updateProject } from '../controllers/project.controller';

const router = express.Router();

router.route('/').get(getAllProjects);
router.route('/add').post(addProject);
router.route('/remove').post(removeProject);
router.route('/update').post(updateProject);

export default router;