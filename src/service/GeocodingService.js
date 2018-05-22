import ApiService from "./ApiService";


export default class GeocodingService {
  constructor() {
    // http://photon.komoot.de/api/?q=kad%C4%B1k%C3%B6y&lat=40.975243&lon=29.233703&limit=5
    this.api = new ApiService("https://nominatim.openstreetmap.org");
    this.searchApi = new ApiService("http://photon.komoot.de");
  }
  reverse(lat, long) {
    return this.api.fetch(
      "reverse",
      "GET",
      {
        format: "json",
        lat,
        lon: long,
        zoom: 18,
        addressdetails: 1,
      },
    );
  }
  search(q) {
    return this.searchApi.fetch("api", "GET", {
      q,
      lat: 40.975243,
      lon: 29.233703,
      limit: 5,
    });
  }
}
