import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const colors = [
  '#9333EA', // roxo vibrante
  '#7E22CE', // roxo profundo
  '#6B21A8', // roxo escuro
  '#A855F7', // roxo claro
  '#8B5CF6', // roxo violeta
  '#7C3AED', // roxo índigo
]

async function main() {
  // Limpa o banco de dados antes de adicionar novos dados
  await prisma.participant.deleteMany({})

  const participants = [
    {
      name: 'Bruno',
      photoUrl: '/images/bruno.png',
      color: colors[0],
    },
    {
      name: 'Daiane',
      photoUrl: '/images/daiane.png',
      color: colors[1],
    },
    {
      name: 'Cris',
      photoUrl: '/images/cris.png',
      color: colors[2],
    },
    {
      name: 'Fran',
      photoUrl: '/images/fran.png',
      color: colors[3],
    },
    {
      name: 'Paulinho',
      photoUrl: '/images/paulinho.png',
      color: colors[4],
    },
    {
      name: 'Douglas',
      photoUrl: '/images/douglas.png',
      color: colors[5],
    },
  ]

  for (const participant of participants) {
    await prisma.participant.create({
      data: participant,
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 