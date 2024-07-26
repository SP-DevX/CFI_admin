
import mongoose from 'mongoose';
const { Schema, model, Types } = mongoose; 

const reviewSchema = new Schema(
    {
        name: String,
        email: String,
        profession: String,
        message: String,
    },
    { timestamps: true }
);

const Review = model("review", reviewSchema);
export default Review;

