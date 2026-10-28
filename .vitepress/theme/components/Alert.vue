<script setup lang="ts">
const props = defineProps<{
  type: "success" | "info";
}>();
</script>

<template>
  <div class="Alert" :class="props.type">
    <slot></slot>
  </div>
</template>

<style scoped>
.Alert {
  box-sizing: border-box;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  padding: 0.75em;
  margin: 16px 0;
}

.Alert > .emoji {
  font-size: 1.25em;
}

.Alert.success {
  border-color: var(--vp-custom-block-tip-border);
  background-color: var(--vp-custom-block-tip-bg);
  color: var(--vp-custom-block-tip-text);
}

.Alert.info {
  border-color: var(--vp-custom-block-info-border);
  background-color: var(--vp-custom-block-info-bg);
  color: var(--vp-custom-block-info-text);
}
</style>
