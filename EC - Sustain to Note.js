//------------------------------------------------------------------------------
// Auth: Eric Cardenas
// dCre: 2016-10-13 11:38
// dMod: 2016-10-13 11:58
// Appl: Logic Pro X
// Task: Converts Sustain Pedal to Note.
// Tags: JavaScript, Logic
//------------------------------------------------------------------------------
const NOTES = MIDI._noteNames;
const TITLE = "EC - Sustain to Note v 1.0";
const AUTHOR = "Script by Eric Cardenas";
//------------------------------------------------------------------------------

function HandleMIDI(e) {
	if (e instanceof ControlChange && e.number == 64 && e.value > 63) {
		var bordune = new NoteOn;
		bordune.pitch = GetParameter("Note");
		bordune.value = GetParameter("Velocity");
		bordune.send();

	} else if (e instanceof ControlChange && e.number == 64 && e.value < 64) {
		var bOff = new NoteOff;
		bOff.pitch = GetParameter("Note");
		bOff.send();
	} else {
		e.send();
	}
}

function ParameterChanged(p, v) {
	if (p == 1 ) {
		MIDI.allNotesOff();
    }
}

var PluginParameters = [{
    name: TITLE,
    type: "text"
}, {
    name: "Note",
    type: "menu",
    valueStrings: NOTES,
    defaultValue: 36
}, {
    name: "Velocity",
    type: "lin",
    numberOfSteps: 127,
    minValue: 0,
    maxValue: 127,
    defaultValue: 90
}, {
    name: AUTHOR,
    type: "text"
}];
