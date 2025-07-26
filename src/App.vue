<template>
  <div id="app" :class="accessibilityClasses" :style="contrastStyles">
    <header class="header">
      <div class="container">
        <h1 class="logo">TechNewsHub</h1>
        <nav class="nav">
          <a v-for="link in navLinks" :key="link.href" :href="link.href">{{ link.text }}</a>
        </nav>
      </div>
    </header>

    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Breaking Technology News</h1>
          <p class="hero-subtitle">Stay informed with the latest developments in tech, science, and innovation.</p>
          <button class="cta-button">Explore Stories</button>
        </div>
        <div class="hero-animation">
          <div class="floating-card card-1"></div>
          <div class="floating-card card-2"></div>
          <div class="floating-card card-3"></div>
          <div class="pulse-ring ring-1"></div>
          <div class="pulse-ring ring-2"></div>
        </div>
      </div>
    </section>

    <main class="main-content">
      <div class="container">
        <section class="articles-section">
          <h2>Today's Headlines</h2>
          <article v-for="article in articles" :key="article.title" class="article-card">
            <img v-if="!accessibilitySettings.hideImages" :src="article.img" :alt="article.alt" />
            <div class="article-content">
              <h3>{{ article.title }}</h3>
              <p>{{ article.description }}</p>
              <div class="article-meta">
                <span>{{ article.author }}</span>
                <span>{{ article.date }}</span>
              </div>
              <a :href="article.link" class="read-more">Continue Reading</a>
            </div>
          </article>
        </section>

        <aside class="sidebar">
          <div class="widget">
            <h3>Quick Navigation</h3>
            <ul>
              <li v-for="link in quickLinks" :key="link.href">
                <a :href="link.href">{{ link.text }}</a>
              </li>
            </ul>
          </div>
          <div class="widget">
            <h3>Live Updates</h3>
            <div v-for="update in latestUpdates" :key="update.time" class="update-item">
              <span class="time">{{ update.time }}</span>
              <p>{{ update.text }}</p>
            </div>
          </div>
        </aside>
      </div>
    </main>

    <footer class="footer">
      <div class="footer-animation">
        <div class="footer-dot dot-1"></div>
        <div class="footer-dot dot-2"></div>
        <div class="footer-dot dot-3"></div>
        <div class="footer-line"></div>
      </div>
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h4>About TechNewsHub</h4>
            <p>Your trusted source for breaking technology news, in-depth analysis, and expert insights.</p>
          </div>
          <div class="footer-section">
            <h4>Categories</h4>
            <ul>
              <li v-for="category in categories" :key="category.href">
                <a :href="category.href">{{ category.text }}</a>
              </li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Connect</h4>
            <div class="social-links">
              <a v-for="connect in connectLinks" :key="connect.href" :href="connect.href" class="social-link">{{ connect.text }}</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2025 TechNewsHub - All Rights Reserved</p>
        </div>
      </div>
    </footer>

    <AccessibilityWidget 
      @settings-updated="updateAccessibilitySettings"
      :initial-settings="accessibilitySettings"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AccessibilityWidget from './components/AccessibilityWidget.vue'

interface AccessibilitySettings {
  contrast: number
  highlightLinks: boolean
  textSize: number
  textSpacing: number
  pauseAnimations: boolean
  hideImages: boolean
  dyslexiaFont: boolean
  biggerCursor: boolean
  tooltips: boolean
  pageStructure: boolean
  biggerText: boolean
}

const accessibilitySettings = ref<AccessibilitySettings>({
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
})

const navLinks = ref([
  { text: 'Home', href: '#home' },
  { text: 'Technology', href: '#tech' },
  { text: 'Science', href: '#science' },
  { text: 'Contact', href: '#contact' },
])

const articles = ref([
  {
    img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
    alt: 'Modern smartphone with advanced camera system',
    title: 'Revolutionary AI-Powered Smartphones Transform Mobile Photography',
    description: 'Leading manufacturers unveil phones with 200MP sensors and AI-powered photography that can capture professional-quality images.',
    author: 'Alex Thompson',
    date: 'July 25, 2025',
    link: '#article1'
  },
  {
    img: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
    alt: 'Virtual reality headset with futuristic design',
    title: 'Meta Launches Ultra-Lightweight VR Headset for Everyday Computing',
    description: 'The new VR device weighs just 300 grams and offers 8K resolution per eye, making virtual meetings more immersive.',
    author: 'Jordan Martinez',
    date: 'July 24, 2025',
    link: '#article2'
  },
  {
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
    alt: 'Electric vehicle charging at a modern charging station',
    title: 'Breakthrough: Electric Vehicles Now Charge in Under 5 Minutes',
    description: 'Breakthrough battery technology allows EVs to charge from 0 to 80% in just 4 minutes.',
    author: 'Riley Chen',
    date: 'July 23, 2025',
    link: '#article3'
  }
])

