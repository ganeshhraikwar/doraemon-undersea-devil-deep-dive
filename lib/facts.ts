export interface ReleaseItem {
  readonly country: string;
  readonly date: string;
  readonly notes?: string;
  readonly isIndia?: boolean;
}

export interface CastMember {
  readonly character: string;
  readonly japaneseActor: string;
  readonly roleDescription: string;
  readonly indianDubActor: string;
}

export interface CrewMember {
  readonly role: string;
  readonly name: string;
  readonly details?: string;
}

export const MOVIE_FACTS = {
  title: 'Doraemon: New Nobita and the Castle of the Undersea Devil',
  japaneseTitle: '映画ドラえもん のび太の海底鬼岩城 (2026)',
  franchisePosition: '45th Doraemon 2D feature film',
  natureOfFilm: 'Remake of the classic 1983 film',
  creator: 'Fujiko F. Fujio',
  animationStudio: 'Shin-Ei Animation',
  runtime: 'about 102 min',
  cbfcRatingIndia: 'U',
  showtimesUrl: 'https://district.in/movies',
  deepestPointFact: '10,928 m is the deepest point humans have reached (Director\'s Note)',
  synopsis:
    'During summer vacation, the gang argues over whether to camp in the mountains or at the beach. Doraemon offers an audacious compromise: camping thousands of leagues beneath the ocean surface! Equipped with the Tekio Light (adaptation light) and the spirited Underwater Buggy, Nobita and friends dive into an uncharted undersea wilderness. There, amid ancient sunken wrecks, they encounter El—a young Sea Dweller of the pacifist Mu Federation who harbors deep distrust of reckless surface humans. But when ancient dormant doomsday weapons in the Bermuda Triangle awaken and the Castle of the Undersea Devil starts moving, the fate of the entire Earth hangs in the balance.',
} as const;

export const CREW_LIST: readonly CrewMember[] = [
  { role: 'Original Creator', name: 'Fujiko F. Fujio' },
  { role: 'Director', name: 'Tetsuo Yajima' },
  { role: 'Screenplay', name: 'Isao Murayama' },
  { role: 'Music Composer', name: 'Takayuki Hattori' },
  { role: 'Theme Song', name: '"Honto" by sumika' },
  { role: 'Animation Studio', name: 'Shin-Ei Animation' },
  { role: 'Format Technology', name: 'First Doraemon film screened in 4DX / MX4D in Japan' },
] as const;

export const CAST_LIST: readonly CastMember[] = [
  {
    character: 'Doraemon',
    japaneseActor: 'Wasabi Mizuta',
    roleDescription: 'The 22nd-century robotic cat equipped with secret deep-ocean gadgets.',
    indianDubActor: 'not confirmed',
  },
  {
    character: 'Nobita Nobi',
    japaneseActor: 'Megumi Ohara',
    roleDescription: 'Kind-hearted boy who bonds with the Underwater Buggy.',
    indianDubActor: 'not confirmed',
  },
  {
    character: 'Shizuka Minamoto',
    japaneseActor: 'Yumi Kakazu',
    roleDescription: 'Compassionate companion whose kindness touches the sentient Buggy.',
    indianDubActor: 'not confirmed',
  },
  {
    character: 'Takeshi "Gian" Goda',
    japaneseActor: 'Subaru Kimura',
    roleDescription: 'The powerhouse of the neighborhood with a fierce sense of loyalty.',
    indianDubActor: 'not confirmed',
  },
  {
    character: 'Suneo Honekawa',
    japaneseActor: 'Tomokazu Seki',
    roleDescription: 'Clever friend obsessed with underwater treasure ships and mysteries.',
    indianDubActor: 'not confirmed',
  },
  {
    character: 'El',
    japaneseActor: 'Shoya Chiba',
    roleDescription: 'Sea Dweller knight of the undersea Mu Federation.',
    indianDubActor: 'not confirmed',
  },
  {
    character: 'Underwater Buggy',
    japaneseActor: 'Ryo Hirohashi',
    roleDescription: 'Sentient amphibious vehicle gadget with a distinct personality.',
    indianDubActor: 'not confirmed',
  },
  {
    character: 'Poseidon',
    japaneseActor: 'Takayuki Sugo',
    roleDescription: 'Ancient automated subterranean defense computer gone rogue.',
    indianDubActor: 'not confirmed',
  },
  {
    character: 'Mu Prime Minister',
    japaneseActor: 'Masashi Ebara',
    roleDescription: 'Elder leader of the peaceful Mu Federation undersea civilization.',
    indianDubActor: 'not confirmed',
  },
  {
    character: 'Mu Soldier',
    japaneseActor: 'Airi Taira',
    roleDescription: 'Vigilant undersea patrol guardian protecting underwater borders.',
    indianDubActor: 'not confirmed',
  },
  {
    character: "Nobita's Mama (Tamako Nobi)",
    japaneseActor: 'Kotono Mitsuishi',
    roleDescription: "Nobita's strict yet caring mother.",
    indianDubActor: 'not confirmed',
  },
  {
    character: "Nobita's Papa (Nobisuke Nobi)",
    japaneseActor: 'Yasunori Matsumoto',
    roleDescription: "Nobita's hardworking father who reminisces about summer getaways.",
    indianDubActor: 'not confirmed',
  },
] as const;

export const RELEASES_LIST: readonly ReleaseItem[] = [
  {
    country: 'Japan',
    date: '27 Feb 2026',
    notes: '#1 at box office for first 6 weekends, approx. $25.5M gross; 4DX/MX4D premiere',
  },
  {
    country: 'Vietnam',
    date: '22 May 2026',
    notes: 'Theatrical release',
  },
  {
    country: 'South Korea',
    date: '1 Jul 2026',
    notes: 'Theatrical release',
  },
  {
    country: 'Indonesia',
    date: '15 Jul 2026',
    notes: 'Theatrical release',
  },
  {
    country: 'Hong Kong & Singapore',
    date: '16 Jul 2026',
    notes: 'Simultaneous theatrical release',
  },
  {
    country: 'Turkey',
    date: '4 Sep 2026',
    notes: 'Theatrical release',
  },
  {
    country: 'India',
    date: '2 Oct 2026',
    notes: 'In cinemas: Hindi, Tamil & Telugu dubs. Distributed by PVR INOX Pictures with TV Asahi. Rated U. India box office: not confirmed.',
    isIndia: true,
  },
  {
    country: 'Thailand',
    date: '8 Oct 2026',
    notes: 'Theatrical release',
  },
] as const;

export const CAMP_GADGETS = [
  {
    name: 'Underwater Buggy',
    japaneseName: '水中バギー',
    description:
      'An amphibious artificial-intelligence buggy equipped with headlights, depth propulsion, and sarcastic wit. Loyal to those who treat it with genuine heart.',
  },
  {
    name: 'Tekio Light',
    japaneseName: 'テキオー灯',
    description:
      'Adaptation Light beam that alters the human body to withstand immense ocean pressure, cold temperatures, and breathe freely underwater for 24 hours.',
  },
  {
    name: 'Undersea Camp Tent',
    japaneseName: '海底キャンプテント',
    description:
      'Deep ocean dwelling sphere providing an airtight recreational camp floor surrounded by curious marine life.',
  },
  {
    name: 'Sunken Galleon Discovery',
    japaneseName: '沈没船の発見',
    description:
      'A Spanish treasure galleon resting hundreds of meters below, guarded by giant cephalopods and strange magnetic anomalies.',
  },
] as const;
