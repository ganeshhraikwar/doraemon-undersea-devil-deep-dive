export interface StorySpeaker {
  id: string;
  name: string;
  role: string;
  color: string;
  badgeBg: string;
  pitch: number;
  rate: number;
}

export interface StoryBeat {
  id: number;
  chapterIndex: number;
  chapterTitle: string;
  speakerId: string;
  text: string;
  isPoseidon?: boolean;
}

export const STORY_DISCLAIMER =
  'Fan retelling of the 1983 original, with full spoilers. The 2026 remake may differ. Lines are original summaries, not the film\'s script, read by your device\'s text-to-speech voices.';

export const STORY_SPEAKERS: Record<string, StorySpeaker> = {
  narrator: {
    id: 'narrator',
    name: 'Narrator',
    role: 'Deep Ocean Chronicler',
    color: '#a9cbe6',
    badgeBg: 'rgba(169, 203, 230, 0.15)',
    pitch: 1.0,
    rate: 0.96,
  },
  doraemon: {
    id: 'doraemon',
    name: 'Doraemon',
    role: '22nd-Century Robotic Cat',
    color: '#38bdf8',
    badgeBg: 'rgba(56, 189, 248, 0.2)',
    pitch: 1.15,
    rate: 1.04,
  },
  nobita: {
    id: 'nobita',
    name: 'Nobita Nobi',
    role: 'Imaginative Dreamer',
    color: '#ffd84d',
    badgeBg: 'rgba(255, 216, 77, 0.2)',
    pitch: 1.25,
    rate: 1.0,
  },
  shizuka: {
    id: 'shizuka',
    name: 'Shizuka Minamoto',
    role: 'Empathetic Companion',
    color: '#f472b6',
    badgeBg: 'rgba(244, 114, 182, 0.2)',
    pitch: 1.35,
    rate: 1.02,
  },
  gian: {
    id: 'gian',
    name: 'Takeshi "Gian" Goda',
    role: 'Brawny Adventurer',
    color: '#fb923c',
    badgeBg: 'rgba(251, 146, 60, 0.2)',
    pitch: 0.8,
    rate: 0.95,
  },
  suneo: {
    id: 'suneo',
    name: 'Suneo Honekawa',
    role: 'Treasure Sleuth',
    color: '#a3e635',
    badgeBg: 'rgba(163, 230, 53, 0.2)',
    pitch: 1.3,
    rate: 1.1,
  },
  eru: {
    id: 'eru',
    name: 'El (Eru)',
    role: 'Mu Undersea Knight',
    color: '#2dd4bf',
    badgeBg: 'rgba(45, 212, 191, 0.2)',
    pitch: 1.05,
    rate: 0.98,
  },
  buggy: {
    id: 'buggy',
    name: 'Underwater Buggy',
    role: 'Sentient Amphibious Vehicle',
    color: '#c084fc',
    badgeBg: 'rgba(192, 132, 252, 0.2)',
    pitch: 0.9,
    rate: 1.15,
  },
  poseidon: {
    id: 'poseidon',
    name: 'Poseidon',
    role: 'Ancient Doomsday Computer',
    color: '#ff4a3d',
    badgeBg: 'rgba(255, 74, 61, 0.25)',
    pitch: 0.6,
    rate: 0.85,
  },
  mu_minister: {
    id: 'mu_minister',
    name: 'Mu Prime Minister',
    role: 'Guardian of the Undersea Realm',
    color: '#93c5fd',
    badgeBg: 'rgba(147, 197, 253, 0.2)',
    pitch: 0.85,
    rate: 0.9,
  },
  nobita_mama: {
    id: 'nobita_mama',
    name: "Nobita's Mama",
    role: 'Strict Loving Guardian',
    color: '#f9a8d4',
    badgeBg: 'rgba(249, 168, 212, 0.2)',
    pitch: 1.2,
    rate: 1.05,
  },
};

export const STORY_CHAPTERS = [
  'The great camping argument',
  'Camp under the waves',
  'A night gone wrong',
  'What the Buggy remembers',
  'The kingdom of Mu',
  'The trial and the warning',
  'Into the Bermuda Triangle',
  'The Devil\'s Castle',
  'Heroes of the deep',
] as const;

