import React, {Component} from 'react';
import './InputField.sass';

class InputField extends Component {

    render() {
        const { title, color, value, name, onChange, type, size, placeholder } = this.props;
        const titleClass = 'title ' + size;
        const inputClass = 'input ' + size;
        return (
            <div className="InputField">
                <span className={ titleClass }
                      style={ { color } } >{ title }</span>
                <input value={ value }
                       className={ inputClass }
                       name={ name }
                       placeholder={ placeholder }
                       onChange={(e) => onChange(e)}
                       type={type}/>
            </div>
        )
    }

}

export default InputField;
