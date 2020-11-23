const koa = require("koa");

const app = new koa();

app.use(async (context, next) => {
  if (context.url !== "/health") {
    console.log(`imcoming request on ${context.url}`);
  }

  context.body = process.env.NAME + "\n";
  context.status = 200;
  return next();
});

app.listen(3000);
