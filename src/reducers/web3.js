const initialState = {
  isLoading: true,
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'WEB3_INITIALIZED_PENDING':
      return {
        ...state,
      }
    case 'WEB3_INITIALIZED_FULFILLED':
      return {
        ...state,
        isLoading: false,
        web3: payload,
      }
    default:
      return state;
  }
}
