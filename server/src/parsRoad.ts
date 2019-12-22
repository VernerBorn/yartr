import * as request from "request-promise-native";
import * as cheerio from "cheerio";

import { Routes, RoutesInfo } from "./type";

function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

async function parsRoad(url: string, routes: Routes) {
  const { autobus, trolleybus, tram } = routes;
  const road = parsAutobus(url, autobus["41б"]);
  return road;
}
async function parsAutobus(url: string, routesInfo: RoutesInfo) {
  let listRoad = {
    forward: [],
    backward: []
  };
  let mapRoad: string[] = [];
  const body = await request((url + routesInfo.link) as string);
  const listLink = cheerio.load(body)("a");
  for (let i = 1; i < listLink.length - 1; i++) {
    const objectLink: CheerioElement = listLink.contents()[String(i)];
    const routeName = objectLink.data.trim();
    mapRoad.push(routeName);
  }
  mapRoad.reduce((acc, item, i, arr) => {
    if (acc) {
      if (arr[i] !== arr[i - 1]) {
        listRoad.forward.push(item);
        return true;
      } else {
        listRoad.backward.push(item);
      }
    } else {
      listRoad.backward.push(item);
      return false;
    }
  }, true);
  return listRoad;
}

export default parsRoad;
