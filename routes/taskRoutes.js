const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const createTask = require("../controllers/createTask");
const getAllTasks = require("../controllers/getAllTasks");
const editMyTask = require("../controllers/editMyTask");
const deleteMyTask = require("../controllers/deleteMyTask");

const router = express();

/**
 * method POST
 * desc Add Task
 */

router.post("/:userId/create", authMiddleware, createTask);

/**
 * method GET
 * desc Get All Tasks For User Own
 */

router.get("/:userId/", authMiddleware, getAllTasks);

router.put("/:userId/:id", authMiddleware, editMyTask);

router.delete("/:userId/:id", authMiddleware, deleteMyTask);

module.exports = router;
