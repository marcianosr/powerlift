import React, { useState } from "react";
import { signOut, useSession } from "next-auth/client";
import styles from "./styles.module.css";
import Button from "../Button";
import LoginSignUpModal from "../Login/LoginSignUpModal";

export type ModalTypeState = "login" | "signup";

const Navigation: React.VFC = () => {
	const [session] = useSession();
	const [showModal, setShowModal] = useState(false);
	const [modalType, setModalType] = useState<ModalTypeState>("login");

	const onLogout = async () => signOut();

	return (
		<nav className={styles.navigation}>
			{!session && showModal && (
				<LoginSignUpModal
					setShowModal={setShowModal}
					modalType={modalType}
				/>
			)}
			{session?.user ? (
				<ul>
					<li>
						{/* <Link
								href={`/profile/${session.user.displayName.toLowerCase()}`}
							>
								Profiel
							</Link> */}
					</li>
					<li>
						<Button
							variant="flat"
							onClick={() => {
								onLogout();
							}}
						>
							Uitloggen
						</Button>
					</li>
				</ul>
			) : (
				<ul>
					<li>
						<Button
							variant="flat"
							onClick={() => {
								setShowModal(true);
								setModalType("signup");
							}}
						>
							Account aanmaken
						</Button>
					</li>
					<li>
						<Button
							variant="flat"
							onClick={() => {
								setShowModal(true);
								setModalType("login");
							}}
						>
							Inloggen
						</Button>
					</li>
				</ul>
			)}
		</nav>
	);
};

export default Navigation;
