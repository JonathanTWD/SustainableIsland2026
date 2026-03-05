import { Input } from "../../component/Input/Input";

export function Slider() {
    return (
        <>
            <Input
                value={0}
                onChange={(value) => (value)}
                min={1}
                max={6}
                title="Number of people in household"
            />
            <Input
                value={0}
                onChange={(value) => (value)}
                min={5}
                max={30}
                title="Shower"
                text="Minutes per day"
            />
        </>
    )
}