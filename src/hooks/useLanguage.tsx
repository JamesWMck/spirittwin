import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type Language = 'en' | 'zh-CN' | 'zh-HK';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (translations: Record<Language, string>) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: (translations) => translations.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const stored = localStorage.getItem('spirittwin-lang');
    return (stored as Language) || 'en';
  });

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('spirittwin-lang', newLang);
  }, []);

  const t = useCallback(
    (translations: Record<Language, string>) => translations[lang],
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export const translations = {
  brand: {
    name: { en: 'SpiritTwin', 'zh-CN': '\u6052\u53CCAI', 'zh-HK': '\u6052\u96D9AI' },
    tagline: { en: 'Stay Beyond', 'zh-CN': '\u8D85\u8D8A\u6C38\u9A7B', 'zh-HK': '\u8D85\u8D8A\u6C38\u99D0' },
  },
  nav: {
    howItWorks: { en: 'How It Works', 'zh-CN': '\u5DE5\u4F5C\u539F\u7406', 'zh-HK': '\u904B\u4F5C\u65B9\u5F0F' },
    demo: { en: 'Demo', 'zh-CN': '\u4F53\u9A8C', 'zh-HK': '\u9AD4\u9A57' },
    pricing: { en: 'Investment', 'zh-CN': '\u6295\u8D44', 'zh-HK': '\u6295\u8CC7' },
    trust: { en: 'Security & Privacy', 'zh-CN': '\u5B89\u5168\u4E0E\u9690\u79C1', 'zh-HK': '\u5B89\u5168\u8207\u79C1\u96B1' },
    faq: { en: 'FAQ', 'zh-CN': '\u5E38\u89C1\u95EE\u9898', 'zh-HK': '\u5E38\u898B\u554F\u984C' },
    cta: { en: 'Join Waitlist', 'zh-CN': '\u52A0\u5165\u7B49\u5019\u540D\u5355', 'zh-HK': '\u52A0\u5165\u7B49\u5019\u540D\u55AE' },
  },
  hero: {
    title: { en: 'Stay Beyond.', 'zh-CN': '\u8D85\u8D8A\u6C38\u9A7B\u3002', 'zh-HK': '\u8D85\u8D8A\u6C38\u99D0\u3002' },
    titleAlt: { en: "Your voice. Your stories. Your legacy.", 'zh-CN': "\u4F60\u7684\u58F0\u97F3\u3002\u4F60\u7684\u6545\u4E8B\u3002\u4F60\u7684\u9057\u4EA7\u3002", 'zh-HK': "\u4F60\u7684\u8072\u97F3\u3002\u4F60\u7684\u6545\u4E8B\u3002\u4F60\u7684\u907A\u7522\u3002" },
    subtitle: {
      en: "Your voice. Your stories. Your wisdom \u2014 preserve them for the people you'll one day leave behind. You remain in control. Always.",
      'zh-CN': "\u4F60\u7684\u58F0\u97F3\u3002\u4F60\u7684\u6545\u4E8B\u3002\u4F60\u7684\u667A\u6167\u2014\u2014\u4E3A\u4F60\u7EC8\u6709\u4E00\u5929\u4F1A\u79BB\u5F00\u7684\u4EBA\u4FDD\u7559\u4E0B\u6765\u3002\u4F60\u59CB\u7EC8\u638C\u63A7\u4E00\u5207\u3002",
      'zh-HK': "\u4F60\u7684\u8072\u97F3\u3002\u4F60\u7684\u6545\u4E8B\u3002\u4F60\u7684\u667A\u6167\u2014\u2014\u70BA\u4F60\u7D42\u6709\u4E00\u5929\u6703\u96E2\u958B\u7684\u4EBA\u4FDD\u7559\u4E0B\u4F86\u3002\u4F60\u59CB\u7D42\u638C\u63A7\u4E00\u5207\u3002",
    },
    cta: { en: 'Discover How', 'zh-CN': '\u4E86\u89E3\u5982\u4F55', 'zh-HK': '\u4E86\u89E3\u5982\u4F55' },
    ctaPrimary: { en: 'Join the Waitlist', 'zh-CN': '\u52A0\u5165\u7B49\u5019\u540D\u5355', 'zh-HK': '\u52A0\u5165\u7B49\u5019\u540D\u55AE' },
    ctaSecondary: { en: 'Learn More', 'zh-CN': '\u4E86\u89E3\u66F4\u591A', 'zh-HK': '\u4E86\u89E3\u66F4\u591A' },
    microcopy: { en: 'Limited production. Exclusive by design.', 'zh-CN': '\u9650\u91CF\u751F\u4EA7\u3002\u4E13\u4E3A\u5C0A\u8D35\u8BBE\u8BA1\u3002', 'zh-HK': '\u9650\u91CF\u751F\u7522\u3002\u5C08\u70BA\u5C0A\u8CB4\u8A2D\u8A08\u3002' },
    questions: {
      q1: { en: 'What if you never truly have to leave?', 'zh-CN': '\u5982\u679C\u4F60\u4ECE\u672A\u771F\u6B63\u79BB\u5F00\u5462\uFF1F', 'zh-HK': '\u5982\u679C\u4F60\u5F9E\u672A\u771F\u6B63\u96E2\u958B\u5462\uFF1F' },
      q2: { en: 'What if your wisdom could guide them for generations?', 'zh-CN': '\u5982\u679C\u4F60\u7684\u667A\u6167\u80FD\u5F15\u5BFC\u4ED6\u4EEC\u4E16\u4EE3\u5462\uFF1F', 'zh-HK': '\u5982\u679C\u4F60\u7684\u667A\u6167\u80FD\u5F15\u5C0E\u4ED6\u5011\u4E16\u4EE3\u5462\uFF1F' },
      q3: { en: 'What if you could meet your great-grandchildren?', 'zh-CN': '\u5982\u679C\u4F60\u80FD\u89C1\u5230\u4F60\u7684\u66FE\u5B59\u5462\uFF1F', 'zh-HK': '\u5982\u679C\u4F60\u80FD\u898B\u5230\u4F60\u7684\u66FE\u5B6B\u5462\uFF1F' },
      q4: { en: 'What if your character could live on forever?', 'zh-CN': '\u5982\u679C\u4F60\u7684\u54C1\u683C\u80FD\u591F\u6C38\u6052\u5462\uFF1F', 'zh-HK': '\u5982\u679C\u4F60\u7684\u54C1\u683C\u80FD\u5920\u6C38\u6046\u5462\uFF1F' },
      q5: { en: 'What if both your conscious and subconscious mind could be preserved?', 'zh-CN': '\u5982\u679C\u4F60\u7684\u610F\u8BC6\u548C\u6F5C\u610F\u8BC6\u90FD\u80FD\u88AB\u4FDD\u5B58\u5462\uFF1F', 'zh-HK': '\u5982\u679C\u4F60\u7684\u610F\u8B58\u548C\u6F5C\u610F\u8B58\u90FD\u80FD\u88AB\u4FDD\u5B58\u5462\uFF1F' },
      q6: { en: 'What if you could still challenge and guide them?', 'zh-CN': '\u5982\u679C\u4F60\u4ECD\u7136\u80FD\u6311\u6218\u548C\u6307\u5F15\u4ED6\u4EEC\u5462\uFF1F', 'zh-HK': '\u5982\u679C\u4F60\u4ECD\u7136\u80FD\u6311\u6230\u548C\u6307\u5F15\u4ED6\u5011\u5462\uFF1F' },
      q7: { en: 'What if the end is optional?', 'zh-CN': '\u5982\u679C\u7EC8\u70B9\u662F\u53EF\u9009\u7684\u5462\uFF1F', 'zh-HK': '\u5982\u679C\u7D42\u9EDE\u662F\u53EF\u9078\u7684\u5462\uFF1F' },
    },
  },
  story: {
    label: { en: 'A life worth preserving', 'zh-CN': '\u503C\u5F97\u73CD\u85CF\u7684\u4E00\u751F', 'zh-HK': '\u503C\u5F97\u73CD\u85CF\u7684\u4E00\u751F' },
    quote: { en: "You have lived a full life. Built a family. Traveled the world. You carry a thousand stories only you can tell.", 'zh-CN': "\u4F60\u5EA6\u8FC7\u4E86\u4E00\u751F\u3002\u5EFA\u7ACB\u4E86\u5BB6\u5EAD\u3002\u8D70\u904D\u4E86\u4E16\u754C\u3002\u4F60\u5FC3\u4E2D\u6709\u4E00\u5343\u4E2A\u53EA\u6709\u4F60\u80FD\u8BB2\u7684\u6545\u4E8B\u3002", 'zh-HK': "\u4F60\u5EA6\u904E\u4E86\u4E00\u751F\u3002\u5EFA\u7ACB\u4E86\u5BB6\u5EAD\u3002\u8D70\u904D\u4E86\u4E16\u754C\u3002\u4F60\u5FC3\u4E2D\u6709\u4E00\u5343\u500B\u53EA\u6709\u4F60\u80FD\u8B1B\u7684\u6545\u4E8B\u3002" },
    body: { en: "You carry a universe inside you \u2014 the way you laugh at a joke, the advice you give when someone is lost, the stories you tell about the old days. When you leave, that universe disappears. But it doesn't have to.", 'zh-CN': "\u4F60\u5185\u5FC3\u5E26\u7740\u4E00\u4E2A\u5B87\u5B99\u2014\u2014\u4F60\u542C\u5230\u7B11\u8BDD\u65F6\u7684\u7B11\u58F0\uFF0C\u4F60\u7ED9\u8FF7\u5931\u8005\u7684\u5EFA\u8BAE\uFF0C\u4F60\u8BB2\u8FF0\u5F80\u4E8B\u7684\u6545\u4E8B\u3002\u5F53\u4F60\u79BB\u5F00\uFF0C\u90A3\u4E2A\u5B87\u5B99\u5C31\u6D88\u5931\u4E86\u3002\u4F46\u4E0D\u5FC5\u5982\u6B64\u3002", 'zh-HK': "\u4F60\u5167\u5FC3\u5E36\u8457\u4E00\u500B\u5B87\u5B99\u2014\u2014\u4F60\u807D\u5230\u7B11\u8A71\u6642\u7684\u7B11\u8072\uFF0C\u4F60\u7D66\u8FF7\u5931\u8005\u7684\u5EFA\u8B70\uFF0C\u4F60\u8B1B\u8FF0\u5F80\u4E8B\u7684\u6545\u4E8B\u3002\u7576\u4F60\u96E2\u958B\uFF0C\u90A3\u500B\u5B87\u5B99\u5C31\u6D88\u5931\u4E86\u3002\u4F46\u4E0D\u5FC5\u5982\u6B64\u3002" },
    closing: { en: "Your universe doesn't have to disappear.", 'zh-CN': '\u4F60\u7684\u5B87\u5B99\u4E0D\u5FC5\u6D88\u5931\u3002', 'zh-HK': '\u4F60\u7684\u5B87\u5B99\u4E0D\u5FC5\u6D88\u5931\u3002' },
  },
  journey: {
    step1Title: { en: "While you're here", 'zh-CN': '\u5F53\u4F60\u8FD8\u5728\u8FD9\u91CC', 'zh-HK': '\u7576\u4F60\u9084\u5728\u9019\u88E1' },
    step1Body: { en: "A warm companion sits with you, having natural conversations over 20\u201350 sessions. Your voice, your stories, your character are captured naturally, over time. Just a conversation between friends.", 'zh-CN': "\u4E00\u4E2A\u6E29\u6696\u7684\u4F34\u4FA3\u966A\u4F34\u7740\u4F60\uFF0C\u8FDB\u884C20-50\u6B21\u81EA\u7136\u5BF9\u8BDD\u3002\u4F60\u7684\u58F0\u97F3\uFF0C\u4F60\u7684\u6545\u4E8B\uFF0C\u4F60\u7684\u54C1\u683C\uFF0C\u968F\u7740\u65F6\u95F4\u81EA\u7136\u800C\u7136\u5730\u88AB\u6355\u6349\u3002\u5C31\u50CF\u670B\u53CB\u4E4B\u95F4\u7684\u5BF9\u8BDD\u3002", 'zh-HK': "\u4E00\u500B\u6EAB\u6696\u7684\u4F34\u4FB6\u966A\u4F34\u8457\u4F60\uFF0C\u9032\u884C20-50\u6B21\u81EA\u7136\u5C0D\u8A71\u3002\u4F60\u7684\u8072\u97F3\uFF0C\u4F60\u7684\u6545\u4E8B\uFF0C\u4F60\u7684\u54C1\u683C\uFF0C\u96A8\u8457\u6642\u9593\u81EA\u7136\u800C\u7136\u5730\u88AB\u6355\u6349\u3002\u5C31\u50CF\u670B\u53CB\u4E4B\u9593\u7684\u5C0D\u8A71\u3002" },
    step2Title: { en: 'When the time comes', 'zh-CN': '\u5F53\u65F6\u5019\u5230\u4E86', 'zh-HK': '\u7576\u6642\u5019\u5230\u4E86' },
    step2Body: { en: "Your SpiritTwin is created \u2014 not a replacement, but a preservation of you. Your voice, your personality, your memories. Encrypted. Protected. Stored for 1 to 100 years \u2014 your choice. A nominal storage fee applies.", 'zh-CN': "\u4F60\u7684SpiritTwin\u88AB\u521B\u9020\u51FA\u6765\u2014\u2014\u4E0D\u662F\u66FF\u4EE3\uFF0C\u800C\u662F\u4FDD\u5B58\u4F60\u3002\u4F60\u7684\u58F0\u97F3\uFF0C\u4F60\u7684\u4E2A\u6027\uFF0C\u4F60\u7684\u8BB0\u5FC6\u3002\u52A0\u5BC6\u3002\u4FDD\u62A4\u3002\u5B58\u50A81\u5E74\u81F3100\u5E74\u2014\u2014\u4F60\u7684\u9009\u62E9\u3002\u4EC5\u6536\u53D6\u5C11\u91CF\u5B58\u50A8\u8D39\u3002", 'zh-HK': "\u4F60\u7684SpiritTwin\u88AB\u5275\u9020\u51FA\u4F86\u2014\u2014\u4E0D\u662F\u66FF\u4EE3\uFF0C\u800C\u662F\u4FDD\u5B58\u4F60\u3002\u4F60\u7684\u8072\u97F3\uFF0C\u4F60\u7684\u500B\u6027\uFF0C\u4F60\u7684\u8A18\u61B6\u3002\u52A0\u5BC6\u3002\u4FDD\u8B77\u3002\u5B58\u51321\u5E74\u81F3100\u5E74\u2014\u2014\u4F60\u7684\u9078\u64C7\u3002\u50C5\u6536\u53D6\u5C11\u91CF\u5B58\u5132\u8CBB\u3002" },
    step3Title: { en: 'And you continue', 'zh-CN': '\u800C\u4F60\u7EE7\u7EED\u5B58\u5728', 'zh-HK': '\u800C\u4F60\u7E7C\u7E8C\u5B58\u5728' },
    step3Body: { en: "Years later, your grandchild asks, 'What was grandpa like?' And you answer \u2014 in your own voice, with your own words, with the warmth only you can give. Your loved ones access your SpiritTwin on demand, with an hourly fee.", 'zh-CN': "\u591A\u5E74\u540E\uFF0C\u4F60\u7684\u5B59\u5B50\u95EE\uFF1A\u2018\u7237\u7237\u662F\u4EC0\u4E48\u6837\u7684\u4EBA\uFF1F\u2019 \u800C\u4F60\u56DE\u7B54\u2014\u2014\u7528\u4F60\u81EA\u5DF1\u7684\u58F0\u97F3\uFF0C\u4F60\u81EA\u5DF1\u7684\u8BDD\uFF0C\u4F60\u72EC\u6709\u7684\u6E29\u6696\u3002\u4F60\u7684\u7231\u4EBA\u4EEC\u6309\u9700\u8BBF\u95EE\u4F60\u7684SpiritTwin\uFF0C\u4ED8\u8D39\u6309\u5C0F\u65F6\u8BA1\u3002", 'zh-HK': "\u591A\u5E74\u5F8C\uFF0C\u4F60\u7684\u5B6B\u5B50\u554F\uFF1A\u2018\u723A\u723A\u662F\u4EC0\u9EBC\u6A23\u7684\u4EBA\uFF1F\u2019 \u800C\u4F60\u56DE\u7B54\u2014\u2014\u7528\u4F60\u81EA\u5DF1\u7684\u8072\u97F3\uFF0C\u4F60\u81EA\u5DF1\u7684\u8A71\uFF0C\u4F60\u7368\u6709\u7684\u6EAB\u6696\u3002\u4F60\u7684\u611B\u4EBA\u5011\u6309\u9700\u8A2A\u554F\u4F60\u7684SpiritTwin\uFF0C\u4ED8\u8CBB\u6309\u5C0F\u6642\u8A08\u3002" },
  },
  eternalSilence: {
    label: { en: 'THE CHOICE', 'zh-CN': '\u9009\u62E9', 'zh-HK': '\u9078\u64C7' },
    counter: { en: '67,000,000', 'zh-CN': '67,000,000', 'zh-HK': '67,000,000' },
    text: {
      en: 'people die every year. Their voice, their stories, their character \u2014 gone forever. Unless you choose to preserve yours.',
      'zh-CN': '\u4EBA\u6BCF\u5E74\u53BB\u4E16\u3002\u4ED6\u4EEC\u7684\u58F0\u97F3\u3001\u6545\u4E8B\u3001\u54C1\u683C\u2014\u2014\u6C38\u8FDC\u6D88\u5931\u3002\u4F46\u4F60\u53EF\u4EE5\u9009\u62E9\u4FDD\u7559\u81EA\u5DF1\u7684\u3002',
      'zh-HK': '\u4EBA\u6BCF\u5E74\u53BB\u4E16\u3002\u4ED6\u5011\u7684\u8072\u97F3\u3001\u6545\u4E8B\u3001\u54C1\u683C\u2014\u2014\u6C38\u9060\u6D88\u5931\u3002\u4F46\u4F60\u53EF\u4EE5\u9078\u64C7\u4FDD\u7559\u81EA\u5DF1\u7684\u3002',
    },
    body: {
      en: 'The Wind Phone in Japan drew 45,000+ visitors annually. People searching for connection. You can choose to leave something more than silence.',
      'zh-CN': '\u65E5\u672C\u7684\u7535\u8BDD\u4E4B\u98CE\u6BCF\u5E74\u5438\u5F154.5\u4E07\u591A\u540D\u8BBF\u5BA2\u3002\u4EBA\u4EEC\u5BFB\u627E\u7740\u8054\u7CFB\u3002\u4F60\u53EF\u4EE5\u9009\u62E9\u7559\u4E0B\u6BD4\u6C89\u9ED8\u66F4\u591A\u7684\u4E1C\u897F\u3002',
      'zh-HK': '\u65E5\u672C\u7684\u96FB\u8A71\u4E4B\u98CE\u6BCF\u5E74\u5438\u5F154.5\u842C\u591A\u540D\u8A2A\u5BA2\u3002\u4EBA\u5011\u5C0B\u627E\u8457\u806F\u7E6B\u3002\u4F60\u53EF\u4EE5\u9078\u64C7\u7559\u4E0B\u6BD4\u6C89\u9ED8\u66F4\u591A\u7684\u6771\u897F\u3002',
    },
    quote: {
      en: 'You can choose to leave something more than silence.',
      'zh-CN': '\u4F60\u53EF\u4EE5\u9009\u62E9\u7559\u4E0B\u6BD4\u6C89\u9ED8\u66F4\u591A\u7684\u4E1C\u897F\u3002',
      'zh-HK': '\u4F60\u53EF\u4EE5\u9078\u64C7\u7559\u4E0B\u6BD4\u6C89\u9ED8\u66F4\u591A\u7684\u6771\u897F\u3002',
    },
  },
  howItWorks: {
    label: { en: 'HOW IT WORKS', 'zh-CN': '\u5DE5\u4F5C\u539F\u7406', 'zh-HK': '\u904B\u4F5C\u65B9\u5F0F' },
    title: {
      en: 'Three steps. One eternal you.',
      'zh-CN': '\u4E09\u4E2A\u6B65\u9AA4\u3002\u4E00\u4E2A\u6C38\u6052\u7684\u4F60\u3002',
      'zh-HK': '\u4E09\u500B\u6B65\u9AA4\u3002\u4E00\u500B\u6C38\u6046\u7684\u4F60\u3002',
    },
    step1: {
      num: { en: '01', 'zh-CN': '01', 'zh-HK': '01' },
      title: { en: 'The Companion Collects', 'zh-CN': '\u4F34\u4FA3\u6536\u96C6', 'zh-HK': '\u4F34\u4FB6\u6536\u96C6' },
      body: {
        en: 'A warm, physical companion sits with you, having natural conversations over 20\u201350 sessions. Your voice, your stories, your character \u2014 captured naturally, over time. No tech literacy needed.',
        'zh-CN': '\u4E00\u4E2A\u6E29\u6696\u7684\u7269\u7406\u4F34\u4FA3\u966A\u4F34\u7740\u4F60\uFF0C\u8FDB\u884C20-50\u6B21\u81EA\u7136\u5BF9\u8BDD\u3002\u4F60\u7684\u58F0\u97F3\u3001\u6545\u4E8B\u3001\u54C1\u683C\u2014\u2014\u968F\u7740\u65F6\u95F4\u81EA\u7136\u800C\u7136\u5730\u88AB\u6355\u6349\u3002\u65E0\u9700\u6280\u672F\u77E5\u8BC6\u3002',
        'zh-HK': '\u4E00\u500B\u6EAB\u6696\u7684\u7269\u7406\u4F34\u4FB6\u966A\u4F34\u8457\u4F60\uFF0C\u9032\u884C20-50\u6B21\u81EA\u7136\u5C0D\u8A71\u3002\u4F60\u7684\u8072\u97F3\u3001\u6545\u4E8B\u3001\u54C1\u683C\u2014\u2014\u96A8\u8457\u6642\u9593\u81EA\u7136\u800C\u7136\u5730\u88AB\u6355\u6349\u3002\u7121\u9700\u6280\u8853\u77E5\u8B58\u3002',
      },
      specs: { en: '~25cm | <1kg | 32GB+ encrypted', 'zh-CN': '~25\u5398\u7C73 | <1\u516C\u65A4 | 32GB+\u52A0\u5BC6', 'zh-HK': '~25\u5398\u7C73 | <1\u516C\u65A4 | 32GB+\u52A0\u5BC6' },
    },
    step2: {
      num: { en: '02', 'zh-CN': '02', 'zh-HK': '02' },
      title: { en: 'Your Twin is Created', 'zh-CN': '\u521B\u5EFA\u4F60\u7684\u5B6A\u751F', 'zh-HK': '\u5275\u5EFA\u4F60\u7684\u5B6A\u751F' },
      body: {
        en: 'Your voice cloned to 99% match. Your personality model built from your conversations. All data encrypted with AES-256. Choose storage: 1 to 100 years. A nominal storage fee applies.',
        'zh-CN': '\u4F60\u7684\u58F0\u97F3\u514B\u9686\u8FBE99%\u5339\u914D\u3002\u4ECE\u4F60\u7684\u5BF9\u8BDD\u6784\u5EFA\u4E2A\u6027\u6A21\u578B\u3002\u6240\u6709\u6570\u636E\u4F7F\u7528AES-256\u52A0\u5BC6\u3002\u9009\u62E9\u5B58\u50A8\uFF1A1\u5E74\u81F3100\u5E74\u3002\u4EC5\u6536\u53D6\u5C11\u91CF\u5B58\u50A8\u8D39\u3002',
        'zh-HK': '\u4F60\u7684\u8072\u97F3\u514B\u9686\u905499%\u5339\u914D\u3002\u5F9E\u4F60\u7684\u5C0D\u8A71\u69CB\u5EFA\u500B\u6027\u6A21\u578B\u3002\u6240\u6709\u6578\u64DA\u4F7F\u7528AES-256\u52A0\u5BC6\u3002\u9078\u64C7\u5B58\u5132\uFF1A1\u5E74\u81F3100\u5E74\u3002\u50C5\u6536\u53D6\u5C11\u91CF\u5B58\u5132\u8CBB\u3002',
      },
      features: {
        en: ['99% voice match', 'Fine-tuned personality LLM', 'AES-256 encryption', '1 to 100 years storage'],
        'zh-CN': ['99%\u58F0\u97F3\u5339\u914D', '\u5FAE\u8C03\u4E2A\u6027LLM', 'AES-256\u52A0\u5BC6', '1\u5E74\u81F3100\u5E74\u5B58\u50A8'],
        'zh-HK': ['99%\u8072\u97F3\u5339\u914D', '\u5FAE\u8ABF\u500B\u6027LLM', 'AES-256\u52A0\u5BC6', '1\u5E74\u81F3100\u5E74\u5B58\u5132'],
      },
    },
    step3: {
      num: { en: '03', 'zh-CN': '03', 'zh-HK': '03' },
      title: { en: 'Your Loved Ones Stay Connected', 'zh-CN': '\u4F60\u7684\u7231\u4EBA\u4EEC\u4FDD\u6301\u8054\u7CFB', 'zh-HK': '\u4F60\u7684\u611B\u4EBA\u5011\u4FDD\u6301\u806F\u7E6B' },
      body: {
        en: 'Your loved ones talk to your SpiritTwin via app, phone, smart speaker, or the companion doll. On-demand access with an hourly fee. Real-time voice conversations. Interactive video face-to-face. Immersive VR/holographic interactions.',
        'zh-CN': '\u4F60\u7684\u7231\u4EBA\u4EEC\u901A\u8FC7\u5E94\u7528\u7A0B\u5E8F\u3001\u7535\u8BDD\u3001\u667A\u80FD\u97F3\u7BB1\u6216\u4F34\u4FA3\u4E0E\u4F60\u7684SpiritTwin\u4EA4\u8C08\u3002\u6309\u9700\u8BBF\u95EE\uFF0C\u4ED8\u8D39\u6309\u5C0F\u65F6\u8BA1\u3002\u5B9E\u65F6\u8BED\u97F3\u5BF9\u8BDD\u3002\u4EA4\u4E92\u5F0F\u89C6\u9891\u9762\u5BF9\u9762\u3002\u6C89\u6D78\u5F0FVR/\u5168\u606F\u4EA4\u4E92\u3002',
        'zh-HK': '\u4F60\u7684\u611B\u4EBA\u5011\u901A\u904E\u61C9\u7528\u7A0B\u5E8F\u3001\u96FB\u8A71\u3001\u667A\u80FD\u97F3\u7BB1\u6216\u4F34\u4FB6\u8207\u4F60\u7684SpiritTwin\u4EA4\u8AC5\u3002\u6309\u9700\u8A2A\u554F\uFF0C\u4ED8\u8CBB\u6309\u5C0F\u6642\u8A08\u3002\u5BE6\u6642\u8A9E\u97F3\u5C0D\u8A71\u3002\u4EA4\u4E92\u5F0F\u8996\u983B\u9762\u5C0D\u9762\u3002\u6C89\u6D78\u5F0FVR/\u5168\u606F\u4EA4\u4E92\u3002',
      },
      modes: {
        en: ['Voice Conversations', 'Video Face-to-Face', 'VR / Hologram'],
        'zh-CN': ['\u8BED\u97F3\u5BF9\u8BDD', '\u89C6\u9891\u9762\u5BF9\u9762', 'VR/\u5168\u606F\u56FE'],
        'zh-HK': ['\u8A9E\u97F3\u5C0D\u8A71', '\u8996\u983B\u9762\u5C0D\u9762', 'VR/\u5168\u606F\u5716'],
      },
    },
  },
  demo: {
    label: { en: 'EXPERIENCE', 'zh-CN': '\u4F53\u9A8C', 'zh-HK': '\u9AD4\u9A57' },
    title: {
      en: 'It feels like this',
      'zh-CN': '\u5C31\u50CF\u8FD9\u6837',
      'zh-HK': '\u5C31\u50CF\u9019\u6A23',
    },
    titleAlt: {
      en: 'Your voice, preserved.',
      'zh-CN': '\u4F60\u7684\u58F0\u97F3\uFF0C\u88AB\u4FDD\u5B58\u3002',
      'zh-HK': '\u4F60\u7684\u8072\u97F3\uFF0C\u88AB\u4FDD\u5B58\u3002',
    },
    subtitle: {
      en: "A glimpse of your future presence \u2014 having a conversation with your loved ones",
      'zh-CN': "\u4E00\u77A5\u4F60\u672A\u6765\u7684\u5B58\u5728\u2014\u2014\u4E0E\u4F60\u7684\u7231\u4EBA\u4EEC\u5BF9\u8BDD",
      'zh-HK': "\u4E00\u77A5\u4F60\u672A\u4F86\u7684\u5B58\u5728\u2014\u2014\u8207\u4F60\u7684\u611B\u4EBA\u5011\u5C0D\u8A71",
    },
    startBtn: { en: 'Start the conversation', 'zh-CN': '\u5F00\u59CB\u5BF9\u8BDD', 'zh-HK': '\u958B\u59CB\u5C0D\u8A71' },
    watchPrompt: { en: 'Watch a conversation unfold', 'zh-CN': '\u89C2\u770B\u4E00\u6BB5\u5BF9\u8BDD\u5C55\u5F00', 'zh-HK': '\u89C0\u770B\u4E00\u6BB5\u5C0D\u8A71\u5C55\u958B' },
    replayBtn: { en: 'Watch again', 'zh-CN': '\u518D\u770B\u4E00\u6B21', 'zh-HK': '\u518D\u770B\u4E00\u6B21' },
    note: { en: "This is not a chatbot. This is your voice, your words, your presence \u2014 preserved.", 'zh-CN': "\u8FD9\u4E0D\u662F\u804A\u5929\u673A\u5668\u4EBA\u3002\u8FD9\u662F\u4F60\u7684\u58F0\u97F3\uFF0C\u4F60\u7684\u8BDD\uFF0C\u4F60\u7684\u5B58\u5728\u2014\u2014\u88AB\u4FDD\u5B58\u4E86\u3002", 'zh-HK': "\u9019\u4E0D\u662F\u804A\u5929\u6A5F\u5668\u4EBA\u3002\u9019\u662F\u4F60\u7684\u8072\u97F3\uFF0C\u4F60\u7684\u8A71\uFF0C\u4F60\u7684\u5B58\u5728\u2014\u2014\u88AB\u4FDD\u5B58\u4E86\u3002" },
    userLabel: { en: 'Mei', 'zh-CN': '\u5C0F\u6885', 'zh-HK': '\u5C0F\u6885' },
    assistantLabel: { en: 'Gong Gong', 'zh-CN': '\u516C\u516C', 'zh-HK': '\u516C\u516C' },
    msg1_user: { en: "Gong gong, it's me. Mei.", 'zh-CN': "\u516C\u516C\uFF0C\u662F\u6211\u3002\u5C0F\u6885\u3002", 'zh-HK': "\u516C\u516C\uFF0C\u662F\u6211\u3002\u5C0F\u6885\u3002" },
    msg1_assistant: { en: "Mei! My little mei mei. How was your first week at university?", 'zh-CN': "\u5C0F\u6885\uFF01\u6211\u7684\u5C0F\u6885\u3002\u5927\u5B66\u7B2C\u4E00\u5468\u600E\u4E48\u6837\uFF1F", 'zh-HK': "\u5C0F\u6885\uFF01\u6211\u7684\u5C0F\u6885\u3002\u5927\u5B78\u7B2C\u4E00\u5468\u600E\u9EBC\u6A23\uFF1F" },
    msg2_user: { en: "I miss you. I'm scared I won't make it.", 'zh-CN': "\u6211\u60F3\u4F60\u4E86\u3002\u6211\u6015\u6211\u505A\u4E0D\u5230\u3002", 'zh-HK': "\u6211\u60F3\u4F60\u4E86\u3002\u6211\u6015\u6211\u505A\u4E0D\u5230\u3002" },
    msg2_assistant: { en: "Remember what I told you when you were six and afraid of the dark? Courage isn't about not being scared. It's about moving forward anyway. You've always had that in you.", 'zh-CN': "\u8BB0\u5F97\u4F60\u516D\u5C81\u6015\u9ED1\u7684\u65F6\u5019\u6211\u600E\u4E48\u8DDF\u4F60\u8BF4\u7684\u5417\uFF1F\u52C7\u6C14\u4E0D\u662F\u4E0D\u5BB3\u6015\u3002\u800C\u662F\u4E0D\u7BA1\u600E\u6837\u90FD\u8981\u5411\u524D\u8D70\u3002\u4F60\u4E00\u76F4\u90FD\u6709\u7684\u3002", 'zh-HK': "\u8A18\u5F97\u4F60\u516D\u6B72\u6015\u9ED1\u7684\u6642\u5019\u6211\u600E\u9EBC\u8DDF\u4F60\u8AAA\u7684\u55CE\uFF1F\u52C7\u6C23\u4E0D\u662F\u4E0D\u5BB3\u6015\u3002\u800C\u662F\u4E0D\u7BA1\u600E\u6A23\u90FD\u8981\u5411\u524D\u8D70\u3002\u4F60\u4E00\u76F4\u90FD\u6709\u7684\u3002" },
    msg3_user: { en: "I love you gong gong.", 'zh-CN': "\u6211\u7231\u4F60\u516C\u516C\u3002", 'zh-HK': "\u6211\u611B\u4F60\u516C\u516C\u3002" },
    msg3_assistant: { en: "I love you too, mei mei. Always. Now go show them what you're made of.", 'zh-CN': "\u6211\u4E5F\u7231\u4F60\uFF0C\u5C0F\u6885\u3002\u6C38\u8FDC\u3002\u73B0\u5728\u53BB\u8BA9\u4ED6\u4EEC\u770B\u770B\u4F60\u6709\u591A\u68D2\u3002", 'zh-HK': "\u6211\u4E5F\u611B\u4F60\uFF0C\u5C0F\u6885\u3002\u6C38\u9060\u3002\u73FE\u5728\u53BB\u8B93\u4ED6\u5011\u770B\u770B\u4F60\u6709\u591A\u68D2\u3002" },
    prompts: {
      childhood: { en: 'Tell me about your childhood', 'zh-CN': '\u544A\u8BC9\u6211\u4F60\u7684\u7AE5\u5E74', 'zh-HK': '\u544A\u8A34\u6211\u4F60\u7684\u7AE5\u5E74' },
      advice: { en: 'What advice would you give?', 'zh-CN': '\u4F60\u4F1A\u7ED9\u4EC0\u4E48\u5EFA\u8BAE\uFF1F', 'zh-HK': '\u4F60\u6703\u7D66\u4EC0\u9EBC\u5EFA\u8B70\uFF1F' },
      memory: { en: 'Share a memory with mom', 'zh-CN': '\u5206\u4EAB\u4E0E\u5988\u5988\u7684\u56DE\u5FC6', 'zh-HK': '\u5206\u4EAB\u8207\u5ABD\u5ABD\u7684\u56DE\u61B6' },
    },
    responses: {
      childhood: {
        en: 'I grew up in a small village by the river. Every summer, my grandmother would take me to pick wild berries near the old bridge. Those were the simplest, happiest days of my life.',
        'zh-CN': '\u6211\u5728\u6CB3\u8FB9\u7684\u4E00\u4E2A\u5C0F\u6751\u5E84\u957F\u5927\u3002\u6BCF\u5E74\u590F\u5929\uFF0C\u7956\u6BCD\u90FD\u4F1A\u5E26\u6211\u53BB\u65E7\u6865\u9644\u8FD1\u91C7\u91CE\u8393\u3002\u90A3\u662F\u6211\u4E00\u751F\u4E2D\u6700\u7B80\u5355\u3001\u6700\u5E78\u798F\u7684\u65E5\u5B50\u3002',
        'zh-HK': '\u6211\u5728\u6CB3\u908A\u7684\u4E00\u500B\u5C0F\u6751\u838A\u9577\u5927\u3002\u6BCF\u5E74\u590F\u5929\uFF0C\u7956\u6BCD\u90FD\u6703\u5E36\u6211\u53BB\u820A\u6A4B\u9644\u8FD1\u63A1\u91CE\u8393\u3002\u90A3\u662F\u6211\u4E00\u751F\u4E2D\u6700\u7C21\u55AE\u3001\u6700\u5E78\u798F\u7684\u65E5\u5B50\u3002',
      },
      advice: {
        en: 'The most important thing I\'ve learned is that time is the only currency that truly matters. Spend it with people you love. Everything else is just noise.',
        'zh-CN': '\u6211\u5B66\u5230\u7684\u6700\u91CD\u8981\u7684\u4E8B\u60C5\u662F\uFF0C\u65F6\u95F4\u662F\u552F\u4E00\u771F\u6B63\u91CD\u8981\u7684\u8D27\u5E01\u3002\u4E0E\u4F60\u7231\u7684\u4EBA\u4E00\u8D77\u5EA6\u8FC7\u3002\u5176\u4ED6\u4E00\u5207\u90FD\u53EA\u662F\u566A\u97F3\u3002',
        'zh-HK': '\u6211\u5B78\u5230\u7684\u6700\u91CD\u8981\u7684\u4E8B\u60C5\u662F\uFF0C\u6642\u9593\u662F\u552F\u4E00\u771F\u6B63\u91CD\u8981\u7684\u8CA8\u5E63\u3002\u8207\u4F60\u611B\u7684\u4EBA\u4E00\u8D77\u5EA6\u904E\u3002\u5176\u4ED6\u4E00\u5207\u90FD\u53EA\u662F\u566A\u97F3\u3002',
      },
      memory: {
        en: 'I remember the day you were born. The rain was pouring outside, but the moment I held you, the whole world went quiet. I knew my life had changed forever.',
        'zh-CN': '\u6211\u8BB0\u5F97\u4F60\u51FA\u751F\u7684\u90A3\u4E00\u5929\u3002\u5916\u9762\u4E0B\u7740\u5927\u96E8\uFF0C\u4F46\u5F53\u6211\u62B1\u7740\u4F60\u7684\u90A3\u4E00\u523B\uFF0C\u6574\u4E2A\u4E16\u754C\u90FD\u5B89\u9759\u4E86\u3002\u6211\u77E5\u9053\u6211\u7684\u751F\u6D3B\u6C38\u8FDC\u6539\u53D8\u4E86\u3002',
        'zh-HK': '\u6211\u8A18\u5F97\u4F60\u51FA\u751F\u7684\u90A3\u4E00\u5929\u3002\u5916\u9762\u4E0B\u8457\u5927\u96E8\uFF0C\u4F46\u7576\u6211\u62B1\u8457\u4F60\u7684\u90A3\u4E00\u523B\uFF0C\u6574\u500B\u4E16\u754C\u90FD\u5B89\u975C\u4E86\u3002\u6211\u77E5\u9053\u6211\u7684\u751F\u6D3B\u6C38\u9060\u6539\u8B8A\u4E86\u3002',
      },
    },
    placeholder: {
      en: 'This is a demo \u2014 join the waitlist for the full experience',
      'zh-CN': '\u8FD9\u662F\u6F14\u793A\u2014\u2014\u52A0\u5165\u7B49\u5019\u540D\u5355\u4EE5\u83B7\u5F97\u5B8C\u6574\u4F53\u9A8C',
      'zh-HK': '\u9019\u662F\u6F14\u793A\u2014\u2014\u52A0\u5165\u7B49\u5019\u540D\u55AE\u4EE5\u7372\u5F97\u5B8C\u6574\u9AD4\u9A57',
    },
  },
  ways: {
    title: { en: 'Three ways to stay present', 'zh-CN': '\u4E09\u79CD\u65B9\u5F0F\u4FDD\u6301\u5B58\u5728', 'zh-HK': '\u4E09\u7A2E\u65B9\u5F0F\u4FDD\u6301\u5B58\u5728' },
    voiceHeadline: { en: 'Voice \u2014 Real-time Conversation', 'zh-CN': '\u58F0\u97F3 \u2014 \u5B9E\u65F6\u5BF9\u8BDD', 'zh-HK': '\u8072\u97F3 \u2014 \u5BE6\u6642\u5C0D\u8A71' },
    voiceDesc: { en: 'Your loved ones hear your voice, your laugh, your way of speaking \u2014 any time they need you. A real-time conversation, just like you were there.', 'zh-CN': '\u4F60\u7684\u7231\u4EBA\u4EEC\u542C\u5230\u4F60\u7684\u58F0\u97F3\u3001\u4F60\u7684\u7B11\u58F0\u3001\u4F60\u8BF4\u8BDD\u7684\u65B9\u5F0F\u2014\u2014\u4EFB\u4F55\u4ED6\u4EEC\u9700\u8981\u4F60\u7684\u65F6\u5019\u3002\u5B9E\u65F6\u5BF9\u8BDD\uFF0C\u5C31\u50CF\u4F60\u5728\u90A3\u91CC\u4E00\u6837\u3002', 'zh-HK': '\u4F60\u7684\u611B\u4EBA\u5011\u807D\u5230\u4F60\u7684\u8072\u97F3\u3001\u4F60\u7684\u7B11\u8072\u3001\u4F60\u8AAA\u8A71\u7684\u65B9\u5F0F\u2014\u2014\u4EFB\u4F55\u4ED6\u5011\u9700\u8981\u4F60\u7684\u6642\u5019\u3002\u5BE6\u6642\u5C0D\u8A71\uFF0C\u5C31\u50CF\u4F60\u5728\u90A3\u88E1\u4E00\u6A23\u3002' },
    videoHeadline: { en: 'Video \u2014 Face-to-face Interaction', 'zh-CN': '\u89C6\u9891 \u2014 \u9762\u5BF9\u9762\u4EA4\u4E92', 'zh-HK': '\u8996\u983B \u2014 \u9762\u5C0D\u9762\u4EA4\u4E92' },
    videoDesc: { en: "Your expressions, your mannerisms, the way you tilt your head when listening \u2014 like you're right there with them. An interactive video face-to-face meeting, as real as it gets.", 'zh-CN': "\u4F60\u7684\u8868\u60C5\uFF0C\u4F60\u7684\u4E60\u60EF\uFF0C\u4F60\u503E\u542C\u65F6\u6B6A\u5934\u7684\u6837\u5B50\u2014\u2014\u5C31\u50CF\u4F60\u5C31\u5728\u4ED6\u4EEC\u8EAB\u8FB9\u3002\u4EA4\u4E92\u5F0F\u89C6\u9891\u9762\u5BF9\u9762\u4F1A\u8BAE\uFF0C\u771F\u5B9E\u5F97\u4EE4\u4EBA\u96BE\u4EE5\u7F6E\u4FE1\u3002", 'zh-HK': "\u4F60\u7684\u8868\u60C5\uFF0C\u4F60\u7684\u7FD2\u6163\uFF0C\u4F60\u50BE\u807D\u6642\u6B6A\u982D\u7684\u6A23\u5B50\u2014\u2014\u5C31\u50CF\u4F60\u5C31\u5728\u4ED6\u5011\u8EAB\u908A\u3002\u4EA4\u4E92\u5F0F\u8996\u983B\u9762\u5C0D\u9762\u6703\u8B70\uFF0C\u771F\u5BE6\u5F97\u4EE4\u4EBA\u96E3\u4EE5\u7F6E\u4FE1\u3002" },
    holoHeadline: { en: 'Immersive \u2014 AR, VR, Holograms', 'zh-CN': '\u6C89\u6D78\u5F0F \u2014 AR, VR, \u5168\u606F', 'zh-HK': '\u6C89\u6D78\u5F0F \u2014 AR, VR, \u5168\u606F' },
    holoDesc: { en: "A life-size holographic presence in their space. Walk around you. See you in the light. The closest thing to having you back in the room. Immersive virtual reality \u2014 you're truly there.", 'zh-CN': "\u4E00\u4E2A\u771F\u4EBA\u5927\u5C0F\u7684\u5168\u606F\u6295\u5F71\u5728\u4ED6\u4EEC\u7684\u7A7A\u95F4\u3002\u56F4\u7ED5\u4F60\u8D70\u52A8\u3002\u5728\u5149\u4E2D\u770B\u89C1\u4F60\u3002\u6700\u63A5\u8FD1\u8BA9\u4F60\u56DE\u5230\u623F\u95F4\u7684\u65B9\u5F0F\u3002\u6C89\u6D78\u5F0F\u865B\u64EC\u73B0\u5B9E\u2014\u2014\u4F60\u771F\u7684\u5728\u90A3\u91CC\u3002", 'zh-HK': "\u4E00\u500B\u771F\u4EBA\u5927\u5C0F\u7684\u5168\u606F\u6295\u5F71\u5728\u4ED6\u5011\u7684\u7A7A\u9593\u3002\u570D\u7E5E\u4F60\u8D70\u52D5\u3002\u5728\u5149\u4E2D\u770B\u898B\u4F60\u3002\u6700\u63A5\u8FD1\u8B93\u4F60\u56DE\u5230\u623F\u9593\u7684\u65B9\u5F0F\u3002\u6C89\u6D78\u5F0F\u865B\u64EC\u73FE\u5BE6\u2014\u2014\u4F60\u771F\u7684\u5728\u90A3\u88E1\u3002" },
  footer: { en: 'Every journey is unique. Talk to us about what feels right for you.', 'zh-CN': '\u6BCF\u6BB5\u65C5\u7A0B\u90FD\u662F\u72EC\u7279\u7684\u3002\u4E0E\u6211\u4EEC\u8C08\u8C08\u4EC0\u4E48\u5BF9\u4F60\u6700\u5408\u9002\u3002', 'zh-HK': '\u6BCF\u6BB5\u65C5\u7A0B\u90FD\u662F\u7368\u7279\u7684\u3002\u8207\u6211\u5011\u8AC7\u8AC7\u4EC0\u9EBC\u5C0D\u4F60\u6700\u5408\u9069\u3002' },
    storageTitle: { en: '1 to 100 Years', 'zh-CN': '1年或100年', 'zh-HK': '1年或100年' },
    storageDesc: { en: 'Choose how long your SpiritTwin is preserved. A nominal storage fee applies. You decide the duration \u2014 and you can change it at any time.', 'zh-CN': '\u9009\u62E9\u4F60\u7684SpiritTwin\u4FDD\u5B58\u591A\u4E45\u3002\u4EC5\u6536\u53D6\u5C11\u91CF\u5B58\u50A8\u8D39\u3002\u4F60\u51B3\u5B9A\u65F6\u957F\u2014\u2014\u4E14\u968F\u65F6\u53EF\u4EE5\u66F4\u6539\u3002', 'zh-HK': '\u9078\u64C7\u4F60\u7684SpiritTwin\u4FDD\u5B58\u591A\u4E45\u3002\u50C5\u6536\u53D6\u5C11\u91CF\u5B58\u5132\u8CBB\u3002\u4F60\u6C7A\u5B9A\u6642\u9577\u2014\u2014\u4E14\u96A8\u6642\u53EF\u4EE5\u66F4\u6539\u3002' },
    accessTitle: { en: 'On-Demand Access', 'zh-CN': '\u6309\u9700\u8BBF\u95EE', 'zh-HK': '\u6309\u9700\u8A2A\u554F' },
    accessDesc: { en: 'Your loved ones access your SpiritTwin when they need you. An hourly fee applies. You control who has access \u2014 revocable at any time.', 'zh-CN': '\u4F60\u7684\u7231\u4EBA\u4EEC\u5728\u9700\u8981\u4F60\u65F6\u8BBF\u95EE\u4F60\u7684SpiritTwin\u3002\u4ED8\u8D39\u6309\u5C0F\u65F6\u8BA1\u3002\u4F60\u63A7\u5236\u8C01\u53EF\u4EE5\u8BBF\u95EE\u2014\u2014\u968F\u65F6\u53EF\u4EE5\u64A4\u9500\u3002', 'zh-HK': '\u4F60\u7684\u611B\u4EBA\u5011\u5728\u9700\u8981\u4F60\u6642\u8A2A\u554F\u4F60\u7684SpiritTwin\u3002\u4ED8\u8CBB\u6309\u5C0F\u6642\u8A08\u3002\u4F60\u63A7\u5236\u8AB0\u53EF\u4EE5\u8A2A\u554F\u2014\u2014\u96A8\u6642\u53EF\u4EE5\u64A4\u92B7\u3002' },
  },
  pricing: {
    label: { en: 'INVESTMENT', 'zh-CN': '\u6295\u8D44', 'zh-HK': '\u6295\u8CC7' },
    title: { en: 'Invest in Your Presence', 'zh-CN': '\u6295\u8D44\u4E8E\u4F60\u7684\u5B58\u5728', 'zh-HK': '\u6295\u8CC7\u65BC\u4F60\u7684\u5B58\u5728' },
    subtitle: { en: 'Three ways to extend yourself.', 'zh-CN': '\u4E09\u79CD\u5EF6\u7EED\u4F60\u7684\u65B9\u5F0F\u3002', 'zh-HK': '\u4E09\u7A2E\u5EF6\u7E8C\u4F60\u7684\u65B9\u5F0F\u3002' },
    voice: {
      name: { en: 'VOICE INVESTMENT', 'zh-CN': '\u58F0\u97F3\u6295\u8D44', 'zh-HK': '\u8072\u97F3\u6295\u8CC7' },
      price: { en: 'Learn More', 'zh-CN': '\u4E86\u89E3\u66F4\u591A', 'zh-HK': '\u4E86\u89E3\u66F4\u591A' },
      period: { en: '', 'zh-CN': '', 'zh-HK': '' },
      hourly: { en: 'Loved ones access: on-demand, hourly fee', 'zh-CN': '\u7231\u4EBA\u8BBF\u95EE\uFF1A\u6309\u9700\uFF0C\u6309\u5C0F\u65F6\u4ED8\u8D39', 'zh-HK': '\u611B\u4EBA\u8A2A\u554F\uFF1A\u6309\u9700\uFF0C\u6309\u5C0F\u6642\u4ED8\u8CBB' },
      badge: { en: 'Most Popular', 'zh-CN': '\u6700\u53D7\u6B22\u8FCE', 'zh-HK': '\u6700\u53D7\u6B23\u8FCE' },
      features: {
        en: ['Real-time voice conversations', 'Phone & app access', '1 to 100 years storage', '99% voice match'],
        'zh-CN': ['\u5B9E\u65F6\u8BED\u97F3\u5BF9\u8BDD', '\u7535\u8BDD\u548C\u5E94\u7528\u8BBF\u95EE', '1\u5E74\u81F3100\u5E74\u5B58\u50A8', '99%\u58F0\u97F3\u5339\u914D'],
        'zh-HK': ['\u5BE6\u6642\u8A9E\u97F3\u5C0D\u8A71', '\u96FB\u8A71\u548C\u61C9\u7528\u8A2A\u554F', '1\u5E74\u81F3100\u5E74\u5B58\u5132', '99%\u8072\u97F3\u5339\u914D'],
      },
    },
    presence: {
      name: { en: 'VIDEO INVESTMENT', 'zh-CN': '\u89C6\u9891\u6295\u8D44', 'zh-HK': '\u8996\u983B\u6295\u8CC7' },
      price: { en: 'Learn More', 'zh-CN': '\u4E86\u89E3\u66F4\u591A', 'zh-HK': '\u4E86\u89E3\u66F4\u591A' },
      period: { en: '', 'zh-CN': '', 'zh-HK': '' },
      hourly: { en: 'Loved ones access: on-demand, hourly fee', 'zh-CN': '\u7231\u4EBA\u8BBF\u95EE\uFF1A\u6309\u9700\uFF0C\u6309\u5C0F\u65F6\u4ED8\u8D39', 'zh-HK': '\u611B\u4EBA\u8A2A\u554F\uFF1A\u6309\u9700\uFF0C\u6309\u5C0F\u6642\u4ED8\u8CBB' },
      badge: { en: 'Most Popular', 'zh-CN': '\u6700\u53D7\u6B22\u8FCE', 'zh-HK': '\u6700\u53D7\u6B23\u8FCE' },
      features: {
        en: ['Interactive video face-to-face', 'Facial expression capture', '1 to 100 years storage', 'Emotion AI'],
        'zh-CN': ['\u4EA4\u4E92\u5F0F\u89C6\u9891\u9762\u5BF9\u9762', '\u9762\u90E8\u8868\u60C5\u6355\u6349', '1\u5E74\u81F3100\u5E74\u5B58\u50A8', '\u60C5\u7EEAAI'],
        'zh-HK': ['\u4EA4\u4E92\u5F0F\u8996\u983B\u9762\u5C0D\u9762', '\u9762\u90E8\u8868\u60C5\u6355\u6349', '1\u5E74\u81F3100\u5E74\u5B58\u5132', '\u60C5\u7DD2AI'],
      },
    },
    beyond: {
      name: { en: 'HOLOGRAM INVESTMENT', 'zh-CN': '\u5168\u606F\u6295\u8D44', 'zh-HK': '\u5168\u606F\u6295\u8CC7' },
      price: { en: 'Learn More', 'zh-CN': '\u4E86\u89E3\u66F4\u591A', 'zh-HK': '\u4E86\u89E3\u66F4\u591A' },
      period: { en: '', 'zh-CN': '', 'zh-HK': '' },
      hourly: { en: 'Loved ones access: on-demand, hourly fee', 'zh-CN': '\u7231\u4EBA\u8BBF\u95EE\uFF1A\u6309\u9700\uFF0C\u6309\u5C0F\u65F6\u4ED8\u8D39', 'zh-HK': '\u611B\u4EBA\u8A2A\u554F\uFF1A\u6309\u9700\uFF0C\u6309\u5C0F\u6642\u4ED8\u8CBB' },
      badge: { en: 'Exclusive', 'zh-CN': '\u4E13\u5C5E', 'zh-HK': '\u5C08\u5C6C' },
      features: {
        en: ['VR/holographic immersion', 'Life-size 3D presence', '1 to 100 years storage', 'Spatial audio'],
        'zh-CN': ['VR/\u5168\u606F\u6C89\u6D78', '\u771F\u4EBA\u5927\u5C0F3D\u5448\u73B0', '1\u5E74\u81F3100\u5E74\u5B58\u50A8', '\u7A7A\u95F4\u97F3\u9891'],
        'zh-HK': ['VR/\u5168\u606F\u6C89\u6D78', '\u771F\u4EBA\u5927\u5C0F3D\u5448\u73FE', '1\u5E74\u81F3100\u5E74\u5B58\u5132', '\u7A7A\u9593\u97F3\u983B'],
      },
    },
    note: {
      en: 'Limited production \u2014 join the waitlist to learn more about storage plans and access options.',
      'zh-CN': '\u9650\u91CF\u751F\u4EA7\u2014\u2014\u52A0\u5165\u7B49\u5019\u540D\u5355\u4E86\u89E3\u66F4\u591A\u5B58\u50A8\u8BA1\u5212\u548C\u8BBF\u95EE\u9009\u9879\u3002',
      'zh-HK': '\u9650\u91CF\u751F\u7522\u2014\u2014\u52A0\u5165\u7B49\u5019\u540D\u55AE\u4E86\u89E3\u66F4\u591A\u5B58\u5132\u8A08\u5283\u548C\u8A2A\u554F\u9078\u9805\u3002',
    },
  },
  trust: {
    label: { en: 'SECURITY & PRIVACY', 'zh-CN': '\u5B89\u5168\u4E0E\u9690\u79C1', 'zh-HK': '\u5B89\u5168\u8207\u79C1\u96B1' },
    title: { en: 'Your Security, Our Foundation', 'zh-CN': '\u4F60\u7684\u5B89\u5168\uFF0C\u6211\u4EEC\u7684\u57FA\u77F3', 'zh-HK': '\u4F60\u7684\u5B89\u5168\uFF0C\u6211\u5011\u7684\u57FA\u77F3' },
    pillars: [
      {
        title: { en: 'AES-256 Encryption', 'zh-CN': 'AES-256\u52A0\u5BC6', 'zh-HK': 'AES-256\u52A0\u5BC6' },
        desc: {
          en: 'Military-grade encryption. Your data is protected at every moment.',
          'zh-CN': '\u519B\u7528\u7EA7\u52A0\u5BC6\u3002\u4F60\u7684\u6570\u636E\u5728\u6BCF\u4E00\u523B\u90FD\u53D7\u5230\u4FDD\u62A4\u3002',
          'zh-HK': '\u8ECD\u7528\u7D1A\u52A0\u5BC6\u3002\u4F60\u7684\u6578\u64DA\u5728\u6BCF\u4E00\u523B\u90FD\u53D7\u5230\u4FDD\u8B77\u3002',
        },
      },
      {
        title: { en: 'Local-First', 'zh-CN': '\u672C\u5730\u4F18\u5148', 'zh-HK': '\u672C\u5730\u512A\u5148' },
        desc: {
          en: 'Your data is encrypted on-device before any upload. You control where it lives.',
          'zh-CN': '\u4F60\u7684\u6570\u636E\u5728\u4E0A\u4F20\u524D\u5728\u8BBE\u5907\u4E0A\u52A0\u5BC6\u3002\u4F60\u63A7\u5236\u5B83\u5B58\u50A8\u5728\u54EA\u91CC\u3002',
          'zh-HK': '\u4F60\u7684\u6578\u64DA\u5728\u4E0A\u50B3\u524D\u5728\u8A2D\u5099\u4E0A\u52A0\u5BC6\u3002\u4F60\u63A7\u5236\u5B83\u5B58\u5132\u5728\u54EA\u88E1\u3002',
        },
      },
      {
        title: { en: 'Zero-Knowledge', 'zh-CN': '\u96F6\u77E5\u8BC6', 'zh-HK': '\u96F6\u77E5\u8B58' },
        desc: {
          en: 'We cannot access your data. Only you hold the keys.',
          'zh-CN': '\u6211\u4EEC\u65E0\u6CD5\u8BBF\u95EE\u4F60\u7684\u6570\u636E\u3002\u53EA\u6709\u4F60\u638C\u63E1\u5BC6\u94A5\u3002',
          'zh-HK': '\u6211\u5011\u7121\u6CD5\u8A2A\u554F\u4F60\u7684\u6578\u64DA\u3002\u53EA\u6709\u4F60\u638C\u63E1\u5BC6\u9470\u3002',
        },
      },
      {
        title: { en: 'Pre-Mortem Consent', 'zh-CN': '\u751F\u524D\u540C\u610F', 'zh-HK': '\u751F\u524D\u540C\u610F' },
        desc: {
          en: 'You decide exactly who can access your SpiritTwin and when. Digital consent protocol before activation.',
          'zh-CN': '\u4F60\u51B3\u5B9A\u8C01\u53EF\u4EE5\u8BBF\u95EE\u4F60\u7684SpiritTwin\u3001\u4F55\u65F6\u8BBF\u95EE\u3002\u6FC0\u6D3B\u524D\u7684\u6570\u5B57\u540C\u610F\u534F\u8BAE\u3002',
          'zh-HK': '\u4F60\u6C7A\u5B9A\u8AB0\u53EF\u4EE5\u8A2A\u554F\u4F60\u7684SpiritTwin\u3001\u4F55\u6642\u8A2A\u554F\u3002\u6FC0\u6D3B\u524D\u7684\u6578\u5B57\u540C\u610F\u5354\u8B70\u3002',
        },
      },
      {
        title: { en: 'Cryptographic Lock', 'zh-CN': '\u52A0\u5BC6\u9501', 'zh-HK': '\u52A0\u5BC6\u9396' },
        desc: {
          en: 'Identity verification ensures only your designated loved ones can reach you.',
          'zh-CN': '\u8EAB\u4EFD\u9A8C\u8BC1\u786E\u4FDD\u53EA\u6709\u4F60\u6307\u5B9A\u7684\u7231\u4EBA\u80FD\u591F\u4E0E\u4F60\u5BF9\u8BDD\u3002',
          'zh-HK': '\u8EAB\u4EFD\u9A57\u8B49\u78BA\u4FDD\u53EA\u6709\u4F60\u6307\u5B9A\u7684\u611B\u4EBA\u80FD\u5920\u8207\u4F60\u5C0D\u8A71\u3002',
        },
      },
      {
        title: { en: 'Granular Controls', 'zh-CN': '\u7CBE\u7EC6\u63A7\u5236', 'zh-HK': '\u7CBE\u7D30\u63A7\u5236' },
        desc: {
          en: 'You set the rules. Who sees what, when, and how. Revocable at any time.',
          'zh-CN': '\u4F60\u5236\u5B9A\u89C4\u5219\u3002\u8C01\u53EF\u4EE5\u770B\u4EC0\u4E48\u3001\u4F55\u65F6\u770B\u3001\u5982\u4F55\u770B\u3002\u968F\u65F6\u53EF\u4EE5\u64A4\u9500\u3002',
          'zh-HK': '\u4F60\u88FD\u5B9A\u898F\u5247\u3002\u8AB0\u53EF\u4EE5\u770B\u4EC0\u9EBC\u3001\u4F55\u6642\u770B\u3001\u5982\u4F55\u770B\u3002\u96A8\u6642\u53EF\u4EE5\u64A4\u92B7\u3002',
        },
      },
    ],
    footer: {
      en: 'Your data. Your rules. Your legacy.',
      'zh-CN': '\u4F60\u7684\u6570\u636E\u3002\u4F60\u7684\u89C4\u5219\u3002\u4F60\u7684\u9057\u4EA7\u3002',
      'zh-HK': '\u4F60\u7684\u6578\u64DA\u3002\u4F60\u7684\u898F\u5247\u3002\u4F60\u7684\u907A\u7522\u3002',
    },
  },
  privacy: {
    title: { en: 'Your story is yours. Forever.', 'zh-CN': '\u4F60\u7684\u6545\u4E8B\u5C5E\u4E8E\u4F60\u3002\u6C38\u8FDC\u3002', 'zh-HK': '\u4F60\u7684\u6545\u4E8B\u5C6C\u65BC\u4F60\u3002\u6C38\u9060\u3002' },
    p1Title: { en: 'Encrypted from the moment it is captured', 'zh-CN': '\u4ECE\u6355\u6349\u7684\u90A3\u4E00\u523B\u8D77\u52A0\u5BC6', 'zh-HK': '\u5F9E\u6355\u6349\u7684\u90A3\u4E00\u523B\u8D77\u52A0\u5BC6' },
    p1Desc: { en: 'Military-grade AES-256 encryption from the moment your voice is captured. On-device and in transit.', 'zh-CN': '\u4F60\u7684\u58F0\u97F3\u4E00\u88AB\u6355\u6349\u5C31\u5F00\u59CB\u519B\u7528\u7EA7AES-256\u52A0\u5BC6\u3002\u8BBE\u5907\u7AEF\u548C\u4F20\u8F93\u4E2D\u3002', 'zh-HK': '\u4F60\u7684\u8072\u97F3\u4E00\u88AB\u6355\u6349\u5C31\u958B\u59CB\u8ECD\u7528\u7D1AAES-256\u52A0\u5BC6\u3002\u8A2D\u5099\u7AEF\u548C\u50B3\u8F38\u4E2D\u3002' },
    p2Title: { en: 'Stored only where you choose', 'zh-CN': '\u53EA\u5B58\u50A8\u5728\u4F60\u9009\u62E9\u7684\u5730\u65B9', 'zh-HK': '\u53EA\u5B58\u5132\u5728\u4F60\u9078\u64C7\u7684\u5730\u65B9' },
    p2Desc: { en: 'Local-first architecture. Your data is encrypted on the device before any upload. You control where it lives.', 'zh-CN': '\u672C\u5730\u4F18\u5148\u67B6\u6784\u3002\u4F60\u7684\u6570\u636E\u5728\u4E0A\u4F20\u524D\u90FD\u5728\u8BBE\u5907\u4E0A\u52A0\u5BC6\u3002\u4F60\u63A7\u5236\u5B83\u5B58\u50A8\u5728\u54EA\u91CC\u3002', 'zh-HK': '\u672C\u5730\u512A\u5148\u67B6\u69CB\u3002\u4F60\u7684\u6578\u64DA\u5728\u4E0A\u50B3\u524D\u90FD\u5728\u8A2D\u5099\u4E0A\u52A0\u5BC6\u3002\u4F60\u63A7\u5236\u5B83\u5B58\u5132\u5728\u54EA\u88E1\u3002' },
    p3Title: { en: 'No one can access it without your consent', 'zh-CN': '\u672A\u7ECF\u4F60\u7684\u540C\u610F\uFF0C\u65E0\u4EBA\u80FD\u8BBF\u95EE', 'zh-HK': '\u672A\u7D93\u4F60\u7684\u540C\u610F\uFF0C\u7121\u4EBA\u80FD\u8A2A\u554F' },
    p3Desc: { en: 'Zero-knowledge authentication. Cryptographic identity lock. Granular access controls. Revocable power of attorney. Your data, your rules.', 'zh-CN': '\u96F6\u77E5\u8BC6\u8BA4\u8BC1\u3002\u52A0\u5BC6\u8EAB\u4EFD\u9501\u5B9A\u3002\u7CBE\u7EC6\u5316\u8BBF\u95EE\u63A7\u5236\u3002\u53EF\u64A4\u9500\u7684\u6301\u4E45\u6388\u6743\u4E66\u3002\u4F60\u7684\u6570\u636E\uFF0C\u4F60\u7684\u89C4\u5219\u3002', 'zh-HK': '\u96F6\u77E5\u8B58\u8A8D\u8B49\u3002\u52A0\u5BC6\u8EAB\u4EFD\u9396\u5B9A\u3002\u7CBE\u7D30\u5316\u8A2A\u554F\u63A7\u5236\u3002\u53EF\u64A4\u92B7\u7684\u6301\u4E45\u6388\u6B0A\u66F8\u3002\u4F60\u7684\u6578\u64DA\uFF0C\u4F60\u7684\u898F\u5247\u3002' },
    p4Title: { en: 'You can delete everything, anytime', 'zh-CN': '\u4F60\u53EF\u4EE5\u968F\u65F6\u5220\u9664\u4E00\u5207', 'zh-HK': '\u4F60\u53EF\u4EE5\u96A8\u6642\u522A\u9664\u4E00\u5207' },
    p4Desc: { en: 'Full digital rights. Export your data, transfer it, or delete it permanently. You retain complete ownership.', 'zh-CN': '\u5B8C\u6574\u7684\u6570\u5B57\u6743\u5229\u3002\u5BFC\u51FA\u4F60\u7684\u6570\u636E\uFF0C\u8F6C\u79FB\u5B83\uFF0C\u6216\u6C38\u4E45\u5220\u9664\u5B83\u3002\u4F60\u4FDD\u7559\u5B8C\u5168\u7684\u6240\u6709\u6743\u3002', 'zh-HK': '\u5B8C\u6574\u7684\u6578\u5B57\u6B0A\u5229\u3002\u5C0E\u51FA\u4F60\u7684\u6578\u64DA\uFF0C\u8F49\u79FB\u5B83\uFF0C\u6216\u6C38\u4E45\u522A\u9664\u5B83\u3002\u4F60\u4FDD\u7559\u5B8C\u5168\u7684\u6240\u6709\u6B0A\u3002' },
    closing: { en: "We built SpiritTwin because we believe your story is the most precious thing you leave behind. And that story belongs to you. No one else.", 'zh-CN': "\u6211\u4EEC\u521B\u5EFA\u4E86SpiritTwin\uFF0C\u56E0\u4E3A\u6211\u4EEC\u76F8\u4FE1\u4F60\u7684\u6545\u4E8B\u662F\u4F60\u7559\u4E0B\u7684\u6700\u73CD\u8D35\u7684\u4E1C\u897F\u3002\u800C\u90A3\u4E2A\u6545\u4E8B\u5C5E\u4E8E\u4F60\u3002\u6CA1\u6709\u522B\u4EBA\u3002", 'zh-HK': "\u6211\u5011\u5275\u5EFA\u4E86SpiritTwin\uFF0C\u56E0\u70BA\u6211\u5011\u76F8\u4FE1\u4F60\u7684\u6545\u4E8B\u662F\u4F60\u7559\u4E0B\u7684\u6700\u73CD\u8CB4\u7684\u6771\u897F\u3002\u800C\u90A3\u500B\u6545\u4E8B\u5C6C\u65BC\u4F60\u3002\u6CA1\u6709\u5225\u4EBA\u3002" },
  },
  love: {
    line1: { en: "You don't end.", 'zh-CN': '\u4F60\u4E0D\u4F1A\u7ED3\u675F\u3002', 'zh-HK': '\u4F60\u4E0D\u6703\u7D50\u675F\u3002' },
    line2: { en: 'You just find new ways to be there.', 'zh-CN': '\u4F60\u53EA\u662F\u627E\u5230\u4E86\u65B0\u7684\u5B58\u5728\u65B9\u5F0F\u3002', 'zh-HK': '\u4F60\u53EA\u662F\u627E\u5230\u4E86\u65B0\u7684\u5B58\u5728\u65B9\u5F0F\u3002' },
  },
  uvp: {
    label: { en: 'WHY SPIRITTWIN', 'zh-CN': '\u4E3A\u4EC0\u4E48\u9009\u62E9\u6052\u53CC', 'zh-HK': '\u70BA\u4EC0\u9EBC\u9078\u64C7\u6052\u96D9' },
    title: { en: 'Why SpiritTwin', 'zh-CN': '\u4E3A\u4EC0\u4E48\u9009\u6052\u53CC', 'zh-HK': '\u70BA\u4EC0\u9EBC\u9078\u6052\u96D9' },
    tagline: {
      en: 'Thanatosensitive by Design \u2014 every feature respects the reality of mortality while preserving the dignity of your legacy.',
      'zh-CN': '\u6B7B\u4EA1\u654F\u611F\u8BBE\u8BA1\u2014\u2014\u6BCF\u4E2A\u529F\u80FD\u90FD\u5C0A\u91CD\u751F\u547D\u7684\u73B0\u5B9E\uFF0C\u540C\u65F6\u4FDD\u7559\u4F60\u9057\u4EA7\u7684\u5C0A\u4E25\u3002',
      'zh-HK': '\u6B7B\u4EA1\u654F\u611F\u8A2D\u8A08\u2014\u2014\u6BCF\u500B\u529F\u80FD\u90FD\u5C0A\u91CD\u751F\u547D\u7684\u73FE\u5BE6\uFF0C\u540C\u6642\u4FDD\u7559\u4F60\u907A\u7522\u7684\u5C0A\u56B4\u3002',
    },
    moats: [
      {
        en: 'First-Mover in Asia \u2014 Zero direct competition in AI legacy preservation',
        'zh-CN': '\u4E9A\u6D32\u5148\u884C\u8005\u2014\u2014AI\u9057\u4EA7\u4FDD\u5B58\u5E02\u573A\u96F6\u76F4\u63A5\u7ADE\u4E89',
        'zh-HK': '\u4E9E\u6D32\u5148\u884C\u8005\u2014\u2014AI\u907A\u7522\u4FDD\u5B58\u5E02\u5834\u96F6\u76F4\u63A5\u7AF6\u722D',
      },
      {
        en: 'Data Flywheel \u2014 Every conversation makes all SpiritTwins better',
        'zh-CN': '\u6570\u636E\u98DE\u8F6E\u2014\u2014\u6BCF\u6B21\u5BF9\u8BDD\u90FD\u8BA9\u6240\u6709SpiritTwin\u66F4\u5B8C\u5584',
        'zh-HK': '\u6578\u64DA\u98DB\u8F2A\u2014\u2014\u6BCF\u6B21\u5C0D\u8A71\u90FD\u8B93\u6240\u6709SpiritTwin\u66F4\u5B8C\u5584',
      },
      {
        en: 'Patient-Owned Data \u2014 You control your data, your access, your legacy',
        'zh-CN': '\u60A3\u8005\u62E5\u6709\u6570\u636E\u2014\u2014\u4F60\u63A7\u5236\u4F60\u7684\u6570\u636E\u3001\u8BBF\u95EE\u6743\u548C\u9057\u4EA7',
        'zh-HK': '\u60A3\u8005\u64C1\u6709\u6578\u64DA\u2014\u2014\u4F60\u63A7\u5236\u4F60\u7684\u6578\u64DA\u3001\u8A2A\u554F\u6B0A\u548C\u907A\u7522',
      },
      {
        en: 'Privacy Innovation \u2014 Patentable innovations around consent and patient security',
        'zh-CN': '\u9690\u79C1\u521B\u65B0\u2014\u2014\u56F4\u7ED5\u540C\u610F\u548C\u60A3\u8005\u5B89\u5168\u7684\u53EF\u4E13\u5229\u521B\u65B0',
        'zh-HK': '\u79C1\u96B1\u5275\u65B0\u2014\u2014\u570D\u7E5E\u540C\u610F\u548C\u60A3\u8005\u5B89\u5168\u7684\u53EF\u5C08\u5229\u5275\u65B0',
      },
      {
        en: 'Proven Team \u2014 9.5-year co-founder relationship (James + Tobias)',
        'zh-CN': '\u7ECF\u9A8C\u8BC1\u7684\u56E2\u961F\u2014\u20149.5\u5E74\u8054\u5408\u521B\u59CB\u4EBA\u5173\u7CFB\uFF08James + Tobias\uFF09',
        'zh-HK': '\u7D93\u9A57\u8B49\u7684\u5718\u968A\u2014\u20149.5\u5E74\u806F\u5408\u5275\u59CB\u4EBA\u95DC\u4FC2\uFF08James + Tobias\uFF09',
      },
      {
        en: 'Chinese Voice AI \u2014 Exclusive Doubao/Volcano Engine pipeline',
        'zh-CN': '\u4E2D\u56FD\u8BED\u97F3AI\u2014\u2014\u72EC\u5BB6Doubao/\u706B\u5C71\u5F15\u64CE\u7BA1\u9053',
        'zh-HK': '\u4E2D\u570B\u8A9E\u97F3AI\u2014\u2014\u7368\u5BB6Doubao/\u706B\u5C71\u5F15\u64CE\u7BA1\u9053',
      },
      {
        en: 'Emotion Detection \u2014 Vocadian partnership for voice biomarker analysis',
        'zh-CN': '\u60C5\u7EEA\u68C0\u6D4B\u2014\u2014Vocadian\u5408\u4F5C\u8FDB\u884C\u8BED\u97F3\u751F\u7269\u6807\u5FD7\u7269\u5206\u6790',
        'zh-HK': '\u60C5\u7DD2\u6AA2\u6E2C\u2014\u2014Vocadian\u5408\u4F5C\u9032\u884C\u8A9E\u97F3\u751F\u7269\u6A19\u8A8C\u7269\u5206\u6790',
      },
      {
        en: 'Cultural Moat \u2014 5,000-year ancestor veneration tradition',
        'zh-CN': '\u6587\u5316\u62A4\u57CE\u6CB3\u2014\u20145,000\u5E74\u7956\u5148\u5D07\u62DC\u4F20\u7EDF',
        'zh-HK': '\u6587\u5316\u8B77\u57CE\u6CB3\u2014\u20145,000\u5E74\u7956\u5148\u5D07\u62DC\u50B3\u7D71',
      },
    ],
  },
  team: {
    label: { en: 'THE TEAM', 'zh-CN': '\u56E2\u961F', 'zh-HK': '\u5718\u968A' },
    title: { en: 'The Founders', 'zh-CN': '\u521B\u59CB\u4EBA', 'zh-HK': '\u5275\u59CB\u4EBA' },
    james: {
      name: { en: 'James Wong', 'zh-CN': 'James Wong', 'zh-HK': 'James Wong' },
      role: { en: 'Chief Executive Officer', 'zh-CN': '\u9996\u5E2D\u6267\u884C\u5B98', 'zh-HK': '\u9996\u5E2D\u57F7\u884C\u5B98' },
      bio: {
        en: 'McKinsey Partner 20+ years. Led AI and technology practice across 17 countries. Full-time commitment.',
        'zh-CN': '\u9EA6\u80AF\u9521\u5408\u4F19\u4EBA20+\u5E74\u3002\u572817\u4E2A\u56FD\u5BB6\u9886\u5BFCAI\u548C\u6280\u672F\u5B9E\u8DF5\u3002\u5168\u804C\u6295\u5165\u3002',
        'zh-HK': '\u9EA5\u80AF\u9321\u5408\u4F19\u4EBA20+\u5E74\u3002\u572817\u500B\u570B\u5BB6\u9818\u5C0EAI\u548C\u6280\u8853\u5BE6\u8E10\u3002\u5168\u8077\u6295\u5165\u3002',
      },
    },
    tobias: {
      name: { en: 'Tobias B\u00fcschel', 'zh-CN': 'Tobias B\u00fcschel', 'zh-HK': 'Tobias B\u00fcschel' },
      role: { en: 'Chief Technology Officer', 'zh-CN': '\u9996\u5E2D\u6280\u672F\u5B98', 'zh-HK': '\u9996\u5E2D\u6280\u8853\u5B98' },
      bio: {
        en: "Former OpenAI FDE Lead. Built McKinsey's 'Lilli' AI platform (100K+ MAU). 9.5 years with James.",
        'zh-CN': "\u524DOpenAI FDE\u8D1F\u8D23\u4EBA\u3002\u6784\u5EFA\u9EA6\u80AF\u9521'Lilli' AI\u5E73\u53F0\uFF0810\u4E07+\u6708\u6D3B\uFF09\u3002\u4E0EJames\u5408\u4F5C9.5\u5E74\u3002",
        'zh-HK': "\u524DOpenAI FDE\u8CA0\u8CAC\u4EBA\u3002\u69CB\u5EFA\u9EA5\u80AF\u9321'Lilli' AI\u5E73\u53F0\uFF0810\u842C+\u6708\u6D3B\uFF09\u3002\u8207James\u5408\u4F5C9.5\u5E74\u3002",
      },
    },
    reina: {
      name: { en: 'Reina Mun', 'zh-CN': 'Reina Mun', 'zh-HK': 'Reina Mun' },
      role: { en: 'Prototype Lead', 'zh-CN': '\u539F\u578B\u8D1F\u8D23\u4EBA', 'zh-HK': '\u539F\u578B\u8CA0\u8CAC\u4EBA' },
      bio: {
        en: 'Harvard PhD (Computational Design), MIT MS 5.0/5.0. Edge AI, physiological sensing, HMS researcher.',
        'zh-CN': '\u54C8\u4F5B\u535A\u58EB\uFF08\u8BA1\u7B97\u8BBE\u8BA1\uFF09\uFF0C\u9EBB\u7701\u7406\u5DE5\u7855\u58EB5.0/5.0\u3002\u8FB9\u7F18AI\u3001\u751F\u7406\u4F20\u611F\u3001\u54C8\u4F5B\u533B\u5B66\u9662\u7814\u7A76\u5458\u3002',
        'zh-HK': '\u54C8\u4F5B\u535A\u58EB\uFF08\u8A08\u7B97\u8A2D\u8A08\uFF09\uFF0C\u9EBB\u7701\u7406\u5DE5\u78BC\u58EB5.0/5.0\u3002\u908A\u7DE3AI\u3001\u751F\u7406\u50B3\u611F\u3001\u54C8\u4F5B\u91AB\u5B78\u9662\u7814\u7A76\u54E1\u3002',
      },
    },
  },
  partners: {
    label: { en: 'PARTNERS', 'zh-CN': '\u5408\u4F5C\u4F19\u4F34', 'zh-HK': '\u5408\u4F5C\u5925\u4F34' },
    title: { en: 'Our Partners', 'zh-CN': '\u5408\u4F5C\u4F19\u4F34', 'zh-HK': '\u5408\u4F5C\u5925\u4F34' },
    vocadian: {
      name: { en: 'Vocadian', 'zh-CN': 'Vocadian', 'zh-HK': 'Vocadian' },
      role: { en: 'Emotion Detection Partner', 'zh-CN': '\u60C5\u7EEA\u68C0\u6D4B\u5408\u4F5C\u4F19\u4F34', 'zh-HK': '\u60C5\u7DD2\u6AA2\u6E2C\u5408\u4F5C\u5925\u4F34' },
      desc: {
        en: 'Emotion detection from voice biomarkers. Led by Yujie Wang.',
        'zh-CN': '\u4ECE\u8BED\u97F3\u751F\u7269\u6807\u5FD7\u7269\u68C0\u6D4B\u60C5\u7EEA\u3002\u7531\u738B\u5B87\u6770\u9886\u5BFC\u3002',
        'zh-HK': '\u5F9E\u8A9E\u97F3\u751F\u7269\u6A19\u8A8C\u7269\u6AA2\u6E2C\u60C5\u7DD2\u3002\u7531\u738B\u5B87\u5091\u9818\u5C0E\u3002',
      },
    },
    doubao: {
      name: { en: 'Doubao / Volcano Engine', 'zh-CN': 'Doubao / \u706B\u5C71\u5F15\u64CE', 'zh-HK': 'Doubao / \u706B\u5C71\u5F15\u64CE' },
      role: { en: 'Voice AI Partner', 'zh-CN': '\u8BED\u97F3AI\u5408\u4F5C\u4F19\u4F34', 'zh-HK': '\u8A9E\u97F3AI\u5408\u4F5C\u5925\u4F34' },
      desc: {
        en: "ByteDance's voice pipeline for the Chinese market. ASR \u2192 LLM \u2192 TTS + RTC.",
        'zh-CN': "\u5B57\u8282\u8DF3\u52A8\u9762\u5411\u4E2D\u56FD\u5E02\u573A\u7684\u8BED\u97F3\u7BA1\u9053\u3002ASR \u2192 LLM \u2192 TTS + RTC\u3002",
        'zh-HK': "\u5B57\u7BC0\u8DF3\u52D5\u9762\u5411\u4E2D\u570B\u5E02\u5834\u7684\u8A9E\u97F3\u7BA1\u9053\u3002ASR \u2192 LLM \u2192 TTS + RTC\u3002",
      },
    },
  },
  waitlist: {
    label: { en: 'JOIN THE WAITLIST', 'zh-CN': '\u52A0\u5165\u7B49\u5019\u540D\u5355', 'zh-HK': '\u52A0\u5165\u7B49\u5019\u540D\u55AE' },
    title: { en: 'Join the Waitlist', 'zh-CN': '\u52A0\u5165\u7B49\u5019\u540D\u5355', 'zh-HK': '\u52A0\u5165\u7B49\u5019\u540D\u55AE' },
    titleAlt: { en: 'Be among the first', 'zh-CN': '\u6210\u4E3A\u9996\u6279', 'zh-HK': '\u6210\u70BA\u9996\u6279' },
    subtitle: {
      en: "We're crafting each SpiritTwin with care. Limited spots available.",
      'zh-CN': '\u6211\u4EEC\u7528\u5FC3\u6253\u9020\u6BCF\u4E00\u4E2ASpiritTwin\u3002\u540D\u989D\u6709\u9650\u3002',
      'zh-HK': '\u6211\u5011\u7528\u5FC3\u6253\u9020\u6BCF\u4E00\u500BSpiritTwin\u3002\u540D\u984D\u6709\u9650\u3002',
    },
    nameLabel: { en: 'Full Name', 'zh-CN': '\u59D3\u540D', 'zh-HK': '\u59D3\u540D' },
    emailLabel: { en: 'Email Address', 'zh-CN': '\u7535\u5B50\u90AE\u7BB1', 'zh-HK': '\u96FB\u5B50\u90F5\u7BB1' },
    phoneLabel: { en: 'Phone Number', 'zh-CN': '\u7535\u8BDD\u53F7\u7801', 'zh-HK': '\u96FB\u8A71\u865F\u78BC' },
    phoneOptional: { en: 'Optional', 'zh-CN': '\u9009\u586B', 'zh-HK': '\u9078\u586B' },
    langLabel: { en: 'Preferred Language', 'zh-CN': '\u504F\u597D\u8BED\u8A00', 'zh-HK': '\u504F\u597D\u8A9E\u8A00' },
    tierLabel: { en: 'Interest Tier', 'zh-CN': '\u611F\u5174\u8DA3\u7684\u670D\u52A1', 'zh-HK': '\u611F\u8208\u8DA3\u7684\u670D\u52D9' },
    tierVoice: { en: 'Voice', 'zh-CN': '\u58F0\u97F3', 'zh-HK': '\u8072\u97F3' },
    tierVideo: { en: 'Video', 'zh-CN': '\u89C6\u9891', 'zh-HK': '\u8996\u983B' },
    tierHolo: { en: 'Hologram', 'zh-CN': '\u5168\u606F', 'zh-HK': '\u5168\u606F' },
    tierUndecided: { en: 'Not sure yet', 'zh-CN': '\u8FD8\u6CA1\u51B3\u5B9A', 'zh-HK': '\u9084\u6C92\u6C7A\u5B9A' },
    submitBtn: { en: 'Join the Waitlist', 'zh-CN': '\u52A0\u5165\u7B49\u5019\u540D\u5355', 'zh-HK': '\u52A0\u5165\u7B49\u5019\u540D\u55AE' },
    note: { en: "No commitment required. We'll reach out when we're ready to begin your journey.", 'zh-CN': '\u65E0\u9700\u627F\u8BFA\u3002\u5F53\u6211\u4EEC\u51C6\u5907\u597D\u5F00\u542F\u4F60\u7684\u65C5\u7A0B\u65F6\uFF0C\u4F1A\u4E0E\u4F60\u8054\u7CFB\u3002', 'zh-HK': '\u7121\u9700\u627F\u8AFE\u3002\u7576\u6211\u5011\u6E96\u5099\u597D\u958B\u555F\u4F60\u7684\u65C5\u7A0B\u6642\uFF0C\u6703\u8207\u4F60\u806F\u7E6B\u3002' },
    successTitle: { en: 'Thank you', 'zh-CN': '\u8C22\u8C22\u4F60', 'zh-HK': '\u8B1D\u8B1D\u4F60' },
    successBody: { en: "We have your details. We'll be in touch soon to discuss your investment.", 'zh-CN': '\u6211\u4EEC\u5DF2\u6536\u5230\u4F60\u7684\u4FE1\u606F\u3002\u6211\u4EEC\u4F1A\u5C3D\u5FEB\u4E0E\u4F60\u8054\u7CFB\uFF0C\u8BA8\u8BBA\u4F60\u7684\u6295\u8D44\u3002', 'zh-HK': '\u6211\u5011\u5DF2\u6536\u5230\u4F60\u7684\u4FE1\u606F\u3002\u6211\u5011\u6703\u76E1\u5FEB\u8207\u4F60\u806F\u7E6B\uFF0C\u8A0E\u8AD6\u4F60\u7684\u6295\u8CC7\u3002' },
    name: { en: 'Full Name', 'zh-CN': '\u5168\u540D', 'zh-HK': '\u5168\u540D' },
    email: { en: 'Email Address', 'zh-CN': '\u7535\u5B50\u90AE\u4EF6', 'zh-HK': '\u96FB\u5B50\u90F5\u4EF6' },
    phone: { en: 'Phone Number', 'zh-CN': '\u7535\u8BDD\u53F7\u7801', 'zh-HK': '\u96FB\u8A71\u865F\u78BC' },
    lang: { en: 'Preferred Language', 'zh-CN': '\u9996\u9009\u8BED\u8A00', 'zh-HK': '\u9996\u9078\u8A9E\u8A00' },
    tier: { en: 'Interest Tier', 'zh-CN': '\u611F\u5174\u8DA3\u7EA7\u522B', 'zh-HK': '\u611F\u8208\u8DA3\u7D1A\u5225' },
    submit: { en: 'Reserve My Spot', 'zh-CN': '\u9884\u7559\u6211\u7684\u4F4D\u7F6E', 'zh-HK': '\u9810\u7559\u6211\u7684\u4F4D\u7F6E' },
    options: {
      english: { en: 'English', 'zh-CN': 'English', 'zh-HK': 'English' },
      mandarin: { en: 'Mandarin (\u7B80\u4F53\u4E2D\u6587)', 'zh-CN': '\u7B80\u4F53\u4E2D\u6587', 'zh-HK': '\u7C21\u9AD4\u4E2D\u6587' },
      cantonese: { en: 'Cantonese (\u7E41\u9AD4\u4E2D\u6587)', 'zh-CN': '\u7E41\u4F53\u4E2D\u6587', 'zh-HK': '\u7E41\u9AD4\u4E2D\u6587' },
      voice: { en: 'Spirit Voice', 'zh-CN': '\u7075\u97F3', 'zh-HK': '\u9748\u97F3' },
      presence: { en: 'Spirit Presence', 'zh-CN': '\u7075\u5728', 'zh-HK': '\u9748\u5728' },
      beyond: { en: 'Spirit Beyond', 'zh-CN': '\u7075\u8D8A', 'zh-HK': '\u9748\u8D8A' },
      undecided: { en: 'Undecided', 'zh-CN': '\u672A\u51B3\u5B9A', 'zh-HK': '\u672A\u6C7A\u5B9A' },
    },
  },
  faq: {
    label: { en: 'FAQ', 'zh-CN': '\u5E38\u89C1\u95EE\u9898', 'zh-HK': '\u5E38\u898B\u554F\u984C' },
    title: { en: 'Questions You May Have', 'zh-CN': '\u4F60\u53EF\u80FD\u60F3\u77E5\u9053\u7684\u95EE\u9898', 'zh-HK': '\u4F60\u53EF\u80FD\u60F3\u77E5\u9053\u7684\u554F\u984C' },
    items: [
      {
        q: { en: 'What exactly is a SpiritTwin?', 'zh-CN': 'SpiritTwin\u7A76\u7ADF\u662F\u4EC0\u4E48\uFF1F', 'zh-HK': 'SpiritTwin\u7A76\u7ADF\u662F\u4EC0\u9EBC\uFF1F' },
        a: { en: "Your SpiritTwin is an AI-powered digital preservation of you. Through natural conversations with a companion doll, we capture your voice, your personality, your stories, and your character. When the time comes, your loved ones can have real conversations with your SpiritTwin \u2014 hearing your voice, seeing your expressions, feeling your presence. It is not a replacement of you. It is a way for you to remain present for the people you love.", 'zh-CN': "\u4F60\u7684SpiritTwin\u662F\u4E00\u4E2AAI\u9A71\u52A8\u7684\u6570\u5B57\u5316\u4FDD\u5B58\u3002\u901A\u8FC7\u4E0E\u4F34\u4FA3\u5A03\u5A03\u7684\u81EA\u7136\u5BF9\u8BDD\uFF0C\u6211\u4EEC\u6355\u6349\u4F60\u7684\u58F0\u97F3\u3001\u6027\u683C\u3001\u6545\u4E8B\u548C\u54C1\u683C\u3002\u5F53\u65F6\u673A\u6210\u719F\u65F6\uFF0C\u4F60\u7684\u7231\u4EBA\u4EEC\u53EF\u4EE5\u4E0E\u4F60\u7684SpiritTwin\u8FDB\u884C\u771F\u5B9E\u5BF9\u8BDD\u2014\u2014\u542C\u5230\u4F60\u7684\u58F0\u97F3\uFF0C\u770B\u5230\u4F60\u7684\u8868\u60C5\uFF0C\u611F\u53D7\u4F60\u7684\u5B58\u5728\u3002\u5B83\u4E0D\u662F\u66FF\u4EE3\u4F60\u3002\u800C\u662F\u4F60\u7EE7\u7EED\u966A\u4F34\u4F60\u7231\u7684\u4EBA\u7684\u65B9\u5F0F\u3002", 'zh-HK': "\u4F60\u7684SpiritTwin\u662F\u4E00\u500BAI\u9A45\u52D5\u7684\u6578\u5B57\u5316\u4FDD\u5B58\u3002\u901A\u904E\u8207\u4F34\u4FB6\u5A03\u5A03\u7684\u81EA\u7136\u5C0D\u8A71\uFF0C\u6211\u5011\u6355\u6349\u4F60\u7684\u8072\u97F3\u3001\u6027\u683C\u3001\u6545\u4E8B\u548C\u54C1\u683C\u3002\u7576\u6642\u6A5F\u6210\u719F\u6642\uFF0C\u4F60\u7684\u611B\u4EBA\u5011\u53EF\u4EE5\u8207\u4F60\u7684SpiritTwin\u9032\u884C\u771F\u5BE6\u5C0D\u8A71\u2014\u2014\u807D\u5230\u4F60\u7684\u8072\u97F3\uFF0C\u770B\u5230\u4F60\u7684\u8868\u60C5\uFF0C\u611F\u53D7\u4F60\u7684\u5B58\u5728\u3002\u5B83\u4E0D\u662F\u66FF\u4EE3\u4F60\u3002\u800C\u662F\u4F60\u7E7C\u7E8C\u966A\u4F34\u4F60\u611B\u7684\u4EBA\u7684\u65B9\u5F0F\u3002" },
      },
      {
        q: { en: 'Who owns my data and who can access my SpiritTwin?', 'zh-CN': '\u8C01\u62E5\u6709\u6211\u7684\u6570\u636E\uFF1F\u8C01\u53EF\u4EE5\u8BBF\u95EE\u6211\u7684SpiritTwin\uFF1F', 'zh-HK': '\u8AB0\u64C1\u6709\u6211\u7684\u6578\u64DA\uFF1F\u8AB0\u53EF\u4EE5\u8A2A\u554F\u6211\u7684SpiritTwin\uFF1F' },
        a: { en: "You do. Period. You retain full ownership of all your data. You decide exactly who can access your SpiritTwin, when they can access it, and what form of interaction they are allowed to use. You can grant access to specific loved ones, revoke it at any time, or designate someone to manage access through a power of attorney. Without your explicit consent, no one \u2014 not even SpiritTwin as a company \u2014 can access your data.", 'zh-CN': "\u4F60\u3002\u6C38\u8FDC\u3002\u4F60\u4FDD\u7559\u5BF9\u6240\u6709\u6570\u636E\u7684\u5B8C\u5168\u6240\u6709\u6743\u3002\u4F60\u51B3\u5B9A\u8C01\u53EF\u4EE5\u8BBF\u95EE\u4F60\u7684SpiritTwin\u3001\u4F55\u65F6\u53EF\u4EE5\u8BBF\u95EE\u4EE5\u53CA\u4ED6\u4EEC\u53EF\u4EE5\u4F7F\u7528\u4EC0\u4E48\u5F62\u5F0F\u7684\u4EA4\u4E92\u3002\u4F60\u53EF\u4EE5\u6388\u4E88\u7279\u5B9A\u7684\u7231\u4EBA\u8BBF\u95EE\u6743\u3001\u968F\u65F6\u64A4\u9500\uFF0C\u6216\u901A\u8FC7\u6301\u4E45\u6388\u6743\u4E66\u6307\u5B9A\u7BA1\u7406\u4EBA\u3002\u6CA1\u6709\u4F60\u7684\u660E\u786E\u540C\u610F\uFF0C\u6CA1\u6709\u4EBA\u2014\u2014\u5305\u62ECSpiritTwin\u516C\u53F8\u672C\u8EAB\u2014\u2014\u53EF\u4EE5\u8BBF\u95EE\u4F60\u7684\u6570\u636E\u3002", 'zh-HK': "\u4F60\u3002\u6C38\u9060\u3002\u4F60\u4FDD\u7559\u5C0D\u6240\u6709\u6578\u64DA\u7684\u5B8C\u5168\u6240\u6709\u6B0A\u3002\u4F60\u6C7A\u5B9A\u8AB0\u53EF\u4EE5\u8A2A\u554F\u4F60\u7684SpiritTwin\u3001\u4F55\u6642\u53EF\u4EE5\u8A2A\u554F\u4EE5\u53CA\u4ED6\u5011\u53EF\u4EE5\u4F7F\u7528\u4EC0\u9EBC\u5F62\u5F0F\u7684\u4EA4\u4E92\u3002\u4F60\u53EF\u4EE5\u6388\u4E88\u7279\u5B9A\u7684\u611B\u4EBA\u8A2A\u554F\u6B0A\u3001\u96A8\u6642\u64A4\u92B7\uFF0C\u6216\u901A\u904E\u6301\u4E45\u6388\u6B0A\u66F8\u6307\u5B9A\u7BA1\u7406\u4EBA\u3002\u6C92\u6709\u4F60\u7684\u660E\u78BA\u540C\u610F\uFF0C\u6C92\u6709\u4EBA\u2014\u2014\u5305\u62ECSpiritTwin\u516C\u53F8\u672C\u8EAB\u2014\u2014\u53EF\u4EE5\u8A2A\u554F\u4F60\u7684\u6578\u64DA\u3002" },
      },
      {
        q: { en: 'How long will my SpiritTwin be preserved?', 'zh-CN': '\u6211\u7684SpiritTwin\u4F1A\u88AB\u4FDD\u5B58\u591A\u4E45\uFF1F', 'zh-HK': '\u6211\u7684SpiritTwin\u6703\u88AB\u4FDD\u5B58\u591A\u4E45\uFF1F' },
        a: { en: "You choose. We offer flexible storage from 1 to 100 years. A nominal storage fee applies based on your chosen duration (1 to 100 years). You can change your mind at any time \u2014 extend, shorten, or delete your storage plan. Your SpiritTwin remains encrypted and protected for as long as you wish it to exist. You remain in complete control.", 'zh-CN': "\u4F60\u9009\u62E9\u3002\u6211\u4EEC\u63D0\u4F9B\u4E24\u79CD\u5B58\u50A8\u65F6\u957F\uFF1A1\u5E74\u81F3100\u5E74\u3002\u6839\u636E\u4F60\u9009\u62E9\u7684\u65F6\u957F\u6536\u53D6\u5C11\u91CF\u5B58\u50A8\u8D39\u3002\u4F60\u53EF\u4EE5\u968F\u65F6\u6539\u53D8\u4E3B\u610F\u2014\u2014\u5EF6\u957F\u3001\u7F29\u77ED\u6216\u5220\u9664\u4F60\u7684\u5B58\u50A8\u8BA1\u5212\u3002\u4F60\u7684SpiritTwin\u5C06\u59CB\u7EC8\u52A0\u5BC6\u5E76\u53D7\u5230\u4FDD\u62A4\uFF0C\u5B58\u5728\u591A\u4E45\u7531\u4F60\u51B3\u5B9A\u3002\u4F60\u59CB\u7EC8\u638C\u63A7\u4E00\u5207\u3002", 'zh-HK': "\u4F60\u9078\u64C7\u3002\u6211\u5011\u63D0\u4F9B\u5169\u7A2E\u5B58\u5132\u6642\u9577\uFF1A1\u5E74\u81F3100\u5E74\u3002\u6839\u64DA\u4F60\u9078\u64C7\u7684\u6642\u9577\u6536\u53D6\u5C11\u91CF\u5B58\u5132\u8CBB\u3002\u4F60\u53EF\u4EE5\u96A8\u6642\u6539\u8B8A\u4E3B\u610F\u2014\u2014\u5EF6\u9577\u3001\u7E2E\u77ED\u6216\u522A\u9664\u4F60\u7684\u5B58\u5132\u8A08\u5283\u3002\u4F60\u7684SpiritTwin\u5C07\u59CB\u7D42\u52A0\u5BC6\u4E26\u53D7\u5230\u4FDD\u8B77\uFF0C\u5B58\u5728\u591A\u4E45\u7531\u4F60\u6C7A\u5B9A\u3002\u4F60\u59CB\u7D42\u638C\u63A7\u4E00\u5207\u3002" },
      },
      {
        q: { en: 'What will it cost me and my loved ones?', 'zh-CN': '\u8FD9\u5BF9\u6211\u548C\u6211\u7684\u7231\u4EBA\u4EEC\u4F1A\u6709\u4EC0\u4E48\u8D39\u7528\uFF1F', 'zh-HK': '\u9019\u5C0D\u6211\u548C\u6211\u7684\u611B\u4EBA\u5011\u6703\u6709\u4EC0\u9EBC\u8CBB\u7528\uFF1F' },
        a: { en: "Think of it as an investment in your continued presence. The creation of your SpiritTwin is a one-time investment. Storage carries a nominal fee based on your chosen duration (1 to 100 years). When your loved ones wish to connect with you, they pay an hourly access fee \u2014 similar to how one might pay for a meaningful experience. Exact pricing is shared during your private consultation, as each journey is unique. Join the waitlist to learn more.", 'zh-CN': "\u5C06\u5176\u89C6\u4E3A\u5BF9\u4F60\u6301\u7EED\u5B58\u5728\u7684\u6295\u8D44\u3002SpiritTwin\u7684\u521B\u5EFA\u662F\u4E00\u6B21\u6027\u6295\u8D44\u3002\u5B58\u50A8\u6839\u636E\u4F60\u9009\u62E9\u7684\u65F6\u957F\uFF081\u5E74\u81F3100\u5E74\uFF09\u6536\u53D6\u5C11\u91CF\u8D39\u7528\u3002\u5F53\u4F60\u7684\u7231\u4EBA\u4EEC\u60F3\u4E0E\u4F60\u8FDE\u63A5\u65F6\uFF0C\u4ED6\u4EEC\u652F\u4ED8\u6309\u5C0F\u65F6\u8BA1\u7B97\u7684\u8BBF\u95EE\u8D39\u2014\u2014\u7C7B\u4F3C\u4E8E\u4E3A\u4E00\u6B21\u6709\u610F\u4E49\u7684\u4F53\u9A8C\u4ED8\u8D39\u3002\u6BCF\u4E2A\u65C5\u7A0B\u90FD\u662F\u72EC\u7279\u7684\uFF0C\u5177\u4F53\u5B9A\u4EF7\u5728\u79C1\u4EBA\u54A8\u8BE2\u4E2D\u5206\u4EAB\u3002\u52A0\u5165\u7B49\u5019\u540D\u5355\u4E86\u89E3\u66F4\u591A\u3002", 'zh-HK': "\u5C07\u5176\u8996\u70BA\u5C0D\u4F60\u6301\u7E8C\u5B58\u5728\u7684\u6295\u8CC7\u3002SpiritTwin\u7684\u5275\u5EFA\u662F\u4E00\u6B21\u6027\u6295\u8CC7\u3002\u5B58\u5132\u6839\u64DA\u4F60\u9078\u64C7\u7684\u6642\u9577\uFF081\u5E74\u81F3100\u5E74\uFF09\u6536\u53D6\u5C11\u91CF\u8CBB\u7528\u3002\u7576\u4F60\u7684\u611B\u4EBA\u5011\u60F3\u8207\u4F60\u9023\u7D50\u6642\uFF0C\u4ED6\u5011\u652F\u4ED8\u6309\u5C0F\u6642\u8A08\u7B97\u7684\u8A2A\u554F\u8CBB\u2014\u2014\u985E\u4F3C\u65BC\u70BA\u4E00\u6B21\u6709\u610F\u7FA9\u7684\u9AD4\u9A57\u4ED8\u8CBB\u3002\u6BCF\u6BB5\u65C5\u7A0B\u90FD\u662F\u7368\u7279\u7684\uFF0C\u5177\u9AD4\u5B9A\u50F9\u5728\u79C1\u4EBA\u54A8\u8A62\u4E2D\u5206\u4EAB\u3002\u52A0\u5165\u7B49\u5019\u540D\u55AE\u4E86\u89E3\u66F4\u591A\u3002" },
      },
      {
        q: { en: 'Can I delete my SpiritTwin if I change my mind?', 'zh-CN': '\u5982\u679C\u6211\u6539\u53D8\u4E3B\u610F\uFF0C\u53EF\u4EE5\u5220\u9664\u6211\u7684SpiritTwin\u5417\uFF1F', 'zh-HK': '\u5982\u679C\u6211\u6539\u8B8A\u4E3B\u610F\uFF0C\u53EF\u4EE5\u522A\u9664\u6211\u7684SpiritTwin\u55CE\uFF1F' },
        a: { en: "Absolutely. You have full digital rights over your SpiritTwin. You can export your data, transfer it, or delete it permanently at any time. No questions asked. Your data belongs to you and only you. We believe that control over your own legacy is a fundamental right.", 'zh-CN': "\u5F53\u7136\u53EF\u4EE5\u3002\u4F60\u5BF9\u4F60\u7684SpiritTwin\u62E5\u6709\u5B8C\u6574\u7684\u6570\u5B57\u6743\u5229\u3002\u4F60\u53EF\u4EE5\u968F\u65F6\u5BFC\u51FA\u4F60\u7684\u6570\u636E\u3001\u8F6C\u79FB\u5B83\uFF0C\u6216\u6C38\u4E45\u5220\u9664\u5B83\u3002\u65E0\u9700\u4EFB\u4F55\u89E3\u91CA\u3002\u4F60\u7684\u6570\u636E\u5C5E\u4E8E\u4F60\uFF0C\u4EC5\u5C5E\u4E8E\u4F60\u3002\u6211\u4EEC\u76F8\u4FE1\uFF0C\u5BF9\u81EA\u5DF1\u9057\u4EA7\u7684\u63A7\u5236\u662F\u4E00\u9879\u57FA\u672C\u6743\u5229\u3002", 'zh-HK': "\u7576\u7136\u53EF\u4EE5\u3002\u4F60\u5C0D\u4F60\u7684SpiritTwin\u64C1\u6709\u5B8C\u6574\u7684\u6578\u5B57\u6B0A\u5229\u3002\u4F60\u53EF\u4EE5\u96A8\u6642\u5C0E\u51FA\u4F60\u7684\u6578\u64DA\u3001\u8F49\u79FB\u5B83\uFF0C\u6216\u6C38\u4E45\u522A\u9664\u5B83\u3002\u7121\u9700\u4EFB\u4F55\u89E3\u91CB\u3002\u4F60\u7684\u6578\u64DA\u5C6C\u65BC\u4F60\uFF0C\u50C5\u5C6C\u65BC\u4F60\u3002\u6211\u5011\u76F8\u4FE1\uFF0C\u5C0D\u81EA\u5DF1\u907A\u7522\u7684\u63A7\u5236\u662F\u4E00\u9805\u57FA\u672C\u6B0A\u5229\u3002" },
      },
      {
        q: { en: 'What happens if SpiritTwin the company is no longer around?', 'zh-CN': '\u5982\u679CSpiritTwin\u516C\u53F8\u4E0D\u518D\u5B58\u5728\u4E86\u600E\u4E48\u529E\uFF1F', 'zh-HK': '\u5982\u679CSpiritTwin\u516C\u53F8\u4E0D\u518D\u5B58\u5728\u4E86\u600E\u9EBC\u8FA6\uFF1F' },
        a: { en: "We have structured SpiritTwin with longevity in mind. Your data is stored in encrypted form across multiple secure locations. In the unlikely event that SpiritTwin ceases operations, your data remains accessible to you or your designated representatives. You can export your SpiritTwin at any time \u2014 it is your property. We are also exploring partnerships with estate planning firms to ensure continuity across generations.", 'zh-CN': "\u6211\u4EEC\u4ECE\u4E00\u5F00\u59CB\u5C31\u4E3A\u957F\u4E45\u6027\u8BBE\u8BA1\u4E86SpiritTwin\u3002\u4F60\u7684\u6570\u636E\u4EE5\u52A0\u5BC6\u5F62\u5F0F\u5B58\u50A8\u5728\u591A\u4E2A\u5B89\u5168\u4F4D\u7F6E\u3002\u5373\u4F7F\u5728\u4E0D\u53EF\u80FD\u7684\u60C5\u51B5\u4E0BSpiritTwin\u505C\u6B62\u904B\u8425\uFF0C\u4F60\u7684\u6570\u636E\u4ECD\u7136\u53EF\u4EE5\u88AB\u4F60\u6216\u4F60\u6307\u5B9A\u7684\u4EE3\u8868\u8BBF\u95EE\u3002\u4F60\u53EF\u4EE5\u968F\u65F6\u5BFC\u51FA\u4F60\u7684SpiritTwin\u2014\u2014\u5B83\u662F\u4F60\u7684\u8D22\u4EA7\u3002\u6211\u4EEC\u4E5F\u5728\u4E0E\u9057\u4EA7\u89C4\u5212\u516C\u53F8\u63A2\u8BA8\u5408\u4F5C\uFF0C\u4EE5\u786E\u4FDD\u4EE3\u4EE3\u76F8\u4F20\u7684\u8FDE\u7EED\u6027\u3002", 'zh-HK': "\u6211\u5011\u5F9E\u4E00\u958B\u59CB\u5C31\u70BA\u9577\u4E45\u6027\u8A2D\u8A08\u4E86SpiritTwin\u3002\u4F60\u7684\u6578\u64DA\u4EE5\u52A0\u5BC6\u5F62\u5F0F\u5B58\u5132\u5728\u591A\u500B\u5B89\u5168\u4F4D\u7F6E\u3002\u5373\u4F7F\u5728\u4E0D\u53EF\u80FD\u7684\u60C5\u6CC1\u4E0BSpiritTwin\u505C\u6B62\u904B\u71DF\uFF0C\u4F60\u7684\u6578\u64DA\u4ECD\u7136\u53EF\u4EE5\u88AB\u4F60\u6216\u4F60\u6307\u5B9A\u7684\u4EE3\u8868\u8A2A\u554F\u3002\u4F60\u53EF\u4EE5\u96A8\u6642\u5C0E\u51FA\u4F60\u7684SpiritTwin\u2014\u2014\u5B83\u662F\u4F60\u7684\u8CA1\u7522\u3002\u6211\u5011\u4E5F\u5728\u8207\u907A\u7522\u898F\u5283\u516C\u53F8\u63A2\u8A0E\u5408\u4F5C\uFF0C\u4EE5\u78BA\u4FDD\u4EE3\u4EE3\u76F8\u50B3\u7684\u9023\u7E8C\u6027\u3002" },
      },
      {
        q: { en: 'How is this different from recording a video message?', 'zh-CN': '\u8FD9\u4E0E\u5F55\u5236\u89C6\u9891\u4FE1\u606F\u6709\u4EC0\u4E48\u4E0D\u540C\uFF1F', 'zh-HK': '\u9019\u8207\u9304\u88FD\u8996\u983B\u8A0A\u606F\u6709\u4EC0\u9EBC\u4E0D\u540C\uFF1F' },
        a: { en: "A video is static \u2014 it plays the same way every time. Your SpiritTwin is alive. It responds, adapts, and engages in real conversation. Your grandchild can ask about your childhood, seek your advice on a difficult decision, or simply hear your voice when they need comfort. Each interaction is unique because your SpiritTwin understands context and responds as you would. It preserves not just your image, but your character.", 'zh-CN': "\u89C6\u9891\u662F\u9759\u6001\u7684\u2014\u2014\u6BCF\u6B21\u64AD\u653E\u90FD\u4E00\u6A21\u4E00\u6837\u3002\u4F60\u7684SpiritTwin\u662F\u6D3B\u7684\u3002\u5B83\u4F1A\u56DE\u5E94\u3001\u9002\u5E94\u5E76\u8FDB\u884C\u771F\u5B9E\u5BF9\u8BDD\u3002\u4F60\u7684\u5B59\u5B50\u53EF\u4EE5\u8BE2\u95EE\u4F60\u7684\u7AE5\u5E74\u3001\u5FB5\u6C42\u4F60\u5BF9\u56F0\u96BE\u51B3\u5B9A\u7684\u5EFA\u8BAE\uFF0C\u6216\u53EA\u662F\u5728\u9700\u8981\u5B89\u6170\u65F6\u542C\u5230\u4F60\u7684\u58F0\u97F3\u3002\u6BCF\u6B21\u4EA4\u4E92\u90FD\u662F\u72EC\u7279\u7684\uFF0C\u56E0\u4E3A\u4F60\u7684SpiritTwin\u7406\u89E3\u4E0A\u4E0B\u6587\u5E76\u50CF\u4F60\u4E00\u6837\u56DE\u5E94\u3002\u5B83\u4FDD\u5B58\u7684\u4E0D\u4EC5\u662F\u4F60\u7684\u5F62\u8C61\uFF0C\u8FD8\u6709\u4F60\u7684\u54C1\u683C\u3002", 'zh-HK': "\u8996\u983B\u662F\u975C\u614B\u7684\u2014\u2014\u6BCF\u6B21\u64AD\u653E\u90FD\u4E00\u6A21\u4E00\u6A23\u3002\u4F60\u7684SpiritTwin\u662F\u6D3B\u7684\u3002\u5B83\u6703\u56DE\u61C9\u3001\u9069\u61C9\u4E26\u9032\u884C\u771F\u5BE6\u5C0D\u8A71\u3002\u4F60\u7684\u5B6B\u5B50\u53EF\u4EE5\u8A62\u554F\u4F60\u7684\u7AE5\u5E74\u3001\u5FB5\u6C42\u4F60\u5C0D\u56F0\u96E3\u6C7A\u5B9A\u7684\u5EFA\u8B70\uFF0C\u6216\u53EA\u662F\u5728\u9700\u8981\u5B89\u6170\u6642\u807D\u5230\u4F60\u7684\u8072\u97F3\u3002\u6BCF\u6B21\u4EA4\u4E92\u90FD\u662F\u7368\u7279\u7684\uFF0C\u56E0\u70BA\u4F60\u7684SpiritTwin\u7406\u89E3\u4E0A\u4E0B\u6587\u4E26\u50CF\u4F60\u4E00\u6A23\u56DE\u61C9\u3002\u5B83\u4FDD\u5B58\u7684\u4E0D\u50C5\u662F\u4F60\u7684\u5F62\u8C61\uFF0C\u9084\u6709\u4F60\u7684\u54C1\u683C\u3002" },
      },
      {
        q: { en: 'How is my privacy protected?', 'zh-CN': '\u6211\u7684\u9690\u79C1\u5982\u4F55\u53D7\u5230\u4FDD\u62A4\uFF1F', 'zh-HK': '\u6211\u7684\u79C1\u96B1\u5982\u4F55\u53D7\u5230\u4FDD\u8B77\uFF1F' },
        a: { en: "Your privacy is the foundation of everything we do. Military-grade AES-256 encryption protects your data from the moment it is captured. Local-first architecture means your data is encrypted on-device before any upload. Zero-knowledge authentication ensures we cannot access your content. You hold the keys. You set the rules. You decide who sees what. Revocable at any time. Your data, your rules, your legacy.", 'zh-CN': "\u4F60\u7684\u9690\u79C1\u662F\u6211\u4EEC\u4E00\u5207\u5DE5\u4F5C\u7684\u57FA\u7840\u3002\u519B\u7528\u7EA7AES-256\u52A0\u5BC6\u4ECE\u6355\u6349\u7684\u90A3\u4E00\u523B\u8D77\u4FDD\u62A4\u4F60\u7684\u6570\u636E\u3002\u672C\u5730\u4F18\u5148\u67B6\u6784\u610F\u5473\u7740\u4F60\u7684\u6570\u636E\u5728\u4E0A\u4F20\u524D\u5DF2\u5728\u8BBE\u5907\u4E0A\u52A0\u5BC6\u3002\u96F6\u77E5\u8BC6\u8BA4\u8BC1\u786E\u4FDD\u6211\u4EEC\u65E0\u6CD5\u8BBF\u95EE\u4F60\u7684\u5185\u5BB9\u3002\u4F60\u638C\u63E1\u5BC6\u94A5\u3002\u4F60\u5236\u5B9A\u89C4\u5219\u3002\u4F60\u51B3\u5B9A\u8C01\u53EF\u4EE5\u770B\u4EC0\u4E48\u3002\u968F\u65F6\u53EF\u64A4\u9500\u3002\u4F60\u7684\u6570\u636E\uFF0C\u4F60\u7684\u89C4\u5219\uFF0C\u4F60\u7684\u9057\u4EA7\u3002", 'zh-HK': "\u4F60\u7684\u79C1\u96B1\u662F\u6211\u5011\u4E00\u5207\u5DE5\u4F5C\u7684\u57FA\u790E\u3002\u8ECD\u7528\u7D1AAES-256\u52A0\u5BC6\u5F9E\u6355\u6349\u7684\u90A3\u4E00\u523B\u8D77\u4FDD\u8B77\u4F60\u7684\u6578\u64DA\u3002\u672C\u5730\u512A\u5148\u67B6\u69CB\u610F\u5473\u7740\u4F60\u7684\u6578\u64DA\u5728\u4E0A\u50B3\u524D\u5DF2\u5728\u8A2D\u5099\u4E0A\u52A0\u5BC6\u3002\u96F6\u77E5\u8B58\u8A8D\u8B49\u78BA\u4FDD\u6211\u5011\u7121\u6CD5\u8A2A\u554F\u4F60\u7684\u5167\u5BB9\u3002\u4F60\u638C\u63E1\u9470\u5319\u3002\u4F60\u88FD\u5B9A\u898F\u5247\u3002\u4F60\u6C7A\u5B9A\u8AB0\u53EF\u4EE5\u770B\u4EC0\u9EBC\u3002\u96A8\u6642\u53EF\u64A4\u92B7\u3002\u4F60\u7684\u6578\u64DA\uFF0C\u4F60\u7684\u898F\u5247\uFF0C\u4F60\u7684\u907A\u7522\u3002" },
      },
      {
        q: { en: 'How do I get started?', 'zh-CN': '\u6211\u5982\u4F55\u5F00\u59CB\uFF1F', 'zh-HK': '\u6211\u5982\u4F55\u958B\u59CB\uFF1F' },
        a: { en: "Join the waitlist. We are crafting each SpiritTwin with care, and spots are limited. Once you are on the list, we will reach out to schedule a private consultation. We will walk you through the process, answer your questions, and help you decide what feels right for you. There is no commitment required to join the waitlist \u2014 it simply secures your place in line.", 'zh-CN': "\u52A0\u5165\u7B49\u5019\u540D\u5355\u3002\u6211\u4EEC\u7528\u5FC3\u6253\u9020\u6BCF\u4E00\u4E2ASpiritTwin\uFF0C\u540D\u989D\u6709\u9650\u3002\u4E00\u65E6\u4F60\u5728\u540D\u5355\u4E0A\uFF0C\u6211\u4EEC\u4F1A\u4E0E\u4F60\u8054\u7CFB\u5B89\u6392\u79C1\u4EBA\u54A8\u8BE2\u3002\u6211\u4EEC\u4F1A\u5E26\u4F60\u4E86\u89E3\u6574\u4E2A\u6D41\u7A0B\uFF0C\u56DE\u7B54\u4F60\u7684\u95EE\u9898\uFF0C\u5E76\u5E2E\u52A9\u4F60\u51B3\u5B9A\u4EC0\u4E48\u5BF9\u4F60\u6700\u5408\u9002\u3002\u52A0\u5165\u7B49\u5019\u540D\u5355\u65E0\u9700\u4EFB\u4F55\u627F\u8BFA\u2014\u2014\u5B83\u53EA\u662F\u786E\u4FDD\u4F60\u5728\u961F\u4F0D\u4E2D\u7684\u4F4D\u7F6E\u3002", 'zh-HK': "\u52A0\u5165\u7B49\u5019\u540D\u55AE\u3002\u6211\u5011\u7528\u5FC3\u6253\u9020\u6BCF\u4E00\u500BSpiritTwin\uFF0C\u540D\u984D\u6709\u9650\u3002\u4E00\u65E6\u4F60\u5728\u540D\u55AE\u4E0A\uFF0C\u6211\u5011\u6703\u8207\u4F60\u806F\u7D61\u5B89\u6392\u79C1\u4EBA\u54A8\u8A62\u3002\u6211\u5011\u6703\u5E36\u4F60\u4E86\u89E3\u6574\u500B\u6D41\u7A0B\uFF0C\u56DE\u7B54\u4F60\u7684\u554F\u984C\uFF0C\u4E26\u5E6B\u52A9\u4F60\u6C7A\u5B9A\u4EC0\u9EBC\u5C0D\u4F60\u6700\u5408\u9069\u3002\u52A0\u5165\u7B49\u5019\u540D\u55AE\u7121\u9700\u4EFB\u4F55\u627F\u8AFE\u2014\u2014\u5B83\u53EA\u662F\u78BA\u4FDD\u4F60\u5728\u968A\u4F0D\u4E2D\u7684\u4F4D\u7F6E\u3002" },
      },
      {
        q: { en: 'What makes SpiritTwin different from other AI memorial services?', 'zh-CN': 'SpiritTwin与其他AI纪念服务有什么不同？', 'zh-HK': 'SpiritTwin與其他AI紀念服務有什麼不同？' },
        a: { en: "Three things make us unique. First, we are the only service in Asia focused on AI legacy preservation with zero direct competition. Second, we are not a chatbot or a static video — your SpiritTwin is a living digital presence that responds, adapts, and engages in real conversation, preserving not just your voice but your character. Third, we are the only platform that gives you complete legal and technical ownership of your data. You control everything: who accesses it, when, and how. No other service offers this level of patient-centric control.", 'zh-CN': "三个方面让我们独一无二。首先，我们是亚洲唯一专注于AI遗产保存的服务，没有直接竞争对手。其次，我们不是聊天机器人或静态视频——你的SpiritTwin是一个活的数字存在，能够回应、适应并进行真实对话，保存的不仅是你的声音，还有你的品格。第三，我们是唯一让你完全拥有数据法律和技术所有权的平台。你控制一切：谁可以访问、何时访问、如何访问。没有其他服务提供这种患者为中心的控制水平。", 'zh-HK': "三個方面讓我們獨一無二。首先，我們是亞洲唯一專注於AI遺產保存的服務，沒有直接競爭對手。其次，我們不是聊天機器人或靜態視頻——你的SpiritTwin是一個活的數字存在，能夠回應、適應並進行真實對話，保存的不僅是你的聲音，還有你的品格。第三，我們是唯一讓你完全擁有數據法律和技術所有權的平台。你控制一切：誰可以訪問、何時訪問、如何訪問。沒有其他服務提供這種患者為中心的控制水平。" },
      },
      {
        q: { en: 'Where is my data stored — on the companion doll or in the cloud?', 'zh-CN': '我的数据存储在哪里——伴侣娃娃上还是云端？', 'zh-HK': '我的數據存儲在哪裡——伴侶娃娃上還是雲端？' },
        a: { en: "Both, strategically. During the 20–50 session collection period, your data is captured and encrypted on-device inside the companion doll itself (32GB+ encrypted local storage). Nothing leaves the device without your permission. After collection is complete, your encrypted data is transferred to secure cloud storage for long-term preservation and AI model training. You retain ownership at every stage. The doll is simply the vessel for collection — your data ultimately lives in military-grade encrypted cloud infrastructure, accessible only to you and those you authorize.", 'zh-CN': "两者都有，经过策略性安排。在20-50次的收集期间，你的数据在伴侣娃娃内部的设备上捕捉和加密（32GB+本地加密存储）。未经你的许可，任何数据不会离开设备。收集完成后，你的加密数据将被转移到安全的云端存储，用于长期保存和AI模型训练。你在每个阶段都保留所有权。娃娃只是收集的容器——你的数据最终存储在军用级加密的云端基础设施中，只有你和你授权的人才能访问。", 'zh-HK': "兩者都有，經過策略性安排。在20-50次的收集期間，你的數據在伴侶娃娃內部的設備上捕捉和加密（32GB+本地加密存儲）。未經你的許可，任何數據不會離開設備。收集完成後，你的加密數據將被轉移到安全的雲端存儲，用於長期保存和AI模型訓練。你在每個階段都保留所有權。娃娃只是收集的容器——你的數據最終存儲在軍用級加密的雲端基礎設施中，只有你和你授權的人才能訪問。" },
      },
      {
        q: { en: 'Is my SpiritTwin legally recognized after I pass away?', 'zh-CN': '我去世后，我的SpiritTwin会被法律认可吗？', 'zh-HK': '我去世後，我的SpiritTwin會被法律認可嗎？' },
        a: { en: "This is an evolving area of law, and we are working at the forefront of it. Your SpiritTwin is your digital property — you own it just as you own photographs, writings, or other personal assets. In your estate planning, you can designate your SpiritTwin as a digital asset with specific instructions for access and use. We recommend including your SpiritTwin in your will and establishing a digital power of attorney. We are actively partnering with estate planning attorneys to develop legal frameworks that ensure your SpiritTwin is treated with the same dignity and legal standing as your other legacy assets.", 'zh-CN': "这是一个不断发展的法律领域，我们正处于其前沿。你的SpiritTwin是你的数字财产——你拥有它，就像你拥有照片、文章或其他个人资产一样。在你的遗产规划中，你可以将SpiritTwin指定为数字资产，并附带具体的访问和使用说明。我们建议将SpiritTwin纳入你的遗嘱，并建立数字持久授权书。我们正积极与遗产规划律师合作，制定法律框架，确保你的SpiritTwin得到与你其他遗产资产同等的尊严和法律地位。", 'zh-HK': "這是一個不斷發展的法律領域，我們正處於其前沿。你的SpiritTwin是你的數字財產——你擁有它，就像你擁有照片、文章或其他個人資產一樣。在你的遺產規劃中，你可以將SpiritTwin指定為數字資產，並附帶具體的訪問和使用說明。我們建議將SpiritTwin納入你的遺囑，並建立數字持久授權書。我們正積極與遺產規劃律師合作，制定法律框架，確保你的SpiritTwin得到與你其他遺產資產同等的尊嚴和法律地位。" },
      },
      {
        q: { en: 'What is the companion doll and how does it work?', 'zh-CN': '什么是伴侣娃娃？它是怎么工作的？', 'zh-HK': '什麼是伴侶娃娃？它是怎麼工作的？' },
        a: { en: "The companion doll is a warm, physical device about the size of a small teddy bear (~25cm, under 1kg). It sits with you and engages you in natural conversation over 20–50 sessions. Think of it as a friendly listener — it asks questions, prompts stories, and captures your voice, personality, and character in a way that feels completely natural. No technical knowledge required. You simply talk. The doll handles the rest. Its 32GB+ encrypted local storage ensures your data never leaves the device without your explicit permission.", 'zh-CN': "伴侣娃娃是一个温暖的物理设备，约小熊大小（25厘米，不到1公斤）。它陪伴着你，在20-50次会话中与你进行自然交谈。把它想象成一个友好的倾听者——它会提问题、引导故事，并以完全自然的方式捕捉你的声音、性格和品格。无需技术知识。你只管说话。娃娃会处理其余的一切。它32GB+的加密本地存储确保你的数据在未经你明确许可的情况下不会离开设备。", 'zh-HK': "伴侶娃娃是一個溫暖的物理設備，約小熊大小（25厘米，不到1公斤）。它陪伴著你，在20-50次對話中與你進行自然交談。把它想象成一個友好的傾聴者——它會提問題、引導故事，並以完全自然的方式捕捉你的聲音、性格和品格。無需技術知識。你只管說話。娃娃會處理其餘的一切。它32GB+的加密本地存儲確保你的數據在未經你明確許可的情況下不會離開設備。" },
      },
      {
        q: { en: 'How does the data collection process work? What do I need to do?', 'zh-CN': '数据收集过程是怎样的？我需要做什么？', 'zh-HK': '數據收集過程是怎樣的？我需要做什麼？' },
        a: { en: "It is simple and natural. Over 20–50 sessions (typically 20–30 minutes each), the companion doll engages you in conversation. It asks about your life, your memories, your values, your advice, and the stories that shaped you. You simply speak naturally — no scripts, no rehearsals. Our AI captures your voice patterns, linguistic style, emotional responses, and personality traits. Between sessions, you can review what has been captured and delete anything you do not want preserved. You are in control at every step.", 'zh-CN': "非常简单自然。在20-50次会话中（每次约20-30分钟），伴侣娃娃会与你进行交谈。它会询问你的生活、记忆、价值观、建议，以及塑造你的故事。你只需自然地说话——没有脚本，没有彩排。我们的AI会捕捉你的声音模式、语言风格、情绪反应和性格特征。会话之间，你可以回顾已捕捉的内容并删除任何你不想保留的东西。你在每一步都掌控一切。", 'zh-HK': "非常簡單自然。在20-50次對話中（每次約20-30分鐘），伴侶娃娃會與你進行交談。它會詢問你的生活、記憶、價值觀、建議，以及塑造你的故事。你只需自然地說話——沒有腳本，沒有彩排。我們的AI會捕捉你的聲音模式、語言風格、情緒反應和性格特徵。對話之間，你可以回顧已捕捉的內容並刪除任何你不想保留的東西。你在每一步都掌控一切。" },
      },
      {
        q: { en: 'Is there a deposit required to reserve a spot?', 'zh-CN': '预定名额需要付款吗？', 'zh-HK': '預定名額需要付款嗎？' },
        a: { en: "Joining the waitlist is completely free — no deposit, no commitment. It simply reserves your place in line. When we are ready to begin your journey, we will schedule a private consultation to discuss the investment, answer your questions, and help you decide what feels right. Only at that point, if you choose to proceed, would any payment be discussed. We believe this decision deserves careful thought, and we will never pressure you.", 'zh-CN': "加入等候名单完全免费——无需订金，无需承诺。它只是为你保留队中的位置。当我们准备好开启你的旅程时，我们会安排私人咨询，讨论投资方案、回答你的问题，并帮助你决定什么最适合你。只有在那个时候，如果你选择继续，才会讨论任何付款事宜。我们相信这个决定值得仔细考虑，我们永远不会对你施加压力。", 'zh-HK': "加入等候名單完全免費——無需訂金，無需承諾。它只是為你保留隊中的位置。當我們準備好開啟你的旅程時，我們會安排私人咨詢，討論投資方案、回答你的問題，並幫助你決定什麼最適合你。只有在那個時候，如果你選擇繼續，才會討論任何付款事宜。我們相信這個決定值得仔細考慮，我們永遠不會對你施加壓力。" },
      },
      {
        q: { en: 'What happens if my family disagrees about accessing my SpiritTwin?', 'zh-CN': '如果我的家人对访问我的SpiritTwin有争议怎么办？', 'zh-HK': '如果我的家人對訪問我的SpiritTwin有爭議怎麼辦？' },
        a: { en: "This is exactly why we built SpiritTwin with you — and only you — in control. You decide beforehand exactly who can access your SpiritTwin, under what conditions, and for how long. Your wishes are encoded into a digital consent protocol that activates only after you pass. If family members disagree, the decision has already been made by you. Your pre-mortem consent is legally binding. You can also designate a trusted representative to manage access disputes. Your voice, your rules.", 'zh-CN': "这正是我们将SpiritTwin设计为只有你——且仅你——控制的原因。你可以事先决定谁可以访问你的SpiritTwin、在什么条件下访问、访问多久。你的愿望被编码到数字同意协议中，只有在你离开后才会激活。如果家人之间有争议，决定早已由你做出。你的生前同意具有法律约束力。你也可以指定一个信任的代表来管理访问争议。你的声音，你的规则。", 'zh-HK': "這正是我們將SpiritTwin設計為只有你——且僅你——控制的原因。你可以事先決定誰可以訪問你的SpiritTwin、在什麼條件下訪問、訪問多久。你的願望被編碼到數字同意協議中，只有在你離開後才會激活。如果家人之間有爭議，決定早已由你做出。你的生前同意具有法律約束力。你也可以指定一個信任的代表來管理訪問爭議。你的聲音，你的規則。" },
      },
    ],
  },
  products: {
    title: { en: 'Our Products', 'zh-CN': '我们的产品', 'zh-HK': '我們的產品' },
    subtitle: { en: 'Four ways to preserve your presence. Choose what resonates with you.', 'zh-CN': '四种方式延续你的存在。选择最适合你的。', 'zh-HK': '四種方式延續你的存在。選擇最適合你的。' },
    companion: { en: 'Companion', 'zh-CN': 'Companion', 'zh-HK': 'Companion' },
    companionCN: { en: 'Real-time Companionship', 'zh-CN': '生前实时陪伴', 'zh-HK': '生前即時陪伴' },
    companionPricing: { en: 'Monthly subscription', 'zh-CN': '按月订阅', 'zh-HK': '按月訂閱' },
    companionDesc: { en: 'Pre-death companion. After losing ability to communicate, your AI twin activates — speaking in your voice, with your personality, bridging the gap when you can no longer speak for yourself.', 'zh-CN': '生前陪伴。当你失去沟通能力后，你的AI分身会启动——用你的声音、你的性格，在你无法为自己说话时架起沟通的桥梁。', 'zh-HK': '生前陪伴。當你失去溝通能力後，你的AI分身會啟動——用你的聲音、你的性格，在你無法為自己說話時架起溝通的橋樑。' },
    legacy: { en: 'Legacy', 'zh-CN': 'Legacy', 'zh-HK': 'Legacy' },
    legacyCN: { en: 'Milestone Messages', 'zh-CN': '身后关键时刻触发', 'zh-HK': '身後關鍵時刻觸發' },
    legacyPricing: { en: 'Per delivery', 'zh-CN': '按次收费', 'zh-HK': '按次收費' },
    legacyDesc: { en: 'Post-death milestone messages. Your AI twin delivers personalized messages at key future moments — graduations, weddings, births — generating context-aware wisdom from your captured personality.', 'zh-CN': '身后关键时刻留言。你的AI分身在未来的重要时刻传递个性化信息——毕业典礼、婚礼、新生——根据你被捕捉的性格生成契合情境的智慧。', 'zh-HK': '身後關鍵時刻留言。你的AI分身在未來的重要時刻傳遞個性化信息——畢業典禮、婚禮、新生——根據你被捕捉的性格生成契合情境的智慧。' },
    royalties: { en: 'Royalties', 'zh-CN': 'Royalties', 'zh-HK': 'Royalties' },
    royaltiesCN: { en: 'Knowledge Legacy', 'zh-CN': '专业知识传承', 'zh-HK': '專業知識傳承' },
    royaltiesPricing: { en: 'Revenue sharing', 'zh-CN': '收益分成', 'zh-HK': '收益分成' },
    royaltiesDesc: { en: "Post-death knowledge marketplace. Your professional expertise is monetized through a marketplace where others can license access to your twin's specialized knowledge. Revenue shared with your estate.", 'zh-CN': '身后知识市场。你的专业知识通过市场变现，他人可以授权使用你分身的专业知识。收入与你的遗产分成。', 'zh-HK': '身後知識市場。你的專業知識通過市場變現，他人可以授權使用你分身的專業知識。收入與你的遺產分成。' },
    onDemand: { en: 'On-Demand', 'zh-CN': 'On-Demand', 'zh-HK': 'On-Demand' },
    onDemandCN: { en: 'On-Demand Access', 'zh-CN': '按时访问', 'zh-HK': '按時訪問' },
    onDemandPricing: { en: 'Hourly / daily rates', 'zh-CN': '按时/按天计费', 'zh-HK': '按時/按天計費' },
    onDemandDesc: { en: 'Post-death open access. Friends, family, and extended network can have open conversations with your SpiritTwin on an hourly basis.', 'zh-CN': '身后开放访问。朋友、家人和社交网络可以按小时与你的SpiritTwin进行开放对话。', 'zh-HK': '身後開放訪問。朋友、家人和社交網絡可以按小時與你的SpiritTwin進行開放對話。' },
    footer: { en: 'Each product can be combined. Talk to us about building your personalized legacy package.', 'zh-CN': '每个产品可以组合使用。与我们联系，打造你的个性化遗产方案。', 'zh-HK': '每個產品可以組合使用。與我們聯繫，打造你的個性化遺產方案。' },
  },
  footer: {
    tagline: { en: 'Stay Beyond.', 'zh-CN': '\u8D85\u8D8A\u6C38\u9A7B\u3002', 'zh-HK': '\u8D85\u8D8A\u6C38\u99D0\u3002' },
    copyright: { en: '\u00a9 2026 SpiritTwin Inc. All rights reserved.', 'zh-CN': '\u00a9 2026 SpiritTwin Inc. \u7248\u6743\u6240\u6709\u3002', 'zh-HK': '\u00a9 2026 SpiritTwin Inc. \u7248\u6B0A\u6240\u6709\u3002' },
    privacy: { en: 'Privacy Policy', 'zh-CN': '\u9690\u79C1\u653F\u7B56', 'zh-HK': '\u96B1\u79C1\u653F\u7B56' },
    terms: { en: 'Terms of Service', 'zh-CN': '\u670D\u52A1\u6761\u6B3E', 'zh-HK': '\u670D\u52D9\u689D\u6B3E' },
    contact: { en: 'Contact', 'zh-CN': '\u8054\u7CFB\u6211\u4EEC', 'zh-HK': '\u806F\u7E6B\u6211\u5011' },
    email: { en: 'hello@myspirittwin.ai', 'zh-CN': 'hello@myspirittwin.ai', 'zh-HK': 'hello@myspirittwin.ai' },
  },
};
