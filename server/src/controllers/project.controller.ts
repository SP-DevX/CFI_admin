import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import Project from "../models/ProjectsMode";
import { mailer } from "../utils/mailer";


export const allProjects = asyncHandler(async (req: Request, res: Response) => {
    const projects = await Project.find().select('_id files projectName studentName year branch isApproved')
    return res.status(200).json(projects);
})

export const addProject = asyncHandler(async (req: Request, res: Response) => {
    const { projectName, email, studentName } = req.body;
    console.log(req.body);
    const isExisting = await Project.findOne({ projectName });
    if (isExisting) return res.status(409).json({ message: "Project already exists" });
    await Project.create(req.body);
    const message = `
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
        <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border: 1px solid #dddddd; border-radius: 5px;">
            <div style="text-align: center; padding-bottom: 20px;">
                <h1 style="margin: 0; font-size: 24px; color: #333333;">Project Submission Received</h1>
            </div>
            <div style="margin-bottom: 20px;">
                <p style="font-size: 16px; color: #555555; line-height: 1.5;">Dear  ${studentName},</p>
                <p style="font-size: 16px; color: #555555; line-height: 1.5;">Thank you for submitting your project titled "<strong> ${projectName} </strong>". We have received your submission and it is currently under review by our team.</p>
                <p style="font-size: 16px; color: #555555; line-height: 1.5;">We appreciate your effort and dedication to your work. Our review process may take some time, so we kindly ask for your patience. After you project verification your project is visible in the project section</p>
                <p style="font-size: 16px; color: #555555; line-height: 1.5;">If you have any questions or need further assistance, please feel free to reach out to us at cfiadmin@jgec.ac.in</p>
                <p style="font-size: 16px; color: #555555; line-height: 1.5;">Thank you,<br>
                Centre For Innovation Club - JGEC</p>
            </div>
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #dddddd;">
                <p style="font-size: 14px; color: #777777;">&copy; 2024 CFI. All rights reserved.</p>
            </div>
        </div>
    </body>`
    await mailer(email, "Project Submission", message);
    return res.status(201).json({ message: "Project is under review!" });
})

export const removeProject = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    return res.status(200).json({ message: "Project is removed" });
})

export const getProjectDetails = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: "Project doesn't exists" });
    return res.status(200).json(project);
})

export const approvedProject = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const project = await Project.findByIdAndUpdate(id, { isApproved: true }, { new: true });
    console.log(project);
    const { projectName, email, studentName } = project;
    const message = ` 
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
            <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border: 1px solid #dddddd; border-radius: 5px;">
                <div style="text-align: center; padding-bottom: 20px;">
                    <h1 style="margin: 0; font-size: 24px; color: #333333;">Project Submission Approved</h1>
                </div>
                <div style="margin-bottom: 20px;">
                    <p style="font-size: 16px; color: #555555; line-height: 1.5;">Dear  ${studentName},</p>
                    <p style="font-size: 16px; color: #555555; line-height: 1.5;">We are pleased to inform you that your project titled "<strong> ${projectName}</strong>" has been approved. Congratulations! 🥳🎉</p>
                    <p style="font-size: 16px; color: #555555; line-height: 1.5;">We appreciate your hard work and dedication. Our team is impressed with your project and we are excited to see the positive impact it will make.</p>
                   <p style="font-size: 16px; color: #555555; line-height: 1.5;">If you have any questions or need further assistance, please feel free to reach out to us at cfiadmin@jgec.ac.in</p>
                   <p style="font-size: 16px; color: #555555; line-height: 1.5;">Thank you,<br>
                   Centre For Innovation Club - JGEC</p>
                </div>
                <div style="text-align: center; padding-top: 20px; border-top: 1px solid #dddddd;">
                   <p style="font-size: 14px; color: #777777;">&copy; 2024 CFI. All rights reserved.</p>
                </div>
            </div>
        </body> 
    `
    await mailer(email, "Project Approved", message);
    return res.status(200).json({ message: "Project is approved" });
})