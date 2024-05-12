const express = require("express");
const router = express.Router();
const instructorController = require("../controllers/instructorController");
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");

/**
 * @swagger
 * tags:
 *   name: Instructors
 *   description: Intructor management endpoints
 */

/**
 * @swagger
 * /instructors:
 *   get:
 *     summary: Get all instructors
 *     tags: [Instructors]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *              
 */
router.get('/', instructorController.getAllInstructors);


/**
 * @swagger
 * /instructors:
 *   post:
 *     summary: Create a new instructor
 *     tags:
 *       - Instructors
 *     description: Creates a new instructor record in the database.
 *     security:
 *       - bearerAuth: []   
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: The instructor's first name.
 *               lastname:
 *                 type: string
 *                 description: The instructor's last name.
 *     responses:
 *       201:
 *         description: Instructor created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Instructor' 
 *       400:
 *         description: Bad Request. First and last names are required.
 *       401:
 *         description: Unauthorized. Missing or invalid authentication token. 
 *       500: 
 *         description: Internal Server Error. An unexpected error occurred while processing the request.
 */
router.post('/', verifyRoles(ROLES_LIST.Admin), instructorController.createNewInstructor);

/**
 * @swagger
 * /instructors:
 *   put:
 *     summary: Update an instructor (Admin only)
 *     tags: [Instructors]
 *     security:
 *       - bearerAuth: []  
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Numeric ID of the instructor to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *         
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             
 *       400:
 *         description: Bad Request - Employee ID not found or invalid input
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - Insufficient permissions 
 */
router.put('/', verifyRoles(ROLES_LIST.Admin), instructorController.updateInstructor);


/**
 * @swagger
 * /instructors:
 *   delete:
 *     summary: Delete an instructor (Admin only)
 *     tags: [Instructors]
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Numeric ID of the instructor to delete
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                
 *       400:
 *         description: Bad Request - Employee ID not found
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - Insufficient permissions 
 */
router.delete('/', verifyRoles(ROLES_LIST.Admin), instructorController.deleteInstructor);


/**
 * @swagger
 * /instructors/{id}:
 *   get:
 *     summary: Get instructor by ID
 *     tags: [Instructors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Numeric ID of the instructor
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               
 *       400:
 *         description: Bad Request - Employee ID not found
 */
router.route("/:id").get(instructorController.getInstructor);

module.exports = router;
