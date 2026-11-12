// VERTICAL SLICE - NOT FOR PRODUCTION
// Validation Question: Can a new player go from choosing a mothership to taking down an enemy home world, unguided?
// Date: 2026-11-11
// The three mothership styles. One source of truth: the title screen preview, the cockpit accent
// colours and the third-person model in battle all read this file.
// Nose points to -Z, engines at +Z (same as the battle spike's flagship). Unit scale ~ the spike's flag(): ~14 long.
window.XJ_HULLS = (function () {
  const order = ['vanguard', 'bulwark', 'ranger'];
  const data = {
    vanguard: {
      id: 'vanguard', name: '先鋒號', en: 'VANGUARD', role: '突擊型',
      blurb: '窄長的前掠翼。推進快、飛彈冷卻短，船體偏薄，適合先手重擊再閃開。',
      accent: '#ff8a2a', accentHex: 0xff8a2a, body: 0xe9e4de, trim: 0x3a4658,
      // multipliers read by the phases. 1 = the spike's number.
      mod: { thrust: 1.2, maxspeed: 1.15, hull: 0.85, shield: 1.0, missile_cd: 0.7, scan: 1.0, gun: 1.1 },
      perks: ['推進 +20%', '飛彈冷卻 −30%', '船體 −15%'],
    },
    bulwark: {
      id: 'bulwark', name: '堡壘號', en: 'BULWARK', role: '要塞型',
      blurb: '寬厚的裝甲與雙層護盾。轉得慢、衝得慢，但撐得住，是艦隊的錨。',
      accent: '#c8ff2e', accentHex: 0xc8ff2e, body: 0xd5dbe3, trim: 0x2c3a4e,
      mod: { thrust: 0.9, maxspeed: 0.9, hull: 1.45, shield: 1.6, missile_cd: 1.0, scan: 1.0, gun: 1.0 },
      perks: ['船體 +45%', '護盾時間 +60%', '推進 −10%'],
    },
    ranger: {
      id: 'ranger', name: '遊俠號', en: 'RANGER', role: '探索型',
      blurb: '長天線與掃描盤。掃描範圍大、巡航省，戰鬥數值中庸，最會發現東西。',
      accent: '#6fe3ff', accentHex: 0x6fe3ff, body: 0xdfeaf2, trim: 0x34506a,
      mod: { thrust: 1.05, maxspeed: 1.05, hull: 1.0, shield: 1.15, missile_cd: 1.0, scan: 1.5, gun: 1.0 },
      perks: ['掃描範圍 +50%', '護盾 +15%', '推進 +5%'],
    },
  };

  function std(THREE, c, e) {
    return new THREE.MeshStandardMaterial({ color: c, flatShading: true, roughness: 0.55, metalness: 0.35, emissive: e ? c : 0x000000, emissiveIntensity: e || 0 });
  }
  function box(THREE, g, w, h, d, mat, x, y, z) { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x || 0, y || 0, z || 0); g.add(m); return m; }
  function cyl(THREE, g, rt, rb, len, seg, mat, x, y, z) { const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, len, seg), mat); m.rotation.x = Math.PI / 2; m.position.set(x || 0, y || 0, z || 0); g.add(m); return m; }
  function nose(THREE, g, r, len, seg, mat, z) { const m = new THREE.Mesh(new THREE.ConeGeometry(r, len, seg), mat); m.rotation.x = -Math.PI / 2; m.position.z = z; g.add(m); return m; }

  // Build the exterior model. Returns a Group; group.userData.engines = [[x, y, z, size], ...] for the caller to put glow sprites on.
  function build(THREE, id) {
    const h = data[id] || data.vanguard;
    const g = new THREE.Group();
    const body = std(THREE, h.body), trim = std(THREE, h.trim), acc = std(THREE, h.accentHex), glass = std(THREE, 0x6fe3ff, 0.7);
    const engines = [];
    if (id === 'bulwark') {
      // a broad slab with armour fins and a twin-barrelled prow
      cyl(THREE, g, 1.9, 2.4, 9, 6, body, 0, 0, 0.5);
      nose(THREE, g, 1.9, 3, 6, body, -5.5);
      box(THREE, g, 5.4, 0.7, 6, trim, 0, 1.55, 1.2);
      for (const s of [-1, 1]) {
        box(THREE, g, 1.6, 2.4, 7.5, trim, s * 3.2, 0, 1.2);
        box(THREE, g, 0.5, 1.3, 4, acc, s * 4.2, 0.1, 1.2);
        cyl(THREE, g, 0.3, 0.3, 4.6, 8, trim, s * 0.9, -0.2, -7);
        engines.push([s * 1.5, 0, 5.4, 3.6], [s * 3.2, 0, 5.2, 2.2]);
      }
      const can = new THREE.Mesh(new THREE.OctahedronGeometry(0.9), glass); can.scale.set(1, 0.55, 2); can.position.set(0, 1.5, -2.6); g.add(can);
    } else if (id === 'ranger') {
      // a slim hull, a scanning dish on the spine and a long mast
      cyl(THREE, g, 0.8, 1.3, 9.5, 8, body, 0, 0, 0.4);
      nose(THREE, g, 0.8, 4.4, 8, body, -7);
      const dish = new THREE.Mesh(new THREE.ConeGeometry(1.7, 0.7, 14, 1, true), std(THREE, h.accentHex, 0.35)); dish.rotation.x = -0.5; dish.position.set(0, 1.9, 1.6); dish.material.side = THREE.DoubleSide; g.add(dish);
      box(THREE, g, 0.12, 2.2, 0.12, trim, 0, 1.0, 1.6);
      box(THREE, g, 0.1, 0.1, 6, trim, 0, 0.3, -9.5);
      for (const s of [-1, 1]) {
        const w = box(THREE, g, 5, 0.18, 2.2, std(THREE, 0xaed6ea), s * 3.1, -0.2, 2.2); w.rotation.y = s * 0.25;
        box(THREE, g, 0.4, 0.4, 3.4, acc, s * 5.4, -0.2, 2.8);
        engines.push([s * 0.8, 0, 5.2, 3]);
      }
      const can = new THREE.Mesh(new THREE.OctahedronGeometry(0.8), glass); can.scale.set(1, 0.6, 2.4); can.position.set(0, 0.95, -3.4); g.add(can);
    } else {
      // vanguard: a needle with forward-swept orange blades
      cyl(THREE, g, 0.7, 1.4, 9.5, 5, body, 0, 0, 0.5);
      nose(THREE, g, 0.7, 4.2, 5, body, -6.4);
      for (const s of [-1, 1]) {
        const w = box(THREE, g, 5.6, 0.2, 2.4, acc, s * 3.2, -0.1, 0.4); w.rotation.y = -s * 0.75;
        box(THREE, g, 0.3, 1.8, 2.2, trim, s * 5.6, 0.5, -1.2);
        engines.push([s * 0.9, 0, 5.3, 3.4]);
      }
      box(THREE, g, 1.4, 0.2, 2.6, trim, 0, 0.9, 2.6);
      const can = new THREE.Mesh(new THREE.OctahedronGeometry(0.75), glass); can.scale.set(1, 0.55, 2.3); can.position.set(0, 0.85, -3.2); g.add(can);
    }
    g.userData.engines = engines;
    g.userData.hullId = id;
    return g;
  }

  return { order, data, build, get(id) { return data[id] || data.vanguard; } };
})();
