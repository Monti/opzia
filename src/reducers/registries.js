export default function(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case "FETCHED_TOKEN_REGISTRY":
      console.log("SS");
      let newState = { ...state };
      newState[payload.tokenAddress] = payload.registry;
      return newState;
    default:
      return state;
  }
}
