import { useState } from 'react';

const Pad = ({ maxWidth = '80px', maxHeight = '80px', aspectRatio = '1.3 / 1' }) => {
  const colors = ['gray', 'white', 'red', 'green', 'blue', 'orange', 'purple', 'teal'];
  const [index, setIndex] = useState(0);

  const handleClick = () => {
    setIndex((prevIndex) => (prevIndex + 1) % colors.length);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: maxWidth,//'100%',
        aspectRatio,
        maxWidth,
        maxHeight,
        backgroundColor: colors[index],
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