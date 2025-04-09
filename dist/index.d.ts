interface UseAIIntentProps {
    actions: string[];
    apiKey: string;
    provider?: 'openai' | 'gemini';
    model?: string;
    debounceMs?: number;
    temperature?: number;
}
interface AIIntentResult {
    intent: string | null;
    isLoading: boolean;
    error: Error | null;
}
export declare function useAIIntent(input: string, { actions, apiKey, provider, model, debounceMs, temperature, }: UseAIIntentProps): AIIntentResult;
export {};
