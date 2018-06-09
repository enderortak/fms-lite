import L from "leaflet";

export class OSMMapTile {
  constructor(options) {
    return L.tileLayer(OSMMapTile.URL_PATTERN, { ...OSMMapTile.DEFAULT_OPTIONS, ...options });
  }
  static URL_PATTERN = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  static DEFAULT_OPTIONS = {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  };
}

export class HEREMapTile {
  constructor(schema, options) {
    return L.tileLayer(
      HEREMapTile.URL_PATTERN,
      { ...HEREMapTile.DEFAULT_OPTIONS, ...options, schema },
    );
  }
      static APP_ID = "X4lVXpDwqP4dPmS54lsX";
      static APP_CODE = "LZM8c_OBu09khbAkko5mrA";
      static URL_PATTERN = "https://{s}.{base}.maps.cit.api.here.com/maptile/2.1/{type}/{mapID}/{schema}/{z}/{x}/{y}/{size}/{format}?app_id={app_id}&app_code={app_code}&lg={language}";
      static DEFAULT_OPTIONS = {
        base: "base",
        type: "maptile",
        attribution: "Map &copy; 1987-2014 <a href='http://developer.here.com'>HERE</a>",
        subdomains: "1234",
        mapID: "newest",
        app_id: HEREMapTile.APP_ID,
        app_code: HEREMapTile.APP_CODE,
        maxZoom: 20,
        language: "eng",
        format: "png8",
        size: "256",
      }
}

export class HEREOverlay {
  constructor(overlayType, options) {
    return L.tileLayer(
      HEREOverlay.URL_PATTERN,
      { ...HEREOverlay.DEFAULT_OPTIONS, ...options, base: overlayType },
    );
  }
        static APP_ID = "X4lVXpDwqP4dPmS54lsX";
        static APP_CODE = "LZM8c_OBu09khbAkko5mrA";
        static URL_PATTERN = "https://{s}.{base}.maps.cit.api.here.com/maptile/2.1/{type}/{mapID}/normal.day/{z}/{x}/{y}/{size}/{format}?app_id={app_id}&app_code={app_code}&lg={language}";
        static DEFAULT_OPTIONS = {
          base: "traffic",
          type: "flowtile",
          attribution: "Map &copy; 1987-2014 <a href='http://developer.here.com'>HERE</a>",
          subdomains: "1234",
          mapID: "newest",
          app_id: HEREOverlay.APP_ID,
          app_code: HEREOverlay.APP_CODE,
          maxZoom: 20,
          language: "eng",
          format: "png8",
          size: "256",
          zIndex: "99",
        }
}
