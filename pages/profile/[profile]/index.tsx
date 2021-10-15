import { signOut, useSession } from "next-auth/client";
import React from "react";
import ChangePassword, {
	PasswordInputs,
} from "../../../components/ChangePassword";

const Profile = () => {
	const [session, loading] = useSession();

	const changePasswordHandler = async (passwordInputs: PasswordInputs) => {
		const response = await fetch("/api/user/change-password", {
			method: "PATCH",
			body: JSON.stringify(passwordInputs),
			headers: {
				"Content-Type": "application/json", // make sure to make this request carry JSON data
			},
		});

		const data = await response.json();

		console.log("data", data);
	};

	return (
		<section>
			{session?.user && (
				<div>
					<p>Welkom {session.user.email}</p>
					<p>Welkom {session.user.displayName}</p>

					<h2>User settings</h2>
					<ChangePassword onChangePassword={changePasswordHandler} />
				</div>
			)}
		</section>
	);
};

export default Profile;
