import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

export const usePageTracking = () => {
	const location = useLocation();
	const GID = process.env.REACT_APP_ANALYTICS_ID

	useEffect(() => {
		ReactGA.initialize(GID);
		ReactGA.send({ hitType: "pageview", page: location.pathname });
	}, [location]);
};

