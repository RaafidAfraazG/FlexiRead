<template>
  <div class="menu-panel" @click.stop>
    <!-- Header -->
    <div class="menu-header">
      <h3>Accessibility Options</h3>
      <button 
        @click="$emit('close')" 
        aria-label="Close accessibility menu" 
        class="close-btn"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    
    <div class="menu-content">
      <!-- Visual Adjustments Section -->
      <div class="section">
        <button 
          class="section-header"
          @click="toggleSection('visual')"
          :aria-expanded="expandedSections.visual"
        >
          <div class="section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <h4>Visual Adjustments</h4>
          </div>
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2"
            :class="{ 'rotated': expandedSections.visual }"
          >
            <polyline points="6,9 12,15 18,9"></polyline>
          </svg>
        </button>
        
        <div v-if="expandedSections.visual" class="section-content">
          <!-- Contrast Slider -->
          <div class="control-item">
            <div class="slider-container">
              <div class="slider-header">
                <span>Contrast Level</span>
                <span class="slider-value">{{ settings.contrast }}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                :value="settings.contrast"
                @input="updateSetting('contrast', Number($event.target.value))"
                class="slider"
                aria-label="Adjust contrast level"
              />
              <div class="slider-markers">
                <span>Normal</span>
                <span>High</span>
              </div>
            </div>
          </div>

          <!-- Text Size Slider -->
          <div class="control-item">
            <div class="slider-container">
              <div class="slider-header">
                <span>Text Size</span>
                <span class="slider-value">{{ settings.textSize }}px</span>
              </div>
              <input
                type="range"
                min="12"
                max="24"
                :value="settings.textSize"
                @input="updateSetting('textSize', Number($event.target.value))"
                class="slider"
                aria-label="Adjust text size"
              />
              <div class="slider-markers">
                <span>Small</span>
                <span>Large</span>
              </div>
            </div>
          </div>

          <!-- Text Spacing Slider -->
          <div class="control-item">
            <div class="slider-container">
              <div class="slider-header">
                <span>Text Spacing</span>
                <span class="slider-value">{{ settings.textSpacing.toFixed(1) }}x</span>
              </div>
              <input
                type="range"
                min="1"
                max="2.5"
                step="0.1"
                :value="settings.textSpacing"
                @input="updateSetting('textSpacing', Number($event.target.value))"
                class="slider"
                aria-label="Adjust text spacing"
              />
              <div class="slider-markers">
                <span>Normal</span>
                <span>Wide</span>
              </div>
            </div>
          </div>

          <!-- Toggle Controls -->
          <div class="control-item">
            <button 
              class="toggle-btn"
              :class="{ active: settings.highlightLinks }"
              @click="toggleSetting('highlightLinks')"
              aria-label="Toggle link highlighting"
            >
              <div class="toggle-content">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
                <div class="toggle-text">
                  <span>Highlight Links</span>
                  <span class="toggle-description">Make links more visible</span>
                </div>
              </div>
              <div :class="['toggle-indicator', { active: settings.highlightLinks }]">
                <div class="toggle-knob"></div>
              </div>
            </button>
          </div>

          
        </div>
      </div>

      <!-- Behavior Controls Section -->
      <div class="section">
        <button 
          class="section-header"
          @click="toggleSection('behavior')"
          :aria-expanded="expandedSections.behavior"
        >
          <div class="section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>
            </svg>
            <h4>Behavior Controls</h4>
          </div>
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2"
            :class="{ 'rotated': expandedSections.behavior }"
          >
            <polyline points="6,9 12,15 18,9"></polyline>
          </svg>
        </button>
        
        <div v-if="expandedSections.behavior" class="section-content">
          <div class="control-item">
            <button 
              class="toggle-btn"
              :class="{ active: settings.pauseAnimations }"
              @click="toggleSetting('pauseAnimations')"
              aria-label="Toggle pause animations"
            >
              <div class="toggle-content">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
                <div class="toggle-text">
                  <span>Pause Animations</span>
                  <span class="toggle-description">Stop distracting animations</span>
                </div>
              </div>
              <div :class="['toggle-indicator', { active: settings.pauseAnimations }]">
                <div class="toggle-knob"></div>
              </div>
            </button>
          </div>

          <div class="control-item">
            <button 
              class="toggle-btn"
              :class="{ active: settings.hideImages }"
              @click="toggleSetting('hideImages')"
              aria-label="Toggle hide images"
            >
              <div class="toggle-content">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21,15 16,10 5,21"></polyline>
                  <line x1="21" y1="3" x2="3" y2="21"></line>
                </svg>
                <div class="toggle-text">
                  <span>Hide Images</span>
                  <span class="toggle-description">Focus on text content</span>
                </div>
              </div>
              <div :class="['toggle-indicator', { active: settings.hideImages }]">
                <div class="toggle-knob"></div>
              </div>
            </button>
          </div>

          <div class="control-item">
            <button 
              class="toggle-btn"
              :class="{ active: settings.dyslexiaFont }"
              @click="toggleSetting('dyslexiaFont')"
              aria-label="friendly font"
            >
              <div class="toggle-content">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
                <div class="toggle-text">
                  <span>Friendly Font</span>
                  <span class="toggle-description">Easier to read typeface</span>
                </div>
              </div>
              <div :class="['toggle-indicator', { active: settings.dyslexiaFont }]">
                <div class="toggle-knob"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Interface Tools Section -->
      <div class="section">
        <button 
          class="section-header"
          @click="toggleSection('interface')"
          :aria-expanded="expandedSections.interface"
        >
          <div class="section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path>
              <path d="M13 13l6 6"></path>
            </svg>
            <h4>Interface Tools</h4>
          </div>
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2"
            :class="{ 'rotated': expandedSections.interface }"
          >
            <polyline points="6,9 12,15 18,9"></polyline>
          </svg>
        </button>
        
        <div v-if="expandedSections.interface" class="section-content">
          <div class="control-item">
            <button 
              class="toggle-btn"
              :class="{ active: settings.biggerCursor }"
              @click="toggleSetting('biggerCursor')"
              aria-label="Toggle bigger cursor"
            >
              <div class="toggle-content">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path>
                  <path d="M13 13l6 6"></path>
                </svg>
                <div class="toggle-text">
                  <span>Bigger Cursor</span>
                  <span class="toggle-description">Larger, easier to see pointer</span>
                </div>
              </div>
              <div :class="['toggle-indicator', { active: settings.biggerCursor }]">
                <div class="toggle-knob"></div>
              </div>
            </button>
          </div>

          <div class="control-item">
            <button 
              class="toggle-btn"
              :class="{ active: settings.tooltips }"
              @click="toggleSetting('tooltips')"
              aria-label="Toggle tooltips"
            >
              <div class="toggle-content">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <div class="toggle-text">
                  <span>Show Tooltips</span>
                  <span class="toggle-description">Display helpful hints</span>
                </div>
              </div>
              <div :class="['toggle-indicator', { active: settings.tooltips }]">
                <div class="toggle-knob"></div>
              </div>
            </button>
          </div>

          <div class="control-item">
            <button 
              class="toggle-btn"
              :class="{ active: settings.pageStructure }"
              @click="toggleSetting('pageStructure')"
              aria-label="Toggle page structure"
            >
              <div class="toggle-content">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
                <div class="toggle-text">
                  <span>Page Structure</span>
                  <span class="toggle-description">Outline headings and landmarks</span>
                </div>
              </div>
              <div :class="['toggle-indicator', { active: settings.pageStructure }]">
                <div class="toggle-knob"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Reset Button -->
      <div class="section">
        <button class="reset-btn" @click="resetAll">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="1,4 1,10 7,10"></polyline>
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
          </svg>
          Reset All Settings
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuPanel',
  props: {
    settings: {
      type: Object,
      required: true
    }
  },
  emits: ['close', 'update-setting'],
  data() {
    return {
      expandedSections: {
        visual: true,
        behavior: true,
        interface: true
      }
    }
  },
  methods: {
    toggleSection(section) {
      this.expandedSections[section] = !this.expandedSections[section]
    },
    toggleSetting(setting) {
      this.$emit('update-setting', setting, !this.settings[setting])
    },
    updateSetting(setting, value) {
      this.$emit('update-setting', setting, value)
    },
    resetAll() {
      // Reset all settings to default values
      const defaultSettings = {
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
      
      Object.keys(defaultSettings).forEach(key => {
        this.$emit('update-setting', key, defaultSettings[key])
      })
    }
  }
}
</script>

