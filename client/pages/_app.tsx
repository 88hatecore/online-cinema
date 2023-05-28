import type { AppProps } from "next/app";
import MainProvider from "providers/MainProvider";

import "@/assets/styles/globals.scss";

type TypeAppProps = AppProps;

const MyApp = ({ Component, pageProps }: TypeAppProps) => {
	return (
		<MainProvider>
			<Component {...pageProps} />
		</MainProvider>
	);
};

export default MyApp;
