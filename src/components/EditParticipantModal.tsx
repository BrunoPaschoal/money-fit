'use client';

import { useState } from 'react';

interface EditParticipantModalProps {
    isOpen: boolean;
    onClose: () => void;
    participant: {
        id: number;
        name: string;
        initialWeight: number;
        weightGoal: number;
    };
    onSave: (id: number, initialWeight: number, weightGoal: number) => Promise<void>;
}

export default function EditParticipantModal({
    isOpen,
    onClose,
    participant,
    onSave,
}: EditParticipantModalProps) {
    const [initialWeight, setInitialWeight] = useState(participant.initialWeight.toString());
    const [weightGoal, setWeightGoal] = useState(participant.weightGoal.toString());
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onSave(
                participant.id,
                parseFloat(initialWeight),
                parseFloat(weightGoal)
            );
            onClose();
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg w-full max-w-md mx-4 sm:mx-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-950 via-purple-800 to-fuchsia-600 p-6 rounded-t-lg">
                    <h2 className="text-xl font-bold text-white">Editar Participante</h2>
                    <p className="text-purple-200 text-sm mt-1">
                        Configure os dados iniciais de {participant.name}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                Peso Inicial (kg)
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="0.1"
                                    value={initialWeight}
                                    onChange={(e) => setInitialWeight(e.target.value)}
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-2.5 text-gray-100 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    placeholder="Ex: 80.5"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <span className="text-gray-400">kg</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                Meta de Peso (kg)
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="0.1"
                                    value={weightGoal}
                                    onChange={(e) => setWeightGoal(e.target.value)}
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-2.5 text-gray-100 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    placeholder="Ex: 75.0"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <span className="text-gray-400">kg</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end space-x-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed w-[100px]"
                        >
                            {isSubmitting ? (
                                <svg className="animate-spin h-4 w-4 text-white mx-auto" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                            ) : (
                                'Salvar'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 