import React from 'react';

interface UIControlsProps {
    onReset: () => void;
    onExportMidi: () => void;
    onNextFrame: () => void;
    onPrevFrame: () => void;
    onCopyToNextFrame: () => void;
    currentFrameNumber: number;
}

const ControlPanel: React.FC<UIControlsProps> = ({
    onReset,
    onExportMidi,
    onNextFrame,
    onPrevFrame,
    onCopyToNextFrame,
    currentFrameNumber,
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
            <div>Frame: {currentFrameNumber}</div>
            <div style={{ display: "flex", flexDirection: 'row' }}>
                <button onClick={onPrevFrame}>Prev Frame</button>
                <button onClick={onNextFrame}>Next Frame</button>
            </div>

            <button onClick={onCopyToNextFrame}>Copy to next Frame</button>
            <button onClick={onReset}>Reset Layout</button>
            <button onClick={onExportMidi}>Export MIDI</button>
        </div >
    );
};

export default ControlPanel;
