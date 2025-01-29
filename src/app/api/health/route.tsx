import { HealthService } from '@/services/Health/HealthService';
import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Check the health of the service
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   example: { "status": "ok" }
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
 *                 message:
 *                   type: string
 *                   example: "Internal server error message"
 */
export function GET() {
  try {
    return NextResponse.json(HealthService.checkHealth());
  } catch (e) {
    return NextResponse.json(
      {
        success: false,
        message: (e as Error).message,
      },
      { status: 500 }
    );
  }
}
