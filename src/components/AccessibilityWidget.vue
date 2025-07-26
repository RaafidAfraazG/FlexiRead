<template>
  <div class="accessibility-widget">
    <!-- Floating Button -->
    <FloatingButton 
      @toggle="togglePanel" 
      :has-active-settings="hasActiveSettings"
    />
    
    <!-- Menu Panel -->
    <MenuPanel 
      v-if="isPanelOpen"
      :settings="settings"
      @close="closePanel"
      @update-setting="updateSetting"
    />
  </div>
</template>

<script>
import FloatingButton from './FloatingButton.vue'
import MenuPanel from './MenuPanel.vue'

export default {
  name: 'AccessibilityWidget',
  components: {
    FloatingButton,
    MenuPanel
  },
  props: {
    initialSettings: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['settings-updated'],
  data() {
    return {
      isPanelOpen: false,
      settings: {
        contrast: 0,
        highlightLinks: false,
        textSize: 16,
        textSpacing: 1,
        pauseAnimations: false,
        hideImages: false,
        dyslexiaFont: false,
        biggerCursor: false,
        tooltips: false,
        pageStructure: false,
        biggerText: false,
        ...this.initialSettings
      }
    }
  },
  computed: {
    hasActiveSettings() {
      return Object.entries(this.settings).some(([key, value]) => {
        if (key === 'textSize') return value !== 16
        if (key === 'textSpacing') return value !== 1
        if (key === 'contrast') return value > 0
        return value === true
      })
    }
  },
  methods: {
    togglePanel() {
      this.isPanelOpen = !this.isPanelOpen
    },
    closePanel() {
      this.isPanelOpen = false
    },
    updateSetting(key, value) {
      this.settings[key] = value
      this.$emit('settings-updated', this.settings)
    },
    resetAllSettings() {
      this.settings = {
        contrast: 0,
        highlightLinks: false,
        textSize: 16,
        textSpacing: 1,
        pauseAnimations: false,
        hideImages: false,
        dyslexiaFont: false,
        biggerCursor: false,
        tooltips: false,
        pageStructure: false,
        biggerText: false
      }
      this.$emit('settings-updated', this.settings)
    }
  },
  watch: {
    initialSettings: {
      handler(newSettings) {
        this.settings = { ...this.settings, ...newSettings }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.isPanelOpen = false
      }
    })
    
    // Prevent the widget from being affected by contrast changes
    this.$el.style.isolation = 'isolate'
    this.$el.style.position = 'relative'
    this.$el.style.zIndex = '10001'
  }
}
</script>

<style scoped>
.accessibility-widget {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 10000;
  pointer-events: none;
}

.accessibility-widget > * {
  pointer-events: all;
}
</style>