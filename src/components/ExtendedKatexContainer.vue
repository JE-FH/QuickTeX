<script lang="ts">
    export enum MultilineAlignment {
        CenterAlign,
        LeftAlign
    }
</script>

<script setup lang="ts">
    import { computed, ref } from 'vue';
    import KatexContainer from './KatexContainer.vue';
    import html2canvas from 'html2canvas';

    const props = withDefaults(defineProps<{
        texString: string,
        scaling?: number,
        enableMultiline?: boolean,
        multilineAlignment?: MultilineAlignment
    }>(), {
        scaling: 2,
        enableMultiline: false,
        multilineAlignment: MultilineAlignment.CenterAlign
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
    });

    const lines = computed(() => {
        if (props.enableMultiline) {
            return props.texString.split("\n\n")
        } else {
            return [props.texString];
        }
    });

    const alignStyle = computed<string>(() => {
        switch (props.multilineAlignment) {
            case MultilineAlignment.CenterAlign:
                return "center";
            case MultilineAlignment.LeftAlign:
                return "left";
            default:
                throw new Error("Unsupported align type")
        }
    })

    const style = computed<any>(() => {
        return `padding-bottom:${4 * props.scaling + 4}px;gap:${4 * props.scaling + 4}px;width: min-content;display:flex;flex-direction:column;align-items:${alignStyle.value}`;
    })
</script>

<template>
    <div
        ref="container" 
        :style="style">
        <KatexContainer
            v-for="(line, index) in lines"
            :id="index"
            :tex-string="line"
            :scaling="scaling"
        />
    </div>
</template>