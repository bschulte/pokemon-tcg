import Router from '@koa/router';
import { searchCards } from './card.service';

export const createCardRouter = () => {
  const router = new Router({ prefix: '/cards' });

  router.get('/', async (ctx) => {
    ctx.body = await searchCards(ctx.request.query);
  });

  return router;
};
