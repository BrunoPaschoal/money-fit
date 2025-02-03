'use client';

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
    if (!isOpen) return null;

    const handleConfirm = async () => {
        await onConfirm(participant.id);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4 sm:mx-auto">
                <h2 className="text-xl font-bold mb-4 text-gray-100">Confirmar Reset</h2>
                <p className="text-gray-300 mb-6">
                    Tem certeza que deseja resetar todas as métricas de {participant.name}?
                    Esta ação não pode ser desfeita.
                </p>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                    >
                        Resetar
                    </button>
                </div>
            </div>
        </div>
    );
} 