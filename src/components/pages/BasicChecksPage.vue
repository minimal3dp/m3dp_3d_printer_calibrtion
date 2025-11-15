<template>
  <CalcLayout title="Basic Configuration Checks">
    <template #info>
      <AlertBox type="info">
        <p class="font-semibold mb-2">First Boot Verification</p>
        <p>
          A selection of recommended configuration checks to do on the first boot of Klipper.
        </p>
      </AlertBox>
    </template>

    <CalcCard>
      <div class="overflow-x-auto">
        <table class="min-w-full border border-gray-700">
          <thead class="bg-gray-900">
            <tr>
              <th class="px-4 py-2 text-left text-sm font-semibold text-white">Process</th>
              <th class="px-4 py-2 text-left text-sm font-semibold text-white">Commands (Use in Console)</th>
              <th class="px-4 py-2 text-left text-sm font-semibold text-white">Notes</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700">
            <tr>
              <td class="px-4 py-2 align-top text-white">Verify temperature</td>
              <td class="px-4 py-2 align-top"></td>
              <td class="px-4 py-2 align-top text-gray-300">
                Look at the interface. The displayed temperatures for the nozzle and bed should be around ambient room temperature.
              </td>
            </tr>
            <tr>
              <td class="px-4 py-2 align-top text-white">Verify M112</td>
              <td class="px-4 py-2 align-top">
                <code class="text-fuchsia-300 bg-gray-900 px-2 py-1 rounded">M112</code>
              </td>
              <td class="px-4 py-2 align-top text-gray-300">
                This will put the printer into a shutdown state.
              </td>
            </tr>
            <tr>
              <td class="px-4 py-2 align-top text-white">Restart Firmware</td>
              <td class="px-4 py-2 align-top">
                <code class="text-fuchsia-300 bg-gray-900 px-2 py-1 rounded">FIRMWARE_RESTART</code>
              </td>
              <td class="px-4 py-2 align-top text-gray-300">
                Reboot the printer. Verify temps are staying at ambient and not rising. If they are rising, 
                <strong class="text-red-400">Power Off!</strong> Check wiring and <code>printer.cfg</code>.
              </td>
            </tr>
            <tr>
              <td class="px-4 py-2 align-top text-white">Verify heaters</td>
              <td class="px-4 py-2 align-top"></td>
              <td class="px-4 py-2 align-top text-gray-300">
                Set extruder temperature to 50°C. Watch the graph; it should start to rise within 30 seconds. 
                If not, verify <code>heater_pin</code>. Turn off the heater and repeat for the heated bed (e.g., to 60°C).
              </td>
            </tr>
            <tr>
              <td class="px-4 py-2 align-top text-white">Verify fans</td>
              <td class="px-4 py-2 align-top">
                <code class="text-fuchsia-300 bg-gray-900 px-2 py-1 rounded">M106 S255</code> (Part Fan)
              </td>
              <td class="px-4 py-2 align-top text-gray-300">
                Turns on the print cooling fan to 100%. Verify it turns on.
              </td>
            </tr>
            <tr>
              <td class="px-4 py-2 align-top"></td>
              <td class="px-4 py-2 align-top">
                <code class="text-fuchsia-300 bg-gray-900 px-2 py-1 rounded">M106 S0</code>
              </td>
              <td class="px-4 py-2 align-top text-gray-300">Turns off the print cooling fan.</td>
            </tr>
            <tr>
              <td class="px-4 py-2 align-top text-white">Verify stepper motors</td>
              <td class="px-4 py-2 align-top">
                <code class="text-fuchsia-300 bg-gray-900 px-2 py-1 rounded">G28</code> (Home All)
              </td>
              <td class="px-4 py-2 align-top text-gray-300">
                <strong class="text-red-400">Keep a hand on the power switch!</strong> Verify all axes move in the correct 
                direction towards their endstops. If an axis moves the wrong way, <strong>E-Stop or power off!</strong> 
                You will need to invert the <code>dir_pin</code> for that axis (add or remove a <code>!</code>).
              </td>
            </tr>
            <tr>
              <td class="px-4 py-2 align-top text-white">Verify extruder motor</td>
              <td class="px-4 py-2 align-top"></td>
              <td class="px-4 py-2 align-top text-gray-300">
                Heat the hotend to printing temp (e.g., 200°C). Once at temp, go to the console and click "Extrude". 
                Verify the extruder motor turns in the correct direction (pushing filament towards the nozzle).
              </td>
            </tr>
            <tr>
              <td class="px-4 py-2 align-top text-white">Calibrate PID settings</td>
              <td class="px-4 py-2 align-top">
                <code class="text-fuchsia-300 bg-gray-900 px-2 py-1 rounded">PID_CALIBRATE HEATER=extruder TARGET=220</code>
              </td>
              <td class="px-4 py-2 align-top text-gray-300">
                Calibrate the extruder PID. Use your typical printing temperature.
              </td>
            </tr>
            <tr>
              <td class="px-4 py-2 align-top"></td>
              <td class="px-4 py-2 align-top">
                <code class="text-fuchsia-300 bg-gray-900 px-2 py-1 rounded">PID_CALIBRATE HEATER=heater_bed TARGET=60</code>
              </td>
              <td class="px-4 py-2 align-top text-gray-300">
                Calibrate the bed PID. Use your typical bed temperature.
              </td>
            </tr>
            <tr>
              <td class="px-4 py-2 align-top text-white">Save Configuration</td>
              <td class="px-4 py-2 align-top">
                <code class="text-fuchsia-300 bg-gray-900 px-2 py-1 rounded">SAVE_CONFIG</code>
              </td>
              <td class="px-4 py-2 align-top text-gray-300">
                After PID tuning is complete, run this to save the new values to your <code>printer.cfg</code>.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </CalcCard>
  </CalcLayout>
</template>

<script setup lang="ts">
import CalcLayout from '../CalcLayout.vue'
import CalcCard from '../CalcCard.vue'
import AlertBox from '../AlertBox.vue'
</script>
