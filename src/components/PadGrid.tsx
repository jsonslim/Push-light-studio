import Pad from './Pad';
import { pads } from './globals';

interface PadGridProps {
  padColors: number[];
  onPadClick: (padId: number, event?: React.MouseEvent) => void;
  onPadMouseDown?: (padId: number, event?: React.MouseEvent) => void;
  onPadMouseEnter?: (padId: number, event?: React.MouseEvent) => void;
  onPadMouseUp?: () => void;
}

const PadGrid = ({ padColors, onPadClick, onPadMouseDown, onPadMouseEnter, onPadMouseUp }: PadGridProps) => {
  const grid = Array.from({ length: 64 });

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 1fr)',  // FIXED 8 columns
        rowGap: '5px',      // vertical gap
        columnGap: '3px',    // horizontal gap
        padding: '8px',
        margin: '8px',
        justifyItems: 'center',
        width: '100%',       // container can shrink on small screens
        boxSizing: 'border-box',
        borderRadius: '8px'
      }}
      onMouseUp={onPadMouseUp}
      onMouseLeave={onPadMouseUp} // Also stop drawing when mouse leaves the grid
      onContextMenu={(e) => e.preventDefault()} // Prevent context menu on right-click
    >
      {grid.map((_, i) => (
        <Pad
          id={pads[i].id}
          key={pads[i].id}
          maxWidth={'80px'}
          aspectRatio={'1.3 / 1'}
          colorID={padColors[i]}
          isSelected={false}
          onClick={onPadClick}
          onMouseDown={onPadMouseDown}
          onMouseEnter={onPadMouseEnter}
        />
      ))}
    </div>
  );
};

export default PadGrid;