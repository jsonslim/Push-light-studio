# MIDI Export Feature

## Overview

The MIDI export feature generates a standard MIDI file from your Push pad animation frames. Each frame is exported as a 4-bar sequence where the pad colors (velocities) are sent to the corresponding MIDI notes.

## How It Works

### Frame Duration

- **Each frame = 4 bars**
- **Tempo: 120 BPM**
- **Time signature: 4/4**
- **Ticks per quarter note: 96**
- **Total ticks per frame: 1536** (96 × 4 beats × 4 bars)

### MIDI Mapping

Each pad on the Push grid corresponds to a specific MIDI note:

- **MIDI Note Range**: 36-99 (64 pads total)
- **Velocity Range**: 0-127 (determines LED color)

### Color to Velocity

The velocity value in the MIDI file directly corresponds to the color selected in the palette:

- Each color in the 128-color palette has a specific velocity value
- Velocity 0 and 116 are treated as "off" and not exported
- The Push hardware interprets these velocities as specific LED colors

### Export Process

1. Click the **"Export MIDI"** button in the control panel
2. The app generates a MIDI file containing:
   - Tempo setting (120 BPM)
   - Note On events at the start of each frame for all active pads
   - Note Off events at the end of each frame (after 4 bars)
3. All events are sorted by time and saved as a `.mid` file
4. The file downloads automatically as `push-animation.mid`

### MIDI File Structure

```
Header:
- Format 0 (single track)
- 1 track
- 96 ticks per quarter note

Track:
- Tempo meta event (120 BPM)
- For each frame:
  - Note On events (at frame start) for each active pad
  - Note Off events (at frame end) for each active pad
- End of track marker
```

## Usage with Ableton Push

1. Export your animation as a MIDI file
2. Import the MIDI file into Ableton Live
3. Route the track to your Push device
4. Play the track to see your animation on the Push pads
5. Each 4-bar section represents one frame of your animation

## Technical Details

### Velocity Values

- **0**: Off/Black (not exported)
- **1-127**: Various colors as defined in the color palette
- **116**: Black/Off (not exported)

### MIDI Notes

The pads are mapped in the standard Push layout:

```
Row 8: Notes 92-99 (top row)
Row 7: Notes 84-91
Row 6: Notes 76-83
Row 5: Notes 68-75
Row 4: Notes 60-67
Row 3: Notes 52-59
Row 2: Notes 44-51
Row 1: Notes 36-43 (bottom row)
```

## Example

If you create an animation with 3 frames:

- Frame 1: Red color on pad 36
- Frame 2: Green color on pad 37
- Frame 3: Blue color on pad 38

The MIDI file will contain:

- Bars 1-4: Note 36 plays with the red velocity
- Bars 5-8: Note 37 plays with the green velocity
- Bars 9-12: Note 38 plays with the blue velocity

Total duration: 12 bars at 120 BPM = 24 seconds
