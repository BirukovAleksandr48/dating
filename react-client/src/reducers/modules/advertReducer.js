import ACTION from '../../actions/actionTypes'
import * as Toaster from "../../utils/Toaster";

const initialState = {
    adverts: [],
    isFetching: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.ADVERTS_REQUEST: {
            return {
                ...state,
                isFetching: true
            }
        }
        case ACTION.ADVERTS_ERROR: {
            Toaster.showError(action.error)
            return {
                ...state,
                isFetching: false
            }
        }
        case ACTION.ADVERTS_RESPONSE: {
            return {
                ...state,
                adverts: action.data,
                isFetching: false
            }
        }
        case ACTION.ADVERT_BY_USER_ID_RESPONSE: {
            return {
                ...state,
                adverts: action.data,
                isFetching: false
            }
        }
        case ACTION.ADVERT_BY_ID_RESPONSE: {
            const adverts = JSON.parse(JSON.stringify(state.adverts));
            const advert = action.data;
            const index = adverts.findIndex(i => i.id === advert.id);
            if(index !== -1)
                adverts[index]= advert;
            else
                adverts.push(advert)

            return {
                ...state,
                adverts,
                isFetching: false
            }
        }
        case ACTION.ADVERTS_ADD_RESPONSE: {
            const adverts = JSON.parse(JSON.stringify(state.adverts));
            const advert = action.data;
            adverts.push(advert);

            return {
                ...state,
                adverts,
                isFetching: false
            }
        }
        case ACTION.ADVERT_UPDATE_RESPONSE: {
            Toaster.showSuccess('Advert was updated successfully');

            const adverts = JSON.parse(JSON.stringify(state.adverts));
            const advert = action.data;
            const index = adverts.findIndex(i => i.id === advert.id);
            if(index !== -1)
                adverts[index]= advert;

            return {
                ...state,
                adverts,
                isFetching: false
            }
        }
        case ACTION.ADVERT_DELETE_RESPONSE: {
            Toaster.showSuccess('Advert was deleted successfully');

            const adverts = JSON.parse(JSON.stringify(state.adverts));
            const deletedAdvertId = action.advertId;
            const index = adverts.findIndex(i => i.id === deletedAdvertId);
            if(index !== -1)
                adverts.splice(index, 1)

            return {
                ...state,
                adverts,
                isFetching: false
            }
        }
        default: {
            return state;
        }
    }
}
