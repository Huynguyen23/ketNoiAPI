var tmpArr = Array(20);
for (let i = 0; i < 20; i++) {
  tmpArr[i] = Array(20).fill(null);
}
var defaultState = [{
  squares: tmpArr,
  location: null,
}]

const history = (state = defaultState, action) => {
  switch (action.type) {
    case 'CLICK_SQUARE':
      return action.history.slice(0);
    default:
      return state
  }
}

export default history
