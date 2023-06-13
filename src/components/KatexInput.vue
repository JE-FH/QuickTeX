<script setup lang="ts">
    const props = defineProps<{
        modelValue: string;
        rowCount: number;
    }>();

    const emit = defineEmits<{
        (e: "update:modelValue", newValue: string): void
    }>();
</script>

<template>
    <textarea :rows="props.rowCount" :value="props.modelValue" @input="emit('update:modelValue', ($event.target as (HTMLTextAreaElement | null))?.value ?? '')" />
</template>

<style scoped>
textarea {
    display: block;
    width: calc(100% - 20px);
    padding: 10px;
    border: none;
    font-family: monospace;
    background-color: #EEEEEE;
    resize: none;
    outline: none;
}
textarea:focus {
    outline: none;
}
</style>