import { useState } from 'react';

import PadGrid from './components/PadGrid'
import ControlPanel from './components/ControlPanel'
import ColorPalette from './components/ColorPalette'
import FrameLine from './components/FrameLine'
import { pads } from './components/globals'

import './App.css'

// Frame interface: each frame contains its own padColors array
interface Frame {
  id: number;
  padColors: number[]; // Array of 64 colorIDs, one for each pad
}

function App() {
  // State for selected pad (grid index 0-63)
  const [selectedPad, setSelectedPad] = useState<number | null>(null);

  // Frames state: array of frames, each containing its own padColors
  // colorID 116 = velocity 116 = black/off (#000000)
  const [frames, setFrames] = useState<Frame[]>([
    { id: 1, padColors: Array(64).fill(116) } // Start with one frame, all pads off
  ]);
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);

  // Get current frame's padColors
  const currentPadColors = frames[currentFrameIndex]?.padColors || Array(64).fill(116);

  const handlePadClick = (padId: number) => {
    // Find the grid index for this pad id
    const gridIndex = pads.findIndex(p => p.id === padId);
    if (gridIndex !== -1) {
      setSelectedPad(gridIndex);
    }
  };

  const handleColorSelect = (colorID: number) => {
    if (selectedPad !== null) {
      // Update the color for the selected pad in the current frame
      setFrames(prev => {
        const newFrames = [...prev];
        const newPadColors = [...newFrames[currentFrameIndex].padColors];
        newPadColors[selectedPad] = colorID;
        newFrames[currentFrameIndex] = {
          ...newFrames[currentFrameIndex],
          padColors: newPadColors
        };
        return newFrames;
      });
    }
  };

  const handleFrameSelect = (frameIndex: number) => {
    setCurrentFrameIndex(frameIndex);
    setSelectedPad(null); // Clear pad selection when switching frames
  };

  const handleAddFrame = () => {
    const newFrameId = Math.max(...frames.map(f => f.id), 0) + 1;
    setFrames(prev => [...prev, { id: newFrameId, padColors: Array(64).fill(116) }]);
    setCurrentFrameIndex(frames.length); // Select the newly added frame
  };

  const handleReset = () => {
    console.log('Reset Layout');
    if (currentFrameIndex !== null) {
      setFrames(prev => {
        const newFrames = [...prev];
        newFrames[currentFrameIndex] = {
          ...newFrames[currentFrameIndex],
          padColors: Array(64).fill(116)
        };
        return newFrames;
      });
    }
    setSelectedPad(null);
  };

  const handleExportMidi = () => {
    console.log('Export MIDI');
  };

  const handleNextFrame = () => {
    if (currentFrameIndex < frames.length - 1) {
      setCurrentFrameIndex(currentFrameIndex + 1);
      setSelectedPad(null);
    }
  };

  const handlePrevFrame = () => {
    if (currentFrameIndex > 0) {
      setCurrentFrameIndex(currentFrameIndex - 1);
      setSelectedPad(null);
    }
  };

  const handleCopyToNextFrame = () => {
    if (currentFrameIndex !== null) {
      const currentFrame = frames[currentFrameIndex];
      const nextFrameIndex = currentFrameIndex + 1;

      setFrames(prev => {
        const newFrames = [...prev];

        // If next frame exists, copy to it
        if (nextFrameIndex < newFrames.length) {
          newFrames[nextFrameIndex] = {
            ...newFrames[nextFrameIndex],
            padColors: [...currentFrame.padColors]
          };
        } else {
          // If next frame doesn't exist, create a new one
          const newFrameId = Math.max(...newFrames.map(f => f.id), 0) + 1;
          newFrames.push({
            id: newFrameId,
            padColors: [...currentFrame.padColors]
          });
        }

        return newFrames;
      });

      // Optionally switch to the next frame after copying
      if (nextFrameIndex < frames.length) {
        setCurrentFrameIndex(nextFrameIndex);
        setSelectedPad(null);
      } else {
        // If we created a new frame, switch to it
        setCurrentFrameIndex(nextFrameIndex);
        setSelectedPad(null);
      }
    }
  };

  const handleDeleteFrame = (frameIndex: number) => {
    // Don't allow deleting if it's the last frame
    if (frames.length <= 1) {
      alert('Cannot delete the last frame');
      return;
    }

    setFrames(prev => {
      const newFrames = prev.filter((_, index) => index !== frameIndex);
      return newFrames;
    });

    // Adjust current frame index if needed
    if (currentFrameIndex === frameIndex) {
      // If we deleted the current frame, switch to the previous one (or first if it was the first)
      const newIndex = frameIndex > 0 ? frameIndex - 1 : 0;
      setCurrentFrameIndex(newIndex);
    } else if (currentFrameIndex > frameIndex) {
      // If we deleted a frame before the current one, adjust the index
      setCurrentFrameIndex(currentFrameIndex - 1);
    }

    setSelectedPad(null);
  };

  // Get the colorID of the currently selected pad
  const selectedPadColorID = selectedPad !== null ? currentPadColors[selectedPad] : null;

  return (
    <>
      <h2>Push light studio</h2>
      <div className='components-container'>

        <ColorPalette
          selectedColorID={selectedPadColorID}
          onColorSelect={handleColorSelect}
        />

        <div className='pad-container'>
          <PadGrid
            selectedPad={selectedPad}
            padColors={currentPadColors}
            onPadClick={handlePadClick}
          />
        </div>

        <ControlPanel
          onReset={handleReset}
          onExportMidi={handleExportMidi}
          onNextFrame={handleNextFrame}
          onPrevFrame={handlePrevFrame}
          onCopyToNextFrame={handleCopyToNextFrame}
          currentFrameNumber={currentFrameIndex + 1}
        />

      </div>
      <FrameLine
        frames={frames}
        currentFrameIndex={currentFrameIndex}
        onFrameSelect={handleFrameSelect}
        onAddFrame={handleAddFrame}
        onDeleteFrame={handleDeleteFrame}
      />
    </>
  )
}

export default App
