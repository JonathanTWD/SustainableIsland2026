interface SliderFactPopupProps {
    title: string;
    fact: string;
    calculation: string;
    onClose: () => void;
}

export const SliderFactPopup = ({ title, fact, calculation, onClose }: SliderFactPopupProps) => {
    return (
        <div className="fixed inset-x-4 bottom-32 z-1000 rounded-2xl border-2 border-medium bg-white p-3 shadow-xl">
            <div className="flex items-center justify-between">
                <strong className="text-[16px] font-nunito font-semibold">{title}</strong>
                <button
                    onClick={onClose}
                    className="rounded p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                    aria-label="Close tip"
                >
                    ✕
                </button>
            </div>

            <p className="mt-2 mb-1 font-nunito text-sm text-secondary">{fact}</p>
            <p className="text-sm font-nunito font-semibold text-secondary">{calculation}</p>
        </div>
    );
};