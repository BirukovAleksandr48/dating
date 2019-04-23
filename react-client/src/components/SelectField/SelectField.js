import React, {Component} from 'react';
import './SelectField.sass';

class SelectField extends Component {

    generateOptions(array) {
        const options = [];
        for(let i in array) {
            options.push(<option key={ i }>{ array[i] }</option>)
        }
        return options
    }

    render() {
        const { title, color, value, name, onChange, array, size} = this.props;
        const options = this.generateOptions(array)
        const titleClass = 'title ' + size;
        const inputClass = 'select ' + size;
        return (
            <div className="SelectField">
                <span className={titleClass}
                      style={{color}}>{title}</span>
                <select value={value}
                        className={inputClass}
                        onChange={(e) => onChange(e)}
                        name={name}>
                    {options}
                </select>
            </div>
        )
    }

}

export default SelectField;
