import express from 'express'; 
import { getReview, giveReview, removeReview } from '../controllers/review.controller';

const router = express.Router();

router.route('/').get(getReview);
router.route('/create').post(giveReview); 
router.route('/remove/:id').post(removeReview);

export default router;