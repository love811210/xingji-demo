// VERTICAL SLICE - NOT FOR PRODUCTION
// Validation Question: Can a new player go from choosing a mothership to taking down an enemy home world, unguided?
// Date: 2026-11-11
// Adapted from Spike #2c (xingji-base-spike-2026-11-10). Every tuning value lives here, each with value, min, max and step.
// The game reads them live through tune.<name> (index.html).
// Source of the numbers: design/gdd/resources-and-production.md and fleet-and-shipyard.md (draft), compressed for a 6-8 minute slice.
window.CONFIG = {
  // ---- Orbit screen: the painted shipyard (assets/img/yard-<hull>.jpg) ----
  yard_drift: { value: 0.03, min: 0, max: 0.1, step: 0.005 },   // how far the painted shipyard slowly breathes in and out (0 = still)
  yard_dim: { value: 0.12, min: 0, max: 0.6, step: 0.02 },      // a dark veil over it so the panels read
  seed: 1, // every gameplay random call reads rng(), seeded from SLICE.state.seed
  volume: { value: 0.5, min: 0, max: 1, step: 0.05 },

  // ---- Rates ----
  // CHANGED from the spike: time_scale is now the GAME SPEED (simulation seconds per real second), higher = faster.
  // The HUD speed buttons 1x / 2x / 4x multiply it; ?fast=1 multiplies it by 4 again.
  time_scale: { value: 1.5, min: 0.5, max: 24, step: 0.1 },
  out_cap: { value: 4, min: 1, max: 20, step: 1 },                // products a machine holds before it blocks
  in_cap_cycles: { value: 3, min: 1, max: 10, step: 1 },          // input buffer, in cycles of its recipe
  pad_cap: { value: 12, min: 2, max: 60, step: 1 },               // cargo a landing pad holds before transports wait

  // ---- Belts and pipes ----
  belt_speed: { value: 2.5, min: 0.5, max: 6, step: 0.1 },        // cells per second
  belt_spacing: { value: 0.34, min: 0.2, max: 0.6, step: 0.02 },  // minimum gap between items, in cells
  link_max: { value: 5, min: 2, max: 8, step: 1 },                // longest bridge or tunnel, cells end to end
  pipe_cap: { value: 12, min: 4, max: 60, step: 1 },              // units one pipe network holds

  // ---- Power: everything is sent from the core; a machine needs a receiver in range ----
  solar_power: { value: 6, min: 1, max: 30, step: 1 },
  gen_power: { value: 15, min: 1, max: 60, step: 1 },
  gen_burn: { value: 10, min: 2, max: 60, step: 1 },
  receiver_1: { value: 11, min: 3, max: 20, step: 1 },            // a receiver covers this many tiles a side, state line 1 (slice: wider than the spike's 5)
  receiver_2: { value: 13, min: 3, max: 22, step: 1 },            // ... state line 2
  receiver_3: { value: 15, min: 3, max: 24, step: 1 },            // ... state line 3
  slice_power: { value: 45, min: 0, max: 100, step: 5 },          // starter supply: the geothermal vent next to the base, sent to the core from the start

  // ---- Starting stock in the base core (generous: the slice teaches the three states, not the iron economy) ----
  open_all: { value: 1, min: 0, max: 1, step: 1 },                // 1 = all three state lines (every machine, recipe and supply route) and the orbital shipyard are open from the start; 0 = the two goals and the elevator unlock them
  start_core_lv: { value: 1, min: 0, max: 2, step: 1 },           // 0 = I (20x20), 1 = II (30x30, power 24), 2 = III
  start_iron: { value: 160, min: 0, max: 400, step: 5 },
  start_copper: { value: 220, min: 0, max: 400, step: 5 },
  start_steel: { value: 140, min: 0, max: 400, step: 5 },
  start_silicon: { value: 24, min: 0, max: 200, step: 1 },

  // ---- Goals (each unlocks the next material state) ----
  goal_hull: { value: 3, min: 1, max: 30, step: 1 },              // hull plates made: unlocks liquids
  goal_circuit: { value: 4, min: 1, max: 30, step: 1 },           // circuit boards made: unlocks gases and the elevator
  goal_warships: { value: 2, min: 1, max: 8, step: 1 },           // warships needed before the 出征 button works

  // ---- Space elevator and orbital shipyard ----
  lift_rate: { value: 90, min: 10, max: 600, step: 10 },          // parts the elevator carries up per minute (shared by the berths)
  // seconds to assemble each warship once its parts are up: DATA.ships.<id>.t below

  // ---- Slice guidance ----
  idle_hint: { value: 25, min: 5, max: 120, step: 5 },            // s without any click before the concrete hint appears
  launch_delay: { value: 1.5, min: 0.5, max: 5, step: 0.1 },      // s between pressing 出征 and SLICE.done()

  // ---- Camera ----
  pan_speed: { value: 14, min: 4, max: 40, step: 1 },             // cells per second with the keys
  zoom_min: { value: 9, min: 5, max: 20, step: 1 },
  zoom_max: { value: 70, min: 20, max: 100, step: 1 },
  fly_time: { value: 2.0, min: 0.5, max: 6, step: 0.1 },          // s for the short descent to the ground (a tap skips it)

  // ---- Art pass 2026-11-11: the painted pictures in ../../assets/img/ (each optional: a missing one leaves the drawn look) ----
  icon_scale: { value: 3.5, min: 2, max: 5, step: 0.1 },          // a painted item icon's width, as a multiple of the drawn icon's half-size
  icon_plate: { value: 0.6, min: 0, max: 1, step: 0.05 },         // opacity of the dark disc under a painted item icon
  ship_icon_scale: { value: 3.4, min: 2, max: 5, step: 0.1 },     // the same for the dot-matrix ship class icons (their black is made see-through)
  stock_row: { value: 26, min: 22, max: 32, step: 1 },            // px between rows of the core stock list (top right)
  deck_cells: { value: 4, min: 1, max: 12, step: 1 },             // build tiles one ground-deck.jpg picture spans on the levelled pad
  deck_tint: { value: 5.5, min: 0.5, max: 12, step: 0.1 },        // brightness of the plated pad (multiplies the picture, which is painted very dark)
  rock_cells: { value: 9, min: 2, max: 30, step: 1 },             // tiles one ground-rock.jpg picture spans on the terrain round the pad
  rock_tint: { value: 2.8, min: 0.5, max: 8, step: 0.1 },         // brightness of the rocky terrain (multiplies the picture)
  sun_power: { value: 2.7, min: 0.5, max: 5, step: 0.1 },         // the low afternoon sun
  sky_power: { value: 0.9, min: 0.2, max: 2, step: 0.05 },        // light from the sky and bounced off the ground
  haze_near: { value: 70, min: 20, max: 200, step: 2 },           // where the far ground starts to fade into the planet's haze
  haze_far: { value: 230, min: 80, max: 500, step: 5 },           // ... and where it is all haze
  ao_size: { value: 1.42, min: 1, max: 2, step: 0.02 },           // the soft contact shadow under a machine, as a multiple of its footprint
  ao_alpha: { value: 0.6, min: 0, max: 1, step: 0.05 },           // ... and how dark it is
  machine_dark: { value: 0.78, min: 0, max: 1, step: 0.02 },      // machine bodies: 0 = the old white, 1 = dark gunmetal (style guide: dark machines, lime and orange lights)
  glow_power: { value: 1.35, min: 0.5, max: 3, step: 0.05 },      // how bright the lime / orange lamps on the machines are (multiplies their glow)
  orbit_sky: { value: 0.85, min: 0.1, max: 2, step: 0.05 },       // brightness of sky-nebula.jpg behind the shipyard
  orbit_planet: { value: 1.0, min: 0.4, max: 2, step: 0.02 },     // size of the painted planet below the shipyard (1 = same outline as the old low-poly globe)
  panel_alpha: { value: 0.88, min: 0.4, max: 1, step: 0.02 },     // how solid the big HUD panels are (dark navy glass)
  bar_plate: { value: 0.62, min: 0, max: 1, step: 0.02 },         // the plate behind the build bar at the bottom (0 = none, as before)

  // ---- Art pass 2, 2026-11-11: painted buildings (bld-<type>.png) standing as flat cards on a light platform. Each picture is optional ----
  // The view: once a building picture has arrived the view stops turning (the pictures have one side only)
  cam_pitch: { value: 50, min: 35, max: 70, step: 1 },            // degrees above the horizon the view looks down from: the angle the buildings are painted at
  cam_fov: { value: 20, min: 10, max: 38, step: 1 },              // a longer lens than the old 38: the ground behind a flat picture lines up better. The framing stays the same
  // A building picture's width, as a multiple of its footprint's width (1 = the painted base is exactly as wide as the tiles)
  card_core: { value: 1.0, min: 0.6, max: 1.4, step: 0.01 },
  card_pad: { value: 1.0, min: 0.6, max: 1.4, step: 0.01 },
  card_smelter: { value: 1.0, min: 0.6, max: 1.4, step: 0.01 },
  card_fab: { value: 1.0, min: 0.6, max: 1.4, step: 0.01 },
  card_assembler: { value: 1.0, min: 0.6, max: 1.4, step: 0.01 },
  card_gasifier: { value: 1.0, min: 0.6, max: 1.4, step: 0.01 },
  card_condenser: { value: 1.0, min: 0.6, max: 1.4, step: 0.01 },
  card_pipehead: { value: 1.0, min: 0.6, max: 1.4, step: 0.01 },
  card_receiver: { value: 0.9, min: 0.6, max: 1.4, step: 0.01 },
  card_solar: { value: 1.0, min: 0.6, max: 1.4, step: 0.01 },
  card_storein: { value: 1.0, min: 0.6, max: 1.4, step: 0.01 },
  card_storeout: { value: 1.0, min: 0.6, max: 1.4, step: 0.01 },
  card_idle: { value: 0.8, min: 0.4, max: 1, step: 0.02 },        // brightness of a machine's picture while it is not working (idle, short of input, blocked)
  card_off: { value: 0.56, min: 0.2, max: 1, step: 0.02 },        // ... and while it has no power
  lamp_size: { value: 0.24, min: 0.1, max: 0.8, step: 0.02 },      // the status lamp over a machine, in tiles (it grows as the view is raised, so it stays a dot you can see)
  ghost_alpha: { value: 0.62, min: 0.2, max: 1, step: 0.02 },     // how solid the picture of a building in hand is
  cast_len: { value: 0.8, min: 0, max: 2, step: 0.05 },           // height of the unseen block that casts a building's shadow, as a multiple of the height read off its picture (0 = no cast shadow)
  item_size: { value: 0.42, min: 0.2, max: 0.9, step: 0.02 },     // a painted item riding a belt, in tiles
  mark_size: { value: 1.0, min: 0.5, max: 1.6, step: 0.05 },      // the flat intake (green), outlet (orange) and pipe port (blue) plates on a building's rim
  // The ground: ground-pad.jpg on the tiles that are open for building, ground-grass.jpg everywhere else, a painted sea in the bay
  pad_cells: { value: 3, min: 1, max: 12, step: 1 },              // build tiles one ground-pad.jpg picture spans (it is painted as 3 by 3 slabs: one slab per tile)
  pad_tint: { value: 1.16, min: 0.4, max: 2.5, step: 0.02 },      // brightness of the light paving
  pad_seam: { value: 0.975, min: 0.9, max: 1, step: 0.005 },      // a paved tile's size: the gap that is left is the quiet grid line (1 = no line but the painted one)
  grass_cells: { value: 7, min: 2, max: 30, step: 1 },            // tiles one ground-grass.jpg picture spans
  grass_tint: { value: 1.12, min: 0.4, max: 2.5, step: 0.02 },    // brightness of the grassland
  pad_sun: { value: 2.5, min: 0.5, max: 5, step: 0.1 },           // the late-afternoon sun on the light platform (replaces sun_power once ground-pad.jpg is there)
  pad_sky: { value: 1.55, min: 0.2, max: 3, step: 0.05 },         // ... and the light from the sky (replaces sky_power)
  ao_light: { value: 0.42, min: 0, max: 1, step: 0.02 },          // the contact shadow under a building on the light paving (replaces ao_alpha there)
  tree_size: { value: 2.3, min: 1, max: 5, step: 0.1 },           // width of one bld-trees.png cluster, in tiles
  tree_far: { value: 420, min: 0, max: 1200, step: 20 },          // clusters tried on the land beyond the tiles (those that fall in the sea or a clearing are dropped)

  // ---- Touch pass 2026-11-12: the phone layout (read only in touch mode: ?touch=1, or a coarse pointer without ?touch=0) ----
  // All in stage px. The 1280x720 stage is shown at about half size on a phone held sideways, so 88 here is 44 px under the thumb.
  touch_target: { value: 88, min: 72, max: 120, step: 2 },        // shortest side of anything a finger presses
  touch_gap: { value: 12, min: 6, max: 24, step: 1 },             // room between two things a finger presses
  touch_text: { value: 24, min: 20, max: 32, step: 1 },           // words the player must read to act
  touch_small: { value: 20, min: 16, max: 28, step: 1 },          // secondary detail
  touch_title: { value: 28, min: 24, max: 40, step: 1 },          // the step title, a panel's name
  touch_slop: { value: 24, min: 8, max: 60, step: 2 },            // how far a finger may slide and still count as a tap
  touch_lift: { value: 96, min: 0, max: 200, step: 4 },           // a preview that is being dragged floats this far above the finger, so the finger does not hide it
  touch_grab: { value: 1, min: 0, max: 3, step: 1 },              // a drag that starts within this many tiles of the preview moves the preview (further away it moves the view)
  touch_label: { value: 1.7, min: 1, max: 2.4, step: 0.1 },       // the labels and signs floating over the base are this many times their desktop size
  touch_chip_w: { value: 560, min: 420, max: 760, step: 10 },     // the "what now" chip, top left
  touch_sheet_w: { value: 680, min: 520, max: 900, step: 10 },    // the info sheet of a tapped building, on the right (680: a three-input recipe fits on one line at reading size, and the chip stays clear)
  touch_tab_w: { value: 112, min: 88, max: 160, step: 2 },        // one tab of the build bar
  touch_card_w: { value: 132, min: 100, max: 200, step: 2 },      // one building card of the build bar
  touch_card_h: { value: 112, min: 88, max: 150, step: 2 },
  touch_zoom_step: { value: 6, min: 2, max: 16, step: 1 },        // how far one press of 拉高 / 降低 moves the view
  touch_start_dist: { value: 24, min: 9, max: 70, step: 1 },      // a fresh base opens this close on a phone (the desktop opens at 30)
  touch_start_tz: { value: -7.5, min: -24, max: 24, step: 0.5 },    // ... looking this far north of the core, at the supply row and the free ground under it (the build bar covers the lower third)
};

