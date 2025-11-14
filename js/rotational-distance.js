var rotational_distance = document.getElementById('rotational_distance');
var initial_mark_distance = document.getElementById('initial_mark_distance');
var requested_extrude_distance = document.getElementById('requested_extrude_distance');
var measured_extrude_distance = document.getElementById('measured_extrude_distance');
var previous_rotation_distance = document.getElementById('previous_rotation_distance');
var test = 0;
function rdRunner() {
    rotationalDistance();
}

function rotationalDistance() {
    var actual_extrude_distance = initial_mark_distance.value - measured_extrude_distance.value
    var rdValue = previous_rotation_distance.value * (actual_extrude_distance/requested_extrude_distance.value)
    var rotationalDistance = rdValue.toString();
    rotational_distance.value = rotationalDistance;
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