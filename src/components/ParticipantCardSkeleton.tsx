export default function ParticipantCardSkeleton() {
    return (
        <div className="bg-gray-800 rounded-xl shadow-lg w-full animate-pulse">
            <div className="p-4 border-b border-gray-700">
                <div className="flex gap-4 items-start">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-full bg-gray-700" />
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                        <div className="h-6 bg-gray-700 rounded w-32 mb-2" />
                        <div className="flex gap-2">
                            <div className="w-10 h-10 bg-gray-700 rounded-lg" />
                            <div className="w-10 h-10 bg-gray-700 rounded-lg" />
                            <div className="w-10 h-10 bg-gray-700 rounded-lg" />
                            <div className="w-10 h-10 bg-gray-700 rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 space-y-3">
                {/* Stats */}
                <div className="bg-gray-900/50 rounded-lg p-3">
                    <div className="grid grid-cols-3 gap-2">
                        {[...Array(3)].map((_, i) => (
                            <div key={i}>
                                <div className="h-4 bg-gray-700 rounded w-16 mx-auto mb-2" />
                                <div className="h-5 bg-gray-700 rounded w-12 mx-auto" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Progress */}
                <div className="space-y-1">
                    <div className="flex justify-between">
                        <div className="h-4 bg-gray-700 rounded w-16" />
                        <div className="h-4 bg-gray-700 rounded w-12" />
                    </div>
                    <div className="w-full bg-gray-900 rounded-full h-2.5">
                        <div className="h-2.5 rounded-full bg-gray-700 w-2/3" />
                    </div>
                </div>

                {/* Money */}
                <div className="flex justify-end">
                    <div className="h-4 bg-gray-700 rounded w-32" />
                </div>

                {/* Input */}
                <div className="flex gap-2">
                    <div className="flex-1 h-12 bg-gray-700 rounded-lg" />
                    <div className="w-[100px] h-12 bg-gray-700 rounded-lg" />
                </div>
            </div>
        </div>
    );
} 