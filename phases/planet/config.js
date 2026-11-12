// VERTICAL SLICE - NOT FOR PRODUCTION
// Validation Question: Can a new player go from choosing a mothership to taking down an enemy home world, unguided?
// Date: 2026-11-11
// Every tuning value lives here, each with value, min, max and step. The game reads them live
// through tune.<name> (index.html); the tweak panel, an add-on, writes them back here.
window.CONFIG = {
  seed: 1, // every gameplay random call reads rng(), seeded from this (or ?seed= in the address)
  volume: { value: 0.5, min: 0, max: 1, step: 0.05 },

  // ---- Slice goals (planet phase) ----
  planet_distance: { value: 4200, min: 2000, max: 8000, step: 100 }, // start-to-planet distance, units (longer = more scenery time)
  ore_needed: { value: 2, min: 1, max: 4, step: 1 },               // ore sites to find before the base can be confirmed
  hint_delay: { value: 35, min: 10, max: 120, step: 5 },           // s without a find before one more ore signal is marked
  done_delay: { value: 1.8, min: 0.5, max: 5, step: 0.1 },         // s of success banner before handing over
  orbit_ship_scale: { value: 0.16, min: 0.05, max: 0.5, step: 0.01 }, // mothership model size in the orbit view

  // ---- Flight (world units; 1 unit ~ 10 m) ----
  cruise_speed: { value: 170, min: 40, max: 400, step: 10 },   // units/s, default throttle
  boost_speed: { value: 420, min: 150, max: 900, step: 10 },   // units/s while Shift is held
  brake_speed: { value: 40, min: 0, max: 150, step: 5 },       // units/s while C is held
  turn_rate: { value: 1.25, min: 0.3, max: 3, step: 0.05 },    // rad/s yaw and pitch
  approach_slowdown: { value: 0.55, min: 0.1, max: 2, step: 0.05 }, // speed cap per unit past perigee
  planet_radius: { value: 100, min: 40, max: 200, step: 5 },   // base radius in space, units
  reveal_factor: { value: 10, min: 4, max: 20, step: 0.5 },    // the planet unfolds at radius x this
  perigee_factor: { value: 2.6, min: 1.6, max: 5, step: 0.1 }, // perigee event at radius x this
  reveal_time: { value: 2.6, min: 0.5, max: 6, step: 0.1 },    // s for the generation sweep

  // ---- Perigee events (chance per approach, 0..1) ----
  ambush_core: { value: 0, min: 0, max: 1, step: 0.01 },     // core safe zone
  ambush_frontier: { value: 0.4, min: 0, max: 1, step: 0.01 },  // frontier zone
  ambush_deep: { value: 0.75, min: 0, max: 1, step: 0.01 },     // deep contested zone
  storm_chance: { value: 0.12, min: 0, max: 1, step: 0.01 },    // ion storm (scanner drains faster)
  signal_chance: { value: 0.3, min: 0, max: 1, step: 0.01 },    // anomaly signal (a ruin is hinted)

  // ---- Ambush ----
  drones: { value: 3, min: 1, max: 6, step: 1 },                // interceptors per ambush
  drone_speed: { value: 250, min: 80, max: 600, step: 10 },     // units/s
  drone_fire_interval: { value: 1.5, min: 0.4, max: 4, step: 0.1 }, // s between shots per drone
  bolt_speed: { value: 320, min: 100, max: 800, step: 10 },     // units/s
  bolt_damage: { value: 14, min: 1, max: 50, step: 1 },         // hull per hit
  bolt_hit_radius: { value: 11, min: 3, max: 30, step: 1 },     // units
  drone_lead: { value: 0.8, min: 0, max: 1.2, step: 0.05 },     // 0 aims at you, 1 leads perfectly
  guard_factor: { value: 12, min: 5, max: 25, step: 0.5 },      // drones give up past radius x this
  hull_max: { value: 100, min: 20, max: 300, step: 5 },

  // ---- Orbit scan ----
  rotate_speed: { value: 1.5, min: 0.3, max: 4, step: 0.1 },    // rad/s with the arrow keys
  drag_sensitivity: { value: 0.007, min: 0.002, max: 0.02, step: 0.001 }, // rad per pixel dragged
  scan_angle: { value: 0.3, min: 0.1, max: 0.7, step: 0.01 },   // rad, beam footprint
  scan_rate: { value: 1.8, min: 0.3, max: 6, step: 0.1 },       // coverage per second at beam centre
  scan_energy: { value: 100, min: 20, max: 300, step: 5 },
  scan_drain: { value: 10, min: 2, max: 60, step: 1 },          // energy/s while scanning
  scan_regen: { value: 20, min: 1, max: 40, step: 1 },           // energy/s while idle
  storm_drain_mult: { value: 1.8, min: 1, max: 4, step: 0.1 },
  poi_reveal_time: { value: 0.35, min: 0.05, max: 2, step: 0.05 }, // s under the beam to find a point
  terrain_amp: { value: 0.07, min: 0.01, max: 0.2, step: 0.005 },  // relief, fraction of radius
  planet_detail: { value: 28, min: 12, max: 48, step: 1 },      // icosphere subdivisions
  planet_map: { value: 1024, min: 256, max: 2048, step: 256 },   // width in pixels of the painted surface map drawn for the scan planet
  planet_bump: { value: 6, min: 0, max: 30, step: 1 },           // how strongly the height map shades the painted globe
  planet_clouds: { value: 0.85, min: 0, max: 1, step: 0.05 },    // opacity of the soft cloud shell

  // ---- Base-site rating ----
  site_ore_range: { value: 0.55, min: 0.2, max: 1, step: 0.05 },   // rad: ore this close counts
  site_hazard_range: { value: 0.42, min: 0.2, max: 1, step: 0.02 }, // rad: hazard this close counts
  site_intel_warn: { value: 0.3, min: 0, max: 1, step: 0.05 },     // warn below this surrounding scan
  rating_good: { value: 72, min: 30, max: 100, step: 1 },          // score for 優
  rating_ok: { value: 48, min: 10, max: 90, step: 1 },             // score for 良

  // ---- Art pass 2026-11-11 (pictures in ../../assets/img/; every one is optional) ----
  cockpit_overscan: { value: 1.02, min: 1, max: 1.1, step: 0.01 },   // the painted cockpit is drawn this much larger, so its sway never shows an edge
  cockpit_sway: { value: 0.6, min: 0, max: 1, step: 0.05 },          // share of the camera's roll that the cockpit frame follows
  bridge_view_shift: { value: 98, min: 0, max: 160, step: 2 },      // pixels the 3D view's centre moves up when the bridge picture is shown (its window is high)
  rock_card: { value: 2.3, min: 1, max: 4, step: 0.1 },              // a painted rock's width, as a multiple of the 3D rock's radius it replaces
  station_card: { value: 2.8, min: 1, max: 5, step: 0.1 },            // the painted derelict station's width, as a multiple of the low-poly ring's radius
  screen_glow: { value: 0.62, min: 0, max: 1, step: 0.02 },          // opacity of the lit dashboard screens under the HUD text
  sky_brightness: { value: 0.8, min: 0.2, max: 1.5, step: 0.05 },    // nebula sky around the ship (space view)
  sky_yaw: { value: -0.45, min: -3.14, max: 3.14, step: 0.05 },      // rad: turns the nebula around the ship (0 = its core dead ahead)
  sky_pole_fade: { value: 45, min: 10, max: 65, step: 5 },           // deg of latitude where the nebula starts fading to black (read once, when the sky loads)
  orbit_sky_brightness: { value: 0.6, min: 0.2, max: 1.5, step: 0.05 }, // nebula backdrop behind the tiny planet (orbit view)
  scenery_brightness: { value: 0.95, min: 0.3, max: 1.5, step: 0.05 },  // painted planets (琉璃, the destination, the moon)
  picture_alpha_cut: { value: 0.16, min: 0, max: 0.5, step: 0.01 },  // drops the faint speckle around a painted planet
  fringe_cut: { value: 26, min: 0, max: 80, step: 2 },               // brightness (0-255) under which the black fringe around the painted 琉璃 is trimmed away; 0 = leave it
  handover_fade: { value: 0.6, min: 0.1, max: 1, step: 0.05 },       // share of the reveal sweep over which the painted planet fades out
  moon_tone: { value: 0.8, min: 0.3, max: 1.2, step: 0.05 },         // brightness of the grey moon picture
  panel_alpha: { value: 0.86, min: 0.4, max: 1, step: 0.02 },        // HUD panel fill opacity
  label_plate: { value: 0.5, min: 0, max: 1, step: 0.05 },           // dark plate under labels drawn over the sky

  // ---- Touch pass 2026-11-12 (phone held in landscape; read only when the page runs with touch on) ----
  // All sizes are stage pixels (the stage is 1280x720; on a phone 1 stage px is about 0.5 CSS px, so 88 here is a 44 px finger target).
  touch_text: { value: 24, min: 18, max: 34, step: 1 },              // smallest size of any text the player must read to act
  touch_button_text: { value: 28, min: 20, max: 40, step: 1 },       // label size on a touch button
  touch_margin: { value: 16, min: 0, max: 48, step: 2 },             // gap between the stage edge and the controls
  touch_gap: { value: 12, min: 12, max: 40, step: 2 },               // gap between two neighbouring controls
  touch_control_alpha: { value: 0.8, min: 0.3, max: 1, step: 0.05 }, // fill opacity of the touch buttons (the bridge shows through)
  touch_tap_slop: { value: 20, min: 8, max: 60, step: 2 },           // a finger that moves less than this is a tap, not a drag
  touch_slide: { value: 36, min: 0, max: 100, step: 4 },             // a held button lets go once the finger slides this far off it
  touch_pause_size: { value: 88, min: 88, max: 140, step: 4 },       // the pause button, top right, both views
  // flight: the stick under the left thumb
  touch_stick_x: { value: 176, min: 100, max: 400, step: 4 },        // where the stick rests (its centre), from the left edge
  touch_stick_y: { value: 548, min: 400, max: 640, step: 4 },        // ... and from the top
  touch_stick_radius: { value: 104, min: 60, max: 160, step: 2 },    // radius of the stick's base ring
  touch_stick_knob: { value: 46, min: 44, max: 80, step: 2 },        // radius of the knob
  touch_stick_travel: { value: 84, min: 40, max: 160, step: 2 },     // thumb travel from the centre for a full turn
  touch_stick_dead: { value: 0.12, min: 0, max: 0.5, step: 0.01 },   // share of the travel that does nothing
  touch_stick_gain: { value: 1.3, min: 1, max: 1.5, step: 0.05 },    // above 1, a diagonal push still reaches nearly full turn on both axes
  touch_stick_zone: { value: 340, min: 240, max: 480, step: 10 },    // the bottom-left square that belongs to the stick: a thumb landing anywhere in it steers
  // flight: the buttons under the right thumb (boost in the corner, brake beside it, auto-align across the top of both)
  touch_boost_w: { value: 144, min: 88, max: 240, step: 4 },
  touch_brake_w: { value: 128, min: 88, max: 240, step: 4 },
  touch_boost_h: { value: 120, min: 88, max: 200, step: 4 },         // height of the boost and brake row
  touch_align_h: { value: 108, min: 88, max: 200, step: 4 },         // height of the auto-align button
  // orbit: buttons under the right thumb (hold-to-scan in the corner, next target beside it, confirm above)
  touch_scan_w: { value: 224, min: 120, max: 320, step: 4 },
  touch_scan_h: { value: 132, min: 88, max: 200, step: 4 },
  touch_next_w: { value: 180, min: 120, max: 300, step: 4 },
  touch_next_h: { value: 100, min: 88, max: 200, step: 4 },
  touch_confirm_w: { value: 304, min: 200, max: 420, step: 4 },
  touch_confirm_h: { value: 112, min: 88, max: 200, step: 4 },
  // orbit: markers and panels
  touch_marker_scale: { value: 1.8, min: 1, max: 3, step: 0.1 },     // markers on the globe are drawn this much larger
  touch_marker_radius: { value: 56, min: 26, max: 100, step: 2 },    // a tap this close to a marker picks it
  touch_card_w: { value: 348, min: 280, max: 420, step: 4 },         // planet card, top left
  touch_site_w: { value: 364, min: 300, max: 440, step: 4 },         // chosen-site panel, left
  touch_log_w: { value: 296, min: 240, max: 400, step: 4 },          // discovery log, right (latest three finds)
};