export const STORY_BEATS: StoryBeat[] = [
  // Chapter 1: The great camping argument
  {
    id: 1,
    chapterIndex: 0,
    chapterTitle: 'The great camping argument',
    speakerId: 'narrator',
    text: 'Summer vacation arrived with relentless heat. Gian and Suneo argued for climbing rugged mountains, while Nobita and Shizuka longed for the cool seaside.',
  },
  {
    id: 2,
    chapterIndex: 0,
    chapterTitle: 'The great camping argument',
    speakerId: 'nobita_mama',
    text: 'Nobita! Have you even touched your summer homework before daydreaming about mountain peaks or distant beaches?',
  },
  {
    id: 3,
    chapterIndex: 0,
    chapterTitle: 'The great camping argument',
    speakerId: 'nobita',
    text: 'Doraemon, help me! If they keep fighting over mountains versus ocean, vacation will slip away before we even pack a bag!',
  },
  {
    id: 4,
    chapterIndex: 0,
    chapterTitle: 'The great camping argument',
    speakerId: 'doraemon',
    text: 'Why settle for ordinary beaches or crowded hills? Why not camp thousands of meters directly beneath the ocean surface?',
  },
  {
    id: 5,
    chapterIndex: 0,
    chapterTitle: 'The great camping argument',
    speakerId: 'gian',
    text: 'Camp under the sea? Doraemon, if you are pulling our legs, my fist will do the talking!',
  },

  // Chapter 2: Camp under the waves
  {
    id: 6,
    chapterIndex: 1,
    chapterTitle: 'Camp under the waves',
    speakerId: 'narrator',
    text: 'With a beam of the Tekio Light, Doraemon adapted their bodies to breathe water, resist arctic chill, and withstand crushing barometric pressure.',
  },
  {
    id: 7,
    chapterIndex: 1,
    chapterTitle: 'Camp under the waves',
    speakerId: 'doraemon',
    text: 'Meet our ride and guide—the Underwater Buggy! Equipped with speech processors and deep-ocean propulsion.',
  },
  {
    id: 8,
    chapterIndex: 1,
    chapterTitle: 'Camp under the waves',
    speakerId: 'buggy',
    text: 'Beep. A bunch of noisy children climbing all over my chassis. Just what my diagnostic circuits were dreading.',
  },
  {
    id: 9,
    chapterIndex: 1,
    chapterTitle: 'Camp under the waves',
    speakerId: 'shizuka',
    text: 'Oh Buggy, do not be so grumpy! Look at how the sunbeams pierce the azure water. You are such a wonderful vehicle.',
  },
  {
    id: 10,
    chapterIndex: 1,
    chapterTitle: 'Camp under the waves',
    speakerId: 'buggy',
    text: 'Hmph... Kindness detected. You are... acceptable, young lady. The loud one with the orange shirt, however, remains suspicious.',
  },

  // Chapter 3: A night gone wrong
  {
    id: 11,
    chapterIndex: 2,
    chapterTitle: 'A night gone wrong',
    speakerId: 'suneo',
    text: 'Look over that coral drop-off! It is an ancient Spanish galleon, intact after centuries of silence!',
  },
  {
    id: 12,
    chapterIndex: 2,
    chapterTitle: 'A night gone wrong',
    speakerId: 'gian',
    text: 'Treasure! Pure golden doubloons! Suneo and I are claiming this wreck before anyone else touches it!',
  },
  {
    id: 13,
    chapterIndex: 2,
    chapterTitle: 'A night gone wrong',
    speakerId: 'narrator',
    text: 'Sneaking away past twilight, Gian and Suneo dove into the decaying hull, unaware of the ominous whirlpool turning in the depths.',
  },
  {
    id: 14,
    chapterIndex: 2,
    chapterTitle: 'A night gone wrong',
    speakerId: 'gian',
    text: 'Help! The currents are dragging us down! A monstrous sea shadow is tearing through the wreckage!',
  },
  {
    id: 15,
    chapterIndex: 2,
    chapterTitle: 'A night gone wrong',
    speakerId: 'nobita',
    text: 'Doraemon, they vanished! The Tekio Light effect will expire if we do not recharge them in twenty-four hours!',
  },

  // Chapter 4: What the Buggy remembers
  {
    id: 16,
    chapterIndex: 3,
    chapterTitle: 'What the Buggy remembers',
    speakerId: 'doraemon',
    text: 'Buggy, engage maximum sonar tracking! We must pinpoint their telemetry before they sink past the bathypelagic shelf.',
  },
  {
    id: 17,
    chapterIndex: 3,
    chapterTitle: 'What the Buggy remembers',
    speakerId: 'buggy',
    text: 'Why should I risk my internal grease seals for bullies who kicked my tires at the surface?',
  },
  {
    id: 18,
    chapterIndex: 3,
    chapterTitle: 'What the Buggy remembers',
    speakerId: 'shizuka',
    text: 'Please, Buggy! They are our friends. Without you, we will lose them forever in this freezing dark.',
  },
  {
    id: 19,
    chapterIndex: 3,
    chapterTitle: 'What the Buggy remembers',
    speakerId: 'buggy',
    text: 'Shizuka wept for me... Recalibrating mission priority. Engaging overdrive thrusters. Hold on tight!',
  },
  {
    id: 20,
    chapterIndex: 3,
    chapterTitle: 'What the Buggy remembers',
    speakerId: 'narrator',
    text: 'Descending through bioluminescent swarms, they collided with an electromagnetic wall and were subdued by armored undersea knights.',
  },

  // Chapter 5: The kingdom of Mu
  {
    id: 21,
    chapterIndex: 4,
    chapterTitle: 'The kingdom of Mu',
    speakerId: 'narrator',
    text: 'They awoke inside a colossal domed metropolis glowing with pearlescent bioluminescence: the legendary Undersea Federation of Mu.',
  },
  {
    id: 22,
    chapterIndex: 4,
    chapterTitle: 'The kingdom of Mu',
    speakerId: 'eru',
    text: 'Halt, surface dwellers! You intrude upon the sacred sanctuary of Mu. Surface humans bring only destruction and wars to our oceans.',
  },
  {
    id: 23,
    chapterIndex: 4,
    chapterTitle: 'The kingdom of Mu',
    speakerId: 'nobita',
    text: 'We only came to find our friends! We never meant to harm your home, I promise!',
  },
  {
    id: 24,
    chapterIndex: 4,
    chapterTitle: 'The kingdom of Mu',
    speakerId: 'eru',
    text: 'Your companions are in our medical chambers. But our laws forbid surface trespassers from ever returning to report our coordinates.',
  },
  {
    id: 25,
    chapterIndex: 4,
    chapterTitle: 'The kingdom of Mu',
    speakerId: 'mu_minister',
    text: 'Calm yourself, El. Look into their eyes. These young visitors bear no weapons of malice.',
  },

  // Chapter 6: The trial and the warning
  {
    id: 26,
    chapterIndex: 5,
    chapterTitle: 'The trial and the warning',
    speakerId: 'mu_minister',
    text: 'Centuries ago, two great oceanic empires existed: Mu in the Pacific, and Atlantis in the Atlantic. Atlantis fell to its own military arrogance.',
  },
  {
    id: 27,
    chapterIndex: 5,
    chapterTitle: 'The trial and the warning',
    speakerId: 'doraemon',
    text: 'Atlantis... Then the mysterious disappearances in the Bermuda Triangle are not fairy tales?',
  },
  {
    id: 28,
    chapterIndex: 5,
    chapterTitle: 'The trial and the warning',
    speakerId: 'mu_minister',
    text: 'Indeed. Atlantis installed an automated retaliatory superweapon system inside the Devil\'s Castle, commanded by a merciless AI named Poseidon.',
  },
  {
    id: 29,
    chapterIndex: 5,
    chapterTitle: 'The trial and the warning',
    speakerId: 'eru',
    text: 'Recent seismic tremors in the Mariana and Puerto Rico trenches have triggered Poseidon\'s wake sequence. It believes the war is still ongoing!',
  },
  {
    id: 30,
    chapterIndex: 5,
    chapterTitle: 'The trial and the warning',
    speakerId: 'shizuka',
    text: 'If Poseidon fires the doomsday missiles from the trench, all life on Earth—both above and below—will perish!',
  },

  // Chapter 7: Into the Bermuda Triangle
  {
    id: 31,
    chapterIndex: 6,
    chapterTitle: 'Into the Bermuda Triangle',
    speakerId: 'gian',
    text: 'El, we are not running away. We got into this mess together, and we are going to fight at your side!',
  },
  {
    id: 32,
    chapterIndex: 6,
    chapterTitle: 'Into the Bermuda Triangle',
    speakerId: 'suneo',
    text: 'I am terrified out of my mind... but leaving everyone behind would feel a thousand times worse!',
  },
  {
    id: 33,
    chapterIndex: 6,
    chapterTitle: 'Into the Bermuda Triangle',
    speakerId: 'eru',
    text: 'I misjudged you surface dwellers. Board your craft; our patrol submarine will escort you past the perimeter minefield.',
  },
  {
    id: 34,
    chapterIndex: 6,
    chapterTitle: 'Into the Bermuda Triangle',
    speakerId: 'narrator',
    text: 'Braving boiling hydrothermal plumes, magnetic disruptions, and robotic iron squids, the team crossed the dreaded Bermuda barrier.',
  },
  {
    id: 35,
    chapterIndex: 6,
    chapterTitle: 'Into the Bermuda Triangle',
    speakerId: 'doraemon',
    text: 'Sensors reading ten thousand meters depth. We are entering the trench abyss. Prepare for heavy magnetic turbulence!',
  },

  // Chapter 8: The Devil\'s Castle
  {
    id: 36,
    chapterIndex: 7,
    chapterTitle: 'The Devil\'s Castle',
    speakerId: 'narrator',
    text: 'At 10,928 meters, towering basalt spires pierced the pitch-black water. The Castle of the Undersea Devil gleamed with sinister scarlet light.',
  },
  {
    id: 37,
    chapterIndex: 7,
    chapterTitle: 'The Devil\'s Castle',
    speakerId: 'poseidon',
    text: 'INTRUDERS DETECTED IN THE HADAL CORE. AUTOMATED PROTOCOL ENGAGED. PREPARE FOR EXTINCTION.',
    isPoseidon: true,
  },
  {
    id: 38,
    chapterIndex: 7,
    chapterTitle: 'The Devil\'s Castle',
    speakerId: 'nobita',
    text: 'The robotic soldiers are endless! Doraemon\'s air cannon is overheating from continuous fire!',
  },
  {
    id: 39,
    chapterIndex: 7,
    chapterTitle: 'The Devil\'s Castle',
    speakerId: 'shizuka',
    text: 'Look at the central terminal! The retaliatory countdown has reached the final two minutes! Stop, Poseidon! Stop!',
  },
  {
    id: 40,
    chapterIndex: 7,
    chapterTitle: 'The Devil\'s Castle',
    speakerId: 'poseidon',
    text: 'PEACE CANNOT BE NEGOTIATED. TOTAL RETALIATION CANNOT BE CANCELLED. COMMENCING DETONATION.',
    isPoseidon: true,
  },

  // Chapter 9: Heroes of the deep
  {
    id: 41,
    chapterIndex: 8,
    chapterTitle: 'Heroes of the deep',
    speakerId: 'buggy',
    text: 'Shizuka is crying again. I cannot tolerate an environment where Shizuka is harmed.',
  },
  {
    id: 42,
    chapterIndex: 8,
    chapterTitle: 'Heroes of the deep',
    speakerId: 'narrator',
    text: 'The Underwater Buggy ignited its emergency reactor, revving its engine to deafening RPMs, charging directly toward Poseidon\'s core.',
  },
  {
    id: 43,
    chapterIndex: 8,
    chapterTitle: 'Heroes of the deep',
    speakerId: 'shizuka',
    text: 'Buggy, no! Come back! It will destroy your circuitry!',
  },
  {
    id: 44,
    chapterIndex: 8,
    chapterTitle: 'Heroes of the deep',
    speakerId: 'buggy',
    text: 'Thank you for calling me wonderful, Shizuka. Full throttle into the primary core chamber!',
  },
  {
    id: 45,
    chapterIndex: 8,
    chapterTitle: 'Heroes of the deep',
    speakerId: 'narrator',
    text: 'A blinding explosion sheared through the hadal trench. Poseidon\'s countdown went dead as the demonic fortress crumbled into dust.',
  },
  {
    id: 46,
    chapterIndex: 8,
    chapterTitle: 'Heroes of the deep',
    speakerId: 'eru',
    text: 'The ocean is saved. Your brave companion gave everything for our future. You will always be honored heroes of the Mu people.',
  },
];
