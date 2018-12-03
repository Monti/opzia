export default function(state = { offers: [], locks: [] }, action) {
  const { type, payload } = action;
  let newState;
  switch (type) {
    case "FETCHED_USER_OFFER":
      newState = { ...state };

      newState["offers"].push(payload.offer);

      return newState;
    case "FETCHED_USER_LOCK":
      newState = { ...state };

      newState["locks"].push(payload.lock);

      return newState;
    default:
      return state;
  }
}
