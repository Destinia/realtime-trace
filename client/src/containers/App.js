import { compose } from 'redux';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import * as BoardActions from '../actions/board';
import * as NewsTimeActions from '../actions/newsTime';

const mapStateToProps = (state) => ({
  board: state.board,
  newsTime: state.newsTime,
});

export default compose(
  connect(mapStateToProps, { ...BoardActions, ...NewsTimeActions }),
)(Layout);
