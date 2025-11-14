var x_probe = document.getElementById('x_probe');
var y_probe = document.getElementById('y_probe');
var x_nozzle = document.getElementById('x_nozzle');
var y_nozzle = document.getElementById('y_nozzle');
var x_offset = document.getElementById('x_offset');
var y_offset = document.getElementById('y_offset');

function xyRunner() {
    xyOffsets();
}

function xyOffsets() {

    if (x_probe.value == '' || y_probe.value == '' || x_nozzle.value == '' || y_nozzle.value == '') {
        x_offset.value = '';
        y_offset.value = '';
    } else {
        let x_offset_value = parseFloat(x_probe.value) - parseFloat(x_nozzle.value);
        let y_offset_value = parseFloat(y_probe.value) - parseFloat(y_nozzle.value);
        x_offset.value = x_offset_value.toFixed(3);
        y_offset.value = y_offset_value.toFixed(3);
    }

}
