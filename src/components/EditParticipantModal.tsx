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

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSave(
            participant.id,
            parseFloat(initialWeight),
            parseFloat(weightGoal)
        );
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4 sm:mx-auto">
                <h2 className="text-xl font-bold mb-4 text-gray-100">Editar Participante</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Peso Inicial (kg)
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            value={initialWeight}
                            onChange={(e) => setInitialWeight(e.target.value)}
                            className="w-full px-3 py-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Meta de Peso (kg)
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            value={weightGoal}
                            onChange={(e) => setWeightGoal(e.target.value)}
                            className="w-full px-3 py-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                    </div>
                    <div className="flex justify-end space-x-2 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-500"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 