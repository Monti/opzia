export default function(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case "FETCHED_OFFER":
      let newState = { ...state };
      if (newState[payload.tokenAddress]) {
        newState[payload.tokenAddress][payload.index] = payload.offer;
      } else {
        newState[payload.tokenAddress] = {};
        newState[payload.tokenAddress][payload.index] = payload.offer;
      }

      return newState;
    default:
      return state;
  }
}
