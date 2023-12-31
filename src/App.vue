<script setup lang="ts">
import { ref } from 'vue';
import KatexContainer from './components/KatexContainer.vue';
import Dialog from './components/Dialog.vue';
import Settings from './components/Settings.vue';
import KatexInput from './components/KatexInput.vue';
import ActionBar from './components/ActionBar.vue';
import ActionBarEntry from './components/ActionBarEntry.vue';
import { useSettings } from './store/Settings';
import About from './components/About.vue';

const texString = ref<string>("\\KaTeX");

const open = ref<boolean>(false);
const aboutOpen = ref<boolean>(false);
const settings = useSettings();
const katexContainer = ref<InstanceType<typeof KatexContainer> | null>(null);
function upScale() {
  settings.setScale(settings.scale + 0.5);
}

function downScale() {
  let newScale = settings.scale - 0.5;
  if (newScale <= 0.5) {
    newScale = 0.5;
  }
  settings.setScale(newScale);
}

function moreRows() {
  settings.setTextareaRows(settings.textareaRows + 1);
}

function lessRows() {
  let newRows = settings.textareaRows - 1;
  if (newRows < 1) {
    newRows = 1;
  }
  settings.setTextareaRows(newRows);
}

function screenshot() {
  if (katexContainer.value != null) {
    katexContainer.value.screenshot()
      .then((canvas) => {
        canvas.toBlob((blob) => {
          if (blob == null) {
            //ignore for now
            return;
          }
          const item = new ClipboardItem({ "image/png": blob });
          navigator.clipboard.write([item]);
        });
      })
      .catch(() => {
        //Ignore for now
      });
  }
}

</script>

<template>
  <div class="main-content">
    <div style="grid-row: menu-bar;">
      <ActionBar>
        <ActionBarEntry @click="open = true">Settings</ActionBarEntry>
        <ActionBarEntry @click="upScale()">Scale +</ActionBarEntry>
        <ActionBarEntry @click="downScale()">Scale -</ActionBarEntry>
        <ActionBarEntry @click="moreRows()">Rows +</ActionBarEntry>
        <ActionBarEntry @click="lessRows()">Rows -</ActionBarEntry>
        <ActionBarEntry @click="screenshot()">Screenshot</ActionBarEntry>
        <ActionBarEntry @click="aboutOpen = true">About</ActionBarEntry>
      </ActionBar>
    </div>
    <div style="grid-row: input-area">
      <KatexInput v-model="texString" :rowCount="settings.textareaRows" />
      <hr draggable="false" />
    </div>
    <div class="output-container" style="grid-row: output-area">
      <KatexContainer ref="katexContainer" :texString="texString" :scaling="settings.scale"></KatexContainer>
    </div>
  </div>
  <Dialog :show="open" title="Settings" @close="open = false">
    <Settings />
  </Dialog>
  <Dialog :show="aboutOpen" title="About" @close="aboutOpen = false">
    <About />
  </Dialog>
</template>

<style scoped>
.output-container {
  padding: 10px;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  overflow-x: auto;
  overflow-y: auto;
}

.main-content {
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-rows: [menu-bar] auto [input-area] auto [output-area] 1fr;
}
</style>
