import React from 'react';

const Lweet = ({ lweetObj, isOwner }) => {
    return(
        <div>
            <h4>{lweetObj.text}</h4>
            {isOwner && (
                <>
            <button>Delete Lweet </button>
            <button>Update Lweet </button>
            </>
            )}
        </div>
    );
};

export default Lweet;