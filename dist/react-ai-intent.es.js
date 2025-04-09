import { useState as a, useRef as E, useEffect as R } from "react";
function J(e, {
  actions: i,
  apiKey: n,
  provider: o = "openai",
  model: r = o === "gemini" ? "gemini-pro" : "gpt-3.5-turbo",
  debounceMs: j = 300,
  temperature: $ = 0.2
}) {
  const [x, c] = a(null), [C, l] = a(!1), [I, u] = a(null), s = E(null);
  return R(() => {
    !e || !n || (s.current && clearTimeout(s.current), s.current = setTimeout(async () => {
      var m, f, h, p, g, d, y, w, T, S;
      l(!0), u(null);
      try {
        let t = "";
        const b = `Given the user input: "${e}"
Select the best matching intent from the following list: [${i.join(", ")}]
Respond with only the selected intent.`;
        if (o === "openai" ? t = (p = (h = (f = (m = (await (await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${n}`
          },
          body: JSON.stringify({
            model: r,
            messages: [{ role: "user", content: b }],
            temperature: $
          })
        })).json()).choices) == null ? void 0 : m[0]) == null ? void 0 : f.message) == null ? void 0 : h.content) == null ? void 0 : p.trim() : o === "gemini" && (t = (S = (T = (w = (y = (d = (g = (await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${r}:generateContent?key=${n}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: b }] }]
          })
        })).json()).candidates) == null ? void 0 : g[0]) == null ? void 0 : d.content) == null ? void 0 : y.parts) == null ? void 0 : w[0]) == null ? void 0 : T.text) == null ? void 0 : S.trim()), t && i.includes(t))
          c(t);
        else
          throw new Error("Could not match a valid intent.");
      } catch (t) {
        u(t), c(null);
      } finally {
        l(!1);
      }
    }, j));
  }, [e]), { intent: x, isLoading: C, error: I };
}
export {
  J as useAIIntent
};
