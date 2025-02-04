'use client';

import { useState } from 'react';
import Image from 'next/image';
import EditParticipantModal from './EditParticipantModal';
import AddMoneyModal from './AddMoneyModal';
import ResetConfirmationModal from './ResetConfirmationModal';
import ParticipantInfoModal from './ParticipantInfoModal';
import toast from 'react-hot-toast';

interface ParticipantCardProps {
    id: number;
    name: string;
    photoUrl: string;
    color: string;
    initialWeight: number;
    weightGoal: number;
    moneyAdded: number;
    weightHistory: Array<{ weight: number; recordedAt: string }>;
    moneyHistory: Array<{ amount: number; recordedAt: string }>;
    onWeightUpdate: (id: number, newWeight: number) => void;
    onParticipantEdit: (id: number, initialWeight: number, weightGoal: number) => Promise<void>;
    onMoneyAdd: (id: number, amount: number) => Promise<void>;
    onReset: (id: number) => Promise<void>;
}

export default function ParticipantCard({
    id,
    name,
    photoUrl,
    color,
    initialWeight,
    weightGoal,
    moneyAdded,
    weightHistory,
    moneyHistory,
    onWeightUpdate,
    onParticipantEdit,
    onMoneyAdd,
    onReset,
}: ParticipantCardProps) {
    const [newWeight, setNewWeight] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMoneyModalOpen, setIsMoneyModalOpen] = useState(false);
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Pegar o último peso registrado ou usar o peso inicial
    const currentWeight = weightHistory?.[0]?.weight ?? initialWeight;

    // Calcular progresso baseado na diferença entre peso atual e meta
    const progress = weightGoal > 0 && currentWeight > 0
        ? Math.max(0, Math.min(100, ((initialWeight - currentWeight) / (initialWeight - weightGoal)) * 100))
        : 0;

    const isDataComplete = initialWeight > 0 && weightGoal > 0;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newWeight && !isSubmitting) {
            setIsSubmitting(true);
            try {
                await onWeightUpdate(id, parseFloat(newWeight));
                setNewWeight('');
                toast.success('Peso registrado com sucesso!', {
                    style: {
                        background: '#1F2937',
                        color: '#fff',
                        border: '1px solid #374151'
                    },
                    iconTheme: {
                        primary: '#10B981',
                        secondary: '#fff'
                    }
                });
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <>
            <div className="bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow w-full">
                <div className="p-4 border-b border-gray-700">
                    <div className="flex gap-4 items-start">
                        <div className="flex-shrink-0">
                            <div className={`relative w-20 h-20 rounded-full overflow-hidden border-4`} style={{ borderColor: color }}>
                                <Image
                                    src={photoUrl}
                                    alt={name}
                                    width={80}
                                    height={80}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>

                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-100 mb-2">{name}</h3>
                            <div className="flex gap-2">
                                {(weightHistory.length > 0 || moneyAdded > 0) && (
                                    <button
                                        onClick={() => setIsResetModalOpen(true)}
                                        className="p-2 text-gray-400 hover:text-red-400 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    </button>
                                )}
                                <button
                                    onClick={() => setIsMoneyModalOpen(true)}
                                    className="p-2 text-gray-400 hover:text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="p-2 text-gray-400 hover:text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => setIsInfoModalOpen(true)}
                                    className="p-2 text-gray-400 hover:text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 space-y-3">
                    <div className="bg-gray-900/50 rounded-lg p-3">
                        <div className="grid grid-cols-3 gap-2 text-center">
                            <div>
                                <div className="text-sm text-gray-400">Peso Inicial</div>
                                <div className="font-bold text-gray-100">{initialWeight.toFixed(1)}kg</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-400">Peso Atual</div>
                                <div className="font-bold text-gray-100">{currentWeight.toFixed(1)}kg</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-400">Meta</div>
                                <div className="font-bold text-gray-100">{weightGoal > 0 ? `${weightGoal}kg` : '-'}</div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="flex justify-between text-sm text-gray-400">
                            <span>Progresso</span>
                            <span>{progress.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-900 rounded-full h-2.5">
                            <div
                                className="h-2.5 rounded-full transition-all duration-500"
                                style={{ width: `${Math.min(progress, 100)}%`, backgroundColor: color }}
                            />
                        </div>
                    </div>

                    <div className="text-sm text-gray-400 text-right">
                        Valor Contribuído: <span className="font-bold text-emerald-500">R$ {moneyAdded.toFixed(2)}</span>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-2">
                        <div className="flex gap-2">
                            <input
                                type="number"
                                step="0.1"
                                value={newWeight}
                                onChange={(e) => setNewWeight(e.target.value)}
                                placeholder="Digite seu peso atual"
                                disabled={!isDataComplete}
                                className={`flex-1 min-w-0 px-4 py-3 text-sm text-gray-100 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent ${!isDataComplete ? 'bg-gray-800 cursor-not-allowed' : ''}`}
                            />
                            <button
                                type="submit"
                                disabled={!isDataComplete || isSubmitting}
                                className={`px-6 py-3 text-sm font-medium rounded-lg transition-colors whitespace-nowrap w-[100px] ${!isDataComplete || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                style={{ backgroundColor: color }}
                            >
                                {isSubmitting ? (
                                    <svg className="animate-spin h-4 w-4 text-white mx-auto" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                ) : (
                                    'Registrar'
                                )}
                            </button>
                        </div>
                        {!isDataComplete && (
                            <p className="text-xs text-gray-400 text-center font-semibold italic flex items-center justify-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4" />
                                </svg>
                                Cadastre seus dados para registrar seu peso
                            </p>
                        )}
                    </form>
                </div>
            </div>

            <EditParticipantModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                participant={{ id, name, initialWeight, weightGoal }}
                onSave={onParticipantEdit}
            />

            <AddMoneyModal
                isOpen={isMoneyModalOpen}
                onClose={() => setIsMoneyModalOpen(false)}
                participant={{ id, name }}
                onSave={onMoneyAdd}
            />

            <ResetConfirmationModal
                isOpen={isResetModalOpen}
                onClose={() => setIsResetModalOpen(false)}
                participant={{ id, name }}
                onConfirm={onReset}
            />

            <ParticipantInfoModal
                isOpen={isInfoModalOpen}
                onClose={() => setIsInfoModalOpen(false)}
                participant={{
                    id,
                    name,
                    photoUrl,
                    color,
                    initialWeight,
                    weightGoal,
                    weightHistory,
                    moneyAdded,
                    moneyHistory
                }}
            />
        </>
    );
} 