import './App.css';
import{
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";

import {Top} from './containers/Top.jsx';
import {SignIn} from './containers/SignIn.jsx';
import {LogIn} from './containers/LogIn.jsx';
import {RequestForm} from './containers/RequestForm.jsx';
import {Header} from './containers/Header.jsx';
import {Footer} from './containers/Footer.jsx';
import { styled, ThemeProvider, createTheme} from '@mui/system';

function App() {
	const Theme = createTheme({
		palette: {
			primary: {
				main: '#F5F5F5',
			},
		},
	});
	
	const BaseComponent = styled('div')(({theme}) => ({
		backgroundColor: theme.palette.primary.main,
	}));
	
  	return (
	  	<Router>
	  		<Header/>
				<ThemeProvider theme={Theme}>
					<BaseComponent>
	  					<Switch>
	  						<Route exact path="/">
	  							<Top/>
	  						</Route>
	  						<Route exact path="/signin">
	  							<SignIn/>
	  						</Route>
	  						<Route exact path="/login">
	  							<LogIn/>
	  						</Route>
	  						<Route exact path="/users/:userRandomId/request"
	  								render={({match}) => 
										<RequestForm
											match={match}
										/>
									}
	  						/>
	  					</Switch>
					</BaseComponent>
				</ThemeProvider>
			<Footer/>
	  </Router>
  );
}

export default App;
