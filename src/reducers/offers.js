export default function (state = {}, action) {
    const { type, payload } = action;
  
    switch (type) {
      case 'FETCHED_OFFER':
        let newState = {...state};
        newState[payload.index] = payload.offer;
        
        return newState
      default:
        return state;
    }
  }
  