<style scoped>
.menu-panel {
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 360px;
  max-height: 85vh;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  z-index: 10000;
  box-shadow: 0 12px 48px rgba(59, 130, 246, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e7ef;
  font-family: 'Inter', system-ui, sans-serif;
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e1e7ef;
  background: linear-gradient(135deg, #f6f9fc 0%, #eef4f8 100%);
}

.menu-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1e3a8a;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #64748b;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #e2e8f0;
  color: #475569;
}

.menu-content {
  padding: 16px;
  max-height: calc(85vh - 80px);
  overflow-y: auto;
}

.section {
  margin-bottom: 12px;
}

.section-header {
  width: 100%;
  padding: 12px 0;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #1e40af;
  transition: all 0.2s ease;
  border-radius: 8px;
}

.section-header:hover {
  background: #f1f5f9;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.section-title h4 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
}

.section-header svg.rotated {
  transform: rotate(180deg);
}

.section-content {
  padding: 8px 0 16px 0;
  border-left: 2px solid #e1e7ef;
  margin-left: 16px;
  padding-left: 20px;
}

.control-item {
  margin-bottom: 16px;
}

.slider-container {
  width: 100%;
}

.slider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.slider-header span {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.slider-value {
  font-weight: 600;
  color: #3b82f6;
  background: #eff6ff;
  padding: 2px 8px;
  border-radius: 12px;
}

.slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #e2e8f0;
  outline: none;
  appearance: none;
  cursor: pointer;
}

.slider::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.slider::-webkit-slider-thumb:hover {
  background: #2563eb;
  transform: scale(1.1);
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.slider-markers {
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
  font-size: 11px;
  color: #9ca3af;
}

.toggle-btn {
  width: 100%;
  padding: 14px 16px;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  background: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;
  text-align: left;
}

.toggle-btn:hover {
  border-color: #3b82f6;
  background: #f8fafc;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
}

.toggle-btn.active {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border-color: #2563eb;
  color: white;
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
}

.toggle-content svg {
  color: #3b82f6;
}

.toggle-btn.active .toggle-content svg {
  color: #fff;
}

.toggle-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.toggle-text span {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.toggle-description {
  font-size: 12px;
  color: #6b7280;
}

.toggle-btn.active .toggle-text span,
.toggle-btn.active .toggle-description,
.toggle-btn.active svg {
  color: #fff;
}

.toggle-btn.active .toggle-description {
  color: #e5e7eb;
}

.toggle-indicator {
  width: 44px;
  height: 24px;
  background: #e2e8f0;
  border-radius: 12px;
  position: relative;
  transition: all 0.3s ease;
}

.toggle-indicator.active {
  background: #60a5fa;
}

.toggle-knob {
  width: 18px;
  height: 18px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.toggle-indicator.active .toggle-knob {
  transform: translateX(20px);
}

.reset-btn {
  width: 100%;
  padding: 14px 20px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
}

.reset-btn:hover {
  background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

.menu-content::-webkit-scrollbar {
  width: 6px;
}

.menu-content::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.menu-content::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.menu-content::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Mobile responsiveness */
@media (max-width: 480px) {
  .menu-panel {
    width: calc(100vw - 40px);
    right: 20px;
    left: 20px;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .menu-panel {
    border: 2px solid #000;
  }
  
  .toggle-btn {
    border: 2px solid #000;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .toggle-btn,
  .toggle-indicator,
  .toggle-knob,
  .section-header svg {
    transition: none;
  }
}
</style>