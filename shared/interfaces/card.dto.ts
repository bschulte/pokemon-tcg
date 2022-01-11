interface Attack {
  name: string;
  cost: string[];
  convertedEnergyCost: number;
  damage: string;
  text: string;
}

interface Legality {
  unlimited: string;
  standard?: string;
  expanded?: string;
}

interface Images {
  small: string;
  large: string;
}

interface Abilities {
  name: string;
  text: string;
  type: string;
}

export interface Card {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp?: string;
  types?: string[];
  rules: string[];

  attacks?: Attack[];
  weaknesses?: string[];
  retreatCost?: string[];
  convertedRetreatCost?: number;
  number: string;
  artist: string;
  nationalPokedexNumbers?: number[];
  legalities: Legality;
  images: Images;
  abilities?: Abilities[];
}