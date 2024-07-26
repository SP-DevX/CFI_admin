import express from 'express';
import { addProject, allProjects, approvedProject, getProjectDetails, removeProject } from '../controllers/project.controller';

const router = express.Router();

router.route('/').get(allProjects);
router.route('/details/:id').get(getProjectDetails);
router.route('/add').post(addProject);
router.route('/remove/:id').post(removeProject);
router.route('/approve/:id').post(approvedProject); 

export default router;