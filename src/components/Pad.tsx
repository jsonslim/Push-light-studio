import { useState } from 'react';

const Pad = () => {
  const colors = ['gray', 'red', 'green', 'blue', 'orange', 'purple', 'teal'];
  const [index, setIndex] = useState(0);

  const handleClick = () => {
    setIndex((prevIndex) => (prevIndex + 1) % colors.length);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: '100%',
        aspectRatio: '1.3 / 1', // Keeps it square
        maxWidth: '80px',
        backgroundColor: colors[index],
        cursor: 'pointer',
        transition: 'background-color 0.1s ease',
        borderRadius: '6px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
      }}
    />
  );
};

export default Pad;