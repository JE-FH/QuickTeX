<script setup lang="ts">
    import katex from 'katex';
    import { onMounted, onUpdated, ref } from 'vue';
    import html2canvas from 'html2canvas';
    
    const props = withDefaults(defineProps<{
        texString: string,
        scaling?: number
    }>(), {
        scaling: 2
    });

    const container = ref<HTMLDivElement | null>(null);

    const screenshot = (): Promise<HTMLCanvasElement> => {
        if (container.value != null) {
            return html2canvas(container.value);
        } else {
            return Promise.reject(new Error("Container is not ready yet"));
        }
    };

    defineExpose({
        screenshot
    })

    function reRender() {
        if (container.value != null) {
            container.value.replaceChildren();
            container.value.style.setProperty("--quicktex-font-size", `${props.scaling}em`)
            katex.render(props.texString, container.value, {
                throwOnError: false
            });
        }
    }

    onUpdated(() => {
        reRender();
    });

    onMounted(() => {
        reRender();
    })
</script>

<template>
    <div ref="container" :style="{'--quicktex-font-size': props.scaling.toString() + 'em'}"></div>
</template>

<style>
    @import "../../node_modules/katex/dist/katex.min.css";
    .katex {
        font-size: var(--quicktex-font-size, 1em); 
    }
</style>