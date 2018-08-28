export default class TileService {
  static OSM_URL_PATTERN = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  static HERE_APP_ID = "X4lVXpDwqP4dPmS54lsX";
  static HERE_APP_CODE = "LZM8c_OBu09khbAkko5mrA";
  /* eslint-disable */
  static HERE_URL_PATTERN = "https://{s}.{base}.maps.cit.api.here.com/maptile/2.1/{type}/{mapID}/{schema}/{z}/{x}/{y}/{size}/{format}?app_id={app_id}&app_code={app_code}&lg={language}";
  /* eslint-enable */
  static HERE_DEFAULT_OPTIONS = {
    url: TileService.HERE_URL_PATTERN,
    attribution: "Map &copy; 1987-2014 <a href='http://developer.here.com'>HERE</a>",
    subdomains: "1234",
    mapID: "newest",
    app_id: TileService.HERE_APP_ID,
    app_code: TileService.HERE_APP_CODE,
    maxZoom: 20,
    language: "eng",
    format: "png8",
    size: "256",
    layerType: "map-tile",
  };
  static getOptions(tileName) {
    if (tileName === "osm") {
      return {
        key: 1,
        name: "osm",
        url: TileService.OSM_URL_PATTERN,
        layerType: "map-tile",
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      };
    } else if (tileName === "here.normal.day") {
      return {
        key: 2,
        ...TileService.HERE_DEFAULT_OPTIONS,
        schema: "normal.day",
        name: "here.normal.day",
        base: "base",
        type: "maptile",
      };
    } else if (tileName === "here.satellite.day") {
      return {
        key: 3,
        ...TileService.HERE_DEFAULT_OPTIONS,
        schema: "satellite.day",
        name: "here.satellite.day",
        base: "aerial",
        type: "maptile",
      };
    } else if (tileName === "here.hybrid.day") {
      return {
        key: 4,
        ...TileService.HERE_DEFAULT_OPTIONS,
        schema: "hybrid.day",
        name: "here.hybrid.day",
        base: "aerial",
        type: "maptile",
      };
    } else if (tileName === "here.terrain.day") {
      return {
        key: 5,
        ...TileService.HERE_DEFAULT_OPTIONS,
        schema: "terrain.day",
        name: "here.terrain.day",
        base: "aerial",
        type: "maptile",
      };
    } else if (tileName === "here.traffic") {
      return {
        key: 1,
        ...TileService.HERE_DEFAULT_OPTIONS,
        schema: "terrain.day",
        name: "here.terrain.day",
        base: "traffic",
        type: "flowtile",
      };
    }
    return null;
  }
}

