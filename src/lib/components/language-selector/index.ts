import { createContext } from 'svelte';

export { default as LanguageSelector } from './language-selector.svelte';

export type Language = 'en' | 'ar' | 'he';

type Translation = {
  dir: 'ltr' | 'rtl';
  values: {
    button: string;
    submit: string;
    delete: string;
    loading: string;
  };
};

export type Translations = Record<Language, Translation>;

export type TranslationsContext = {
  translations: Translations | null;
  language: Language;
};

export const useTranslation = (translations: Translations, language: Language) => {
  const t = getTranslations();

  t.language = language;
  t.translations = translations;

  return () => ({
    dir: t.translations?.[t.language].dir,
    t: t.translations?.[t.language].values
  });
};

export const [getTranslations, setTranslations] = createContext<TranslationsContext>();
