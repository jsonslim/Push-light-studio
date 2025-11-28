import Pad from './Pad';

const PadGrid = () => {
  const grid = Array.from({ length: 64 });

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 1fr)',  // FIXED 8 columns
        rowGap: '5px',      // vertical gap
        // columnGap: '8px',    // horizontal gap
        padding: '20px',
        // maxWidth: '720px',
        margin: '16px',
        justifyItems: 'center',
        width: '100%',       // container can shrink on small screens
        boxSizing: 'border-box',
        border: '1px solid grey',
        borderRadius: '16px'
      }}
    >
      {grid.map((_, i) => (
        <Pad maxWidth={'80px'} aspectRatio={'1.3 / 1'} key={i} />
      ))}
    </div>
  );
};

export default PadGrid;