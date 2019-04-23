import React, {Component} from 'react';
import './AdvertForm.sass';
import * as Toaster from "../../../../utils/Toaster";

class AdvertForm extends Component {

    render() {
        const { advert, onAdvertChange, onAdvertColorChange, onResultSend, resultBtnText } = this.props;
        const colors = ['#ed623b', '#4ce65d', '#7098ed', '#f7d271'];
        const colorItems = this.renderColorItems(colors, advert.color, onAdvertColorChange);
        return (
            <div className="AdvertForm">
                <input className={'advert-title'}
                       type={'text'}
                       name={'title'}
                       value={advert.title}
                       onChange={(e) => onAdvertChange(e)}/>
                <textarea className={'advert-text'}
                          name={'text'}
                          value={advert.text}
                          onChange={(e) => onAdvertChange(e)}/>
                <div className={'footer'}>
                    <div className={'colors'}>
                        {colorItems}
                    </div>
                    <input className={'advert-send'}
                           type={'button'}
                           value={resultBtnText}
                           onClick={() => this.onAddAdvertClicked(advert, onResultSend)}/>
                </div>
            </div>
        )
    }

    renderColorItems(colors, selectedColor, onAdvertColorChange) {
        return colors.map((color, index) => {
            const className = color === selectedColor ? 'color-item selected' : 'color-item';
            return <div className={className}
                        key={index}
                        style={{backgroundColor: color}} onClick={() => onAdvertColorChange(color)}/>
        })
    }


    onAddAdvertClicked(advert, onResultSend) {
        if (advert.text.length === 0) {
            return Toaster.showError('Advert text can`t be empty');
        }
        if (advert.title.length === 0) {
            return Toaster.showError('Title can`t be empty');
        }
        onResultSend()
    }
}

export default AdvertForm;
