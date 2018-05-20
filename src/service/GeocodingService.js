import ApiService from "./ApiService";


export default class GeocodingService {
  constructor() {
    this.api = new ApiService("https://nominatim.openstreetmap.org/reverse");
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
}
