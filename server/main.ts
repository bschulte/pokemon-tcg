import Koa from 'koa';

async function main() {
  const app = new Koa();

  app.use(async (ctx) => {
    ctx.body = 'hello world';
  });

  console.log('Listening on port 5000');
  app.listen(5000);
}

main();
