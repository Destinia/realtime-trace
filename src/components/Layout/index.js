import React, { PropTypes, Component } from 'react';

import Header from './Header';

import './index.css';


class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRegister: false,
      baba: localStorage.getItem('baba'),
    };
  }

  handleFirstVisit = () => {
    localStorage.setItem('baba', true);
    this.setState({ baba: localStorage.getItem('baba') });
  }

  handleRegisterClose = () => {
    this.setState({ showRegister: false });
  }

  handleRegisterOpen = () => {
    this.setState({ showRegister: true });
  }

  render() {
    return (
      <div className="layout">
        <Header
          handleRegisterOpen={this.handleRegisterOpen}
          handleFirstVisit={this.handleFirstVisit}
          baba={this.state.baba}
        />
        {/* this will render the child routes */}
        {this.props.children}
      </div>
    );
  }
}


Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
