// Utility Audio UI Modern & Elegan (Soft Haptic & High-Tech Chime)
class SoundFX {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Suara klik tombol: dibuat sangat singkat (ultra-fast decay) dan menggunakan triangle wave agar empuk
  playClick() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'triangle'; // Suara lebih lembut dibanding sine/square
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.015); // Durasi cuma 15 milidetik (super renyah)

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime); // Volume sangat kecil agar tidak mengagetkan
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.015);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.015);
    } catch (e) {}
  }

  // Suara sukses / buka pop-up: dibuat seperti nada airy/glass tap ala UI macOS/iOS
  playSuccess() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [1046.5, 1318.5].forEach((freq, i) => { // Nada tinggi yang clean dan futuristik
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.03);
        gain.gain.setValueAtTime(0.01, now + i * 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.03 + 0.06);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.03);
        osc.stop(now + i * 0.03 + 0.06);
      });
    } catch (e) {}
  }
}

export const sfx = new SoundFX();