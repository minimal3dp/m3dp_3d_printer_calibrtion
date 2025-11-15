var print_speed = document.getElementById('print_speed');
var x_rings = document.getElementById('x_rings');
var x_measure = document.getElementById('x_measure');
var y_rings = document.getElementById('y_rings');
var y_measure = document.getElementById('y_measure');
var x_freq = document.getElementById('x_freq');
var y_freq = document.getElementById('y_freq');

function isRunner() {
    inputShaper();
}

function inputShaper() {

    x_freq_val = parseFloat(print_speed.value) * parseFloat(x_rings.value) / parseFloat(x_measure.value);
    
    y_freq_val = parseFloat(print_speed.value) * parseFloat(y_rings.value) / parseFloat(y_measure.value);

    x_freq.value = x_freq_val;
    y_freq.value = y_freq_val;
}

function copyRd() {
    console.log('Copy');
    let text = rotational_distance;
    const copyContent = async () => {
        try {
            await navigator.clipboard.writeText(text);
            console.log('Content copied to clipboard');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }
}