var peak_current = document.getElementById('peak_current');
var rms_factor = document.getElementById('rms_factor');
var run_current = document.getElementById('run_current');

function rcRunner() {
    runCurrent();
}

function runCurrent() {

    var rcValue = Math.floor(parseFloat(peak_current.value) * parseFloat(rms_factor.value));
    run_current.value = rcValue.toString();

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