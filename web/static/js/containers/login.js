import React from 'react'
import { connect } from 'react-redux'
import { connect as connectAction, setName } from '../actions'
import { Login as LoginComponent } from '../components/login'

const mapStateToProps = (state, ownProps) => ({
    name: state.game.name
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmitDispatch: () => {
        dispatch(connectAction())
    },
    setNameDispatch: (name) => {
        dispatch(setName(name))
    }
})

Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent)

export default Login
