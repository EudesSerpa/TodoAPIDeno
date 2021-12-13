import { Application } from "https://deno.land/x/oak/mod.ts";
import { green, yellow } from "https://deno.land/std@0.117.0/fmt/colors.ts";

import todoRouter from "./routes/todo.ts";
import notFound from "./middlewares/notFound.ts";

import logger from "./middlewares/logger.ts";


const app = new Application();

const port: number = 8080;

app.use(logger.logger);
app.use(logger.responseTime);

app.use(todoRouter.routes());
app.use(todoRouter.allowedMethods());
app.use(notFound);

app.addEventListener("error", (evt) => {
    console.log(evt.error);
});

app.addEventListener("listen", ({ secure, hostname, port}) => {
    const protocol = secure ? "https://" : "http://";
    const url = `${protocol}${hostname ?? "localhost"}:${port}`;

    console.log(`${yellow("Listening on:")} ${green(url)}`);
});


await app.listen({ port });