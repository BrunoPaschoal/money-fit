'use client';

import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import Image from 'next/image';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface ParticipantInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    participant: {
        id: number;
        name: string;
        photoUrl: string;
        color: string;
        initialWeight: number;
        weightGoal: number;
        weightHistory: Array<{ weight: number; recordedAt: string }>;
        moneyAdded: number;
        moneyHistory: Array<{ amount: number; recordedAt: string }>;
    };
}

const EmptyState = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-gray-700/30 rounded-full p-4 mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
        </div>
        <p className="text-gray-400 text-sm text-center">{message}</p>
    </div>
);

const TabButton = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
        onClick={onClick}
        className={`py-4 px-1 relative font-medium text-sm transition-colors duration-200 ${active ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-gray-300'
            }`}
    >
        {children}
        {active && (
            <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-purple-400/0 via-purple-400/70 to-purple-400/0" />
        )}
    </button>
);

const WeightHistoryTable = ({ history, initialWeight }: { history: Array<{ weight: number; recordedAt: string }>; initialWeight: number }) => (
    <table className="w-full text-left">
        <thead className="text-sm text-gray-400 border-b border-gray-700 bg-gray-800">
            <tr>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3">Peso</th>
                <th className="px-4 py-3">Diferença</th>
            </tr>
        </thead>
        <tbody className="text-gray-300">
            {history.map((record, index) => {
                const prevWeight = index > 0 ? history[index - 1].weight : initialWeight;
                const difference = prevWeight - record.weight;
                return (
                    <tr key={record.recordedAt} className="border-b border-gray-700">
                        <td className="px-4 py-3">
                            {new Date(record.recordedAt).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </td>
                        <td className="px-4 py-3">{record.weight}kg</td>
                        <td className={`px-4 py-3 ${difference > 0 ? 'text-green-400' : difference < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                            {difference > 0 ? '+' : ''}{difference.toFixed(1)}kg
                        </td>
                    </tr>
                );
            })}
        </tbody>
    </table>
);

const MoneyHistoryTable = ({ history }: { history: Array<{ amount: number; recordedAt: string }> }) => (
    <table className="w-full text-left">
        <thead className="text-sm text-gray-400 border-b border-gray-700 bg-gray-800">
            <tr>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3">Valor</th>
            </tr>
        </thead>
        <tbody className="text-gray-300">
            {history.map((record) => (
                <tr key={record.recordedAt} className="border-b border-gray-700">
                    <td className="px-4 py-3">
                        {new Date(record.recordedAt).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </td>
                    <td className="px-4 py-3 text-emerald-500">
                        R$ {record.amount.toFixed(2)}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default function ParticipantInfoModal({ isOpen, onClose, participant }: ParticipantInfoModalProps) {
    const [activeTab, setActiveTab] = useState<'table' | 'chart' | 'money'>('table');

    if (!isOpen) return null;

    const sortedHistory = [...participant.weightHistory].sort((a, b) =>
        new Date(a.recordedAt).getTime() - new Date(b.recordedAt).getTime()
    );

    const chartData = {
        labels: sortedHistory.map(record =>
            new Date(record.recordedAt).toLocaleDateString('pt-BR')
        ),
        datasets: [{
            label: 'Peso',
            data: sortedHistory.map(record => record.weight),
            borderColor: participant.color,
            backgroundColor: participant.color,
            tension: 0.4
        }]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1F2937',
                titleColor: '#F3F4F6',
                bodyColor: '#F3F4F6',
                borderColor: '#374151',
                borderWidth: 1,
                padding: 10,
                displayColors: false
            }
        },
        scales: {
            y: {
                grid: { color: '#374151' },
                ticks: { color: '#9CA3AF' }
            },
            x: {
                grid: { color: '#374151' },
                ticks: { color: '#9CA3AF' }
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl w-full max-w-4xl flex flex-col h-[90vh]">
                {/* Header - Fixo */}
                <div className="p-6 border-b border-gray-700">
                    <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white flex-shrink-0">
                            <Image
                                src={participant.photoUrl}
                                alt={participant.name}
                                width={80}
                                height={80}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">{participant.name}</h2>
                            <div className="flex gap-4 mt-2 text-purple-200">
                                <div>
                                    <span className="text-sm">Peso Inicial:</span>
                                    <span className="ml-1 font-semibold">{participant.initialWeight}kg</span>
                                </div>
                                <div>
                                    <span className="text-sm">Meta:</span>
                                    <span className="ml-1 font-semibold">{participant.weightGoal}kg</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs - Fixo */}
                <div className="border-b border-gray-700">
                    <div className="px-6 flex space-x-8">
                        <TabButton active={activeTab === 'table'} onClick={() => setActiveTab('table')}>
                            Histórico
                        </TabButton>
                        <TabButton active={activeTab === 'chart'} onClick={() => setActiveTab('chart')}>
                            Gráfico
                        </TabButton>
                        <TabButton active={activeTab === 'money'} onClick={() => setActiveTab('money')}>
                            Punições
                        </TabButton>
                    </div>
                </div>

                {/* Content - Área com scroll */}
                <div className="flex-1 overflow-hidden">
                    <div className="h-full overflow-y-auto">
                        <div className="p-6">
                            {activeTab === 'table' && (
                                <div className="space-y-4">
                                    <div className="mb-6">
                                        <h3 className="text-xl font-bold text-gray-100">Histórico de Registros</h3>
                                        <p className="text-sm text-gray-400 mt-1">
                                            Acompanhe todos os registros de peso e suas variações ao longo do tempo.
                                        </p>
                                    </div>
                                    {sortedHistory.length > 0 ? (
                                        <div className="overflow-x-auto rounded-lg border border-gray-700">
                                            <WeightHistoryTable
                                                history={sortedHistory}
                                                initialWeight={participant.initialWeight}
                                            />
                                        </div>
                                    ) : (
                                        <EmptyState message="Nenhum registro de peso encontrado. Comece registrando seu peso atual!" />
                                    )}
                                </div>
                            )}

                            {activeTab === 'chart' && (
                                <div className="space-y-4">
                                    <div className="mb-6">
                                        <h3 className="text-xl font-bold text-gray-100">Gráfico de Evolução</h3>
                                        <p className="text-sm text-gray-400 mt-1">
                                            Visualize sua jornada de progresso através deste gráfico interativo.
                                        </p>
                                    </div>
                                    {sortedHistory.length > 0 ? (
                                        <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                                            <Line data={chartData} options={chartOptions} />
                                        </div>
                                    ) : (
                                        <EmptyState message="Sem dados suficientes para gerar o gráfico. Registre seu progresso!" />
                                    )}
                                </div>
                            )}

                            {activeTab === 'money' && (
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-100">Histórico de Punições</h3>
                                        <p className="text-sm text-gray-400 mt-1">
                                            Acompanhe todas as contribuições financeiras realizadas.
                                        </p>
                                    </div>
                                    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                                        <div className="text-sm text-gray-400">Total Contribuído</div>
                                        <div className="text-2xl font-bold text-emerald-500">
                                            R$ {participant.moneyHistory.reduce((total, record) => total + record.amount, 0).toFixed(2)}
                                        </div>
                                    </div>
                                    {participant.moneyHistory.length > 0 ? (
                                        <div className="overflow-x-auto rounded-lg border border-gray-700 mt-4">
                                            <MoneyHistoryTable history={participant.moneyHistory} />
                                        </div>
                                    ) : (
                                        <EmptyState message="Nenhuma contribuição registrada ainda." />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer - Fixo */}
                <div className="p-4 border-t border-gray-700 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
} 