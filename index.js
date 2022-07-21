const Koa = require("koa");
const Router = require("@koa/router");
const render = require("koa-ejs");
const path = require("path");

const app = new Koa({ proxy: true });
const router = new Router();

app.use(async (ctx, next) => {
    try {
      await next()
    } catch(err) {
      console.log(err.status)
      ctx.status = err.status || 500;
      ctx.body = err.message;
    }   
  });

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'index',
    viewExt: 'html',
    cache: false,
    debug: true
  });

  router.get('error', '/error', (ctx) => {
    ctx.throw(500, 'internal server error');
  });

  router.get('status', '/status', (ctx) => {
    ctx.status = 200;
    ctx.body   = 'ok';
  })


router.get("koa", "/", (ctx) => {
    let koalaFacts = [];

    koalaFacts.push({
      meta_name: 'Color',
      meta_value: 'Black and white'
    });
  
    koalaFacts.push({
      meta_name: 'Native Country',
      meta_value: 'Australia'
    });
  
    koalaFacts.push({
      meta_name: 'Animal Classification',
      meta_value: 'Mammal'
    });
  
    koalaFacts.push({
      meta_name: 'Life Span',
      meta_value: '13 - 18 years'
    });
  
    koalaFacts.push({
      meta_name: 'Are they bears?',
      meta_value: 'No'
    });
  
    return ctx.render('index', {
      attributes: koalaFacts
    });
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3333, () => {
  console.log("Server running on port https://localhost:3333");
});
