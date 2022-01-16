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

interface Rule {
  text: string;
}

export interface Card {
  id: string;
  ptcgoId: string;
  set: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp?: string;
  types?: string[];
  rules: Rule[];

  attacks?: Attack[];
  weaknesses?: string[];
  retreatCost?: string[];
  convertedRetreatCost?: number;
  number: string;
  artist: string;
  nationalPokedexNumbers?: number[];
  legalities: string[];
  imageSmall: string;
  imageLarge: string;
  abilities?: Abilities[];
}
