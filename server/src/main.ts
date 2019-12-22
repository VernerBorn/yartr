import parsTypeTransport from "./parsTypeTransport";
import parsRoutes from "./parsRoutes";
import parsRoad from "./parsRoad";

async function genJSON() {
  const baseURL = "http://yartr.ru/";
  let typeTransport = await parsTypeTransport(baseURL);
  const { transport, routes } = await parsRoutes(typeTransport, baseURL);
  const road = await parsRoad(baseURL, routes);
  typeTransport = transport;
  console.log(road);
}

genJSON();
