import {Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import Project from "../models/ProjectsMode";


export const getAllProjects = asyncHandler(async (req: Request, res: Response) => {
    const projects = await Project.find({});
    return res.status(200).json({ projects });
})

export const addProject = asyncHandler(async (req: Request, res: Response) => {
    const { projectId, title, overview, name, year, demo, details, code, photo } = await req.body()
    const isExisting = await Project.findOne({ projectId });
    if (isExisting)
        return res.status(409).json({ message: "Project already exists" });
    await Project.create({ projectId, title, overview, name, year, demo, details, code, photo });
    return res.status(201).json({ message: "Project is created" });
})

export const removeProject = asyncHandler(async (req: Request, res: Response) => {
    const { projectId } = await req.body()
    const isExisting = await Project.findOne({ projectId });
    await Project.findByIdAndDelete(isExisting._id);
    return res.status(200).json({ message: "Project is removed" });
})

export const updateProject = asyncHandler(async (req: Request, res: Response) => {
    const { projectId, title, overview, name, year, demo, details, code, photo } = await req.body()
    const isExisting = await Project.findOne({ projectId });
    if (!isExisting)
        return res.status(404).json({ message: "Project doesn't exists" });
    await Project.findByIdAndUpdate(
        isExisting._id,
        { title, overview, name, year, demo, details, code, photo },
        { new: true }
    );
    return res.status(201).json({ message: "Project is updated" });
})