export default function (state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case 'GET_ACCOUNTS_FULFILLED':
      return {
        ...state,
        accountChanged: true,
        accounts: payload,
      }
    default:
      return state;
  }
}
