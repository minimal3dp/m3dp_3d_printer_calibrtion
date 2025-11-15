var nozzle = document.getElementById('nozzle');
var m1 = document.getElementById('m1');
var m2 = document.getElementById('m2');
var m3 = document.getElementById('m3');
var m4 = document.getElementById('m4');
var average = document.getElementById('average');
var flow = document.getElementById('flow');

function fcRunner() {
    flowCalibration();
}

function flowCalibration() {
    var fcAverage = (parseFloat(m1.value) + parseFloat(m2.value) + parseFloat(m3.value) + parseFloat(m4.value)) / 4;
    var averageValue = fcAverage.toString();
    average.value = averageValue
    var flowValue = (1/fcAverage*100).toString();
    flow.value = flowValue;
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