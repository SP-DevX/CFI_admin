import { Request, Response } from "express";
import Event from "../models/eventsModel";
import { asyncHandler } from "../utils/asyncHandler";

export const getEventById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    const event = await Event.findById(id);
    if (!event) res.status(404).json({ message: "event not exists" });
    return res.status(201).json({ event });
})

export const getEventByFields = asyncHandler(async (req: Request, res: Response) => {
    const events = await Event.find({}).select('_id shortName photo reg_date_end');
    return res.status(200).json({ events });
})

export const addEvent = asyncHandler(async (req: Request, res: Response) => {
    const reqBody = req.body
    const { eventId } = reqBody
    const isExist = await Event.findOne({ eventId });
    if (isExist)
        return res.status(409).json({ message: "Event already exist" });
    await Event.create(reqBody);
    return res.status(201).json({ message: "Event is added successfully" });
})

export const removeEvent = asyncHandler(async (req: Request, res: Response) => {
    const { _id } = req.body
    await Event.findByIdAndDelete(_id)
    return res.status(201).json({ message: "Event is deleted" });
})

export const updateEvent = asyncHandler(async (req: Request, res: Response) => {
    const reqBody = req.body
    const { _id } = reqBody;
    const isExist = await Event.findById(_id);
    if (!isExist)
        return res.status(404).json({ message: "Event is not exist " });
    await Event.findByIdAndUpdate(
        _id,
        reqBody,
        { new: true }
    )
    return res.status(201).json({ message: "Event is updated" });
})