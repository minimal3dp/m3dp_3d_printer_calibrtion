<template>
  <CalcLayout title="Stepper Motor Direction">
    <template #description>
      <p>
        This guide helps you verify that your stepper motors are moving in the correct direction. Incorrect motor direction can cause failed prints and unexpected behavior.
      </p>
    </template>

    <template #content>
      <div class="grid grid-cols-1 gap-8">
        <CommandBlock
          title="1. Home Your Printer"
          description="First, make sure your printer is homed. Send the following command in your printer's console:"
          command="G28"
        />

        <CommandBlock
          title="2. Test X-Axis Movement"
          description="Send the following command to move the X-axis 10mm in the positive direction. The print head should move to the right."
          command="G91
G1 X10 F3000"
        />

        <CommandBlock
          title="3. Test Y-Axis Movement"
          description="Send the following command to move the Y-axis 10mm in the positive direction. The print bed should move towards you (or the print head should move away from you)."
          command="G91
G1 Y10 F3000"
        />

        <CommandBlock
          title="4. Test Z-Axis Movement"
          description="Send the following command to move the Z-axis 10mm in the positive direction. The print head should move up, away from the bed."
          command="G91
G1 Z10 F3000"
        />

        <AlertBox
          title="What if a motor moves in the wrong direction?"
          type="warning"
        >
          <p>
            If any motor moves in the opposite direction, you need to invert its direction in your `printer.cfg` file.
          </p>
          <p class="mt-2">
            For the corresponding `[stepper_...]` section, add or remove an exclamation mark (`!`) before the `dir_pin`. For example:
          </p>
          <p class="mt-2 font-mono">
            `dir_pin: !PA14` (inverts the direction)
          </p>
          <p class="mt-2 font-mono">
            `dir_pin: PA14` (normal direction)
          </p>
          <p class="mt-4">
            After changing your `printer.cfg`, save the file and restart Klipper.
          </p>
        </AlertBox>
      </div>
    </template>
  </CalcLayout>
</template>

<script setup>
import CalcLayout from '@/components/CalcLayout.vue';
import CommandBlock from '@/components/CommandBlock.vue';
import AlertBox from '@/components/AlertBox.vue';
</script>
