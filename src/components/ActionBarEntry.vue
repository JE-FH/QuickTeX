<script setup lang="ts">
const emit = defineEmits<{
    (e: "click"): void;
}>();
</script>

<template>
    <li>
        <button href="#" @click="emit('click')"><slot></slot></button>
    </li>
</template>

<style scoped>
li {
    font-family: monospace;
    color: white;
    list-style-type: circle;
    margin-left: 27px;
}

li:first-child {
    margin-left: 15px;
    list-style-type: none;
}

button {
    display: block;
    font-family: monospace;
    padding: 2px;
    color: #DDDDDD;
    background: none;
    text-decoration: none;
    border: none;
}

button:hover {
    cursor: pointer;
    color: #FFFFFF;
    text-decoration: underline;
}
</style>
