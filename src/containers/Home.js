import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/header'
import * as Actions from '../actions'
import * as AuthActions from '../actions/auth'

class Home extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    const { actions,authActions,auth } = this.props
    actions.getIndexImage()
    if(auth.token && !auth.user){
      authActions.getUserInfo(auth.token)
    }
  }

  render() {
    const { styleMode,actions,children,auth,authActions } = this.props
    return (
      <div className={styleMode}>
        <Header styleMode={styleMode} auth={auth} logout={authActions.logout} changeStyleMode={actions.changeStyleMode} />
        {children}
      </div>
    )
  }
}

Home.propTypes = {
  styleMode: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  children: PropTypes.node,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    styleMode: state.styleMode,
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
    authActions: bindActionCreators(AuthActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)