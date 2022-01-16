import { Card } from '@prisma/client';
import { CardSearchParams } from '../../../../shared/interfaces/cardSearchParams.dto';
import { prisma } from '../../client';

export const searchCards = async (
  searchParams: CardSearchParams,
): Promise<Card[]> => {
  console.log('Search params:', searchParams);

  let whereClause: any = {};
  let attackWhereClause = null;
  let abilityWhereClause = null;
  let ruleWhereClause = null;

  // Name search
  if (searchParams.name) {
    whereClause.name = { contains: searchParams.name, mode: 'insensitive' };
  }

  // Body text search
  if (searchParams.bodyText) {
    attackWhereClause = {
      attacks: {
        some: {
          text: { contains: searchParams.bodyText, mode: 'insensitive' },
        },
      },
    };
    abilityWhereClause = {
      abilities: {
        some: {
          text: { contains: searchParams.bodyText, mode: 'insensitive' },
        },
      },
    };
    ruleWhereClause = {
      rules: {
        some: {
          text: { contains: searchParams.bodyText, mode: 'insensitive' },
        },
      },
    };

    whereClause = {
      ...whereClause,
      OR: [attackWhereClause, abilityWhereClause, ruleWhereClause],
    };
  }

  // Legalities
  if (searchParams.legalities) {
    whereClause = {
      ...whereClause,
      legalities: {
        hasSome: searchParams.legalities.split(',').map((l) => l.toLowerCase()),
      },
    };
  }

  if (searchParams.sets) {
    whereClause = {
      ...whereClause,
      OR: searchParams.sets.split(',').map((set) => ({ set })),
    };
  }

  const query: any = {
    where: whereClause,
    include: {
      attacks: true,
      abilities: true,
      rules: true,
    },
    take: 20,
  };

  console.log('Query:', JSON.stringify(query, null, 2));

  return prisma.card.findMany(query);
};
