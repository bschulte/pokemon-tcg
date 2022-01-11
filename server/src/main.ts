import Koa from 'koa';
import koaBody from 'koa-body';
import { createCardRouter } from './modules/card/card.controller';

async function main() {
  const app = new Koa();

  app.use(koaBody());

  const cardRouter = createCardRouter();

  app.use(cardRouter.routes());

  console.log('Listening on port 5000');
  app.listen(5000);
}

main();
