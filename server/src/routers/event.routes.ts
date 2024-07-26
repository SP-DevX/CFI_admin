import express from "express";
import {
    addEvent,
    approveEventRegistration,
    eventRegister,
    getEventByFields,
    getEventById,
    getEventRegistration,
    markCompleted,
    removeEvent,
    updateEvent,
} from "../controllers/event.controller";

const router = express.Router();

// create and update event
router.route("/:id").get(getEventById);
router.route("/").get(getEventByFields);
router.route("/add").post(addEvent);
router.route("/remove").post(removeEvent);
router.route("/update").post(updateEvent);
router.route("/mark-completed").post(markCompleted);

// // team registration
router.route("/register").post(eventRegister);
router.route("/register/teams").get(getEventRegistration);
router.route("/approved-registration").post(approveEventRegistration);
export default router;
