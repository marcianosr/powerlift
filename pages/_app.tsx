import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import styles from "./styles.module.css";
import { Provider } from "next-auth/client";
import Navigation from "../components/Navigation";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<link
					href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;700;800;900&display=swap"
					rel="stylesheet"
				/>
			</Head>

			{/* Optimization: Checks per component if there is a session prop configured in getServerSideProps per component. This will spare the amount of session requests per component  */}
			<Provider session={pageProps.session}>
				<main className={styles.container}>
					<Navigation {...pageProps} />
					<Component {...pageProps} />
				</main>
			</Provider>
		</>
	);
}

export default MyApp;
