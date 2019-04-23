import React, {Component} from 'react';
import './GalleryItem.sass';
import {getPictureUrl} from "../../../../utils/functions";

class GalleryItem extends Component {

    onItemDeleteClicked(e, id) {
        this.props.onItemDelete(id)
        e.stopPropagation();
    }

    render() {
        const { couldDelete, photo, onItemClicked } = this.props;
        return (
            <div className="GalleryItem"
                 onClick={() => onItemClicked(photo.id)}>
                <div className="image"
                     style={{backgroundImage: `url(${getPictureUrl(photo.photoName)})`}}/>
                {couldDelete && <div className="photo-delete"
                                     onClick={(e) => this.onItemDeleteClicked(e, photo.id)}/>
                }
            </div>
        )
    }

}

export default GalleryItem;
