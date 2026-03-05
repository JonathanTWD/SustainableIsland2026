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
        <div>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <button type="button" onClick={() => onSelect?.(item.id)}>
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};