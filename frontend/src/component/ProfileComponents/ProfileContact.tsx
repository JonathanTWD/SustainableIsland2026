
interface ProfileContactProps {
    email: string;
    phone: number;
}

export const ProfileContact = ({ email, phone }: ProfileContactProps) => {
    

    return (
        <>
            <div className="profile-contact">
                <label htmlFor="Email">Email:</label>
                <input type="email" id="Email" value={email} readOnly />
                <label htmlFor="tlf">Phone:</label>
                <input type="tel" id="tlf" value={phone} readOnly />
            </div>

        </>
    )
}