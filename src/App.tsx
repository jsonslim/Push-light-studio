import './App.css'

import PadGrid from './components/PadGrid'
import ControlPanel from './components/ControlPanel'
import ColorPalette from './components/ColorPalette'
import FrameLine from './components/FrameLine'

function App() {

  const handleReset = () => {
    console.log('Reset Layout');
  };

  const handleExportMidi = () => {
    console.log('Export MIDI');
  };

  const handleNextFrame = () => {
    console.log('Next Frame');
  };

  const handlePrevFrame = () => {
    console.log('Previous Frame');
  };

  return (
    <>
      <h2>Push light studio</h2>
      <div className='components-container'>

        <ColorPalette></ColorPalette>
        <div className='pad-container'>

          <PadGrid></PadGrid>
        </div>
        <ControlPanel
          onReset={handleReset}
          onExportMidi={handleExportMidi}
          onNextFrame={handleNextFrame}
          onPrevFrame={handlePrevFrame}
        />
      </div>
        <FrameLine></FrameLine>
    </>
  )
}

export default App
