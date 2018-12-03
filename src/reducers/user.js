export default function (state = {offers:[], locks:[]}, action) {
    const { type, payload } = action;
  
    switch (type) {
      case 'FETCHED_USER_OFFER':
        let newState = {...state};
        if(newState['offers'].length <= [payload.index]){
            newState['offers'].push(payload.offer);
        }
        else{
            newState['offers'][payload.index] = payload.offer;
        }
        
        return newState
      default:
        return state;
    }
  }
  