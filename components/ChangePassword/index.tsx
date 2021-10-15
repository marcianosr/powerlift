import React, { useRef } from "react";

export type PasswordInputs = {
	oldPassword: string;
	newPassword: string;
};

type ChangePasswordProps = {
	onChangePassword: (passwordInputs: PasswordInputs) => void;
};

const ChangePassword: React.VFC<ChangePasswordProps> = ({
	onChangePassword,
}) => {
	const oldPasswordRef = useRef<HTMLInputElement | null>(null);
	const newPasswordRef = useRef<HTMLInputElement | null>(null);

	const submitChangePasswword = (e: React.FormEvent) => {
		e.preventDefault();

		const enteredOldPassword = oldPasswordRef?.current?.value;
		const enteredNewPassword = newPasswordRef?.current?.value;

		// Add validation later: Are the values valid?

		onChangePassword({
			oldPassword: enteredOldPassword || "",
			newPassword: enteredNewPassword || "",
		});
	};
	return (
		<section>
			<form onSubmit={submitChangePasswword}>
				<label htmlFor="old-password">Old password</label>
				<input type="password" id="old-password" ref={oldPasswordRef} />

				<label htmlFor="new-password">New password</label>
				<input type="password" id="new-password" ref={newPasswordRef} />

				<button>Change password</button>
			</form>
		</section>
	);
};

export default ChangePassword;
