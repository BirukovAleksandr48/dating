import React, {Component} from 'react';
import './HomeContent.sass';
import {images} from "../../../../images";

class HomeContent extends Component {

    render() {

        return (
            <>
                <div className="contentWrapper">
                    <div className="content">
                        <span className="titleMain">Search Couple and Finding Love</span>
                        <span className="title">Are you looking for a partner, love or friends?</span>
                        <span className="simpleText">DatingSite is the perfect place to find
                            a partner and friends online. We are the largest dating
                            website and we have helped thousands of people to find
                            ideal partner. With more than 900,000 users
                            looking for a partner you will find what you are looking for!
                        </span>

                        <div className="item ">
                            <div className="image">
                                <img className="img" src={images.item1}/>
                            </div>
                            <div className="data">
                                <span className="titleBlue">Meet people</span>
                                <span className="simpleText">Are you looking for friendship, love or fun?
                            You can find thousands of people looking for the same thing as you
                            on DatingSite. Filter by age, city, interests and personality.</span>
                            </div>
                        </div>

                        <div className="item reverse">
                            <div className="data">
                                <span className="titleBlue">Chat</span>
                                <span className="simpleText">In our chat rooms and in the DatinSite
                                    Messenger there are hundreds of people waiting to meet you.
                                    Speak directly with the person you are interested in.
                                </span>
                            </div>
                            <div className="image">
                                <img className="img" src={images.item2}/>
                            </div>
                        </div>

                        <div className="item">
                            <div className="image">
                                <img className="img" src={images.item3}/>
                            </div>
                            <div className="data">
                                <span className="titleBlue">Events</span>
                                <span className="simpleText">An event on DatinSite is the best way to meet
                                    singles and especially have fun! Together, parties, speed dating,
                                    dating games, trips and much more you can find here.
                                </span>
                            </div>
                        </div>

                        <div className="item reverse">
                            <div className="data">
                                <span className="titleBlue">Tips</span>
                                <span className="simpleText">We present you intimate DatinSite advice
                                    about love and sex that will be presented to you by our team of
                                    experts. These tips will change your life.
                                </span>
                            </div>
                            <div className="image">
                                <img className="img" src={images.item4}/>
                            </div>
                        </div>

                        <div className="item">
                            <div className="image">
                                <img className="img" src={images.item5}/>
                            </div>
                            <div className="data">
                                <span className="titleBlue">Blogs</span>
                                <span className="simpleText">Check the blogs of DatinSite
                                    columnists, our featured users and guest authors experts
                                    in love and relationships.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footerFirst">
                    <div className="footerContent">
                    <span className="text">Sign up on DatinSite and look for a partner.
                        We have been operating since 2008 and we are the most
                        important service in the world to find a partner and chat with friends on the
                        Internet. In DatinSite you can chat and perform precise searches
                        to find people who meet what you are looking for in a person and thus find the
                        average orange you always dreamed of. Dating and chatting with friends
                        has never been so easy as with DatinSite! Go ahead and trust in the history
                        and confidence that is DatinSite, we are sure that you will find new friends
                        and a couple with us.</span>
                    </div>
                </div>
                <div className="footerLast">
                    <div className="footerContent">
                        <span className="text">© 2019 DatinSite - All rights reserved</span>
                        <div className="networks">
                            <div className="twiter"/>
                            <div className="pinterest"/>
                            <div className="youtube"/>
                            <div className="google"/>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}


export default HomeContent;

