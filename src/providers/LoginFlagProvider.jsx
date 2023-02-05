import { createContext, useState } from "react";

export const LoginFlagContext = createContext({});

export const LoginFlagProvider = props => {
	const { children } = props;

	const [accessToken, setAccessToken] = useState();

	return(
		<LoginFlagContext.Provider value={{ accessToken, setAccessToken }}>
			{children}
		</LoginFlagContext.Provider>
	);
};
