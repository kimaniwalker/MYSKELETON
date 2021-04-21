import React from 'react'
import { login, checkLogin } from '../utils/auth';
import {useHistory, useLocation, useRouteMatch, Redirect} from 'react-router-dom'

export default function Login(props) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('')
    const [checkingLogin, setcheckingLogin] = React.useState(false);
    const [redirectToReferrer, setredirectToReferrer] = React.useState(false);
    const [message, setMessage] = React.useState('')
    const { from } = props.location.state || { from: { pathname: "/" } };
    const { history } = useHistory();
    const { match } = useRouteMatch();


    React.useEffect(() => {

        /* checkLogin().then(loggedIn => {
            if (loggedIn) {
                setredirectToReferrer(true);
                setcheckingLogin(false);

            } else {
                setcheckingLogin(false);
            }
        }); */

    }, [])

    const handleSubmit = async (e) => {

        try {
            e.preventDefault(); //default is for the page to refresh (won't end up loggin in) 
            let token = await login(email, password)

            if (token) {
                console.log(token);
                setredirectToReferrer(true);
            }

            

        } catch (err) {
            console.log(err)
            if (err.message) {
                setMessage(err.message); //triggers render again and shows error message
            }

        }

    }

    if (redirectToReferrer) {
        return <Redirect to={from} />;
    } else {


        return (
            <>
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="row align-items-center justify-content-center">
                            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">


                                <div className="text-center py-3"><h2>Login for exclusive access</h2></div>


                            </div>
                            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">



                                <div class="mb-3">
                                    <label for="email" class="form-label">Email address</label>
                                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" class="form-control" id="loginEmail" placeholder="name@example.com" />
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="form-label">Password</label>
                                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" class="form-control" id="loginPassword" />

                                </div>

                            </div>
                            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">



                                <button className="btn btn-primary w-100">Submit</button>


                            </div>
                        </div>
                    </form>
                </div>

            </>
        )
    }
}
