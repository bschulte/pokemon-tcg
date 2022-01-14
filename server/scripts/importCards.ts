import fs from 'fs-extra';
import { Card } from '../../shared/interfaces/card.dto';
import { prisma } from '../src/client';

const DATA_DIR = `${__dirname}/../data/cards/en`;

async function main() {
  const setJsonFiles = await fs.readdir(DATA_DIR);

  for (const setFile of setJsonFiles) {
    const cards: Card[] = JSON.parse(
      await fs.readFile(`${DATA_DIR}/${setFile}`, 'utf-8'),
    );

    for (const card of cards) {
      if (card.name.includes('V-UNION')) {
        // Just ignore V-UNION cards since their data structure is way
        // different than other card types
        continue;
      }
      await prisma.card.create({
        data: {
          ptcgoId: card.id,
          name: card.name,
          supertype: card.supertype,
          imageSmall: card.images.small,
          imageLarge: card.images.large,
          hp: card.hp,
          subtypes: card.subtypes,
          types: card.types,
          rules: card.rules,
          weaknesses: card.weaknesses,
          retreatCost: card.retreatCost,
          convertedRetreatCost: card.convertedRetreatCost,
          number: card.number,
          artist: card.artist,
          nationalPokedexNumbers: card.nationalPokedexNumbers,
          legalities: Object.keys(card.legalities),
          attacks: {
            create: card.attacks,
          },
          abilities: {
            create: card.abilities,
          },
        },
      });
    }
  }
  process.exit();
}

main();
