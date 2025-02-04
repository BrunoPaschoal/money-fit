import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  _context: { params: { id: string } }
) {
  try {
    // Extrair o ID da URL
    const segments = request.nextUrl.pathname.split('/');
    const idFromUrl = segments[segments.length - 1];
    const id = Number(idFromUrl);

    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    const body = await request.json();
    const { newWeight, initialWeight, weightGoal, moneyToAdd, reset } = body;

    if (reset) {
      // Primeiro deletar todos os registros relacionados
      await prisma.weightRecord.deleteMany({
        where: { participantId: id }
      });
      
      await prisma.moneyRecord.deleteMany({
        where: { participantId: id }
      });

      // Depois resetar os valores do participante
      const updatedParticipant = await prisma.participant.update({
        where: { id },
        data: {
          initialWeight: 0,
          weightGoal: 0,
          moneyAdded: 0
        },
        include: {
          weightHistory: true,
          moneyHistory: true
        }
      });

      return NextResponse.json(updatedParticipant);
    }

    if (initialWeight !== undefined && weightGoal !== undefined) {
      // Ao editar pela primeira vez, criar primeiro registro de peso
      const participant = await prisma.participant.update({
        where: { id },
        data: {
          initialWeight,
          weightGoal,
          weightHistory: {
            create: {
              weight: initialWeight
            }
          }
        },
        include: {
          weightHistory: true
        }
      });

      return NextResponse.json(participant);
    }

    if (newWeight !== undefined) {
      await prisma.weightRecord.create({
        data: {
          weight: newWeight,
          participantId: id
        }
      });

      // Buscar participante atualizado com todo o histórico
      const updatedParticipant = await prisma.participant.findUnique({
        where: { id },
        include: {
          weightHistory: {
            orderBy: {
              recordedAt: 'desc'
            }
          }
        }
      });

      return NextResponse.json(updatedParticipant);
    }

    if (moneyToAdd !== undefined) {
      // Criar novo registro de contribuição
      await prisma.moneyRecord.create({
        data: {
          amount: moneyToAdd,
          participantId: id
        }
      });

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
        },
        include: {
          moneyHistory: {
            orderBy: {
              recordedAt: 'desc'
            }
          }
        }
      });

      return NextResponse.json(updatedParticipant);
    }

    return NextResponse.json(
      { error: 'Dados inválidos' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Erro na API:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar participante' },
      { status: 500 }
    );
  }
} 