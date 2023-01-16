import logo from './logo.svg';
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

function App() {
  return (
	  <Router>
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
	  </Router>
  );
}

export default App;
