'use client';

import { useEffect, useState } from 'react';
import ParticipantCard from '@/components/ParticipantCard';

interface Participant {
  id: number;
  name: string;
  photoUrl: string;
  weightGoal: number;
  weightLost: number;
  color: string;
  initialWeight: number;
  moneyAdded: number;
}

export default function Home() {
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    const response = await fetch('/api/participants');
    const data = await response.json();
    setParticipants(data);
    console.log(data)
  };

  const handleWeightUpdate = async (id: number, newWeight: number) => {
    try {
      const response = await fetch(`/api/participants/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newWeight }),
      });

      if (response.ok) {
        setParticipants(prevParticipants =>
          prevParticipants.map(participant =>
            participant.id === id
              ? { ...participant, weightLost: participant.weightLost + newWeight }
              : participant
          )
        );
      }
    } catch (error) {
      console.error('Erro ao atualizar peso:', error);
    }
  };

  const handleMoneyAdd = async (id: number, amount: number) => {
    try {
      const response = await fetch(`/api/participants/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ moneyToAdd: amount }),
      });

      if (response.ok) {
        setParticipants(prevParticipants =>
          prevParticipants.map(participant =>
            participant.id === id
              ? { ...participant, moneyAdded: participant.moneyAdded + amount }
              : participant
          )
        );
      }
    } catch (error) {
      console.error('Erro ao adicionar dinheiro:', error);
    }
  };

  const handleReset = async (id: number) => {
    try {
      const response = await fetch(`/api/participants/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reset: true }),
      });

      if (response.ok) {
        setParticipants(prevParticipants =>
          prevParticipants.map(participant =>
            participant.id === id
              ? { ...participant, weightLost: 0, moneyAdded: 0 }
              : participant
          )
        );
      }
    } catch (error) {
      console.error('Erro ao resetar participante:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-950 via-purple-800 to-fuchsia-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12 md:py-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                <span className="inline-block transform hover:scale-105 transition-transform duration-200">
                  Money
                </span>
                <span className="inline-block transform hover:scale-105 transition-transform duration-200 text-purple-300">
                  Fit
                </span>
              </h1>
              <p className="mt-4 text-xl text-purple-200 max-w-2xl mx-auto leading-relaxed">
                Transforme seus objetivos em um prêmio milionário! 💰
              </p>

              {/* Líder do Desafio */}
              {participants.length > 0 && (
                <div className="mt-8 mb-6">
                  {(() => {
                    const participantsWithProgress = participants.filter(p => p.weightGoal > 0 && p.weightLost > 0);

                    if (participantsWithProgress.length === 0) return null;

                    const leader = participantsWithProgress.reduce((prev, current) => {
                      const prevProgress = (prev.weightLost / prev.weightGoal) * 100;
                      const currentProgress = (current.weightLost / current.weightGoal) * 100;
                      return currentProgress > prevProgress ? current : prev;
                    }, participantsWithProgress[0]);

                    const leaderProgress = (leader.weightLost / leader.weightGoal) * 100;

                    return (
                      <div className="inline-flex items-center gap-3 bg-purple-900/30 backdrop-blur-sm rounded-full px-6 py-2">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-purple-300">
                          <img
                            src={leader.photoUrl}
                            alt={leader.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="text-left">
                          <p className="text-purple-200 text-sm font-medium">
                            Líder do Desafio
                          </p>
                          <p className="text-white font-bold">
                            {leader.name} • {leaderProgress.toFixed(1)}%
                          </p>
                        </div>
                        <svg
                          className="w-6 h-6 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          />
                        </svg>
                      </div>
                    );
                  })()}
                </div>
              )}

              <div className="mt-6 flex justify-center space-x-4">
                <div className="bg-purple-900/50 backdrop-blur-sm rounded-lg px-6 py-3">
                  <p className="text-purple-200 text-sm font-medium">Participantes</p>
                  <p className="text-2xl font-bold text-purple-300">{participants.length}</p>
                </div>
                <div className="bg-purple-900/50 backdrop-blur-sm rounded-lg px-6 py-3">
                  <p className="text-purple-200 text-sm font-medium">Prêmio Atual</p>
                  <p className="text-2xl font-bold text-white">
                    R$ {participants.reduce((total, p) => total + p.moneyAdded, 0).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...participants]
            .sort((a, b) => {
              const progressA = a.weightGoal > 0 ? (a.weightLost / a.weightGoal) * 100 : -1;
              const progressB = b.weightGoal > 0 ? (b.weightLost / b.weightGoal) * 100 : -1;
              return progressB - progressA;
            })
            .map((participant) => (
              <ParticipantCard
                key={participant.id}
                {...participant}
                onWeightUpdate={handleWeightUpdate}
                onParticipantEdit={async (id, initialWeight, weightGoal) => {
                  const response = await fetch(`/api/participants/${id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ initialWeight, weightGoal }),
                  });
                  if (response.ok) {
                    fetchParticipants();
                  }
                }}
                onMoneyAdd={handleMoneyAdd}
                onReset={handleReset}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
