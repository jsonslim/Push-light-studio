import React from 'react';

interface UIControlsProps {
    onReset: () => void;
    onExportMidi: () => void;
    onNextFrame: () => void;
    onPrevFrame: () => void;
}

const ControlPanel: React.FC<UIControlsProps> = ({
    onReset,
    onExportMidi,
    onNextFrame,
    onPrevFrame,
}) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                padding: '20px',
                alignItems: 'stretch',
                maxWidth: '200px',
                margin: '16px',
            }}
        >
            <div>Frame: 1</div>
            <div style={{ display: "flex", flexDirection: 'row' }}>
                <button onClick={onPrevFrame}>Prev Frame</button>
                <button onClick={onNextFrame}>Next Frame</button>
            </div>

            <button onClick={onPrevFrame}>Copy to next Frame</button>
            <button onClick={onReset}>Reset Layout</button>
            <button onClick={onExportMidi}>Export MIDI</button>
        </div >
    );
};

export default ControlPanel;
