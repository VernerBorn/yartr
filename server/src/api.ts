import { TypeTransport, Routes } from "./type";

let typeTransport: TypeTransport = {
  autobus: {
    name: "",
    link: "",
    listRoutes: []
  },
  trolleybus: {
    name: "",
    link: "",
    listRoutes: []
  },
  tram: {
    name: "",
    link: "",
    listRoutes: []
  }
};

let routes: Routes = {
  autobus: {},
  trolleybus: {},
  tram: {}
};

export { typeTransport, routes };
