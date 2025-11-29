import { useState } from 'react';
import colors from './globals.ts';

const Pad = ({ maxWidth = '80px', maxHeight = '80px', aspectRatio = '1.3 / 1', colorID=0 }) => {

  const [index, setIndex] = useState(colorID % colors.length);

  const handleClick = () => {
    setIndex((prevIndex: number) => (prevIndex + 1) % colors.length);
    console.log(index);

  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: maxWidth,//'100%',
        aspectRatio,
        maxWidth,
        maxHeight,
        backgroundColor: colors[index].color,
        cursor: 'pointer',
        transition: 'background-color 0.1s ease',
        borderRadius: '6px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
        // border: '1px solid grey'
      }}
    />
  );
};

export default Pad;