import React from "react";
import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Navigation from "../components/Navigation";
import styles from "./styles.module.css";

function App({ Component, pageProps }: AppProps) {
	const [queryClient] = React.useState(() => new QueryClient());

	return (
		<>
			<Head>
				<link
					href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800;900&display=swap"
					rel="stylesheet"
				/>
			</Head>

			{/* Optimization: Checks per component if there is a session prop configured in getServerSideProps per component. This will spare the amount of session requests per component  */}
			<Provider session={pageProps.session}>
				<QueryClientProvider client={queryClient}>
					<Hydrate state={pageProps.dehydratedState}>
						<main className={styles.container}>
							<Navigation {...pageProps} />
							<Component {...pageProps} />
						</main>
					</Hydrate>
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</Provider>
		</>
	);
}

export default App;
