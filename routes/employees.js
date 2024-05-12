const express = require("express");
const router = express.Router();
const employeesController = require("../controllers/employeesController");
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
router.get('/', employeesController.getAllEmployees);


/**
 * @swagger
 * /instructors:
 *   post:
 *     summary: Create a new instructor (Admin only)
 *     tags: [Instructors]
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *      
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *           
 *       400:
 *         description: Bad Request - First and last name are required
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - Insufficient permissions 
 */
router.post('/', verifyRoles(ROLES_LIST.Admin), employeesController.createNewEmployee);

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
 *           type: integer
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
router.put('/', verifyRoles(ROLES_LIST.Admin), employeesController.updateEmployee);


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
 *           type: integer
 *         required: true
 *         description: Numeric ID of the instructor to delete
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee' 
 *       400:
 *         description: Bad Request - Employee ID not found
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - Insufficient permissions 
 */
router.delete('/', verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);


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
 *           type: integer
 *         required: true
 *         description: Numeric ID of the instructor
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Bad Request - Employee ID not found
 */
router.route("/:id").get(employeesController.getEmployee);

module.exports = router;