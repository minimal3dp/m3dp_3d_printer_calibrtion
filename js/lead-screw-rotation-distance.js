var pitch = document.getElementById('pitch');
var threads = document.getElementById('threads');
var lsdistance = document.getElementById('lsdistance');


function lsRunner() {
    leadScrew();
}

function leadScrew() {

    var pitchValue = parseFloat(pitch.value);
    var threadsValue = parseFloat(threads.value);

    var lsdistanceValue = pitchValue * threadsValue;

    lsdistance.value = lsdistanceValue;

}
