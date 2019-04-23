import moment from 'moment'

export const email = (email) => {
    const reg = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+.)+[a-z]{2,6}$/;
    if(reg.test(String(email).toLowerCase())) {
        return true;
    }
    return false;
}

export const password = (password) => {
    if(password.trim().length >= 8 && password.trim().length <= 12) {
        return true;
    }
    return false;
}

export const notEmpty = (value) => {
    if(value.trim().length > 0) {
        return true;
    }
    return false;
}

export const min = (value, min) => {
    if(typeof(value) ===  'string' && value.trim().length >= min) {
        return true;
    } else if(typeof(value) ===  'number' && value >= min) {
        return true;
    }
    return false;
}

export const max = (value, max) => {
    if(typeof(value) ===  'string' && value.trim().length <= max) {
        return true;
    } else if(typeof(value) ===  'number' && value <= max) {
        return true;
    }
    return false;
}

export const between = (value, min, max) => {
    if(typeof(value) ===  'string' && value.trim().length >= min && value.trim().length <= max) {
        return true;
    } else if(typeof(value) ===  'number' && value >= min && value <= max) {
        return true;
    }
    return false;
}

export const olderThan = (birthDate, minAge) => {
    if(moment().subtract(minAge, 'year').isAfter(moment(birthDate))) {
        return true;
    }
    return false;
}

export const isInCollection = (value, collection) => {
    if(collection.find(i => i === value)) {
        return true;
    }
    return false;
}



