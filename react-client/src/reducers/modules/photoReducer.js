import ACTION from '../../actions/actionTypes'
import * as Toaster from "../../utils/Toaster";

const initialState = {
    photos: [],
    isFetching: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.PHOTO_REQUEST: {

            return {
                ...state,
                isFetching: true
            }
        }
        case ACTION.PHOTO_ERROR: {
            Toaster.showError(action.error);

            return {
                ...state,
                isFetching: false
            }
        }
        case ACTION.PHOTOS_RESPONSE: {

            return {
                ...state,
                photos: action.data,
                isFetching: false
            }
        }
        case ACTION.PHOTO_BY_ID_RESPONSE: {

            const photos = [...state.photos];
            const photo = action.data;
            const index = photos.findIndex(p => p.id === photo.id);

            if (index !== -1) {
                photos[index] = photo
            } else {
                photos.push(photo)
            }

            return {
                ...state,
                photos,
                isFetching: false
            }
        }
        case ACTION.PHOTO_UPLOAD_RESPONSE: {

            const photos = [...state.photos];
            const photo = action.data;
            photos.push(photo);

            return {
                ...state,
                photos,
                isFetching: false
            }
        }
        case ACTION.PHOTO_DELETE_RESPONSE: {
            Toaster.showSuccess('Photo was deleted successfully');

            const photos = [...state.photos];
            const { deletedPhotoId } = action.data;

            const index = photos.findIndex(i => i.id === Number(deletedPhotoId));
            photos.splice(index, 1);

            return {
                ...state,
                photos,
                isFetching: false
            }
        }
        default: {
            return state;
        }
    }
}
