/* ============ YM Marketing — Tweaks panel (React island) ============ */

const YM_TWEAKS = /*EDITMODE-BEGIN*/{
  "dark": false,
  "brand": "#70193D",
  "displayFont": "Bricolage Grotesque",
  "radius": 18,
  "density": "regular",
  "heroLine1": "See the gaps.",
  "heroLine2": "Scale the business."
}/*EDITMODE-END*/;

(function () {
  const { useEffect } = React;

  // ---- color helpers ----
  function hexToRgb(h){h=h.replace('#','');return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)];}
  function rgbToHex(r,g,b){const c=(n)=>Math.max(0,Math.min(255,Math.round(n))).toString(16).padStart(2,'0');return '#'+c(r)+c(g)+c(b);}
  function mix(hex, target, amt){const a=hexToRgb(hex),b=hexToRgb(target);return rgbToHex(a[0]+(b[0]-a[0])*amt,a[1]+(b[1]-a[1])*amt,a[2]+(b[2]-a[2])*amt);}
  const darken = (h,a)=>mix(h,'#000000',a);
  const lighten = (h,a)=>mix(h,'#ffffff',a);

  function applyBrand(hex){
    // shades + accent derive from --brand via color-mix in CSS, so one set cascades
    document.documentElement.style.setProperty('--brand', hex);
  }

  const FONTS = {
    "Bricolage Grotesque": '"Bricolage Grotesque", "Hanken Grotesk", sans-serif',
    "Instrument Serif": '"Instrument Serif", Georgia, serif',
    "Hanken Grotesk": '"Hanken Grotesk", system-ui, sans-serif',
  };
  const DENSITY = { compact: "44px", regular: "72px", spacious: "104px" };

  function App() {
    const [t, setTweak] = useTweaks(YM_TWEAKS);

    useEffect(() => { if (window.ymSetTheme) window.ymSetTheme(t.dark ? "dark" : "light"); }, [t.dark]);
    useEffect(() => { applyBrand(t.brand); }, [t.brand]);
    useEffect(() => {
      document.documentElement.style.setProperty('--f-display', FONTS[t.displayFont] || FONTS["Bricolage Grotesque"]);
    }, [t.displayFont]);
    useEffect(() => {
      document.documentElement.style.setProperty('--r', t.radius + 'px');
      document.documentElement.style.setProperty('--r-lg', (t.radius + 8) + 'px');
    }, [t.radius]);
    useEffect(() => {
      document.documentElement.style.setProperty('--pad', `clamp(20px, 5vw, ${DENSITY[t.density] || '72px'})`);
    }, [t.density]);
    useEffect(() => {
      const a = document.querySelector('#hero h1');
      if (a) a.innerHTML = `${esc(t.heroLine1)}<br>${esc(t.heroLine2)}`;
    }, [t.heroLine1, t.heroLine2]);

    function esc(s){
      // keep words after a space wrapped in serif italic only if author used the pattern? keep plain, but italicize last word for style
      const html = (s||"").replace(/&/g,'&amp;').replace(/</g,'&lt;');
      const parts = html.trim().split(' ');
      if (parts.length > 1) {
        const last = parts.pop();
        return parts.join(' ') + ' <span class="serif-i">' + last + '</span>';
      }
      return html;
    }

    return (
      <TweaksPanel title="Tweaks">
        <TweakSection label="Appearance" />
        <TweakToggle label="Dark mode" value={t.dark} onChange={(v) => setTweak('dark', v)} />
        <TweakColor label="Brand color" value={t.brand}
          options={["#70193D", "#7A1023", "#5B1A52", "#10503A", "#1F2A52"]}
          onChange={(v) => setTweak('brand', v)} />

        <TweakSection label="Typography" />
        <TweakSelect label="Display font" value={t.displayFont}
          options={["Bricolage Grotesque", "Instrument Serif", "Hanken Grotesk"]}
          onChange={(v) => setTweak('displayFont', v)} />

        <TweakSection label="Layout" />
        <TweakRadio label="Density" value={t.density}
          options={["compact", "regular", "spacious"]}
          onChange={(v) => setTweak('density', v)} />
        <TweakSlider label="Corner radius" value={t.radius} min={0} max={28} step={2} unit="px"
          onChange={(v) => setTweak('radius', v)} />

        <TweakSection label="Hero copy" />
        <TweakText label="Headline line 1" value={t.heroLine1} onChange={(v) => setTweak('heroLine1', v)} />
        <TweakText label="Headline line 2" value={t.heroLine2} onChange={(v) => setTweak('heroLine2', v)} />
      </TweaksPanel>
    );
  }

  const mount = document.createElement('div');
  mount.id = 'ym-tweaks-root';
  document.body.appendChild(mount);
  ReactDOM.createRoot(mount).render(<App />);
})();
