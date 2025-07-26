import { reactive, watch } from 'vue'

// Default settings
const defaultSettings = {
  contrast: false,
  highlightLinks: false,
  biggerText: false,
  textSpacing: false,
  pauseAnimations: false,
  hideImages: false,
  dyslexiaFont: false,
  biggerCursor: false,
  tooltips: false,
  pageStructure: false
}

// Reactive settings object
const settings = reactive({ ...defaultSettings })

// Storage key for localStorage
const STORAGE_KEY = 'accessibility-widget-settings'

// Apply CSS classes to document
const applyStyles = () => {
  const root = document.documentElement
  
  // Remove all existing accessibility classes
  root.className = root.className.replace(/accessibility-\w+/g, '').trim()
  
  // Apply active settings as CSS classes
  Object.keys(settings).forEach(key => {
    if (settings[key]) {
      root.classList.add(`accessibility-${key}`)
    }
  })
}

// Load dyslexia font
const loadDyslexiaFont = () => {
  const existingLink = document.getElementById('dyslexia-font')
  
  if (settings.dyslexiaFont && !existingLink) {
    const link = document.createElement('link')
    link.id = 'dyslexia-font'
    link.rel = 'stylesheet'
    link.href = 'https://cdn.jsdelivr.net/npm/opendyslexic@latest/opendyslexic-regular.css'
    document.head.appendChild(link)
  } else if (!settings.dyslexiaFont && existingLink) {
    existingLink.remove()
  }
}

// Main composable function
export const useAccessibility = () => {
  
  // Update a single setting
  const updateSetting = (key, value) => {
    settings[key] = value
    
    // Handle special cases
    if (key === 'dyslexiaFont') {
      loadDyslexiaFont()
    }
    
    // Apply styles and save to localStorage
    applyStyles()
    saveSettings()
  }
  
  // Save settings to localStorage
  const saveSettings = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch (error) {
      console.warn('Could not save accessibility settings:', error)
    }
  }
  
  // Load settings from localStorage
  const loadSettings = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsedSettings = JSON.parse(saved)
        
        // Update settings with saved values
        Object.keys(defaultSettings).forEach(key => {
          if (key in parsedSettings) {
            settings[key] = parsedSettings[key]
          }
        })
        
        // Apply loaded settings
        applyStyles()
        loadDyslexiaFont()
      }
    } catch (error) {
      console.warn('Could not load accessibility settings:', error)
    }
  }
  
  // Reset all settings to default
  const resetSettings = () => {
    Object.keys(settings).forEach(key => {
      settings[key] = defaultSettings[key]
    })
    
    // Remove dyslexia font if loaded
    const dyslexiaLink = document.getElementById('dyslexia-font')
    if (dyslexiaLink) {
      dyslexiaLink.remove()
    }
    
    applyStyles()
    saveSettings()
  }
  
  // Watch for setting changes and auto-save
  watch(settings, () => {
    applyStyles()
    saveSettings()
  }, { deep: true })
  
  return {
    settings,
    updateSetting,
    loadSettings,
    saveSettings,
    resetSettings
  }
}