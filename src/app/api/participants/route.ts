import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const participants = await prisma.participant.findMany({
      include: {
        weightHistory: {
          orderBy: {
            recordedAt: 'desc'
          }
        },
        moneyHistory: {
          orderBy: {
            recordedAt: 'desc'
          }
        }
      }
    });
    return NextResponse.json(participants);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar participantes' }, { status: 500 });
  }
} 