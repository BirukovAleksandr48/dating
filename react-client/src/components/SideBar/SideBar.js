import React, {Component} from 'react';
import './SideBar.sass'
import _ from 'lodash'
import connect from "react-redux/es/connect/connect";
import { images } from "../../images";
import { getUsersAction } from '../../actions/actionCreator'
import InputField from "../InputField/InputField";
import SelectField from "../SelectField/SelectField"

class SideBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFiltersHiden: true,
            genderArray: ['', 'man', 'woman'],
            intentionArray: ['', 'sex', 'friendship', 'communication'],

            name: '',
            minAge: null,
            maxAge: null,
            gender: null,
            intention: null,
            withPhoto: false
        };
        this.onFieldChange = this.onFieldChange.bind(this)
        console.log('SideBar props', props)
    }

    onBtnFindMenuClicked() {
        this.setState(oldState => {
            return { isFiltersHiden: !oldState.isFiltersHiden }
        })
    }

    btnFindClick() {
        let query = '?';
        const params = {
            name: this.state.name,
            minAge: this.state.minAge,
            maxAge: this.state.maxAge,
            gender: this.state.gender,
            intention: this.state.intention,
            withPhotoOnly: this.state.withPhoto
        };
        Object.keys(params).map(key => {
            if(!params[key])
                delete params[key]
        });
        query += Object.keys(params).map(key => key + '=' + params[key]).join('&');
        this.props.getUsersAction(query);
        this.props.history.push('/users' + query)
    }

    onFieldChange(e) {
        if(e.target.type === 'checkbox') {
            return this.setState({ withPhoto: e.target.checked })
        } else {
            this.setState({[e.target.name]: e.target.value})
        }
    }

    renderFilters() {

        if (!this.state.isFiltersHiden) {
            return (
                <div className="filters">

                    <InputField title={'Name'} color={'black'} type={'text'} size={'small'}
                                placeholder={'Justin'} name={'name'} onChange={this.onFieldChange}/>

                    <InputField title={'Minimum age'} color={'black'} type={'text'} size={'small'}
                                placeholder={'20'} name={'minAge'} onChange={this.onFieldChange}/>

                    <InputField title={'Maximum age'} color={'black'} type={'text'} size={'small'}
                                placeholder={'37'} name={'maxAge'} onChange={this.onFieldChange}/>

                    <SelectField title={'Gender'} color={'black'} size={'small'}
                                 array={this.state.genderArray} name={'gender'} onChange={this.onFieldChange}/>

                    <SelectField title={'Intention'} color={'black'} size={'small'}
                                 array={this.state.intentionArray} name={'intention'} onChange={this.onFieldChange}/>

                    <div className="checkbox">
                        <input type="checkbox" id="cbReg"
                               name={'withPhoto'} onChange={(e) => this.onFieldChange(e)}/>
                        <label className="cbText noselect" htmlFor="cbReg">with photo only</label>
                    </div>

                    <div className="btn-find" onClick={() => this.btnFindClick()}>
                        <a className="title">Find</a>
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }

    renderSecondBlock() {
        const data = [
            { text: 'Recommended', value: 4 },
            { text: 'Conversations', value: 3 },
            { text: 'I like', value: 0 },
            { text: 'Saved', value: 4 },
            { text: 'Mutual Interest', value: 2 },
            { text: 'I was visited', value: 7 }
        ];
        return _.map(data, (item, key) => {
            return(<div className="item-with-icon" key={key}>
                <a className="title noselect">{ item.text }</a>
                <div className="icon-text noselect">{ item.value }</div>
            </div>)
        })
    }

    renderFiltersHeader() {
        const classOpenClose = this.state.isFiltersHiden ? 'icon-close' : 'icon-open';
        return(
            <div className="btn-find-menu" onClick={() => this.onBtnFindMenuClicked()}>
                <a className="title noselect">Find singles</a>
                <div className={classOpenClose}/>
            </div>
        )
    }

    renderThirdBlock() {
        const data = [
            { text: 'New faces', image: 'smile' },
            { text: 'Online users', image: 'message' },
            { text: 'Birthday', image: 'cake' }
        ];
        return _.map(data, (item, key) => {
            return(
                <div className="item-with-icon" key={key}>
                    <a className="title noselect">{ item.text }</a>
                    <div className="icon-img" style={{ backgroundImage: `url(${images[item.image]})`}}/>
                </div>
            )
        })
    }

    render() {
        const secBlock = this.renderSecondBlock();
        const filtersHeader = this.renderFiltersHeader();
        const filters = this.renderFilters();
        const thirdBlock = this.renderThirdBlock();
        return (
            <div className="Sidebar">
                <div className="block">
                    { secBlock }
                </div>
                <div className="block">
                    { filtersHeader }
                    { filters }
                </div>
                <div className="block">
                    { thirdBlock }
                </div>
            </div>
        )
    }
}

const mapStateProps = (state) => {
    return {  }
};
const mapDispatchToProps = (dispatch) => ({
    getUsersAction: (query) => dispatch(getUsersAction(query))
});

export default connect(mapStateProps, mapDispatchToProps)(SideBar);
