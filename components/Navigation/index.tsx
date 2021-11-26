import React from "react";
import { signOut, useSession } from "next-auth/client";
import Link from "next/link";
import styles from "./styles.module.css";

const Navigation: React.VFC = () => {
	const [session] = useSession();

	const onLogout = async () => signOut();

	return (
		<nav className={styles.navigation}>
			<ul>
				{session?.user ? (
					<>
						<li>
							{/* <Link
								href={`/profile/${session.user.displayName.toLowerCase()}`}
							>
								Profiel
							</Link> */}
						</li>
						<li>
							<button onClick={onLogout}>Log out</button>
						</li>
					</>
				) : (
					<>
						<li>
							<Link href={`/signup`}>Sign up</Link> / <li></li>
						</li>
						<li>
							<Link href="/signup">Log in</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default Navigation;
