import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom'
import Svco from './Svco';
import Rvsp from './Rvsp';
import Qpqs from './Qpqs';
import Pisamr from './Pisamr';
import Lapmr from './Lapmr';
import Avavti from './Avavti';
import Lavolume from './Lavolume';
import Pisams from './Pisams';
import MainError from './Error';
import MainNav from './mainnav';
import * as serviceWorker from './serviceWorker';

//how do i have a different navigation option in other pages.
const routing = (
<Router>
    <div className='router'>

        <Switch>
        <Route exact path ="/" component={MainNav} />
        <Route path="/svco" component={Svco} />
        <Route path="/rvsp" component={Rvsp} />
        <Route path="/qpqs" component={Qpqs} />
        <Route path="/pisamr" component={Pisamr} />
        <Route path="/lapmr" component={Lapmr} />
        <Route path="/avavti" component={Avavti} />
        <Route path="/Lavolume" component={Lavolume} />
        <Route path="/pisams" component={Pisams} />
        <Route component={MainError} />
        </Switch>
    </div>
</Router>

    )

ReactDOM.render(routing , document.getElementById('root'));

if (module.hot) {
	module.hot.accept();
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
