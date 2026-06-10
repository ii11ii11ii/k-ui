import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

/* Реактивные брейкпоинты по ширине окна. */
const BP: Record<string, number> = { xs: 0, sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1536 }
export function useBreakpoint(){
  const width = ref(typeof window !== 'undefined' ? window.innerWidth : 1280)
  function onResize(){ width.value = window.innerWidth }
  onMounted(() => { window.addEventListener('resize', onResize); onResize() })
  onBeforeUnmount(() => window.removeEventListener('resize', onResize))
  const breakpoint = computed(() => {
    const w = width.value
    if (w >= BP.xxl) return 'xxl'; if (w >= BP.xl) return 'xl'; if (w >= BP.lg) return 'lg'
    if (w >= BP.md) return 'md'; if (w >= BP.sm) return 'sm'; return 'xs'
  })
  return {
    width, breakpoint,
    isMobile: computed(() => width.value < BP.md),
    isDesktop: computed(() => width.value >= BP.lg),
    smaller: (bp: string) => computed(() => width.value < (BP[bp] || 0)),
    greater: (bp: string) => computed(() => width.value >= (BP[bp] || 0)),
  }
}
