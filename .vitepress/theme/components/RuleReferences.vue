<script setup lang="ts">
import { useData } from "vitepress";
import { computed } from "vue";
import { data } from "../../../src/docs/guide/usage/rules/version.data.js";

const { frontmatter } = useData();

const source = computed(
  () => `https://github.com/robusta-rs/robusta/blob/${data}/${frontmatter.value.source}`,
);
</script>

<template>
  <ul>
    <li>
      <a :href="source" target="_blank" rel="noreferrer">Rule Source</a>
    </li>
  </ul>
</template>
