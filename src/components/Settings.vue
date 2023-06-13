<script setup lang="ts">
import { ref } from 'vue';
import { useSettings } from '../store/Settings';
import KatexContainer from './KatexContainer.vue';

const settings = useSettings();

const scaleInput = ref<string>(settings.scale.toString());
const textareaRowsInput = ref<string>(settings.textareaRows.toString());


function setScale() {
    let number = Number(scaleInput.value);
    if (!Number.isNaN(number) && Number.isFinite(number) && number >= 0.5) {
        settings.setScale(number);
    }
}

function setTextareaRows() {
    let number = Number(textareaRowsInput.value);
    if (Number.isSafeInteger(number) && number >= 1) {
        settings.setTextareaRows(number);
    }
}

settings.$subscribe(() => {
    scaleInput.value = settings.scale.toString();
    textareaRowsInput.value = settings.textareaRows.toString();
})

</script>

<template>
    <div class="settings-container">
        <div class="settings-content">
            <fieldset class="overflow-y">
                <legend>General</legend>
                <label for="scale">scale: </label>
                <input name="scale" v-model="scaleInput" @input="setScale()" />
                <br/>
                <br/>
                <label for="textareaRows">Textarea row count: </label>
                <input name="textareaRows" v-model="textareaRowsInput" @input="setTextareaRows()" />
            </fieldset>
        </div>
        <div class="preview-container">
            <fieldset>
                <legend>Preview</legend>
                <KatexContainer texString="\underline{\textit{Quick\TeX}}" :scaling="settings.scale"/>
            </fieldset>
        </div>
    </div>
</template>

<style>
.settings-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: [settings-content] 1fr [preview-container] min-content;
    width: 100%;
    height: 100%;
}

.settings-content {
    grid-row: settings-content;
}

.preview-cointainer {
    grid-row: preview-container;
}

fieldset {
    margin: 0px 2px;
    border-width: 2px;
    padding: 5.6px 12px 10px 12px;
    height: calc(100% - 5.6px - 10px - 4px);
}
</style>


