import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import Review from "../models/reviewModel";

export const giveReview = asyncHandler(async (req: Request, res: Response) => {
    const { email, message } = req.body
    const isExist = await Review.findOne({ $and: [{ email }, { message }] });
    if (isExist) return res.status(409).json({ message: "Review already exist" });
    await Review.create(req.body);
    return res.status(201).json({ message: "Thank you for your review" });
})

export const getReview = asyncHandler(async (req: Request, res: Response) => {
    const reviews = await Review.find()
    return res.status(200).json({ reviews });
})

export const removeReview = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    await Review.findByIdAndDelete(id)
    return res.status(201).json({ message: "Review is deleted" });
})