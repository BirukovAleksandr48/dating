import React, {Component} from 'react';
import './Home.sass';

import HomeHeader from '../../components/Headers/HomeHeader/HomeHeader'
import SignUp from './components/SignUp/SignUp'
import HomeContent from './components/HomeContent/HomeContent'

class Home extends Component {
    render() {
        return (
            <div className="Home">
                <HomeHeader {...this.props}/>
                <SignUp {...this.props}/>
                <HomeContent/>
            </div>
        )
    }
}

export default Home;
