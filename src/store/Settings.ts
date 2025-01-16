import { defineStore } from "pinia";
import { MultilineAlignment } from "../components/ExtendedKatexContainer.vue";

const SCALE_KEY = "Settings.Scale"
const TEXTAREA_ROWS_KEY = "Settings.TextAreaRows";
const USE_MULTILINE_KEY = "Settings.UseMultiline";
const MULTILINE_ALIGNMENT = "Settings.MultilineAlignment";


const defaultValues: Record<string, string> = {
    [SCALE_KEY]: '2',
    [TEXTAREA_ROWS_KEY]: '3',
    [USE_MULTILINE_KEY]: 'true',
    [MULTILINE_ALIGNMENT]: MultilineAlignment.LeftAlign.toString(),
}

interface State {
    scale: number;
    textareaRows: number;
    useMultiline: boolean;
    multilineAlignment: MultilineAlignment;
}

function sanitizeScale(scale: number): number {
    if (Number.isNaN(scale) || !Number.isFinite(scale) || scale < 0.5) {
        return Number(defaultValues[SCALE_KEY]);
    }
    return scale
}

function sanitizeTextareaRows(textareaRows: number): number {
    if (!Number.isSafeInteger(textareaRows) || textareaRows < 1) {
        return Number(defaultValues[TEXTAREA_ROWS_KEY]);
    }
    return textareaRows;
}


function localStorageOrDefault(key: string): string {
    let fallback = defaultValues[key];
    if (fallback == null) {
        throw new Error(`Unknown setting key: ${key}`);
    }
    return localStorage.getItem(key) ?? fallback;
}

function RetrieveState(): State {
    return {
        scale: sanitizeScale(Number(localStorageOrDefault(SCALE_KEY))),
        textareaRows: sanitizeTextareaRows(Number(localStorageOrDefault(TEXTAREA_ROWS_KEY))),
        useMultiline: Boolean(localStorageOrDefault(USE_MULTILINE_KEY)),
        multilineAlignment: Number(localStorageOrDefault(MULTILINE_ALIGNMENT))
    };
}

function CommitState(state: State) {
    localStorage.setItem(SCALE_KEY, state.scale.toString());
    localStorage.setItem(TEXTAREA_ROWS_KEY, state.textareaRows.toString());
    localStorage.setItem(USE_MULTILINE_KEY, state.useMultiline.toString());
    localStorage.setItem(MULTILINE_ALIGNMENT, state.multilineAlignment.toString());
}

export const useSettings = defineStore('settings', {
    state: (): State => (RetrieveState()),
    actions: {
        setScale(newScale: number) {
            this.scale = sanitizeScale(newScale);
            CommitState(this);
        },
        setTextareaRows(newTextareaRows: number) {
            this.textareaRows = sanitizeTextareaRows(newTextareaRows);
            CommitState(this);
        },
        setUseMultiline(newUseMultiline: boolean) {
            this.useMultiline = newUseMultiline;
            CommitState(this);
        },
        setMultilineAlignment(multilineAlignment: MultilineAlignment) {
            this.multilineAlignment = multilineAlignment;
            CommitState(this);
        }
    }
})