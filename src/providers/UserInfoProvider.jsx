import { createContext, useState } from "react";

export const UserInfoContext = createContext({});

export const UserInfoProvider = props => {
	const { children } = props;

	const initialState = {
		id: 0,
		name: "",
		random_id: "",
	}
	const [userInfo, setUserInfo] = useState(initialState);

	return(
		<UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
			{children}
		</UserInfoContext.Provider>
	);
};
