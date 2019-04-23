import { images } from "../images";
import moment from 'moment'

export const getPictureUrl = (fileName, gender) => {

    if(fileName) {
        return `http://localhost:3000/public/${fileName}`
    } else if (gender === 'man') {
        return images.defaultMan;
    } else {
        return images.defaultWoman;
    }

};

export const getAge = (birthDate) => {
    return moment().diff(birthDate, 'years')
}