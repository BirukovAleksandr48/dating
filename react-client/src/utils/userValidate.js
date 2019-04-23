import * as Validator from "./Validator";
import { educationArray, genderArray, intentionArray } from "../constants";

export const isUserDataInvalid = (user) => {
    if (user.hasOwnProperty('email') && !Validator.email(user.email)) {
        return 'Email is invalid';
    } else if (user.hasOwnProperty('password') && !Validator.password(user.password)) {
        return 'Password length must be 8-12 symbols';
    } else if (!Validator.notEmpty(user.firstName)) {
        return 'First name invalid';
    } else if (!Validator.notEmpty(user.lastName)) {
        return 'Last name invalid';
    } else if (!Validator.olderThan(user.birthDate, 18)) {
        return 'You must be at least 18 years old';
    } else if (!Validator.isInCollection(user.gender, genderArray)) {
        return 'Incorrect gender value';
    } else if (!Validator.isInCollection(user.education, educationArray)) {
        return 'Incorrect education value';
    } else if (!Validator.isInCollection(user.intention, intentionArray)) {
        return 'Incorrect intention value';
    }
    return false;
}
