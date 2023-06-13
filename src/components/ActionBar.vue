<script setup lang="ts">

</script>

<template>
    <div>
        <ul>
            <slot></slot>
        </ul>
    </div>
</template>

<style scoped>
div {
    background-color: black; 
}

div>ul {
    display: flex;
    background-color: black;
    margin: 0px;
    padding: 0px;
}
</style>
