import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import appReducer from "./../modules/App/App.Reducer";
import mapReducer from "./../modules/Map/Map.Reducer";
import fleetConfigReducer from "./../modules/FleetConfig/FleetConfig.Reducer";

const reducerCollection = combineReducers({ app: appReducer, map: mapReducer, fleetConfig: fleetConfigReducer });

const devToolsEnhancer = compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f);

const store = createStore(
  reducerCollection,
  devToolsEnhancer,
);

export default store;
