import React, { useState } from 'react';
import Frame from './Frame';


export const FrameLine = () => {

    // const [frames, setFrames] = useState([{ id: 1, color: 'blue' }, { id: 2, color: 'red' }, { id: 3, color: 'green' }]);
    const lineItems = Array.from({ length: 5 });

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '12px',
                padding: '10px',
                paddingLeft: '24px',
                alignItems: 'stretch',
                // maxWidth: '820px',
                // margin: '8px',
                // border: '1px solid grey',
                borderRadius: '8px'
            }}
        >
            {
                lineItems.map(() => {
                    return (<Frame></Frame>);
                })
            }
            <button>ADD FRAME</button>
        </div >
    );
};

export default FrameLine;
