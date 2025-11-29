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
                rowGap: '3px',      // vertical gap
                columnGap: '3px',    // horizontal gap
                padding: '9px',
                // maxWidth: '720px',
                // width: '300px',
                height: '520px',
                margin: '8px',
                // justifyItems: 'center',
                // width: '100%',       // container can shrink on small screens
                boxSizing: 'border-box',
                // border: '1px solid grey',
                borderRadius: '8px'
            }}
        >
            {grid.map((_, i) => (
                <Pad key={i}
                    maxWidth={size}
                    maxHeight={size}
                    aspectRatio={'1 / 1'}
                    colorID={i}
                />
            ))}
        </div>
    );
};

export default ColorPalette;