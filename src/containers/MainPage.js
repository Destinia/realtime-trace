import { compose } from 'redux';
import { connect } from 'react-redux';
import Main from '../components/Main';
import * as HotNewsActions from '../actions/hotNews';
import * as CommentsActions from '../actions/comments';


const mapStateToProps = (state) => ({
  hotNews: state.hotNews,
  board: state.board,
  comments: state.comments,
});


export default compose(
  connect(mapStateToProps, { ...HotNewsActions, ...CommentsActions })
)(Main);