// The game's tables. `stage` is the state line that unlocks a thing: 1 solids, 2 liquids, 3 gases.
window.DATA = {
  items: {
    chalco: { name: '黃銅礦', state: 'solid', color: '#c9a227' },
    quartz: { name: '石英砂', state: 'solid', color: '#f0dcff' },
    biomass: { name: '生物質', state: 'solid', color: '#5fbf4a' },
    copper: { name: '銅錠', state: 'solid', color: '#e07a3a' },
    iron: { name: '鐵錠', state: 'solid', color: '#9aa6b4' },
    silicon: { name: '矽晶', state: 'solid', color: '#6fe3ff' },
    lithium: { name: '鋰鹽', state: 'solid', color: '#ffffff' },
    steel: { name: '鋼板', state: 'solid', color: '#5b7a9a' },
    circuit: { name: '電路板', state: 'solid', color: '#35c46a' },
    battery: { name: '電池芯', state: 'solid', color: '#c8ff2e' },
    hull: { name: '船殼板', state: 'solid', color: '#e8eef5' },
    thruster: { name: '推進器', state: 'solid', color: '#ff8a2a' },
    avionics: { name: '航電艙', state: 'solid', color: '#b48cff' },
    water: { name: '純水', state: 'liquid', color: '#3fb6ff' },
    acid: { name: '硫酸', state: 'liquid', color: '#9be03a' },
    sulfur: { name: '硫氣', state: 'gas', color: '#f2e04a' },
    frigate: { name: '護衛艦', state: 'ship', color: '#e8eef5' },
    cruiser: { name: '巡洋艦', state: 'ship', color: '#6fe3ff' },
    bombard: { name: '轟擊艦', state: 'ship', color: '#ff8a2a' },
    scout: { name: '偵察艇', state: 'ship', color: '#9fe8ff' },
    support: { name: '支援艦', state: 'ship', color: '#c8ff2e' },
    colony: { name: '殖民艦', state: 'ship', color: '#e8f5c0' },
  },
  // size: tiles wide and deep. power: units drawn while a receiver covers it. cost: from the core's stock, refunded in full.
  // io: where solids go in and come out, and nowhere else. 'back' and 'front' are the machine's own sides and turn with it;
  // 'all' is every side. Liquids and gases use any pipe that touches the machine.
  // Recipe seconds (t) are shorter than the spike's (smelter 5->2, steel 5->3, circuit 10->5, battery 10->5, hull 15->6,
  // thruster 30->8, avionics 30->8, gasifier 5->3, condenser 5->3); thruster/avionics also need fewer inputs (see SLICE-NOTES.md).
  // fio: the sides with a pipe port (blue). Liquids and gases go in and out ONLY there (designer, 2026-11-11: 「水路應該要有水路的接口」).
  // 'west' / 'east' are the machine's own left and right and turn with it; 'all' is every side.
  machines: {
    pad: { name: '降落坪', size: [2, 2], power: 2, cost: { iron: 5 }, stage: 1, io: { out: 'front' } },                 // a supply route unloads here
    smelter: { name: '冶煉爐', size: [2, 2], power: 4, cost: { iron: 10 }, stage: 1, io: { in: 'back', out: 'front' }, recipes: [
      { out: 'iron', in: { chalco: 2 }, t: 2 }, { out: 'copper', in: { chalco: 2 }, t: 2 }, { out: 'silicon', in: { quartz: 2 }, t: 2 }] },
    fab: { name: '加工廠', size: [2, 2], power: 4, cost: { iron: 10, copper: 5 }, stage: 1, io: { in: 'back', out: 'front' }, fio: ['west', 'east'], recipes: [
      { out: 'steel', in: { iron: 2 }, t: 3 }, { out: 'circuit', in: { copper: 2, silicon: 2, water: 1 }, t: 5, stage: 2 },
      { out: 'battery', in: { lithium: 1, copper: 2, acid: 1 }, t: 5, stage: 3 }] },
    assembler: { name: '組裝廠', size: [3, 3], power: 6, cost: { steel: 5, copper: 10 }, stage: 1, io: { in: 'back', out: 'front' }, recipes: [
      { out: 'hull', in: { steel: 2, silicon: 3 }, t: 6 }, { out: 'thruster', in: { steel: 2, circuit: 1, battery: 1 }, t: 8, stage: 3 },
      { out: 'avionics', in: { circuit: 1, battery: 1 }, t: 8, stage: 3 }] },
    gasifier: { name: '氣化爐', size: [2, 2], power: 4, cost: { iron: 10 }, stage: 3, io: { in: 'back' }, fio: ['front'], recipes: [{ out: 'sulfur', in: { chalco: 2 }, t: 3 }] },
    condenser: { name: '冷凝機', size: [2, 1], power: 3, cost: { iron: 5, copper: 5 }, stage: 3, fio: 'all', recipes: [{ out: 'acid', in: { sulfur: 2, water: 2 }, t: 3 }] },
    pipehead: { name: '管線站', size: [1, 1], power: 1, cost: { iron: 5 }, stage: 2, fio: 'all' },        // a long pipeline from a liquid or gas site ends here
    receiver: { name: '受電器', size: [1, 1], power: 0, cost: { copper: 3 }, stage: 1 },          // gives the machines around it the core's power
    solar: { name: '太陽能', size: [2, 1], power: 0, cost: { copper: 5 }, stage: 1 },            // supplies tune.solar_power
    generator: { name: '發電機', size: [2, 1], power: 0, cost: { iron: 10, copper: 5 }, stage: 1, io: { in: 'back' } }, // not offered in the slice (no biomass site); kept so old code paths stay valid
    storein: { name: '入庫倉', size: [1, 1], power: 1, cost: { iron: 5 }, stage: 1, io: { in: 'all' } },             // any solid in: joins the core's stock
    storeout: { name: '出庫倉', size: [1, 1], power: 1, cost: { iron: 5 }, stage: 1, io: { out: 'all' } },            // one chosen item out of the core's stock
  },
  logistics: {
    belt: { name: '輸送帶', stage: 1 }, pipe: { name: '管線', stage: 2 },
    merger: { name: '合流器', stage: 1, cost: { iron: 2 } }, splitter: { name: '分流器', stage: 1, cost: { iron: 2 } },
    bridge: { name: '架高橋', stage: 2 }, tunnel: { name: '隧道', stage: 2 },
  },
  tabs: [
    { name: '物流', tools: ['belt', 'pipe', 'pipehead', 'merger', 'splitter', 'bridge', 'tunnel'] },
    { name: '生產', tools: ['pad', 'smelter', 'fab', 'assembler', 'gasifier', 'condenser'] },
    { name: '電力', tools: ['receiver', 'solar'] },
    { name: '倉儲', tools: ['storein', 'storeout'] },
  ],
  // Supply on the home planet. A site with `kind` is a supply route (rate per minute) that a landing pad / pipe station of the
  // base receives. `stage`: the route opens by itself when that state line is unlocked (the slice has no exploring or transport lanes).
  // The pads / pipe station that receive them are already standing in the base (see seedBase in index.html).
  sites: [
    { id: 'chalco1', planet: 0, name: '黃銅礦場', kind: 'chalco', rate: 60, stage: 1, at: [0.7, 0.9] },
    { id: 'quartz1', planet: 0, name: '石英砂礦場', kind: 'quartz', rate: 60, stage: 1, at: [1.2, -0.4] },
    { id: 'water1', planet: 0, name: '含水層抽取站', kind: 'water', rate: 60, stage: 2, at: [-1.4, -0.5] },
    { id: 'lith1', planet: 0, name: '鋰鹽供應航線', kind: 'lithium', rate: 30, stage: 3, at: [2.4, -1.4] }, // the starter supply that replaces the 淺瀾 transport lane
  ],
  planets: [
    { name: '灰脊', kind: '陸地 · 岩石 · 核心安全區', dist: 0, note: '母星' },
  ],
  bases: [
    { name: '灰脊 · 主基地', planet: 0 },
  ],
  elevator: [ // built on the core, one stage after another, paid from the core's stock (cheaper than the GDD's 20/5, 30/6, 4/10)
    { name: '基座', cost: { steel: 8, circuit: 2 } },
    { name: '纜索', cost: { steel: 10, battery: 2 } },
    { name: '軌道站', cost: { hull: 2, circuit: 3 } },
  ],
  // The fleet (slice mode: the three warships, the scout and support ship that fly with them, and the colony ship that lands on a planet to take it (接管, 2026-11-12); explorer / transport are not offered).
  // parts: what a berth needs from the core's stock. t: seconds to assemble once the parts are up.
  ships: {
    frigate: { name: '護衛艦', use: '輕快的主力艦：便宜、好補充', parts: { hull: 2, thruster: 1, avionics: 1 }, t: 15 },
    cruiser: { name: '巡洋艦', use: '均衡的中型戰艦：火力和裝甲都夠用', parts: { hull: 3, thruster: 2, avionics: 1, battery: 1 }, t: 25 },
    bombard: { name: '轟擊艦', use: '遠程重炮：慢但打得痛，吃電池', parts: { hull: 2, thruster: 1, avionics: 2, battery: 2 }, t: 25 },
    scout: { name: '偵察艇', use: '看見敵人：被它看到的敵艦，全艦隊多打 15%', parts: { hull: 1, thruster: 1, avionics: 1 }, t: 10 },
    support: { name: '支援艦', use: '不開火：修復附近友艦，救回失去動力的船', parts: { hull: 2, thruster: 1, avionics: 1, battery: 2 }, t: 20 },
    colony: { name: '殖民艦', use: '不參戰：打下軌道後降落，把行星變成你的殖民地（用掉）', parts: { hull: 4, thruster: 2, avionics: 2, battery: 3 }, t: 40 },
  },
  // Storage cap per item in the core: a machine will not START a new batch of an item whose core stock is already at the cap
  // (it idles and says so). Stops one line from eating all the raw material the other lines need.
  caps: { hull: 5, thruster: 4, avionics: 4, circuit: 12, battery: 10 },
  berth: { cost: { steel: 10, circuit: 1 }, max: 3 }, // another slipway at the shipyard (small berth)
  grid: { size: 48, margin: 3 }, // the base's ground: tiles a side, and the rim of planet terrain round the levelled pad
  core: [
    { name: 'I 型核心', area: 20, power: 12 },
    { name: 'II 型核心', area: 30, power: 24, cost: { steel: 30, copper: 20 } },
    { name: 'III 型核心', area: 42, power: 40, cost: { steel: 60, circuit: 30 } },
  ],
  outpost: { name: '前哨核心', area: 24, power: 12 },
};
