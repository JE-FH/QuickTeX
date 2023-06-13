<script setup lang="ts">
    const props = defineProps<{
        show: boolean;
        title: string;
    }>();
    
    const emit = defineEmits<{
        (e: 'close'): void;
    }>();

    document.addEventListener("keydown", (ev) => {
        if (ev.key == 'Escape' && props.show) {
            emit('close');
        }
    })
</script>

<template>
    <div :class="{'dialog-container': true, 'show': props.show}">
        <div class="content-container"> 
            <div class="dialog-header">
                <slot name="header">
                    <div class="dialog-header-title">
                        <h1>{{ props.title }}</h1>
                    </div>
                    <button class="dialog-header-button" @click="emit('close')">
                        x
                    </button>
                </slot>
            </div>
            <div class="dialog-content">
                <div class="inner-dialog-content">
                    <slot>
                    </slot>
                </div> 
            </div>
        </div>
    </div>
</template>

<style>
.content-container {
    margin: 40px;
    width: calc(100% - 80px);
    height: calc(100% - 80px);
    background-color: white;
    display: grid;
    grid-template-rows: [header] 57px [content] 1fr;
    border-radius: 5px;
    border: solid 1px #444444;
}

.inner-dialog-content {
    padding: 10px 10px;
    height: calc(100% - 20px);
    width: calc(100% - 20px);
}

.dialog-header {
    padding: 10px;
    grid-row: header;
    border-bottom: solid 1px #444444;
    display: flex;
    justify-content: space-between;
}

.dialog-content {
    grid-row: content;
}

.dialog-container {
    display: block;
    position: fixed;
    visibility: hidden;
    left: 0px;
    top: 0px;
    width: calc(100vw);
    height: calc(100vh);
    display: hidden;
    background-color: rgba(25, 25, 25, 0.2);
    z-index: 99;
}

.dialog-header-title {

}

.dialog-header-button {
    margin: 0px;
    border-radius: 0px;
    border: none;
    width: 36px;
    height: 36px;
}

.dialog-header-button:hover {
    cursor: pointer;
}

.dialog-container.show {
    visibility: visible;
}
</style>