import { handledFetch } from "./ApiService";
import LocalizationService from "./LocalizationService";

const hereCredentials = {
  app_id: "X4lVXpDwqP4dPmS54lsX",
  app_code: "LZM8c_OBu09khbAkko5mrA",
};
const apiVersion = "6.2";
const outputFormat = "json";
const apiUrls = {
  geocoder: `https://geocoder.api.here.com/${apiVersion}/geocode.${outputFormat}`,
  reverseGeocoder: `https://reverse.geocoder.api.here.com/${apiVersion}/reversegeocode.${outputFormat}`,
  autocompleter: `https://autocomplete.geocoder.api.here.com/${apiVersion}/suggest.${outputFormat}`,
};


const localizer = new LocalizationService("geocoding");
export default class GeocodingService {
  autocomplete(query) {
    const highlightIdentifier = "<b>";
    const requestOptions = {
      ...hereCredentials,
      query,
      beginHighlight: highlightIdentifier,
      endHighlight: highlightIdentifier,
    };
    const getTitle = (suggestion) => {
      // get first suggestion.address property with the highlight identifier
      const highlightedProp = Object.keys(suggestion.address)
        .filter(i => suggestion.address[i].includes(highlightIdentifier))[0];
      // return the value of the highlighted property
      return suggestion.address[highlightedProp];
    };
    const getSubtitle = suggestion =>
      [suggestion.address.county, suggestion.address.state, suggestion.address.country]
        .filter(i => i).join(", ");
    return handledFetch(apiUrls.autocompleter, { method: "GET", body: requestOptions }, "Autocomplete")
      .then((result) => {
        if (result.suggestions) {
          return result.suggestions.map(i => (
            {
              title: getTitle(i).replace(new RegExp(highlightIdentifier, "g"), ""),
              highlightedTitle: getTitle(i),
              subtitle: getSubtitle(i),
              locationId: i.locationId,
            }
          ));
        }
        return [];
      });
  }
  reverseGeocode(location) {
    const { lat, long } = location;
    const proximityRadius = 20; // meters
    const requestOptions = {
      ...hereCredentials,
      prox: `${lat},${long},${proximityRadius}`,
      mode: "retrieveAll",
      maxresults: 5,
      gen: 9,
    };
    return handledFetch(apiUrls.reverseGeocoder, { method: "GET", body: requestOptions }, "Reverse geocoding")
      .then((result) => {
        const r = result.Response.View[0].Result;
        const districtLevel = r.filter(i => i.MatchLevel === "district")[0];
        const streetLevel = r.filter(i => i.MatchLevel === "street")[0];
        const landmark = r.filter(i => i.MatchLevel === "landmark")[0];
        const address = (streetLevel || districtLevel).Location.Address;
        const getCountry = ad => (
          ad.AdditionalData.filter(i => i.key === "CountryName")[0] ?
            ad.AdditionalData.filter(i => i.key === "CountryName")[0].value
            : undefined
        );
        const level0 = [
          address.County,
          address.City,
          getCountry(address),
        ].filter(i => i).join(", ");
        const level1 = [
          address.Street,
          address.PostalCode,
          address.District,
        ].filter(i => i).join(", ");
        const level2 = !landmark ? undefined :
          localizer.string("near").replace("{0}", landmark.Location.Name);
        return ({ level0, level1, level2 });
      });
  }
  geocode(locationId) {
    const requestOptions = {
      ...hereCredentials,
      locationid: locationId,
      gen: 9,
      jsonattributes: 1,
    };
    return handledFetch(apiUrls.geocoder, { method: "GET", body: requestOptions }, "Geocoding")
      .then((result) => {
        const r = result.response.view[0].result[0].location;
        return ({
          location: r.displayPosition,
          mapView: r.mapView,
        });
      });
  }
}
