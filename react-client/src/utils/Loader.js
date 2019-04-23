import React from "react";
import { ClipLoader } from "react-spinners";

export default () => {
    return (
        <ClipLoader
            sizeUnit={"px"}
            size={36}
            color={'#123abc'}
            loading={true}
        />
    )
}