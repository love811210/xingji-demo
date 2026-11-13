// VERTICAL SLICE - NOT FOR PRODUCTION
// Validation Question: Can a new player go from choosing a mothership to taking down an enemy home world, unguided?
// Date: 2026-11-11
// Phase: battle (PVP spike #4, 5th version). The spike's values below are unchanged; the slice's easing of the defence lives in
// the slice_ease block at the end (ease_on: 0 puts the spike's exact defence back). The flagship's numbers are further multiplied
// by the chosen mothership style (shared/hulls.js: thrust, maxspeed, hull, shield, missile_cd, gun) in index.html.
// Every tuning value lives here, each with value, min, max and step. The game reads them live
// through tune.<name> (index.html); the tweak panel, an add-on, writes them back here.
// Scale: 1 unit = 10 m. The tactical grid is 100 units (1 km) a cell.
window.CONFIG = {
  seed: 1, // every gameplay random call reads rng(), seeded from this (or ?seed= in the address)
  volume: { value: 0.5, min: 0, max: 1, step: 0.05 },

  // ---- Flagship (母艦): the ship you fly ----
  flag_hp: { value: 450, min: 50, max: 1500, step: 10 },
  flag_speed: { value: 55, min: 10, max: 300, step: 5 },        // units/s, cruise
  flag_boost: { value: 150, min: 40, max: 500, step: 10 },      // units/s while Shift is held
  flag_brake: { value: 15, min: 0, max: 100, step: 5 },         // units/s while C is held
  flag_turn: { value: 1.1, min: 0.3, max: 3, step: 0.05 },      // rad/s yaw and pitch
  flag_thrust: { value: 30, min: 5, max: 150, step: 1 },        // units/s² the engine adds speed with
  flag_retro: { value: 15, min: 2, max: 80, step: 1 },          // units/s² of reverse thrust: hover, C, letting go of Shift. Stopping takes speed / this s
  drift_decay: { value: 0.04, min: 0, max: 1, step: 0.01 },     // 1/s the flight computer trims drift (gravity, slingshots, bumps); low = it lasts
  flag_damage: { value: 7, min: 1, max: 40, step: 1 },          // hull per bolt
  flag_interval: { value: 0.12, min: 0.04, max: 0.5, step: 0.01 }, // s between shots
  bolt_speed: { value: 700, min: 200, max: 2000, step: 50 },    // units/s
  bolt_range: { value: 650, min: 200, max: 1500, step: 25 },    // units a bolt flies
  aim_cone: { value: 0.18, min: 0, max: 0.5, step: 0.01 },      // rad: aim assist locks inside this
  lock_range: { value: 750, min: 200, max: 1500, step: 25 },
  order_cone: { value: 0.6, min: 0.1, max: 1.5, step: 0.05 },   // rad: F or Z picks a target inside this if nothing is locked
  flag_tac_speed: { value: 25, min: 0, max: 100, step: 5 },     // units/s the flagship slows to while you command, with no order of its own
  flag_vs_sta: { value: 0.5, min: 0.1, max: 3, step: 0.05 },    // flagship bolt damage multiplier against the outpost
  flag_standoff: { value: 320, min: 100, max: 700, step: 10 },  // autopilot attack distance from the target's hull
  dodge_speed: { value: 300, min: 50, max: 1000, step: 10 },    // at this speed enemy fire misses dodge_max more often
  dodge_max: { value: 0.6, min: 0, max: 0.9, step: 0.05 },
  shield_time: { value: 6, min: 1, max: 20, step: 0.5 },        // 護盾 (T)
  shield_cd: { value: 20, min: 2, max: 60, step: 1 },
  shield_absorb: { value: 0.8, min: 0, max: 1, step: 0.05 },    // fraction of damage the shield takes
  missile_count: { value: 4, min: 1, max: 12, step: 1 },        // 飛彈 (Z)
  missile_cd: { value: 12, min: 1, max: 60, step: 1 },
  missile_damage: { value: 40, min: 1, max: 300, step: 5 },
  missile_speed: { value: 230, min: 50, max: 800, step: 10 },
  missile_turn: { value: 2.5, min: 0.5, max: 8, step: 0.1 },    // how hard a missile turns, 1/s
  missile_vs_sta: { value: 1, min: 0.1, max: 4, step: 0.1 },

  // ---- Views ----
  cockpit_fov: { value: 88, min: 55, max: 110, step: 1 },       // degrees, vertical
  radar_range: { value: 1500, min: 500, max: 4000, step: 100 }, // units from the flagship to the radar's rim (15 km)
  radar_size: { value: 50, min: 30, max: 100, step: 2 },        // radar radius on screen, px
  chase_dist: { value: 70, min: 30, max: 200, step: 5 },        // third-person camera (B): units behind the flagship
  chase_height: { value: 22, min: 0, max: 80, step: 1 },
  chase_fov: { value: 65, min: 40, max: 100, step: 1 },
  tac_slow: { value: 1, min: 0.05, max: 1, step: 0.05 },     // time scale in the tactical view; 1 = no slow-down (multiplayer rule)
  view_blend: { value: 0.5, min: 0.1, max: 2, step: 0.05 },     // s for the camera to pull out or dive in
  tac_height: { value: 1300, min: 500, max: 3000, step: 50 },   // tactical camera height when there is nothing to frame
  tac_fit: { value: 1.35, min: 0.8, max: 2, step: 0.05 },        // on entering, height = flagship-to-outpost distance x this + 400
  tac_zoom_min: { value: 600, min: 300, max: 1500, step: 50 },
  tac_zoom_max: { value: 4200, min: 1500, max: 6000, step: 100 },
  tac_pan_speed: { value: 900, min: 100, max: 3000, step: 50 }, // units/s with the arrow keys, real time
  tac_mesh_scale: { value: 3, min: 1, max: 6, step: 0.25 },     // ships and shots drawn bigger from above so you can read them

  // ---- Shots ----
  shot_speed: { value: 520, min: 150, max: 1500, step: 10 },    // lasers, units/s: slow enough to see coming
  shell_speed: { value: 300, min: 100, max: 1000, step: 10 },   // bomber shells

  // ---- Your squads ----
  esc_count: { value: 3, min: 1, max: 6, step: 1 },             // 護衛艦: fast, strong against fighters
  esc_hp: { value: 60, min: 10, max: 300, step: 5 },
  esc_speed: { value: 70, min: 10, max: 300, step: 5 },
  esc_range: { value: 260, min: 50, max: 800, step: 10 },
  esc_damage: { value: 5, min: 1, max: 60, step: 1 },
  esc_interval: { value: 0.4, min: 0.1, max: 4, step: 0.05 },
  esc_acc: { value: 0.75, min: 0.1, max: 1, step: 0.05 },
  esc_vs_fig: { value: 2, min: 0.1, max: 5, step: 0.1 },
  esc_vs_frg: { value: 0.7, min: 0.1, max: 5, step: 0.1 },
  esc_vs_sta: { value: 0.3, min: 0.1, max: 5, step: 0.1 },
  cru_count: { value: 2, min: 1, max: 6, step: 1 },             // 巡洋艦: the line, strong against frigates
  cru_hp: { value: 200, min: 20, max: 600, step: 10 },
  cru_speed: { value: 38, min: 5, max: 200, step: 1 },
  cru_range: { value: 360, min: 50, max: 800, step: 10 },
  cru_damage: { value: 14, min: 1, max: 80, step: 1 },
  cru_interval: { value: 1, min: 0.1, max: 5, step: 0.05 },
  cru_acc: { value: 0.8, min: 0.1, max: 1, step: 0.05 },
  cru_vs_fig: { value: 0.5, min: 0.1, max: 5, step: 0.1 },
  cru_vs_frg: { value: 1.6, min: 0.1, max: 5, step: 0.1 },
  cru_vs_sta: { value: 0.8, min: 0.1, max: 5, step: 0.1 },
  bom_count: { value: 2, min: 1, max: 6, step: 1 },             // 轟擊艦: slow, long range, cracks the outpost
  bom_hp: { value: 120, min: 20, max: 500, step: 10 },
  bom_speed: { value: 30, min: 5, max: 200, step: 1 },
  bom_range: { value: 480, min: 50, max: 900, step: 10 },
  bom_damage: { value: 40, min: 1, max: 200, step: 1 },
  bom_interval: { value: 2.5, min: 0.2, max: 8, step: 0.1 },
  bom_acc: { value: 0.9, min: 0.1, max: 1, step: 0.05 },
  bom_vs_fig: { value: 0.2, min: 0.05, max: 5, step: 0.05 },
  bom_vs_frg: { value: 0.8, min: 0.1, max: 5, step: 0.1 },
  bom_vs_sta: { value: 3, min: 0.1, max: 8, step: 0.1 },
  sct_hp: { value: 45, min: 10, max: 300, step: 5 },            // 偵察艇: fast, light guns; enemies it can see take more from everyone
  sct_speed: { value: 95, min: 10, max: 300, step: 5 },
  sct_range: { value: 220, min: 50, max: 800, step: 10 },
  sct_damage: { value: 3, min: 0, max: 60, step: 1 },
  sct_interval: { value: 0.5, min: 0.1, max: 4, step: 0.05 },
  sct_acc: { value: 0.7, min: 0.1, max: 1, step: 0.05 },
  sct_vs_fig: { value: 1.2, min: 0.1, max: 5, step: 0.1 },
  sct_vs_frg: { value: 0.6, min: 0.1, max: 5, step: 0.1 },
  sct_vs_sta: { value: 0.2, min: 0.05, max: 5, step: 0.05 },
  spot_radius: { value: 420, min: 100, max: 1200, step: 10 },   // 標定 (passive): an enemy this close to a live scout is spotted
  spot_mult: { value: 1.15, min: 1, max: 2, step: 0.05 },        // damage multiplier on a spotted enemy, from every ship of ours
  sup_hp: { value: 150, min: 20, max: 600, step: 10 },           // 支援艦: no guns; mends ships near it, restarts ships that lost power
  sup_speed: { value: 48, min: 5, max: 200, step: 1 },
  sup_range: { value: 0, min: 0, max: 0, step: 1 },              // it does not shoot
  sup_damage: { value: 0, min: 0, max: 0, step: 1 },
  sup_interval: { value: 1, min: 1, max: 1, step: 1 },
  sup_acc: { value: 1, min: 1, max: 1, step: 1 },
  sup_radius: { value: 260, min: 80, max: 800, step: 10 },       // its repair and shield reach
  sup_repair: { value: 4, min: 0, max: 30, step: 0.5 },          // hit points a second it mends on each ship in reach (two support ships at most add up)
  sup_flag_rate: { value: 0.5, min: 0, max: 2, step: 0.05 },     // the mothership mends at this fraction of that
  sup_revive: { value: 0.35, min: 0.05, max: 1, step: 0.05 },    // a ship that lost power restarts once mended to this fraction of its hit points
  sup_stand: { value: 260, min: 80, max: 800, step: 10 },        // sent to attack, it stays this far back from the target
  aggro_range: { value: 330, min: 50, max: 900, step: 10 },     // squads fire on enemies this close to where they were sent
  standoff: { value: 0.85, min: 0.4, max: 1, step: 0.05 },      // squads close to this fraction of their range
  wreck_hp: { value: 60, min: 0, max: 300, step: 5 },           // a disabled ship takes this much more before it is lost for good

  // ---- Squad skills (Q = first, E = second) ----
  esc_q_time: { value: 5, min: 1, max: 20, step: 0.5 },         // 護衛艦 Q 突擊: speed and fire rate x2
  esc_q_cd: { value: 18, min: 2, max: 60, step: 1 },
  esc_e_time: { value: 6, min: 1, max: 20, step: 0.5 },         // 護衛艦 E 干擾: enemies near the escorts hit less
  esc_e_cd: { value: 22, min: 2, max: 60, step: 1 },
  jam_radius: { value: 280, min: 50, max: 800, step: 10 },
  jam_acc: { value: 0.5, min: 0, max: 1, step: 0.05 },          // enemy accuracy multiplier inside the jam
  cru_q_time: { value: 4, min: 1, max: 20, step: 0.5 },         // 巡洋艦 Q 齊射: fire rate x cru_q_rate
  cru_q_cd: { value: 16, min: 2, max: 60, step: 1 },
  cru_q_rate: { value: 3, min: 1, max: 6, step: 0.5 },
  cru_e_time: { value: 6, min: 1, max: 20, step: 0.5 },         // 巡洋艦 E 嘲諷: enemies near turn on the cruisers, who take less
  cru_e_cd: { value: 24, min: 2, max: 60, step: 1 },
  taunt_radius: { value: 450, min: 100, max: 1000, step: 10 },
  taunt_armor: { value: 0.5, min: 0, max: 1, step: 0.05 },      // damage multiplier on a taunting cruiser
  bom_q_cd: { value: 20, min: 2, max: 60, step: 1 },            // 轟擊艦 Q 魚雷: homing torpedoes at its target
  torpedo_count: { value: 2, min: 1, max: 6, step: 1 },         // per bomber
  torpedo_damage: { value: 110, min: 10, max: 500, step: 5 },
  torpedo_speed: { value: 140, min: 40, max: 500, step: 10 },
  bom_e_time: { value: 10, min: 2, max: 30, step: 0.5 },        // 轟擊艦 E 攻城: longer range, cannot move
  bom_e_cd: { value: 20, min: 2, max: 60, step: 1 },
  siege_range: { value: 1.4, min: 1, max: 2.5, step: 0.05 },

  sct_q_time: { value: 8, min: 1, max: 20, step: 0.5 },          // 偵察艇 Q 照明彈: a wider, stronger spot
  sct_q_cd: { value: 20, min: 2, max: 60, step: 1 },
  flare_radius: { value: 2.2, min: 1, max: 4, step: 0.1 },       // spot_radius times this while it burns
  flare_mult: { value: 1.35, min: 1, max: 2.5, step: 0.05 },     // damage multiplier on an enemy under the flare
  sct_e_time: { value: 6, min: 1, max: 20, step: 0.5 },          // 偵察艇 E 誘餌: enemies near the scouts turn on them; the scouts dodge
  sct_e_cd: { value: 22, min: 2, max: 60, step: 1 },
  decoy_radius: { value: 420, min: 100, max: 1000, step: 10 },
  decoy_armor: { value: 0.4, min: 0, max: 1, step: 0.05 },       // damage multiplier on a decoying scout
  decoy_speed: { value: 1.4, min: 1, max: 3, step: 0.1 },
  sup_q_time: { value: 6, min: 1, max: 20, step: 0.5 },          // 支援艦 Q 護盾投射: ships in its reach take less
  sup_q_cd: { value: 20, min: 2, max: 60, step: 1 },
  sup_q_absorb: { value: 0.5, min: 0, max: 0.9, step: 0.05 },
  sup_e_cd: { value: 28, min: 2, max: 90, step: 1 },             // 支援艦 E 緊急維修: at once, every ship in reach mends sup_e_heal of its hit points
  sup_e_heal: { value: 0.35, min: 0.05, max: 1, step: 0.05 },
  // ---- 接管 (2026-11-12): on a takeover a colony ship comes along, lands where the port stood, and must live through the landing ----
  col_hp: { value: 600, min: 100, max: 1500, step: 10 },          // 殖民艦: no guns, no squad, no orders; keeps behind the mothership
  col_speed: { value: 55, min: 20, max: 120, step: 1 },
  col_follow: { value: 180, min: 60, max: 500, step: 10 },        // how far behind the mothership it keeps
  col_land_time: { value: 40, min: 5, max: 120, step: 1 },        // s it must sit on the landing point, alive, for the planet to be taken
  col_lure: { value: 1400, min: 0, max: 4000, step: 50 },         // while landing every enemy gun this close turns on it (a taunting cruiser or a decoy comes first)
  land_wave: { value: 3, min: 0, max: 12, step: 1 },              // drones that come up from the planet at the colony ship, per wave
  land_wave_level: { value: 1, min: 0, max: 4, step: 0.5 },       // ... more per defence level above 1
  land_wave_first: { value: 4, min: 0, max: 30, step: 1 },        // s into the landing, the first wave
  land_wave_t: { value: 15, min: 4, max: 60, step: 1 },           // s between waves
  land_cover: { value: 160, min: 0, max: 600, step: 10 },         // squads left on follow or hold spread this far around the landing point when it starts

  // ---- Pirates ----
  fig_start: { value: 4, min: 0, max: 20, step: 1 },            // 防守無人機 at the start (fig_* are the drones)
  fig_hp: { value: 30, min: 5, max: 200, step: 5 },
  fig_speed: { value: 85, min: 10, max: 400, step: 5 },
  fig_range: { value: 220, min: 50, max: 600, step: 10 },
  fig_damage: { value: 4, min: 1, max: 40, step: 1 },
  fig_interval: { value: 0.6, min: 0.1, max: 4, step: 0.05 },
  fig_acc: { value: 0.55, min: 0.05, max: 1, step: 0.05 },
  fig_aggro: { value: 650, min: 100, max: 1500, step: 25 },
  fig_vs_bom: { value: 2, min: 0.1, max: 5, step: 0.1 },        // fighters hunt bombers
  frg_count: { value: 0, min: 0, max: 10, step: 1 },            // no pirates in the PVP test
  frg_hp: { value: 150, min: 20, max: 600, step: 10 },
  frg_speed: { value: 32, min: 5, max: 200, step: 1 },
  frg_range: { value: 340, min: 50, max: 800, step: 10 },
  frg_damage: { value: 12, min: 1, max: 80, step: 1 },
  frg_interval: { value: 1.2, min: 0.1, max: 5, step: 0.05 },
  frg_acc: { value: 0.75, min: 0.05, max: 1, step: 0.05 },
  frg_aggro: { value: 450, min: 100, max: 1200, step: 25 },     // frigates leave their post for enemies this close to it
  sta_hp: { value: 1800, min: 200, max: 6000, step: 50 },       // 守方星港 (the target)
  turret_range: { value: 380, min: 100, max: 900, step: 10 },   // from the outpost's hull; the bombers out-range it
  turret_damage: { value: 10, min: 1, max: 60, step: 1 },
  turret_interval: { value: 0.8, min: 0.1, max: 4, step: 0.05 },
  turret_acc: { value: 0.7, min: 0.05, max: 1, step: 0.05 },
  spawn_interval: { value: 12, min: 2, max: 60, step: 1 },      // s between new fighters
  spawn_max: { value: 8, min: 0, max: 20, step: 1 },            // fighters alive at once

  // ---- Battlefield ----
  start_distance: { value: 2600, min: 500, max: 5000, step: 50 }, // units from your fleet to the planet's port (26 km)
  field_radius: { value: 2600, min: 600, max: 5000, step: 50 },
  retreat_time: { value: 6, min: 1, max: 20, step: 0.5 },       // s from R to jumping out
  // ---- Gravity: wells pull your flagship (only it, in this spike) ----
  grav_planet: { value: 6, min: 0, max: 30, step: 0.5 },        // units/s² at the defender planet's surface; falls off with distance²
  grav_moon: { value: 25, min: 0, max: 80, step: 1 },           // units/s² at the moon's surface
  grav_reach: { value: 3, min: 1.5, max: 8, step: 0.25 },       // gravity acts only this many radii from a body's centre (fades out over the last half radius)
  sling_out: { value: 1.7, min: 1.1, max: 3, step: 0.05 },      // the slingshot band: from the surface out to this many radii
  sling_acc: { value: 14, min: 0, max: 60, step: 1 },           // units/s² it adds along your course while you skim it sideways
  sling_max: { value: 300, min: 60, max: 800, step: 10 },       // units/s (3 km/s): it stops adding above this speed
  moon_r: { value: 90, min: 30, max: 200, step: 5 },
  moon_orbit: { value: 1500, min: 700, max: 2500, step: 50 },   // units from the planet's centre
  moon_speed: { value: 40, min: 0, max: 120, step: 5 },         // units/s along its orbit: what a slingshot borrows
  moon_phase: { value: 40, min: 0, max: 360, step: 5 },         // degrees before it crosses your approach, at the start
  // ---- Asteroids ----
  belt_count: { value: 70, min: 0, max: 200, step: 5 },         // rocks in the belt across your approach
  crash_damage: { value: 2, min: 0, max: 10, step: 0.1 },       // hull per unit/s of impact speed
  crash_shield: { value: 0.04, min: 0, max: 0.5, step: 0.01 },  // shield seconds used per unit/s of impact speed
  avoid_look: { value: 2.5, min: 0, max: 6, step: 0.1 },        // s ahead the auto-avoid looks; 0 = off
  avoid_margin: { value: 25, min: 0, max: 100, step: 5 },       // units of clearance it steers for
  // ---- Slingshot feel ----
  rush_fov: { value: 12, min: 0, max: 30, step: 1 },            // degrees the view widens at full rush
  rush_blur: { value: 0.035, min: 0, max: 0.1, step: 0.005 },   // zoom-blur stretch per layer at full rush
  // ---- PVP: the defender's setup (they are offline) ----
  tur_count: { value: 4, min: 0, max: 8, step: 1 },          // 防守砲塔 around the port
  tur_ring: { value: 230, min: 100, max: 500, step: 10 },     // their distance from the port
  tur_hp: { value: 220, min: 50, max: 1000, step: 10 },
  tur_range: { value: 420, min: 150, max: 800, step: 10 },    // bombers (480) out-range them
  tur_damage: { value: 9, min: 1, max: 40, step: 1 },
  tur_interval: { value: 0.9, min: 0.2, max: 3, step: 0.1 },
  tur_acc: { value: 0.7, min: 0.1, max: 1, step: 0.05 },
  hive_count: { value: 2, min: 0, max: 4, step: 1 },          // 無人機巢: launch drones while they stand
  hive_hp: { value: 260, min: 50, max: 1000, step: 10 },
  hive_spawn: { value: 10, min: 2, max: 40, step: 1 },        // s between drones from one hive
  shd_hp: { value: 300, min: 50, max: 1500, step: 10 },       // 護盾站, behind the port
  shd_mult: { value: 0.4, min: 0.1, max: 1, step: 0.05 },     // damage to the defenses while it stands
  def_esc: { value: 3, min: 0, max: 6, step: 1 },             // 防守艦隊: the defender's squads
  def_cru: { value: 2, min: 0, max: 6, step: 1 },
  def_bom: { value: 2, min: 0, max: 6, step: 1 },
  guard_radius: { value: 700, min: 200, max: 1500, step: 50 }, // escorts and cruisers chase attackers this close to their post
  // ---- PVP: the defender logs in ----
  owner_join: { value: 120, min: 0, max: 300, step: 5 },       // s until the defender's flagship joins; 0 = they stay offline
  ef_hp: { value: 450, min: 100, max: 1500, step: 10 },       // 守方母艦, an AI stand-in for the player who logged in
  ef_speed: { value: 55, min: 10, max: 150, step: 5 },
  ef_range: { value: 600, min: 200, max: 900, step: 10 },
  ef_damage: { value: 6, min: 1, max: 30, step: 1 },
  ef_interval: { value: 0.3, min: 0.1, max: 2, step: 0.05 },
  ef_acc: { value: 0.6, min: 0.1, max: 1, step: 0.05 },

  // ---- slice_ease: why the slice's defence is softer than the spike's (arithmetic in SLICE-NOTES.md) ----
  // The designer found the spike hard for the attacker: the flagship alone died in 28 s, the 3/2/2 fleet alone left the port at ~20%
  // with two squads lost. The slice wants a competent player to win well over half the time, while "everything charges in" still fails.
  // Counts are absolute replacements for the spike key named in the comment; the others are multipliers on that spike value.
  ease_on: { value: 1, min: 0, max: 1, step: 1 },              // 1 = apply this block; 0 = the spike's defence exactly
  ease_tur_count: { value: 3, min: 0, max: 8, step: 1 },       // 防守砲塔 (spike tur_count 4)
  ease_tur_hp: { value: 0.75, min: 0.2, max: 2, step: 0.05 },  // x tur_hp (220)
  ease_tur_damage: { value: 0.8, min: 0.2, max: 2, step: 0.05 }, // x tur_damage (9)
  ease_hive_hp: { value: 0.8, min: 0.2, max: 2, step: 0.05 },  // x hive_hp (260)
  ease_hive_spawn: { value: 2, min: 0.5, max: 4, step: 0.1 }, // x hive_spawn (10 s between drones from one hive): a longer cooldown
  ease_spawn_max: { value: 4, min: 0, max: 20, step: 1 },      // drones alive at once (spike spawn_max 8)
  ease_fig_start: { value: 2, min: 0, max: 20, step: 1 },      // drones at the start (spike fig_start 4)
  ease_shd_hp: { value: 0.8, min: 0.2, max: 2, step: 0.05 },   // x shd_hp (300)
  ease_shd_open: { value: 1, min: 0, max: 1, step: 1 },        // 1 = the shield station is not covered by its own field (the spike covered it: 750 effective hp)
  ease_sta_hp: { value: 1, min: 0.2, max: 2, step: 0.05 },  // x sta_hp (1800)
  ease_def_esc: { value: 2, min: 0, max: 6, step: 1 },         // 防守艦隊 護衛艦 (spike def_esc 3)
  ease_def_cru: { value: 1, min: 0, max: 6, step: 1 },         // 巡洋艦 (spike def_cru 2)
  ease_def_bom: { value: 1, min: 0, max: 6, step: 1 },         // 轟擊艦 (spike def_bom 2)
  ease_def_hp: { value: 0.8, min: 0.2, max: 2, step: 0.05 },  // x hp of the defence fleet's ships
  ease_def_dmg: { value: 0.8, min: 0.2, max: 2, step: 0.05 }, // x damage of the defence fleet's ships
  ease_owner_join: { value: 180, min: 30, max: 400, step: 5 }, // s until the owner's flagship joins (spike owner_join 120)
  ease_ef_hp: { value: 0.7, min: 0.2, max: 2, step: 0.05 },    // x ef_hp (450): the owner's stand-in flagship
  ease_ef_damage: { value: 0.7, min: 0.2, max: 2, step: 0.05 }, // x ef_damage (6)
  // Each ship the base phase built counts: for every ship fewer than ease_ref_ships, the port, turrets, hives and shield station lose
  // ease_per_ship of their hit points (never below ease_floor), so a thin fleet is not punished twice. More ships than the reference
  // change nothing here: they simply add their own guns and hit points.
  ease_ref_ships: { value: 7, min: 1, max: 18, step: 1 },
  ease_per_ship: { value: 0.13, min: 0, max: 0.2, step: 0.01 },
  ease_floor: { value: 0.35, min: 0.2, max: 1, step: 0.05 },
  // main agent 2026-11-11: the base phase lets you launch with 2 ships, so the rubber band is stronger; and every 再戰一次
  // takes a further ease_per_retry off the structures (never below ease_retry_floor) so the demo can always be won by trying again.
  level_hp: { value: 0.22, min: 0, max: 1, step: 0.01 },          // each defence level above 1 adds this much to the hit points of the structures and the defence fleet
  ease_per_retry: { value: 0.1, min: 0, max: 0.3, step: 0.01 },
  ease_retry_floor: { value: 0.6, min: 0.2, max: 1, step: 0.05 },

  // ---- Slice glue ----
  finish_delay: { value: 1.2, min: 0, max: 5, step: 0.1 },       // s between pressing 完成 / 結算 and handing the result to the shell

  // ---- Art pass 2026-11-11: the painted pictures (assets/img). Looks only: nothing here touches the battle ----
  // Each picture is optional; when one has not loaded the page draws what it drew before and ignores its numbers below.
  cockpit_alpha: { value: 1, min: 0.3, max: 1, step: 0.05 },      // cockpit-frame.png over the 3D view
  cockpit_shake: { value: 4, min: 0, max: 12, step: 1 },          // px the painted cockpit jumps when the flagship is hit or crashes
  cockpit_sway: { value: 14, min: 0, max: 40, step: 1 },          // px per unit of bank the cockpit leans against a turn (bank peaks at 0.3)
  dash_alpha: { value: 0.74, min: 0.3, max: 1, step: 0.02 },      // the HUD panels on the dashboard's screens: how solid their dark navy is
  dash_l_x: { value: 100, min: 0, max: 600, step: 2 },            // left screen: the flagship panel, in the 1280x720 frame
  dash_l_y: { value: 590, min: 400, max: 700, step: 2 },
  dash_l_w: { value: 258, min: 220, max: 400, step: 2 },
  dash_l_h: { value: 120, min: 110, max: 200, step: 2 },
  dash_c_x: { value: 456, min: 300, max: 700, step: 2 },          // centre screen: the lock and the flagship's skills
  dash_c_y: { value: 556, min: 400, max: 700, step: 2 },
  dash_c_w: { value: 370, min: 330, max: 500, step: 2 },
  dash_c_h: { value: 140, min: 132, max: 220, step: 2 },
  dash_r_x: { value: 920, min: 700, max: 1100, step: 2 },         // right screen: the squads (taller than the painted screen, as in the reference)
  dash_r_y: { value: 536, min: 400, max: 700, step: 2 },
  dash_r_w: { value: 278, min: 250, max: 400, step: 2 },
  dash_r_h: { value: 174, min: 160, max: 240, step: 2 },
  dash_skill: { value: 32, min: 24, max: 44, step: 1 },           // px: the flagship's skill icons on the centre screen
  icon_dash: { value: 24, min: 12, max: 40, step: 1 },            // px: ship-class pictogram in the cockpit's squad rows
  icon_card: { value: 32, min: 16, max: 48, step: 1 },            // px: on the tactical cards
  icon_report: { value: 28, min: 16, max: 40, step: 1 },          // px: in the battle report's rows
  icon_tac: { value: 30, min: 14, max: 64, step: 1 },             // px: a ship's top-view picture on the tactical map (each class scales it, TOP_K)
  icon_glow: { value: 5, min: 0, max: 14, step: 1 },             // px: the glow in its side's colour around a top-view picture
  sky_bright: { value: 1, min: 0.2, max: 1.6, step: 0.05 },       // sky-nebula.jpg on the sky sphere: 1 = as painted
  sky_yaw: { value: 0, min: -180, max: 180, step: 5 },            // degrees the sky is turned; 0 = the picture's middle is dead ahead at the start
  sky_tac: { value: 0.35, min: 0.05, max: 1, step: 0.05 },        // the sky's brightness in the tactical view, only used when tactical-bg.jpg is missing
  tac_bg_bright: { value: 0.85, min: 0.2, max: 1.5, step: 0.05 }, // tactical-bg.jpg behind the tactical view
  tac_bg_drift: { value: 0.03, min: 0, max: 0.15, step: 0.01 },   // how far the backdrop slides as the tactical camera pans (fraction of the picture kept off-screen per side)
  planet_art_scale: { value: 1, min: 0.8, max: 1.3, step: 0.01 }, // 1 = the painted disc is exactly the gameplay radius (300 units)
  planet_key_from: { value: 0.93, min: 0.7, max: 1.1, step: 0.01 }, // the planet pictures have a black fringe: from this fraction of the disc radius outward...
  planet_key_dark: { value: 20, min: 0, max: 80, step: 1 },       // ...pixels no brighter than this (0-255) turn fully clear...
  planet_key_soft: { value: 34, min: 1, max: 100, step: 1 },      // ...and fade back to solid over this much more brightness
  giant_bright: { value: 0.25, min: 0.1, max: 1, step: 0.05 },    // the far gas giant (planet-liuli.png) is dimmed so it does not out-shine the target
  moon_bump: { value: 1.5, min: 0, max: 6, step: 0.1 },           // how deep the moon's craters look (its smooth skin shows only with a painted planet)
  // the planet's disc radius as a fraction of its picture's width (rings and glow reach further); from ART-BRIEF.md
  disc_huiji: { value: 0.464, min: 0.3, max: 0.5, step: 0.001 },
  disc_qianlan: { value: 0.451, min: 0.3, max: 0.5, step: 0.001 },
  disc_ciqiu: { value: 0.459, min: 0.3, max: 0.5, step: 0.001 },
  disc_shuangyuan: { value: 0.447, min: 0.3, max: 0.5, step: 0.001 },
  disc_chihuan: { value: 0.475, min: 0.3, max: 0.5, step: 0.001 },
  disc_cangtie: { value: 0.459, min: 0.3, max: 0.5, step: 0.001 },
  disc_heiyao: { value: 0.475, min: 0.3, max: 0.5, step: 0.001 },
  disc_liuli: { value: 0.442, min: 0.3, max: 0.5, step: 0.001 },  // the far gas giant (scenery)

  // ---- Art pass 2, 2026-11-11: the bridge, and painted ships in place of the low-poly models. Looks only ----
  // The first-person view is the mothership's bridge (cockpit-bridge.png). Its window is higher than the old canopy's, so the 3D
  // view's centre moves up to the middle of the window (y 262 of 720). Without that picture the old cockpit and these numbers are unused.
  bridge_view_shift: { value: 98, min: 0, max: 160, step: 2 },    // px the view's centre moves up in first person
  bridge_screen: { value: 0.84, min: 0.3, max: 1, step: 0.02 },   // how solid the lit glass of the console's three screens is
  bridge_lean: { value: 0.35, min: 0, max: 1, step: 0.05 },       // share of cockpit_sway / cockpit_shake the bridge takes: a starship's bridge moves less than a canopy
  bridge_radar_y: { value: 467, min: 430, max: 500, step: 1 },    // the radar as a hologram over the deck, between the window and the console
  bridge_radar_r: { value: 37, min: 24, max: 46, step: 1 },
  chase_view_shift: { value: 70, min: 0, max: 120, step: 2 },     // px the view's centre moves up in third person, so the mothership sits above the bottom panels
  // A card is the unit's picture, always facing the camera. card_<class> = the picture's longer side in class radii (the mothership's
  // height is held to 0.86 of that, so the tall 遊俠號 picture is no taller on screen than the wide ones). The radius
  // itself, what shots and collisions use, does not change. Classes without a picture borrow one: frg -> foe-esc, eflag -> foe-cru.
  card_flag: { value: 5, min: 2, max: 8, step: 0.1 },           // 母艦 (radius 8): large, as in fleet-third.png
  card_esc: { value: 2.6, min: 1.5, max: 6, step: 0.1 },            // 護衛艦 (5), both sides
  card_cru: { value: 3, min: 1.5, max: 6, step: 0.1 },            // 巡洋艦 (9)
  card_bom: { value: 3, min: 1.5, max: 6, step: 0.1 },
  card_sct: { value: 2.8, min: 1.5, max: 6, step: 0.1 },          // 偵察艇 (4)
  card_sup: { value: 2.6, min: 1.5, max: 6, step: 0.1 },
  card_col: { value: 2.4, min: 1.5, max: 6, step: 0.1 },          // 殖民艦 (12)          // 支援艦 (7)            // 轟擊艦 (8)
  card_fig: { value: 2.4, min: 1.5, max: 6, step: 0.1 },          // 防守無人機 (5)
  card_frg: { value: 2.6, min: 1.5, max: 6, step: 0.1 },          // 海盜護衛艦 (9): not in this battle
  card_sta: { value: 2.9, min: 1.5, max: 5, step: 0.1 },          // 星港 (50): fits inside its shield dome (radius 84)
  card_tur: { value: 2.6, min: 1.5, max: 6, step: 0.1 },          // 防守砲塔 (10)
  card_hive: { value: 2.3, min: 1.5, max: 6, step: 0.1 },         // 無人機巢 (16)
  card_shd: { value: 2.8, min: 1.5, max: 6, step: 0.1 },          // 護盾站 (14)
  card_eflag: { value: 4.6, min: 2, max: 8, step: 0.1 },          // 守方母艦 (8)
  card_tac: { value: 2.4, min: 1, max: 5, step: 0.1 },            // cards are drawn this much bigger in the tactical view (the port is not)
  card_alpha_test: { value: 0.1, min: 0.02, max: 0.5, step: 0.01 }, // pixels fainter than this are dropped, so cards never punch holes in each other
  card_bright: { value: 1, min: 0.4, max: 1.6, step: 0.05 },      // 1 = as painted
  card_wreck: { value: 0.42, min: 0.1, max: 1, step: 0.02 },      // a disabled ship's card is dimmed to this
  card_flash: { value: 0.9, min: 0, max: 2, step: 0.1 },          // how much brighter a card flashes when it is hit
  card_bank: { value: 1.1, min: 0, max: 3, step: 0.1 },           // the mothership's card rolls this many rad per rad of bank (bank peaks at 0.3)
  card_lean: { value: 0.45, min: 0, max: 1.2, step: 0.05 },       // rad: a ship's card leans toward the side it is heading, at most this much (the mothership: 0.3 of it, on top of its bank)
  card_glow: { value: 1, min: 0, max: 3, step: 0.1 },             // size of the engine glow on our cards' painted nozzles; 0 = off
  card_fx_pull: { value: 14, min: 0, max: 60, step: 1 },          // units an explosion is drawn nearer the camera, so it is not cut by the card it sits on
  rock_card: { value: 1.2, min: 0.6, max: 2, step: 0.05 },        // a rock's picture (rock-1..3.png) against its model's size; what you crash into does not change
  rock_bright: { value: 0.86, min: 0.3, max: 1.5, step: 0.02 },

  // ---- Touch pass, 2026-11-12: the phone controls (only with ?touch=1 or a coarse pointer). Looks and input only: no battle number ----
  // All in stage pixels (1280x720; on a phone 1 stage px is about 0.5 CSS px, so 96 here is a 48 px target under the thumb).
  touch_btn: { value: 96, min: 88, max: 128, step: 2 },           // side of a square touch button
  touch_gap: { value: 12, min: 12, max: 32, step: 1 },            // space between two touch targets
  touch_alpha: { value: 0.72, min: 0.3, max: 1, step: 0.02 },     // how solid a button's dark plate is over the picture
  touch_label: { value: 26, min: 24, max: 34, step: 1 },          // px: a button's word
  touch_text: { value: 24, min: 24, max: 32, step: 1 },           // px: anything the player has to read to act
  touch_small: { value: 19, min: 14, max: 24, step: 1 },          // px: secondary detail (order words, hints, the log)
  // left thumb: the steering stick. It appears where the thumb lands inside its zone (touch_stick_float 1), or stays put (0).
  touch_stick_x: { value: 176, min: 110, max: 320, step: 2 },     // where it rests
  touch_stick_y: { value: 566, min: 440, max: 620, step: 2 },
  touch_stick_r: { value: 104, min: 70, max: 150, step: 2 },      // full deflection at this distance from its centre
  touch_stick_zone_w: { value: 346, min: 240, max: 420, step: 2 }, // the zone that belongs to the stick: left of this...
  touch_stick_zone_y: { value: 424, min: 300, max: 520, step: 2 }, // ...and below this
  touch_stick_dead: { value: 0.14, min: 0, max: 0.4, step: 0.01 }, // share of the radius that does nothing
  touch_stick_float: { value: 1, min: 0, max: 1, step: 1 },
  touch_stick_invert: { value: 0, min: 0, max: 1, step: 1 },      // 0: thumb up = nose up (as W on the keyboard); 1: thumb up = nose down
  // right thumb: fire (hold), boost (hold), brake (hold), look back (hold)
  touch_fire_x: { value: 1172, min: 1040, max: 1220, step: 2 },   // centre of the round fire button
  touch_fire_y: { value: 620, min: 500, max: 660, step: 2 },
  touch_fire_r: { value: 80, min: 56, max: 110, step: 2 },
  touch_boost_x: { value: 972, min: 900, max: 1180, step: 2 },    // top left corner of each square
  touch_boost_y: { value: 618, min: 420, max: 624, step: 2 },
  touch_brake_x: { value: 972, min: 900, max: 1180, step: 2 },
  touch_brake_y: { value: 510, min: 420, max: 624, step: 2 },
  touch_look_x: { value: 1124, min: 900, max: 1180, step: 2 },
  touch_look_y: { value: 432, min: 400, max: 624, step: 2 },
  // centre console, two rows centred on the screen: fleet orders above, the mothership's five actions below
  touch_row_order_y: { value: 510, min: 440, max: 624, step: 2 },
  touch_row_ship_y: { value: 618, min: 440, max: 624, step: 2 },
  touch_row_tac_y: { value: 618, min: 440, max: 624, step: 2 },   // tactical view: one row (orders, then the mothership's actions)
  touch_row_split: { value: 28, min: 12, max: 60, step: 2 },      // extra space between those two groups in the tactical row
  // top: the fleet bar (mothership plate, one chip per squad, 全選), and a column of system buttons on each side
  touch_bar_y: { value: 4, min: 0, max: 40, step: 1 },
  touch_bar_h: { value: 88, min: 88, max: 110, step: 1 },
  touch_chip_w: { value: 140, min: 120, max: 160, step: 2 },
  touch_side_w: { value: 92, min: 88, max: 110, step: 1 },        // the side columns: 戰術 視角 ? on the left, 暫停 靜音 撤退 on the right
  touch_side_x: { value: 6, min: 0, max: 30, step: 1 },           // their distance from the screen's edge
  touch_obj_x: { value: 110, min: 16, max: 400, step: 2 },        // the objective plate (what now, distance, the port's hit points)
  touch_obj_y: { value: 100, min: 96, max: 200, step: 2 },
  touch_obj_w: { value: 420, min: 340, max: 560, step: 2 },
  touch_status_y: { value: 402, min: 300, max: 420, step: 2 },    // the status line low in the window: gravity, and how many enemies aim at you
  touch_banner_y: { value: 172, min: 100, max: 260, step: 2 },    // the banner's top on the bridge and in third person
  touch_radar_x: { value: 1112, min: 100, max: 1200, step: 2 },   // third person has no console: the radar sits in the top right corner of the view
  touch_radar_y: { value: 156, min: 100, max: 400, step: 2 },
  touch_radar_r: { value: 48, min: 30, max: 80, step: 1 },
  // tactical view under a finger
  touch_pick: { value: 50, min: 26, max: 80, step: 2 },           // a tap this near a ship picks it (the mouse: 26)
  touch_slop: { value: 18, min: 6, max: 40, step: 1 },            // a finger that moves further than this is dragging the map, not tapping
  touch_tac_icon: { value: 1.25, min: 1, max: 2, step: 0.05 },    // ship symbols on the map are drawn this much bigger
  touch_tac_focus: { value: 0.58, min: 0.3, max: 0.72, step: 0.02 }, // on opening the map: where between the port (0) and the mothership (1) its middle sits (the mouse page: 0.72)
  touch_tac_fit: { value: 1.35, min: 1, max: 1.6, step: 0.05 },   // ...and how much higher the camera starts, so both ends clear the fleet bar and the order row
  touch_chase_shift: { value: 60, min: 0, max: 140, step: 2 },    // third person: px more the view's centre moves up (on top of chase_view_shift), to lift the mothership off the button rows
  // dialogs: pause, retreat, the battle report
  touch_dialog_w: { value: 300, min: 200, max: 420, step: 4 },
  touch_dialog_h: { value: 96, min: 88, max: 120, step: 2 },
  touch_report_y: { value: 592, min: 560, max: 620, step: 2 },    // the report's buttons
};
