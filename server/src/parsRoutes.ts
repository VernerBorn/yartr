import * as request from "request-promise-native";
import * as cheerio from "cheerio";

import { routes } from "./api";
import { TypeTransport } from "./type";

async function parsRoutes(transport: TypeTransport, url: string) {
  for (const key in transport) {
    if (transport.hasOwnProperty(key)) {
      const body = await request(url + transport[key].link);
      const listLink = cheerio.load(body)("a");
      for (let i = 1; i < listLink.length - 1; i++) {
        const objectLink: CheerioElement = listLink.contents()[String(i)];
        const routeName = objectLink.data.replace(/\s+/g, "");
        const routeLink = objectLink.parent.attribs.href;
        const routeRoad: string = listLink.next()[String(i)].prev.data.trim();
        const transportType: string = transport[key].name;
        (transport[key].listRoutes as string[]).push(routeName);
        routes[key][routeName] = {
          type: key,
          name: transportType,
          link: routeLink,
          road: routeRoad
        };
      }
    }
  }
  return { transport, routes };
}

export default parsRoutes;
