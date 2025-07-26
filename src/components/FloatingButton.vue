<template>
  <div class="floating-container">
    <button
      class="floating-btn"
      @click="handleClick"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
      :class="{ 'btn-activated': isActivated, 'btn-hovered': isHovered }"
      aria-label="Open accessibility options"
      title="Accessibility Settings"
    >
      <!-- Accessibility Icon -->
      <svg class="icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="4" r="2"/>
        <path d="m15.5 8.5-3.5-1-3.5 1"/>
        <path d="M12 8.5v7"/>
        <path d="m8.5 15.5 3.5 1 3.5-1"/>
        <path d="M8 12h8"/>
      </svg>

      <!-- Status indicator -->
      <div v-if="hasActiveSettings" class="status-indicator"></div>
      
      <!-- Ripple effect -->
      <div v-if="isActivated" class="ripple-effect"></div>
    </button>
  </div>
</template>

<script>
export default {
  name: 'FloatingButton',
  emits: ['toggle'],
  props: {
    hasActiveSettings: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isHovered: false,
      isActivated: false
    }
  },
  methods: {
    handleClick() {
      this.isActivated = true
      this.$emit('toggle')
      
      setTimeout(() => {
        this.isActivated = false
      }, 300)
    }
  }
}
</script>

<style scoped>
.floating-container {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  z-index: 9999;
}

.floating-btn {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.floating-btn:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.5), 0 4px 12px rgba(0, 0, 0, 0.15);
}

.floating-btn.btn-activated {
  transform: scale(0.95);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.floating-btn:focus {
  outline: 3px solid rgba(59, 130, 246, 0.5);
  outline-offset: 2px;
}

.icon-svg {
  width: 24px;
  height: 24px;
  color: white;
  transition: transform 0.2s ease;
  z-index: 2;
}

.floating-btn:hover .icon-svg {
  transform: scale(1.1);
}

.status-indicator {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 12px;
  height: 12px;
  background: #10b981;
  border: 2px solid white;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
  animation: pulse 2s infinite;
  z-index: 3;
}

.ripple-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  animation: ripple 0.6s linear;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 16px rgba(16, 185, 129, 0.8);
    transform: scale(1.1);
  }
  100% {
    box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
    transform: scale(1);
  }
}

@keyframes ripple {
  0% {
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    width: 120px;
    height: 120px;
    opacity: 0;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .floating-btn {
    border: 2px solid #000;
    background: #0066cc;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .floating-btn,
  .icon-svg,
  .status-indicator {
    transition: none;
    animation: none;
  }
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .floating-container {
    bottom: 20px;
    right: 20px;
    width: 56px;
    height: 56px;
  }
  
  .icon-svg {
    width: 20px;
    height: 20px;
  }
  
  .status-indicator {
    width: 10px;
    height: 10px;
    top: 4px;
    right: 4px;
  }
}
</style>