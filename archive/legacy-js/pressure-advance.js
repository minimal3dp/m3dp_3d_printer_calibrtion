var start = document.getElementById('start');
var ddf = document.getElementById('ddf');
var bf = document.getElementById('bf');
var measured_height = document.getElementById('measured_height');
var dd_pa = document.getElementById('dd_pa');
var b_pa = document.getElementById('b_pa');

function paRunner() {
    pressureAdvance();
}

function pressureAdvance() {

    let ddf_val = parseFloat(ddf.value);
    let bf_val = parseFloat(bf.value);
    let start_val = parseFloat(start.value);
    let measured_height_val = parseFloat(measured_height.value);

    let dd_pa_val = start_val + measured_height_val * ddf_val;
    let b_pa_val = start_val + measured_height_val * bf_val;

    dd_pa.value = dd_pa_val.toString();
    b_pa.value = b_pa_val.toString();

    console.log('DD_PA: ', dd_pa_val);
    console.log('B_PA: ', b_pa_val);

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