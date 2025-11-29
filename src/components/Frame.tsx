const Frame = ({ color = 'black' }) => {

  // const [id, setId] = useState(0);

  const handleClick = () => {
    console.log('click');

  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: '100%',
        aspectRatio: '1.1 / 1',
        maxWidth: '150px',
        maxHeight: '100px',
        backgroundColor: color,
        cursor: 'pointer',
        transition: 'background-color 0.1s ease',
        borderRadius: '6px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
        // border: '1px solid grey'
      }}
    />
  );
};

export default Frame;