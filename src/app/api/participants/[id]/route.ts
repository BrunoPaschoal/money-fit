import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    const body = await request.json();
    const { newWeight, initialWeight, weightGoal, moneyToAdd, reset } = body;

    if (reset) {
      const updatedParticipant = await prisma.participant.update({
        where: { id },
        data: {
          weightLost: 0,
          moneyAdded: 0
        }
      });

      return NextResponse.json(updatedParticipant);
    }

    if (initialWeight !== undefined && weightGoal !== undefined) {
      const updatedParticipant = await prisma.participant.update({
        where: { id },
        data: {
          initialWeight,
          weightGoal,
        }
      });
      return NextResponse.json(updatedParticipant);
    } else if (newWeight !== undefined) {
      // Atualização do peso perdido
      const participant = await prisma.participant.findUnique({
        where: { id }
      });

      if (!participant) {
        return NextResponse.json(
          { error: 'Participante não encontrado' },
          { status: 404 }
        );
      }

      const updatedParticipant = await prisma.participant.update({
        where: { id },
        data: {
          weightLost: participant.weightLost + newWeight
        }
      });

      return NextResponse.json(updatedParticipant);
    } else if (moneyToAdd !== undefined) {
      const participant = await prisma.participant.findUnique({
        where: { id }
      });

      if (!participant) {
        return NextResponse.json(
          { error: 'Participante não encontrado' },
          { status: 404 }
        );
      }

      const updatedParticipant = await prisma.participant.update({
        where: { id },
        data: {
          moneyAdded: participant.moneyAdded + moneyToAdd
        }
      });

      return NextResponse.json(updatedParticipant);
    }

    return NextResponse.json(
      { error: 'Dados inválidos' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao atualizar participante' },
      { status: 500 }
    );
  }
} 