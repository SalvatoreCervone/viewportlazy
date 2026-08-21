<template>
    <div class="playground">
        <header class="header">
            <div class="badge">Vue 3 Library Demo</div>
            <h1>@salvatorecervone/viewportlazy</h1>
            <p class="subtitle">
                High-performance lazy viewport loader for Vue 3 — Component, Composable & Directive.
            </p>
            <div class="stats-bar">
                <div class="stat-card">
                    <span class="stat-num">{{ loadedCardsCount }}</span>
                    <span class="stat-label">Components Loaded</span>
                </div>
                <div class="stat-card">
                    <span class="stat-num">{{ composableStatus }}</span>
                    <span class="stat-label">Composable State</span>
                </div>
                <div class="stat-card">
                    <span class="stat-num">{{ directiveCount }}</span>
                    <span class="stat-label">Directive Triggers</span>
                </div>
            </div>
        </header>

        <main class="content-container">
            <!-- Section 1: Intro banner -->
            <section class="info-section">
                <h2>Scroll down to see lazy loading in action 👇</h2>
                <p>Items below will only render, fetch data, or execute animations when they enter the viewport.</p>
            </section>

            <!-- Spacer to push content down for demonstration -->
            <div class="scroll-spacer">
                <span>[ Scroll down: 600px viewport spacer ]</span>
            </div>

            <!-- Section 2: Component with Skeleton Placeholder -->
            <section class="demo-section">
                <h2>1. Component Usage (`&lt;ViewPortLazy&gt;`) with Skeleton Placeholder</h2>
                <div class="grid">
                    <div v-for="item in cards" :key="item.id" class="grid-item">
                        <ViewPortLazy
                            :min-height="240"
                            :root-margin="'50px'"
                            :delay-all-view="item.delay"
                            @visible="onCardVisible(item.id)"
                        >
                            <!-- Content Slot -->
                            <div class="card-content loaded">
                                <div class="card-tag">Card #{{ item.id }}</div>
                                <h3>{{ item.title }}</h3>
                                <p>{{ item.desc }}</p>
                                <div class="card-meta">
                                    <span>⚡ Delay: {{ item.delay }}ms</span>
                                    <span>✅ Rendered</span>
                                </div>
                            </div>

                            <!-- Placeholder Slot (Zero CLS) -->
                            <template #placeholder>
                                <div class="skeleton-card">
                                    <div class="skeleton-shimmer"></div>
                                    <div class="skeleton-line title"></div>
                                    <div class="skeleton-line text"></div>
                                    <div class="skeleton-line text short"></div>
                                    <span class="skeleton-label">Waiting for Viewport...</span>
                                </div>
                            </template>
                        </ViewPortLazy>
                    </div>
                </div>
            </section>

            <!-- Another Spacer -->
            <div class="scroll-spacer">
                <span>[ Scroll down: 500px viewport spacer ]</span>
            </div>

            <!-- Section 3: Composable usage -->
            <section class="demo-section">
                <h2>2. Composable Usage (`useViewportLazy`)</h2>
                <div ref="composableTarget" class="composable-box" :class="{ active: isComposableVisible }">
                    <div v-if="isComposableVisible" class="composable-content">
                        <h3>🎉 Composable is now VISIBLE!</h3>
                        <p>Tracked with <code>const { isVisible } = useViewportLazy(composableTarget)</code></p>
                    </div>
                    <div v-else class="composable-pending">
                        <p>Scroll me into view to trigger composable activation...</p>
                    </div>
                </div>
            </section>

            <!-- Another Spacer -->
            <div class="scroll-spacer">
                <span>[ Scroll down: 400px viewport spacer ]</span>
            </div>

            <!-- Section 4: Directive usage -->
            <section class="demo-section">
                <h2>3. Directive Usage (`v-viewport-lazy`)</h2>
                <div
                    v-viewport-lazy="onDirectiveTrigger"
                    class="directive-box"
                    :class="{ triggered: isDirectiveTriggered }"
                >
                    <div v-if="isDirectiveTriggered">
                        <h3>🚀 Directive Triggered!</h3>
                        <p>Triggered callback using <code>v-viewport-lazy="onDirectiveTrigger"</code></p>
                    </div>
                    <div v-else>
                        <p>Directive waiting for intersection...</p>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useViewportLazy } from '../src/index.js';

const loadedCards = ref(new Set());
const loadedCardsCount = ref(0);

const cards = ref([
    { id: 1, title: 'Optimized Image Loader', desc: 'Loads images and videos only when visible.', delay: 0 },
    { id: 2, title: 'API Data Fetcher', desc: 'Trigger expensive network requests just-in-time.', delay: 200 },
    { id: 3, title: 'Heavy Chart Widget', desc: 'Mount charts and animations without main-thread blocking.', delay: 400 },
    { id: 4, title: 'Interactive Map Box', desc: 'Instantiate maps and WebGL contexts on scroll.', delay: 100 },
]);

