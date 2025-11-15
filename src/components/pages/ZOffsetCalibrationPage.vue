<template>
  <CalcLayout title="Z-Offset Calibration Wizard">
    <template #description>
      <p>
        This wizard helps you fine-tune your Z-offset, which is crucial for a perfect first layer. A good first layer is essential for print adhesion and overall print quality.
      </p>
    </template>

    <template #content>
      <div class="grid grid-cols-1 gap-8">
        <CommandBlock
          title="1. Home Your Printer"
          description="Start by homing all axes of your printer with the following command:"
          command="G28"
        />

        <CommandBlock
          title="2. Start the Z-Offset Calibration"
          description="Klipper has a built-in tool for Z-offset calibration. Start it with this command:"
          command="Z_OFFSET_APPLY_PROBE"
        />

        <CommandBlock
          title="3. Perform the Paper Test"
          description="Place a piece of standard office paper under the nozzle. Use the following commands to slowly lower the nozzle until you feel a slight drag on the paper. Use small increments for fine-tuning."
          :command="`TESTZ Z=-1\nTESTZ Z=-0.1\nTESTZ Z=-0.025`"
        />

        <AlertBox
          title="Tip: Finding the Right Feel"
          type="info"
        >
          <p>
            You are looking for a slight scratching or dragging feeling as you move the paper back and forth. It should not be so tight that the paper tears or is difficult to move.
          </p>
        </AlertBox>

        <CommandBlock
          title="4. Accept the Offset"
          description="Once you are satisfied with the new Z-offset, accept it with this command:"
          command="ACCEPT"
        />

        <CommandBlock
          title="5. Save the Configuration"
          description="Finally, save the new Z-offset to your `printer.cfg` file so it persists after a restart:"
          command="SAVE_CONFIG"
        />
      </div>
    </template>
  </CalcLayout>
</template>

<script setup>
import CalcLayout from '@/components/CalcLayout.vue';
import CommandBlock from '@/components/CommandBlock.vue';
import AlertBox from '@/components/AlertBox.vue';
</script>
