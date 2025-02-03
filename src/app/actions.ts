'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function updateParticipantWeight(id: number, newWeight: number) {
  const participant = await prisma.participant.findUnique({
    where: { id }
  });
  
  if (participant) {
    return await prisma.participant.update({
      where: { id },
      data: {
        weightLost: participant.weightLost + newWeight
      }
    });
  }
  
  return null;
} 