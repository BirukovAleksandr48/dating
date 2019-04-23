import React, {Component} from 'react';
import './User.sass';
import { getPictureUrl, getAge } from "../../../../utils/functions";

class User extends Component {

    render() {

        const user = this.props.user;
        return (
            <div className="User">
                <div className="profile-picture"
                     style ={ { backgroundImage: `url(${getPictureUrl(user.profilePicture, user.gender)})`}}>
                    <div className="user-info">
                        <span className="name">{user.firstName + ' ' + user.lastName}</span>
                        <span className="inf">{ getAge(user.birthDate) } years</span>
                    </div>
                </div>
            </div>
        )

    }

}

export default User;
