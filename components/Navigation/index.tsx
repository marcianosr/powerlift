import React from "react";
import { signOut, useSession } from "next-auth/client";
import Link from "next/link";
import styles from "./styles.module.css";

const Navigation: React.VFC = () => {
	const [session] = useSession();

	const onLogout = async () => signOut();

	return (
		<nav className={styles.navigation}>
			{session?.user ? (
				<>
					<Link href={`/profile/prfile`}>Profiel</Link>
					<button onClick={onLogout}>Log out</button>
				</>
			) : (
				<>
					<Link href={`/signup`}>Sign up</Link> /{" "}
					<Link href="/signup">Log in</Link>
				</>
			)}
		</nav>
	);
};

export default Navigation;
