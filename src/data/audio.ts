import { Howl } from "howler";

export const audio = {
  Map: new Howl({
    src: "/assets/audio/pallet-town-soundtrack.mp3",
    html5: true,
    loop: true,
    volume: 0.02,
  }),
  Battle: new Howl({
    src: "/assets/audio/battle-soudtrack.mp3",
    html5: true,
    loop: true,
    volume: 0.02,
  }),
  moves: {
    tackle: new Howl({
      src: "/assets/audio/moves/Tackle.mp3",
      volume: 0.2,
    }),
    ember: new Howl({
      src: "/assets/audio/moves/Ember.mp3",
      volume: 0.2,
    }),
  },
};
