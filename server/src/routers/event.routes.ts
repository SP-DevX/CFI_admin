import express from 'express';
import { addEvent, getEventByFields, getEventById, removeEvent, updateEvent } from '../controllers/event.controller';

const router = express.Router();

router.route('/:id').get(getEventById);
router.route('/').get(getEventByFields);
router.route('/add').post(addEvent);
router.route('/remove').post(removeEvent);
router.route('/update').post(updateEvent); 

export default router;