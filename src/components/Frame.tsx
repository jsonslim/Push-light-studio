import FrameThumbnail from './FrameThumbnail';

interface FrameProps {
  id: number;
  padColors: number[];
  isSelected?: boolean;
  canDelete?: boolean;
  onClick?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const Frame = ({ id, padColors, isSelected = false, canDelete = true, onClick, onDelete }: FrameProps) => {

  const handleClick = (e: React.MouseEvent) => {
    // Don't trigger frame selection if clicking the delete button
    if ((e.target as HTMLElement).closest('.delete-button')) {
      return;
    }
    console.log('Frame data:', { id, padColors, isSelected });
    onClick?.(id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent frame selection when clicking delete
    onDelete?.(id);
  };

  const borderStyle = isSelected
    ? { border: '2px solid green' }
    : { border: '2px solid transparent' };

  return (
    <div
      onClick={handleClick}
      style={{
        ...borderStyle,
        width: '100%',
        aspectRatio: '1.3 / 1',
        maxWidth: '130px',
        maxHeight: '100px',
        backgroundColor: 'rgba(40, 40, 40, 1)',
        cursor: 'pointer',
        transition: 'background-color 0.1s ease, border-color 0.1s ease',
        borderRadius: '6px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <FrameThumbnail padColors={padColors} />
      {canDelete && (
        <button
          className="delete-button"
          onClick={handleDelete}
          style={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: 'rgba(200, 50, 50, 0.9)',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 'bold',
            padding: 0,
            lineHeight: '1',
            zIndex: 10,
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(220, 70, 70, 1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(200, 50, 50, 0.9)';
          }}
          title="Delete frame"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Frame;