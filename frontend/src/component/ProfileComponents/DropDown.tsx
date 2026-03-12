interface DropdownItem {
    id: string;
    label: string;
}

interface ProfileDropDownProps {
    isOpen: boolean;
    items: DropdownItem[];
    onSelect?: (itemId: string) => void;
}

export const ProfileDropDown = ({ isOpen, items, onSelect }: ProfileDropDownProps) => {
    if (!isOpen) return null;

    return (
        <div className="absolute top-full right-0 z-50 mt-1 min-w-40 overflow-hidden rounded-xl border border-secondary dark:border-accent bg-white dark:bg-secondary shadow-lg">
            <ul className="flex flex-col">
                {items.map((item) => (
                    <li key={item.id}>
                        <button
                            type="button"
                            onClick={() => onSelect?.(item.id)}
                            className="w-full px-6 py-3 text-left font-nunito text-[16px] font-medium text-secondary dark:text-accent hover:bg-gray-100 dark:hover:bg-medium cursor-pointer"
                        >
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};