const quickLinks = ref([
  { text: 'Trending Stories', href: '#trending' },
  { text: 'Newsletter', href: '#newsletter' },
  { text: 'Podcast', href: '#podcast' },
])

const latestUpdates = ref([
  { time: '1 hour ago', text: 'Apple announces new MacBook with 48-hour battery life' },
  { time: '3 hours ago', text: 'SpaceX successfully launches Mars communication satellite' },
  { time: '5 hours ago', text: 'Google releases open-source quantum computing framework' },
])

const categories = ref([
  { text: 'AI', href: '#ai' },
  { text: 'Mobile', href: '#mobile' },
  { text: 'Cloud', href: '#cloud' },
])

const connectLinks = ref([
  { text: 'Twitter', href: '#twitter' },
  { text: 'LinkedIn', href: '#linkedin' },
  { text: 'YouTube', href: '#youtube' },
])

const accessibilityClasses = computed(() => ({
  'highlight-links': accessibilitySettings.value.highlightLinks,
  'text-spacing': accessibilitySettings.value.textSpacing > 1,
  'pause-animations': accessibilitySettings.value.pauseAnimations,
  'dyslexia-font': accessibilitySettings.value.dyslexiaFont,
  'bigger-cursor': accessibilitySettings.value.biggerCursor,
  'show-tooltips': accessibilitySettings.value.tooltips,
  'page-structure': accessibilitySettings.value.pageStructure
}))

const contrastStyles = computed(() => {
  const contrast = accessibilitySettings.value.contrast / 100
  
  const bgR = Math.round(240 - (240 - 25) * contrast)
  const bgG = Math.round(248 - (248 - 35) * contrast)
  const bgB = Math.round(255 - (255 - 65) * contrast)
  
  const textR = Math.round(30 + (255 - 30) * contrast)
  const textG = Math.round(41 + (250 - 41) * contrast)
  const textB = Math.round(59 + (150 - 59) * contrast)
  
  const linkR = Math.round(0 + (0 - 0) * contrast)
  const linkG = Math.round(85 + (255 - 85) * contrast)
  const linkB = Math.round(255 + (255 - 255) * contrast)
  
  const secR = Math.round(75 + (255 - 75) * contrast)
  const secG = Math.round(85 + (200 - 85) * contrast)
  const secB = Math.round(99 + (100 - 99) * contrast)
  
  const btnBgR = Math.round(0 + (60 - 0) * contrast)
  const btnBgG = Math.round(123 + (80 - 123) * contrast)
  const btnBgB = Math.round(255 + (120 - 255) * contrast)
  
  const borderR = Math.round(243 - (243 - 100) * contrast)
  const borderG = Math.round(244 - (244 - 100) * contrast)
  const borderB = Math.round(246 - (246 - 100) * contrast)
  
  return {
    '--bg-color': `rgb(${bgR}, ${bgG}, ${bgB})`,
    '--text-color': `rgb(${textR}, ${textG}, ${textB})`,
    '--link-color': `rgb(${linkR}, ${linkG}, ${linkB})`,
    '--secondary-text-color': `rgb(${secR}, ${secG}, ${secB})`,
    '--primary-btn-bg': `rgb(${btnBgR}, ${btnBgG}, ${btnBgB})`,
    '--primary-btn-text': `rgb(${255 - textR}, ${255 - textG}, ${255 - textB})`,
    '--border-color': `rgb(${borderR}, ${borderG}, ${borderB})`,
    '--shadow': contrast > 0.5 ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.1)',
    '--primary': `rgb(${linkR}, ${linkG}, ${linkB})`
  }
})

const updateAccessibilitySettings = (settings: AccessibilitySettings): void => {
  accessibilitySettings.value = { ...settings }
  applyDynamicStyles()
}

const applyDynamicStyles = (): void => {
  const root = document.documentElement
  const textSizeMultiplier = accessibilitySettings.value.textSize / 16
  
  root.style.setProperty('--text-size-multiplier', textSizeMultiplier.toString())
  root.style.setProperty('--base-text-size', `${accessibilitySettings.value.textSize}px`)
  
  const letterSpacing = (accessibilitySettings.value.textSpacing - 1) * 0.1
  const lineHeight = 1.4 + (accessibilitySettings.value.textSpacing - 1) * 0.4
  
  root.style.setProperty('--letter-spacing', `${letterSpacing}em`)
  root.style.setProperty('--line-height', lineHeight.toString())
}

onMounted(() => {
  applyDynamicStyles()
})
</script>

