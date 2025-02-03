import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const participants = await prisma.participant.findMany();
    return NextResponse.json(participants);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar participantes' }, { status: 500 });
  }
} 