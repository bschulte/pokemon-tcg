import fs from 'fs-extra';
import { Card } from '../../../../shared/interfaces/card.dto';
import { CardSearchParams } from '../../../../shared/interfaces/cardSearchParams.dto';

export const searchCards = async (searchParams: CardSearchParams) => {
  console.log('Search params:', searchParams);
  const setJsonFiles = fs.readdirSync('./data/cards/en');

  const results: Card[] = [];

  for (const setFile of setJsonFiles) {
    const cards: Card[] = JSON.parse(
      await fs.readFile(`./data/cards/en/${setFile}`, 'utf-8'),
    );

    for (const card of cards) {
      // Conditionally check each filter available
      if (searchParams.name) {
        if (
          !card.name.toLowerCase().includes(searchParams.name.toLowerCase())
        ) {
          continue;
        }
      }

      // Body text
      if (searchParams.bodyText) {
        const ruleFilter = searchParams.bodyText.toLowerCase();
        console.log('rule filter:', ruleFilter);

        let bodySectionTexts: string[] = [];
        if (card.rules) {
          bodySectionTexts = bodySectionTexts.concat(card.rules);
        }
        if (card.abilities) {
          bodySectionTexts = bodySectionTexts.concat(
            card.abilities.map((ability) => ability.text),
          );
        }
        if (card.attacks) {
          bodySectionTexts = bodySectionTexts.concat(
            card.attacks
              .map((attack) => attack.text)
              .filter((text) => Boolean(text)),
          );
        }

        const hasMatch = bodySectionTexts
          .map((text) => text.toLowerCase())
          .some((text) => text.includes(ruleFilter));

        console.log('Texts', bodySectionTexts);

        if (!hasMatch) {
          continue;
        }
      }

      // Legalities
      if (searchParams.legalities) {
        const legalities = searchParams.legalities.split(',');
        console.log('Card legals:', card.legalities);
        const hasMatch = legalities.some((legality) =>
          Boolean(card.legalities[legality.toLowerCase()]),
        );

        if (!hasMatch) {
          continue;
        }
      }

      results.push(card);

      if (results.length >= 20) {
        break;
      }
    }

    if (results.length >= 20) {
      break;
    }
  }

  return results;
};
