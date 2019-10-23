import { connect } from 'react-redux'
import Game from '../components/Game'
import { changeStep, toggleXIsNext, sortMoves, clickSquare } from '../actions'

const mapStateToProps = (state, ownProps) => ({
  p_width: state.gameSetting.width,
  p_height: state.gameSetting.height,
  p_history: state.history,
  p_step: state.step,
  p_xIsNext: state.xIsNext,
  p_isDescending: state.isDescending,
})

const mapDispatchToProps = {
  p_changeStep: changeStep,
  p_toggleXIsNext: toggleXIsNext,
  p_clickSquare: clickSquare,
  p_sortMoves: sortMoves
}

const GameStart = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)

export default GameStart
