import Pad from './Pad';

const ColorPalette = () => {
    const size = '30px';
    const grid = Array.from({ length: 64 });

    return (
        <div
            style={{
                display: 'grid', //'flex',
                // flexWrap: 'wrap',
                gridTemplateColumns: 'repeat(4, 1fr)',  // FIXED 8 columns
                // rowGap: '2px',      // vertical gap
                columnGap: '3px',    // horizontal gap
                padding: '16px',
                // maxWidth: '720px',
                // width: '300px',
                margin: '16px',
                // justifyItems: 'center',
                // width: '100%',       // container can shrink on small screens
                boxSizing: 'border-box',
                border: '1px solid grey',
                borderRadius: '16px'
            }}
        >
            {grid.map((_, i) => (
                <Pad key={i}
                    maxWidth={size}
                    maxHeight={size}
                    aspectRatio={'1 / 1'} />
            ))}
        </div>
    );
};

export default ColorPalette;