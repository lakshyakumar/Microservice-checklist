import { MarksService } from '@/services/Marks/MarksService';
import { NextRequest, NextResponse } from 'next/server';

const marksService = new MarksService();

/**
 * @swagger
 * /api/marks:
 *   get:
 *     summary: Retrieve marks data for a student
 *     description: Retrieve marks data for a student
 *     tags:
 *       - marks
 *     parameters:
 *       - in: query
 *         name: rollNumber
 *         required: false
 *         schema:
 *           type: string
 *         description: The roll number of the student
 *     responses:
 *       200:
 *         description: Successfully retrieved marks data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 marksList:
 *                   type: object
 *                   example: [{ "name": "Jhon", "rollNumber": "001", "grade": "10", "section": "B", "subject": "Science", "marks": 60 }]
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Internal server error message"
 */
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const rollNumber = url.searchParams.get('rollNumber');
    const marksList = await marksService.getMarksData(rollNumber);
    return NextResponse.json({ marksList, success: true });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message, success: false }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/marks:
 *   post:
 *     summary: Add marks data for a student
 *     description: Add marks data for a student
 *     tags:
 *       - marks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              rollNumber:
 *                type: string
 *                example: "123456"
 *              marks:
 *                type: number
 *                example: 95
 *              name:
 *                type: string
 *                example: "John Doe"
 *              grade:
 *                type: string
 *                example: "5"
 *              section:
 *                type: string
 *                example: "A"
 *              subject:
 *                type: string
 *                example: "math"
 *             required:
 *               - rollNumber
 *               - marks
 *               - name
 *               - grade
 *               - section
 *               - subject
 *     responses:
 *       201:
 *         description: Successfully added marks data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 id:
 *                   type: string
 *                   example: "60c72b2f9b1e8b3f4c8b4567"
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Invalid input"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Internal server error message"
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { rollNumber, marks, name, grade, section, subject } = body;
    if (!rollNumber || !marks || !name || !grade || !section || !subject)
      return NextResponse.json({ error: 'Invalid input', success: false }, { status: 400 });
    const obj = await marksService.addMarks(rollNumber, name, grade, section, subject, marks);
    return NextResponse.json({ id: obj._id, success: true });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message, success: false }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/marks:
 *   patch:
 *     summary: update marks data for a student
 *     description: update marks data for a student
 *     tags:
 *       - marks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              rollNumber:
 *                type: string
 *                example: "123456"
 *              marks:
 *                type: number
 *                example: 95
 *              name:
 *                type: string
 *                example: "John Doe"
 *              grade:
 *                type: string
 *                example: "5"
 *              section:
 *                type: string
 *                example: "A"
 *              subject:
 *                type: string
 *                example: "math"
 *             required:
 *               - rollNumber
 *               - marks
 *               - name
 *               - grade
 *               - section
 *               - subject
 *     responses:
 *       200:
 *         description: Successfully updated marks data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 id:
 *                   type: string
 *                   example: "60c72b2f9b1e8b3f4c8b4567"
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Invalid input"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Internal server error message"
 */
export async function PATCH(request: NextRequest) {
  console.log(request);
  return NextResponse.json({ message: 'TODO', success: true });
}

/**
 * @swagger
 * /api/marks:
 *   delete:
 *     summary: delete data for a student
 *     description: delete data for a student
 *     tags:
 *       - marks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              rollNumber:
 *                type: string
 *                example: "123456"
 *              subject:
 *                type: string
 *                example: "math"
 *             required:
 *               - rollNumber
 *               - subject
 *     responses:
 *       200:
 *         description: Successfully deleted marks data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 id:
 *                   type: string
 *                   example: "60c72b2f9b1e8b3f4c8b4567"
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Invalid input"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Internal server error message"
 */
export async function DELETE(request: NextRequest) {
  console.log(request);
  return NextResponse.json({ message: 'TODO', success: true });
}
