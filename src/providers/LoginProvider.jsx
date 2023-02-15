import { createContext, useState } from "react";

export const LoginFlagContext = createContext({});

export const LoginFlagProvider = props => {
	const { children } = props;

	const initialLoginInfo = {
		isLoggedIn: false,
		loginNotice: false,
		logoutNotice: false,
	}

	const [loginInfo, setLoginInfo] = useState(initialLoginInfo);

	return(
		<LoginFlagContext.Provider value={{ loginInfo, setLoginInfo }}>
			{children}
		</LoginFlagContext.Provider>
	);
};
