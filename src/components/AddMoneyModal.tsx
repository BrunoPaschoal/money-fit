'use client';

import { useState } from 'react';

interface AddMoneyModalProps {
    isOpen: boolean;
    onClose: () => void;
    participant: {
        id: number;
        name: string;
    };
    onSave: (id: number, amount: number) => Promise<void>;
}

export default function AddMoneyModal({
    isOpen,
    onClose,
    participant,
    onSave,
}: AddMoneyModalProps) {
    const [amount, setAmount] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (amount) {
            await onSave(participant.id, parseFloat(amount));
            setAmount('');
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4 sm:mx-auto">
                <h2 className="text-xl font-bold mb-4 text-gray-100">Adicionar Valor</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Valor da Punição (R$)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full px-3 py-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                            placeholder="0,00"
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
                            Adicionar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 