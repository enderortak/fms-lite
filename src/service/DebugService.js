import React from "react";
import { connect } from "react-redux";
import store from "./StoreService";

export const DebugPanel =
connect(
  state => ({ params: state.debug.params, isVisible: state.debug.isVisible }),
  () => ({}),
)(({ isVisible, params }) => ((isVisible) ?
  (
    <div id="debug-panel">
      {
        params.map(param => <div><span>{param.text}</span><span>{param.value}</span></div>)
            }
    </div>
  ) : null));
const addDebugParam = param => ({ type: "ADD_DEBUG_PARAM", param });
const setVisibility = isVisible => ({ type: "SET_VISIBILITY", isVisible });

export const debugReducer = (actualState = { params: [], isVisible: false }, action) => {
  if (action.type === "ADD_DEBUG_PARAM") {
    if (actualState.params.filter(i => i.text === action.param.text).length > 0) {
      return ({ ...actualState, params: actualState.params.map(i => (i.text === action.param.text ? action.param : i)) });
    }
    return ({ ...actualState, params: [...actualState.params, action.param] });
  } else if (action.type === "SET_VISIBILITY") return ({ ...actualState, isVisible: action.isVisible });
  return actualState;
};

export const infoLog = text =>
  console.log(
    "%c%s",
    "background: #0077DD !important; color: #FFFFFF; font-size: 1.3em;",
    `info - ${text}`,
    (new Date()).toUTCString(),
  );
export class Debugger {
  constructor() {
    this.show();
  }
    display = (text, value) => store.dispatch(addDebugParam({ text, value }));
    show = () => store.dispatch(setVisibility(true));
    hide = () => store.dispatch(setVisibility(false));
}
