import { useState } from 'react'
import './App.css'

import PadGrid from './components/PadGrid'
import ControlPanel from './components/ControlPanel'

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
      <h1>Push light studio</h1>
      <div className='components-container'>

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
    </>
  )
}

export default App
