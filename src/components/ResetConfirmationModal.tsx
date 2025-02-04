'use client';

import { useState } from 'react';

interface ResetConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    participant: {
        id: number;
        name: string;
    };
    onConfirm: (id: number) => Promise<void>;
}

export default function ResetConfirmationModal({
    isOpen,
    onClose,
    participant,
    onConfirm,
}: ResetConfirmationModalProps) {
    const [isResetting, setIsResetting] = useState(false);

    if (!isOpen) return null;

    const handleConfirm = async () => {
        setIsResetting(true);
        try {
            await onConfirm(participant.id);
            onClose();
        } finally {
            setIsResetting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4 sm:mx-auto">
                <div className="text-center mb-6">
                    <div className="bg-red-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold mb-2 text-gray-100">Confirmar Reset</h2>
                    <p className="text-gray-400 text-sm">
                        Tem certeza que deseja resetar todos os dados de <strong className="text-gray-300">{participant.name}</strong>? Esta ação não pode ser desfeita.
                    </p>
                </div>
                <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isResetting}
                        className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirm}
                        disabled={isResetting}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed w-[100px]"
                    >
                        {isResetting ? (
                            <svg className="animate-spin h-4 w-4 text-white mx-auto" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        ) : (
                            'Resetar'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
} 