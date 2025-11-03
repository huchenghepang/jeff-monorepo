<template>
  <button :content="content" class="button" @click="add(1, 2)"></button>
</template>

<script lang="ts" setup name="JButton">
interface ButtonProps {
  content: string;
}
const { content } = defineProps<ButtonProps>();
import { add } from '@jeff-monorepo/utils';
</script>

<style scoped lang="scss"></style>
