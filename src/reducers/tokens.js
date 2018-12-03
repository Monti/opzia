export default function (state = [], action) {
    const { type, payload } = action;
  
    switch (type) {
      case 'FETCHED_TOKEN':
        let newState = [...state];
        newState.push(payload);
        
        return newState
      default:
        return state;
    }
  }
  