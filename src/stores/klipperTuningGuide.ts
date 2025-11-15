import { defineStore } from 'pinia';

export const useKlipperTuningGuideStore = defineStore('klipperTuningGuide', {
  state: () => ({
    lastVisitedPage: null as string | null,
  }),
  actions: {
    setLastVisitedPage(pageId: string) {
      this.lastVisitedPage = pageId;
    },
  },
  persist: true,
});
