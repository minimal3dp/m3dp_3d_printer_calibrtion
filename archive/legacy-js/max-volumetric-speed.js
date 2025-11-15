var start = document.getElementById('start');
var height_measure = document.getElementById('height_measure');
var step = document.getElementById('step');
var max_flow = document.getElementById('max_flow');
var percent5 = document.getElementById('percent5');
var percent10 = document.getElementById('percent10');

function mfRunner() {
    maxFlow();
}

function maxFlow() {
    if (start.value == '' || height_measure.value == '' || step.value == '') {
        max_flow.value = '';
    } else {
        let max_flow_value = parseFloat(start.value) + parseFloat(height_measure.value) * parseFloat(step.value);
        max_flow.value = max_flow_value.toFixed(3);
        let percent5_value = parseFloat(max_flow_value) * .95;
        let percent10_value = parseFloat(max_flow_value) * .90;
        percent5.value = percent5_value.toFixed(3);
        percent10.value = percent10_value.toFixed(3);

    }

}
