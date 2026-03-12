interface ProfileContactProps {
    email: string;
}

export const ProfileContact = ({ email }: ProfileContactProps) => {
    return (
        <div className="mx-4 mt-4 flex flex-col gap-1">
            <label className="font-nunito text-sm font-semibold text-secondary dark:text-accent" htmlFor="Email">
                Email
            </label>
            <input
                type="email"
                id="Email"
                value={email}
                readOnly
                className="border-2 border-secondary dark:border-white font-nunito text-lg rounded-2xl px-4 py-2 bg-transparent"
            />
        </div>
    );
};