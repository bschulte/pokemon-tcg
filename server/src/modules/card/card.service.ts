import { Card } from '@prisma/client';
import { CardSearchParams } from '../../../../shared/interfaces/cardSearchParams.dto';
import { prisma } from '../../client';

export const searchCards = async (
  searchParams: CardSearchParams,
): Promise<Card[]> => {
  console.log('Search params:', searchParams);

  const cardWhereClause: any = {};
  let attackWhereClause = null;
  let abilityWhereClause = null;
  let ruleWhereClause = null;

  if (searchParams.name) {
    cardWhereClause.name = { contains: searchParams.name, mode: 'insensitive' };
  }

  if (searchParams.bodyText) {
    attackWhereClause = {
      text: { contains: searchParams.bodyText, mode: 'insensitive' },
    };
    abilityWhereClause = {
      text: { contains: searchParams.bodyText, mode: 'insensitive' },
    };
    ruleWhereClause = {
      text: { contains: searchParams.bodyText, mode: 'insensitive' },
    };
  }

  const query: any = {
    where: cardWhereClause,
    take: 20,
  };

  if (attackWhereClause) {
    query.select = {
      ...query.select,
      attacks: {
        where: attackWhereClause,
      },
    };
  }
  if (abilityWhereClause) {
    query.select = {
      ...query.select,
      attacks: {
        where: abilityWhereClause,
      },
    };
  }
  if (ruleWhereClause) {
    query.select = {
      ...query.select,
      attacks: {
        where: ruleWhereClause,
      },
    };
  }

  return prisma.card.findMany(query);
};
