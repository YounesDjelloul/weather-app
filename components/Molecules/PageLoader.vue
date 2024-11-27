<template>
  <div class="overlay">
    <div class="loading-bar"></div>
    <span class="overlay-text">Loading..</span>
  </div>
</template>

<style scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(2px);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  border-radius: 17px;
  font-family: 'Jost', sans-serif;
}

.overlay-text {
  color: #374151;
  font-size: 16px;
  font-weight: 500;
}

.loading-bar {
  width: 25%;
  height: 4px;
  background: #E5E7EB;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
}

.loading-bar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 30%;
  background: linear-gradient(90deg, #60A5FA, #3B82F6, #2563EB);
  animation: loading 1.5s ease-in-out infinite;
  border-radius: 2px;
}

@keyframes loading {
  0% {
    left: -30%;
  }
  100% {
    left: 100%;
  }
}
</style>