<style>
:root {
  --base-text-size: 16px;
  --text-size-multiplier: 1;
  --letter-spacing: 0em;
  --line-height: 1.6;
  --bg-color: #f0f8ff;
  --text-color: #1e293b;
  --link-color: #0055ff;
  --secondary-text-color: #4b5563;
  --primary-btn-bg: #007bff;
  --primary-btn-text: #ffffff;
  --border-color: #f3f4f6;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  --primary: #2563eb;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  line-height: var(--line-height);
  color: var(--text-color);
  background: var(--bg-color);
  font-size: var(--base-text-size);
  letter-spacing: var(--letter-spacing);
  transition: all 0.3s ease;
}

#app {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
}

/* Header - Compact */
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin: 0;
}

.header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 20px;
  height: 100px;
}

.logo {
  font-size: calc(1.6rem * var(--text-size-multiplier));
  font-weight: 600;
  color: white;
  margin-top: 110px;
  padding: 0;
}

.nav {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.nav a {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.nav a:hover {
  color: white;
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
}

/* Hero - Enhanced Animations */
.hero {
  background: var(--bg-color);
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
  margin: 0;
  width: 100%;
}

.hero .container {
  position: relative;
  z-index: 2;
}

.hero-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: calc(3rem * var(--text-size-multiplier));
  margin-bottom: 1.5rem;
  font-weight: 800;
  color: var(--text-color);
  animation: heroSlideUp 1.2s ease-out;
}

.hero-subtitle {
  font-size: calc(1.2rem * var(--text-size-multiplier));
  margin-bottom: 2.5rem;
  color: var(--secondary-text-color);
  animation: heroSlideUp 1.2s ease-out 0.3s both;
}

.cta-button {
  background: var(--primary-btn-bg);
  color: var(--primary-btn-text);
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-size: calc(1.1rem * var(--text-size-multiplier));
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 0 8px 25px rgba(0, 123, 255, 0.3);
  animation: heroSlideUp 1.2s ease-out 0.6s both;
}

.cta-button:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 15px 35px rgba(0, 123, 255, 0.4);
}

/* Hero Animation Elements */
.hero-animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-card {
  position: absolute;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.card-1 {
  width: 120px;
  height: 80px;
  top: 20%;
  left: 10%;
  animation: floatCard1 6s ease-in-out infinite;
}

.card-2 {
  width: 100px;
  height: 100px;
  top: 60%;
  right: 20%;
  animation: floatCard2 8s ease-in-out infinite;
}

.card-3 {
  width: 80px;
  height: 60px;
  top: 30%;
  right: 5%;
  animation: floatCard3 7s ease-in-out infinite;
}

.pulse-ring {
  position: absolute;
  border: 2px solid rgba(0, 123, 255, 0.3);
  border-radius: 50%;
  animation: pulseRing 3s ease-out infinite;
}

.ring-1 {
  width: 200px;
  height: 200px;
  top: 40%;
  left: 15%;
  animation-delay: 0s;
}

.ring-2 {
  width: 150px;
  height: 150px;
  top: 25%;
  right: 25%;
  animation-delay: 1.5s;
}

@keyframes heroSlideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes floatCard1 {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

@keyframes floatCard2 {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(-3deg); }
}

@keyframes floatCard3 {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(8deg); }
}

@keyframes pulseRing {
  0% {
    opacity: 0.8;
    transform: scale(0.8);
  }
  50% {
    opacity: 0.4;
    transform: scale(1.1);
  }
  100% {
    opacity: 0;
    transform: scale(1.3);
  }
}

/* Main Content */
.main-content {
  padding: 3rem 0;
  margin: 0;
  width: 100%;
}

.main-content .container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
}

.articles-section h2 {
  font-size: calc(1.8rem * var(--text-size-multiplier));
  margin-bottom: 2rem;
  color: var(--text-color);
}

.article-card {
  background: var(--bg-color);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow);
  transition: transform 0.3s ease;
}

.article-card:hover {
  transform: translateY(-3px);
}

.article-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.article-content {
  padding: 1.5rem;
}

.article-content h3 {
  margin-bottom: 0.75rem;
  color: var(--text-color);
}

.article-content p {
  margin-bottom: 1rem;
  color: var(--secondary-text-color);
}

.article-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  color: var(--secondary-text-color);
}

.read-more {
  color: var(--link-color);
  text-decoration: none;
}

.read-more:hover {
  text-decoration: underline;
}

/* Sidebar */
.sidebar .widget {
  background: var(--bg-color);
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border: 2px solid var(--border-color);
  box-shadow: var(--shadow);
}

.sidebar h3 {
  margin-bottom: 1rem;
  color: var(--text-color);
}

