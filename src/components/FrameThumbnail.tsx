import { colors } from './globals';

interface FrameThumbnailProps {
    padColors: number[];
}

const FrameThumbnail = ({ padColors }: FrameThumbnailProps) => {
    const grid = Array.from({ length: 64 });

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(8, 1fr)',
                gap: '1px',
                padding: '4px',
                width: '100%',
                height: '100%',
                boxSizing: 'border-box',
            }}
        >
            {grid.map((_, i) => {
                const colorIndex = padColors[i] % colors.length;
                const backgroundColor = colors[colorIndex].color;

                return (
                    <div
                        key={i}
                        style={{
                            width: '100%',
                            aspectRatio: '1.3 / 1',
                            backgroundColor,
                            borderRadius: '2px',
                        }}
                    />
                );
            })}
        </div>
    );
};

export default FrameThumbnail;


