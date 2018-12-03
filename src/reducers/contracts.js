export default function (state = {}, action) {
    const { type, payload } = action;
  
    switch (type) {
      case 'LOAD_CONTRACTS':
        return {
          ...state,
          contractsLoaded: true,
          ...payload,
        }
      default:
        return state;
    }
  }
  