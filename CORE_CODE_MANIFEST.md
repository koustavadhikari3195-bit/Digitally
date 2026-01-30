# Digitally: Advanced Core Manifest

This document contains the high-fidelity building blocks of the **Digitally** platform after the massive Premium Upgrade.

---

## 🚀 1. Premium UI: `EnhancedHero.jsx`
**Role**: Handles parallax, mouse-tracking, and mode navigation with elite glassmorphism.
```javascript
export default function EnhancedHero({ viewMode, setViewMode }) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]); // Parallax movement
  
  return (
    <div className="relative min-h-screen bg-slate-950">
      <motion.div style={{ x: y1 }} className="absolute top-20 bg-purple-500/20 blur-3xl" />
      <motion.h1 className="text-8xl font-bold gradient-text">Welcome to Digitally</motion.h1>
      {/* Mode Toggle Integrated */}
      <div className="flex gap-4">
        {['agency', 'lab'].map(mode => (
          <button onClick={() => setViewMode(mode)} className="btn-gradient">{mode}</button>
        ))}
      </div>
    </div>
  );
}
```

---

## ⚡ 2. High-Performance Caching: `utils/cache.js`
**Role**: In-memory singleton that reduces redundant database and AI API calls.
```javascript
class SimpleCache {
  constructor(ttl = 300000) { this.cache = new Map(); this.ttl = ttl; }
  set(key, value) { this.cache.set(key, { value, timestamp: Date.now() }); }
  get(key) {
    const item = this.cache.get(key);
    if (!item || (Date.now() - item.timestamp > this.ttl)) return null;
    return item.value;
  }
}
module.exports = new SimpleCache();
```

---

## 🤖 3. Concurrency Protection: `utils/queue.js`
**Role**: Limits concurrent AI requests to prevent API rate limits and server overload.
```javascript
class RequestQueue {
  constructor(maxConcurrent = 3) { this.queue = []; this.running = 0; }
  async add(fn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ fn, resolve, reject });
      this.process();
    });
  }
}
module.exports = new RequestQueue(3);
```

---

## 🎭 4. Seamless Transitions: `PageTransition.jsx`
**Role**: Animates route changes using `AnimatePresence`.
```javascript
export default function PageTransition({ children }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

---

## 🔔 5. Global Notifications: `Toast.jsx`
**Role**: React Context provider for real-time status alerts (Success, Error, Info).
```javascript
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const addToast = (message, type) => { /* logic */ };
  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <AnimatePresence>{/* Render Toasts */}</AnimatePresence>
    </ToastContext.Provider>
  );
}
```

---

## 📈 6. Smart Persistence: `models/Resume.js`
**Role**: AI-optimized document schema with analytical aggregations.
```javascript
resumeSchema.statics.getAnalytics = function(days = 30) {
  return this.aggregate([
    { $match: { createdAt: { $gte: startDate } } },
    { $group: { _id: "$date", avgScore: { $avg: "$analysisResult.score" } } }
  ]);
};
```
 ---
*Created by Antigravity AI - Final Handover Version*
