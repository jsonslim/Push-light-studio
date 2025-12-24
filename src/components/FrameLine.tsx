import Frame from './Frame';

interface FrameLineProps {
    frames: Array<{ id: number; padColors: number[] }>;
    currentFrameIndex: number;
    onFrameSelect: (frameIndex: number) => void;
    onAddFrame: () => void;
    onDeleteFrame: (frameIndex: number) => void;
}

export const FrameLine = ({ frames, currentFrameIndex, onFrameSelect, onAddFrame, onDeleteFrame }: FrameLineProps) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '12px',
                padding: '10px',
                paddingLeft: '10px',
                alignItems: 'stretch',
                borderRadius: '8px',
                background: 'rgba(20,20,20,255)',
                marginTop: '24px',
                marginBottom: '16px',
                marginLeft: '16px',
                marginRight: '16px',
            }}
        >
            {frames.map((frame, index) => (
                <Frame
                    key={frame.id}
                    id={frame.id}
                    padColors={frame.padColors}
                    isSelected={currentFrameIndex === index}
                    canDelete={frames.length > 1}
                    onClick={() => onFrameSelect(index)}
                    onDelete={() => onDeleteFrame(index)}
                />
            ))}
            <button onClick={onAddFrame}>ADD FRAME</button>
        </div>
    );
};

export default FrameLine;
