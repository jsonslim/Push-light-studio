/**
 * MIDI Service for generating MIDI files for Ableton Push
 * 
 * Push pads respond to MIDI notes 36-99 (64 pads total)
 * The velocity of each note determines the LED color (0-127)
 * 
 * This is a native implementation without external dependencies
 */

interface Frame {
    id: number;
    padColors: number[]; // Array of 64 colorIDs
}

interface PadMapping {
    midiNote: number;
    id: number;
}

/**
 * Convert a number to variable-length quantity (VLQ) format used in MIDI
 */
function toVariableLength(value: number): number[] {
    const bytes: number[] = [];
    bytes.unshift(value & 0x7F);
    value >>= 7;
    while (value > 0) {
        bytes.unshift((value & 0x7F) | 0x80);
        value >>= 7;
    }
    return bytes;
}

/**
 * Generate a simple hardcoded MIDI file for testing
 * This creates a basic MIDI sequence with a few notes
 */
export function generateHardcodedMidi(): Blob {
    console.log('Starting MIDI generation...');

    try {
        // MIDI file structure: Header + Track
        const header = new Uint8Array([
            // Header chunk
            0x4D, 0x54, 0x68, 0x64,  // "MThd"
            0x00, 0x00, 0x00, 0x06,  // Header length (6 bytes)
            0x00, 0x00,              // Format type 0 (single track)
            0x00, 0x01,              // Number of tracks (1)
            0x00, 0x60               // Ticks per quarter note (96)
        ]);

        // Build track events
        const trackEvents: number[] = [];

        // Event helper function
        const addEvent = (deltaTime: number, event: number[]) => {
            trackEvents.push(...toVariableLength(deltaTime), ...event);
        };

        // Set tempo: 500000 microseconds per quarter note (120 BPM)
        addEvent(0, [0xFF, 0x51, 0x03, 0x07, 0xA1, 0x20]);

        // Note 36, velocity 5 (red color)
        addEvent(0, [0x90, 36, 5]);      // Note On, channel 0, note 36, velocity 5
        addEvent(96, [0x80, 36, 0]);     // Note Off after 96 ticks

        // Note 37, velocity 21 (green color)
        addEvent(0, [0x90, 37, 21]);     // Note On
        addEvent(96, [0x80, 37, 0]);     // Note Off

        // Note 38, velocity 45 (blue color)
        addEvent(0, [0x90, 38, 45]);     // Note On
        addEvent(96, [0x80, 38, 0]);     // Note Off

        // Note 39, velocity 57 (magenta color)
        addEvent(0, [0x90, 39, 57]);     // Note On
        addEvent(96, [0x80, 39, 0]);     // Note Off

        // End of track
        addEvent(0, [0xFF, 0x2F, 0x00]);

        // Create track chunk
        const trackLength = trackEvents.length;
        const track = new Uint8Array([
            // Track chunk header
            0x4D, 0x54, 0x72, 0x6B,  // "MTrk"
            (trackLength >> 24) & 0xFF,
            (trackLength >> 16) & 0xFF,
            (trackLength >> 8) & 0xFF,
            trackLength & 0xFF,
            ...trackEvents
        ]);

        // Combine header and track
        const midiData = new Uint8Array(header.length + track.length);
        midiData.set(header, 0);
        midiData.set(track, header.length);

        console.log('MIDI file created, size:', midiData.length, 'bytes');

        const blob = new Blob([midiData], { type: 'audio/midi' });
        console.log('MIDI Blob created successfully');

        return blob;
    } catch (error) {
        console.error('Error generating MIDI:', error);
        throw error;
    }
}

/**
 * Generate MIDI file from frame data
 * Each frame is 4 bars long (at 120 BPM with 96 ticks per quarter note = 1536 ticks per frame)
 * @param frames Array of frames containing pad colors (velocities)
 * @param pads Mapping of pad IDs to MIDI notes
 */
