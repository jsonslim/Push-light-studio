import { colors } from './globals.ts';

interface PadProps {
  id: number;
  maxWidth?: string;
  maxHeight?: string;
  aspectRatio?: string;
  colorID?: number;
  isSelected?: boolean;
  onClick?: (id: number) => void;
}

const Pad = ({
  id,
  maxWidth = '80px',
  maxHeight = '80px',
  aspectRatio = '1.3 / 1',
  colorID = 0,
  isSelected = false,
  onClick
}: PadProps) => {
  const handleClick = () => {
    onClick?.(id);
  };

  const borderStyle = isSelected
    ? { border: '2px solid green' }
    : { border: '2px solid transparent' };

  const colorIndex = colorID % colors.length;
  const backgroundColor = colors[colorIndex].color;

  return (
    <div
      onClick={handleClick}
      style={{
        ...borderStyle,
        width: maxWidth,
        aspectRatio,
        maxWidth,
        maxHeight,
        backgroundColor,
        cursor: 'pointer',
        transition: 'background-color 0.1s ease',
        borderRadius: '6px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
      }}
    />
  );
};

export default Pad;