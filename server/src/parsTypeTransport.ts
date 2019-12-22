import * as request from "request-promise-native";
import * as cheerio from "cheerio";
import { typeTransport } from "./api";

async function parsTypeTransport(url: string) {
  const body = await request(url);
  const listLink = cheerio.load(body)("a");
  for (let i = 0; i < listLink.length; i++) {
    const name: string = listLink.contents()[String(i)].data.trim();
    const link: string = listLink.contents()[String(i)].parent.attribs.href;
    switch (name) {
      case "Автобус":
        typeTransport.autobus.name = name;
        typeTransport.autobus.link = link;
        break;
      case "Троллейбус":
        typeTransport.trolleybus.name = name;
        typeTransport.trolleybus.link = link;
        break;
      case "Трамвай":
        typeTransport.tram.name = name;
        typeTransport.tram.link = link;
        break;
    }
  }
  return typeTransport;
}
export default parsTypeTransport;
