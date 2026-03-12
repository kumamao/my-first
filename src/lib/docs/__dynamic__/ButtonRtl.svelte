<script lang="ts">
import { Button } from "@/examples/base/ui-rtl/button";
import { Spinner } from "@/examples/base/ui-rtl/spinner";
import { ArrowRightIcon, PlusIcon } from "@lucide/svelte";

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector";

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      button: "Button",
      submit: "Submit",
      delete: "Delete",
      loading: "Loading",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      button: "زر",
      submit: "إرسال",
      delete: "حذف",
      loading: "جاري التحميل",
    },
  },
  he: {
    dir: "rtl",
    values: {
      button: "כפתור",
      submit: "שלח",
      delete: "מחק",
      loading: "טוען",
    },
  },
};

const translation = useTranslation(translations, "ar");
const { dir, t } = $derived(translation());
</script>

<div class="flex flex-wrap items-center gap-2 md:flex-row" dir={dir}>
  <Button variant="outline">{t.button}</Button>
  <Button variant="destructive">{t.delete}</Button>
  <Button variant="outline">
    {t.submit}{" "}
    <ArrowRightIcon class="rtl:rotate-180" data-icon="inline-end" />
  </Button>
  <Button variant="outline" size="icon" aria-label="Add">
    <PlusIcon />
  </Button>
  <Button variant="secondary" disabled>
    <Spinner data-icon="inline-start" /> {t.loading}
  </Button>
</div>