function onCardVisible(id) {
    loadedCards.value.add(id);
    loadedCardsCount.value = loadedCards.value.size;
}

// Composable Demo
const composableTarget = ref(null);
const { isVisible: isComposableVisible } = useViewportLazy(composableTarget, {
    rootMargin: '20px',
    delay: 150,
});
const composableStatus = ref('Pending');
import { watch } from 'vue';
watch(isComposableVisible, (val) => {
    if (val) composableStatus.value = 'Visible 🚀';
});

// Directive Demo
const isDirectiveTriggered = ref(false);
const directiveCount = ref(0);
function onDirectiveTrigger() {
    isDirectiveTriggered.value = true;
    directiveCount.value += 1;
}
</script>

<style scoped>
.playground {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2.5rem 1.5rem 6rem;
}

.header {
    text-align: center;
    margin-bottom: 2rem;
}

.badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background: rgba(59, 130, 246, 0.2);
    border: 1px solid rgba(59, 130, 246, 0.4);
    border-radius: 9999px;
    color: #60a5fa;
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
}

h1 {
    font-size: 2.2rem;
    font-weight: 700;
    background: linear-gradient(135deg, #60a5fa 0%, #a855f7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
}

.subtitle {
    color: #94a3b8;
    font-size: 1.05rem;
    max-width: 600px;
    margin: 0 auto 1.5rem;
}

.stats-bar {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
}

.stat-card {
    background: #1e293b;
    border: 1px solid #334155;
    border-radius: 12px;
    padding: 0.75rem 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.stat-num {
    font-size: 1.4rem;
    font-weight: 700;
    color: #38bdf8;
}

.stat-label {
    font-size: 0.75rem;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.info-section {
    background: #1e293b;
    border: 1px solid #334155;
    padding: 1.5rem;
    border-radius: 12px;
    text-align: center;
    margin-bottom: 2rem;
}

.info-section h2 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: #f1f5f9;
}

.info-section p {
    color: #94a3b8;
}

.scroll-spacer {
    height: 450px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px dashed #334155;
    border-radius: 12px;
    margin: 3rem 0;
    color: #64748b;
    font-family: monospace;
    font-size: 0.9rem;
    background: rgba(15, 23, 42, 0.6);
}

.demo-section {
    margin-bottom: 3rem;
}

.demo-section h2 {
    font-size: 1.3rem;
    color: #e2e8f0;
    margin-bottom: 1.25rem;
    border-left: 4px solid #38bdf8;
    padding-left: 0.75rem;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
}

.card-content {
    background: linear-gradient(145deg, #1e293b, #0f172a);
    border: 1px solid #38bdf8;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 0 15px rgba(56, 189, 248, 0.15);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 240px;
    animation: fadeIn 0.4s ease-out;
}

.card-tag {
    font-size: 0.75rem;
    font-weight: 600;
    color: #38bdf8;
    background: rgba(56, 189, 248, 0.1);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    width: fit-content;
    margin-bottom: 0.5rem;
}

.card-content h3 {
    font-size: 1.15rem;
    color: #f8fafc;
    margin-bottom: 0.5rem;
}

.card-content p {
    font-size: 0.9rem;
    color: #cbd5e1;
    margin-bottom: 1rem;
}

.card-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: #94a3b8;
    border-top: 1px solid #334155;
    padding-top: 0.75rem;
}

/* Skeleton Placeholder */
.skeleton-card {
    background: #1e293b;
    border: 1px solid #334155;
    border-radius: 12px;
    padding: 1.5rem;
    min-height: 240px;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.75rem;
}

.skeleton-shimmer {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
    animation: shimmer 1.5s infinite;
}

.skeleton-line {
    background: #334155;
    border-radius: 4px;
}
.skeleton-line.title { height: 20px; width: 60%; }
.skeleton-line.text { height: 14px; width: 90%; }
.skeleton-line.text.short { width: 45%; }
.skeleton-label {
    font-size: 0.8rem;
    color: #64748b;
    text-align: center;
    margin-top: 1rem;
}

.composable-box, .directive-box {
    background: #1e293b;
    border: 2px dashed #475569;
    border-radius: 12px;
    padding: 2.5rem;
    text-align: center;
    transition: all 0.3s ease;
}

.composable-box.active, .directive-box.triggered {
    border-style: solid;
    border-color: #10b981;
    background: rgba(16, 185, 129, 0.1);
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);
}

@keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>
