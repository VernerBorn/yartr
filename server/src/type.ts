interface TypeTransport {
  autobus: TransportInfo;
  trolleybus: TransportInfo;
  tram: TransportInfo;
}

interface TransportInfo {
  name: string;
  link: string;
  listRoutes: string[];
}

interface Routes {
  autobus: {
    [key: string]: RoutesInfo;
  };
  trolleybus: {
    [key: string]: RoutesInfo;
  };
  tram: {
    [key: string]: RoutesInfo;
  };
}

interface RoutesInfo {
  type: string;
  name: string;
  link: string;
  road: string;
}
export { TypeTransport, Routes, RoutesInfo };
