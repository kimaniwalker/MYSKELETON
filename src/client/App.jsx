import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from './components/auth/privateRoute';
import About from './screens/about';
import Contact from './screens/contact';
import Home from './screens/home';
import Login from './screens/login';


export default function App(props) {


	return (
		<>
		<BrowserRouter>
			
			<Switch>
	
				<Route exact path="/" component={Home} />
				<Route exact path="/about"  component={About} />
				<Route exact path="/login" component={Login} /> 
				<PrivateRoute path="/contact" exact component={Contact} />
				<Route render={() => <h1>404: page not found</h1>} />
				

			</Switch>

		</BrowserRouter>
		</>
	)
}
