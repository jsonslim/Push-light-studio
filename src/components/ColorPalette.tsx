import Pad from './Pad';

interface ColorPaletteProps {
    selectedColorID: number | null;
    onColorSelect: (colorID: number) => void;
}

const ColorPalette = ({ selectedColorID, onColorSelect }: ColorPaletteProps) => {
    const size = '30px';
    const grid = Array.from({ length: 128 });

    const handleColorClick = (colorID: number) => {
        onColorSelect(colorID);
    };

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(8, 1fr)',
                rowGap: '3px',
                columnGap: '3px',
                padding: '9px',
                height: '520px',
                margin: '8px',
                boxSizing: 'border-box',
                borderRadius: '8px'
            }}
        >
            {grid.map((_, i) => (
                <Pad
                    key={i}
                    id={i}
                    maxWidth={size}
                    maxHeight={size}
                    aspectRatio={'1 / 1'}
                    colorID={i}
                    isSelected={selectedColorID === i}
                    onClick={handleColorClick}
                />
            ))}
        </div>
    );
};

export default ColorPalette;