import { useState } from 'react'

function Grid({ isVisible, leagues }) {
    if(!isVisible){
        return isVisible;
    }
    return (
        <>
            { leagues }
        </>
    )
}

export default Grid