export function generateMidiFromFrames(
    frames: Frame[],
    pads: PadMapping[]
): Blob {
    console.log('Generating MIDI from frames:', frames.length, 'frames');
    console.log('Pad mappings:', pads.length, 'pads');

    try {
        // MIDI constants
        const ticksPerQuarterNote = 96;
        const ticksPerBar = ticksPerQuarterNote * 4; // 4 beats per bar
        const ticksPerFrame = ticksPerBar * 4; // 4 bars per frame = 1536 ticks

        // MIDI file header
        const header = new Uint8Array([
            0x4D, 0x54, 0x68, 0x64,  // "MThd"
            0x00, 0x00, 0x00, 0x06,  // Header length (6 bytes)
            0x00, 0x00,              // Format type 0 (single track)
            0x00, 0x01,              // Number of tracks (1)
            0x00, 0x60               // Ticks per quarter note (96)
        ]);

        // Build track events with absolute timing, then convert to delta times
        interface MidiEvent {
            absoluteTime: number;
            event: number[];
        }

        const events: MidiEvent[] = [];

        // Set tempo: 500000 microseconds per quarter note (120 BPM)
        events.push({ absoluteTime: 0, event: [0xFF, 0x51, 0x03, 0x07, 0xA1, 0x20] });

        // Process each frame
        frames.forEach((frame, frameIndex) => {
            console.log(`Processing frame ${frameIndex + 1}/${frames.length}`);

            const frameStartTime = frameIndex * ticksPerFrame;
            const frameEndTime = frameStartTime + ticksPerFrame;

            // For each pad in the frame
            frame.padColors.forEach((velocity, padGridIndex) => {
                // Skip if velocity is 0 or 116 (off/black)
                if (velocity === 0 || velocity === 116) {
                    return;
                }

                // Flip the rows to match Push hardware layout
                // Grid is 8x8, we need to invert the row index
                const row = Math.floor(padGridIndex / 8);
                const col = padGridIndex % 8;
                const flippedRow = 7 - row;
                const flippedIndex = flippedRow * 8 + col;

                // Get the MIDI note for this flipped pad position
                const pad = pads[flippedIndex];
                if (!pad) {
                    console.warn(`No pad mapping for grid index ${padGridIndex} (flipped: ${flippedIndex})`);
                    return;
                }

                const midiNote = pad.midiNote;

                // Add Note On event at the start of the frame
                events.push({
                    absoluteTime: frameStartTime,
                    event: [0x90, midiNote, velocity]
                });

                // Add Note Off event at the end of the frame
                events.push({
                    absoluteTime: frameEndTime,
                    event: [0x80, midiNote, 0]
                });
            });
        });

        // Sort events by absolute time
        events.sort((a, b) => a.absoluteTime - b.absoluteTime);

        // Convert absolute times to delta times
        const trackEvents: number[] = [];
        let lastTime = 0;

        events.forEach(evt => {
            const deltaTime = evt.absoluteTime - lastTime;
            trackEvents.push(...toVariableLength(deltaTime), ...evt.event);
            lastTime = evt.absoluteTime;
        });

        // End of track
        trackEvents.push(...toVariableLength(0), 0xFF, 0x2F, 0x00);

        // Create track chunk
        const trackLength = trackEvents.length;
        const track = new Uint8Array([
            0x4D, 0x54, 0x72, 0x6B,  // "MTrk"
            (trackLength >> 24) & 0xFF,
            (trackLength >> 16) & 0xFF,
            (trackLength >> 8) & 0xFF,
            trackLength & 0xFF,
            ...trackEvents
        ]);

        // Combine header and track
        const midiData = new Uint8Array(header.length + track.length);
        midiData.set(header, 0);
        midiData.set(track, header.length);

        console.log('MIDI file created, size:', midiData.length, 'bytes');
        console.log(`Generated ${frames.length} frames with ${ticksPerFrame} ticks per frame`);

        return new Blob([midiData], { type: 'audio/midi' });
    } catch (error) {
        console.error('Error generating MIDI from frames:', error);
        throw error;
    }
}

/**
 * Download a MIDI Blob as a file
 * @param blob The MIDI data as a Blob
 * @param filename The desired filename
 */
export function downloadMidiFile(blob: Blob, filename: string = 'push-animation.mid'): void {
    console.log('Downloading MIDI file:', filename);

    try {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();

        // Clean up after a short delay
        setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            console.log('MIDI file download initiated');
        }, 100);
    } catch (error) {
        console.error('Error downloading MIDI file:', error);
        throw error;
    }
}
