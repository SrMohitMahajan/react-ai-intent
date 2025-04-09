// react-ai-intent: index.ts (main export)

import { useEffect, useState, useRef } from 'react';

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

export function useAIIntent(
  input: string,
  {
    actions,
    apiKey,
    provider = 'openai',
    model = provider === 'gemini' ? 'gemini-pro' : 'gpt-3.5-turbo',
    debounceMs = 300,
    temperature = 0.2,
  }: UseAIIntentProps
): AIIntentResult {
  const [intent, setIntent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!input || !apiKey) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      try {
        let responseText = '';

        const prompt = `Given the user input: "${input}"\nSelect the best matching intent from the following list: [${actions.join(", ")}]\nRespond with only the selected intent.`;

        if (provider === 'openai') {
          const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model,
              messages: [{ role: 'user', content: prompt }],
              temperature,
            }),
          });
          const data = await res.json();
          responseText = data.choices?.[0]?.message?.content?.trim();
        } else if (provider === 'gemini') {
          const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
            }),
          });
          const data = await res.json();
          responseText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        }

        if (responseText && actions.includes(responseText)) {
          setIntent(responseText);
        } else {
          throw new Error('Could not match a valid intent.');
        }
      } catch (err: any) {
        setError(err);
        setIntent(null);
      } finally {
        setIsLoading(false);
      }
    }, debounceMs);
  }, [input]);

  return { intent, isLoading, error };
}
