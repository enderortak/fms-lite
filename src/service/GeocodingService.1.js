// import ymaps from "ymaps";
// import ApiService from "./ApiService";


// export default class GeocodingService {
//   constructor() {
//     ymaps.load("https://api-maps.yandex.ru/2.1/?lang=tr_TR")
//       .then((api) => { this.api = api; });
//     // this.api = new ApiService("https://nominatim.openstreetmap.org");
//     // this.osmAutoCompleteApi = new ApiService("http://photon.komoot.de");
//   }
//   reverse(param1, param2) {
//     let lat = null;
//     let long = null;
//     if (typeof param1 === "object") ({ lat, long } = param1);
//     else ({ lat, long } = { param1, param2 });
//     if (this.api) {
//       console.log("Reverse geocoding ", lat, ", ", long, "via yandex...");
//       return this.api.geocode([lat, long], { json: true, results: 1 })
//         .then((result) => {
//           console.log("Reverse geocoding complete! Here is the result: ", result);
//           return result;
//         })
//         .then(result => ({
//           street: result.GeoObjectCollection.featureMember[0].GeoObject.name,
//           district: result.GeoObjectCollection.featureMember[0].GeoObject.description,
//         }));
//     }
//     const asd = this.reverse;
//     setTimeout(() => asd(param1, param2), 200);
//     return console.log("map services unavaliable, waiting 200ms");
//   }
//   autocomplete(query, provider) {
//     if (provider === "osm") {
//       return this.osmAutoCompleteApi.fetch("api", "GET", {
//         q: query,
//         lat: 40.975243,
//         lon: 29.233703,
//         limit: 5,
//       }).then(result =>
//          (result.features ? result.features.map(i => ({ title: i.properties.name, description: "desc here" })) : []));
//     } else if (provider === "yandex") {
//       return this.api.suggest(query)
//         .then(result =>
//           result.map(i => ({ name: i.displayName.split(",")[0], meta: i.value })));
//     } else if (provider === "here") {
//       const apiService = new ApiService("https://autocomplete.geocoder.api.here.com/6.2");
//       const getName = suggestion =>
//            suggestion.address[Object.keys(suggestion.address).filter(i => suggestion.address[i].includes("<b>"))[0]];
//       return apiService.fetch("suggest.json", "GET", {
//         app_id: "X4lVXpDwqP4dPmS54lsX",
//         app_code: "LZM8c_OBu09khbAkko5mrA",
//         query,
//         beginHighlight: "<b>",
//         endHighlight: "<b>",
//       }).then(result =>
//         result.suggestions.map(i => (
//           {
//             name: getName(i),
//             meta: (new Array()).push(i.address.county || undefined).push(i.address.state).push(i.address.country)
//               .join(", "),
//             locationId: i.locationId,
//           }
//         )));
//     }
//     return [];
//   }
//   geocode(query) {
//     console.log("Geocoding ", query, "...");
//     return this.api.geocode(query, { json: true, results: 1 })
//       .then((result) => {
//         console.log("Geocoding complete! Here is the result: ", result);
//         return result;
//       })
//       .then(result => ({
//         marker: result.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(" ").map(i => parseFloat(i)),
//         bounds: {
//           corner1: result.GeoObjectCollection.featureMember[0].GeoObject
//             .boundedBy.Envelope.lowerCorner.split(" ").map(i => parseFloat(i)).reverse(),
//           corner2: result.GeoObjectCollection.featureMember[0].GeoObject
//             .boundedBy.Envelope.upperCorner.split(" ").map(i => parseFloat(i)).reverse(),
//         },
//       }));
//   }
// }