.sidebar ul {
  list-style: none;
}

.sidebar li {
  padding: 0.5rem 0;
}

.sidebar a {
  color: var(--link-color);
  text-decoration: none;
}

.sidebar a:hover {
  text-decoration: underline;
}

.update-item {
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--border-color);
}

.update-item:last-child {
  border-bottom: none;
}

.time {
  font-size: 0.75rem;
  color: var(--secondary-text-color);
}

.update-item p {
  margin-top: 0.25rem;
  color: var(--text-color);
}

/* Footer */
.footer {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  padding: 3rem 0 1.5rem;
  margin: 0;
  width: 100%;
  border-top: 3px solid #667eea;
  position: relative;
  overflow: hidden;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #667eea, transparent);
  animation: footerGlow 3s ease-in-out infinite alternate;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
  position: relative;
  z-index: 2;
}

.footer-section h4 {
  margin-bottom: 1rem;
  color: #f1f5f9;
  font-weight: 600;
}

.footer-section p {
  color: #cbd5e1;
  line-height: 1.6;
}

.footer-section ul {
  list-style: none;
}

.footer-section li {
  padding: 0.25rem 0;
}

.footer-section a {
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section a:hover {
  color: #667eea;
  text-decoration: underline;
}

.social-links {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.social-link {
  background: #667eea;
  color: white !important;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  text-decoration: none !important;
  font-size: 0.8rem;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.social-link:hover {
  background: transparent;
  border-color: #667eea;
  color: #667eea !important;
  transform: translateY(-2px);
}

.footer-bottom {
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid #475569;
  color: #94a3b8;
}

/* Footer Animation Elements */
.footer-animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.footer-dot {
  position: absolute;
  width: 8px;
  height: 8px;
  background: rgba(102, 126, 234, 0.4);
  border-radius: 50%;
}

.dot-1 {
  top: 20%;
  left: 15%;
  animation: footerFloat1 4s ease-in-out infinite;
}

.dot-2 {
  top: 60%;
  right: 20%;
  animation: footerFloat2 5s ease-in-out infinite;
}

.dot-3 {
  top: 40%;
  left: 70%;
  animation: footerFloat3 6s ease-in-out infinite;
}

.footer-line {
  position: absolute;
  width: 100px;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.3), transparent);
  top: 50%;
  right: 10%;
  animation: footerSlide 8s linear infinite;
}

@keyframes footerGlow {
  0% { opacity: 0.5; }
  100% { opacity: 1; }
}

@keyframes footerFloat1 {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes footerFloat2 {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
}

@keyframes footerFloat3 {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

@keyframes footerSlide {
  0% { transform: translateX(-100px); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(100px); opacity: 0; }
}

/* Accessibility Classes */
.highlight-links a {
  background: yellow !important;
  color: black !important;
  padding: 2px 4px !important;
  border-radius: 3px !important;
}

.text-spacing * {
  letter-spacing: calc(var(--letter-spacing) + 0.1em) !important;
  line-height: calc(var(--line-height) + 0.4) !important;
}

.pause-animations .floating-card,
.pause-animations .pulse-ring {
  display: none !important;
}

.pause-animations .footer-dot,
.pause-animations .footer-line {
  display: none !important;
}

.pause-animations * {
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.01ms !important;
}

.dyslexia-font * {
  font-family: 'OpenDyslexic', Arial, sans-serif !important;
}

.bigger-cursor, .bigger-cursor * {
  cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="28" height="42" viewBox="0 0 28 42"><defs><filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="1" dy="1" stdDeviation="0.5" flood-color="rgba(0,0,0,0.3)"/></filter></defs><path d="M2,2 L2,32 L10,24 L15,35 L19,33 L14,22 L22,14 L2,2 Z" fill="black" stroke="white" stroke-width="1" filter="url(%23shadow)"/></svg>') 2 2, auto !important;
}

.show-tooltips [title]:hover::after {
  content: attr(title);
  position: absolute;
  top: -35px;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: #fff;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  z-index: 10000;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  pointer-events: none;
}

.show-tooltips [title] {
  position: relative;
}

.page-structure h1,
.page-structure h2,
.page-structure h3,
.page-structure h4 {
  outline: 2px solid var(--primary) !important;
  outline-offset: 2px !important;
}

/* Responsive */
@media (max-width: 768px) {
  .main-content .container {
    grid-template-columns: 1fr;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
  }
  
  .hero-title {
    font-size: calc(2.2rem * var(--text-size-multiplier));
  }
  
  .nav {
    flex-wrap: wrap;
  }
  
  .floating-card, .pulse-ring {
    display: none;
  }
}
</style>