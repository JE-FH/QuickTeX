import { defineStore } from "pinia";

const SCALE_KEY = "Settings.Scale"
const TEXTAREA_ROWS_KEY = "Settings.TextAreaRows";

const defaultValues: Record<string, string> = {
    [SCALE_KEY]: '2',
    [TEXTAREA_ROWS_KEY]: '3'
}

interface State {
    scale: number;
    textareaRows: number;
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
        textareaRows: sanitizeTextareaRows(Number(localStorageOrDefault(TEXTAREA_ROWS_KEY)))
    };
}

function CommitState(state: State) {
    localStorage.setItem(SCALE_KEY, state.scale.toString());
    localStorage.setItem(TEXTAREA_ROWS_KEY, state.textareaRows.toString());
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
        }
    }
})