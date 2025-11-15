<template>
  <CalcLayout title="Endstop Testing Guide">
    <template #description>
      <p>
        This guide helps you verify that your endstops are wired correctly and triggering properly. This is a critical check before attempting to home your printer for the first time.
      </p>
    </template>

    <template #content>
      <div class="grid grid-cols-1 gap-8">
        <AlertBox
          title="Important: Be Ready to Stop Your Printer!"
          type="danger"
        >
          <p>
            When testing endstops, be prepared to manually stop your printer or cut power if the print head moves in an unexpected way or doesn't stop. This can prevent damage to your printer.
          </p>
        </AlertBox>

        <CommandBlock
          title="1. Open Your Printer Console"
          description="Connect to your printer via your web interface (Mainsail, Fluidd) and open the console."
          command=""
        />

        <CommandBlock
          title="2. Check Endstop Status"
          description="Send the following command to query the current status of your endstops. You will see a list of endstops and their status (open or TRIGGERED)."
          command="QUERY_ENDSTOPS"
        />

        <CommandBlock
          title="3. Manually Trigger Each Endstop"
          description="Manually press and hold one of your endstop switches (e.g., the X-axis endstop). While holding it, send the `QUERY_ENDSTOPS` command again. The status for that endstop should change to TRIGGERED."
          command="QUERY_ENDSTOPS"
        />

        <AlertBox
          title="What if the endstop status doesn't change?"
          type="warning"
        >
          <p>
            If the status doesn't change, it could be due to a few reasons:
          </p>
          <ul class="list-disc list-inside mt-2">
            <li>**Wiring Issue:** Check that the endstop is correctly plugged into the mainboard.</li>
            <li>**Incorrect Pin:** Verify that the `endstop_pin` in your `printer.cfg` is correct for the specific axis.</li>
            <li>**Defective Switch:** The endstop switch itself might be faulty and need replacement.</li>
          </ul>
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
