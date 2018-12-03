export default function(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case "FETCHED_TOKEN_EXCHANGE":
      let newState = { ...state };
      newState[payload.tokenAddress] = payload.exchange
      return newState;
    default:
      return state;
  }
}
