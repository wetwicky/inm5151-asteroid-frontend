import React from 'react'
import {connect} from 'react-redux'
import {connect as connectAction, setName} from '../actions'

let Login = ({name, onSubmitDispatch, setNameDispatch}) => {
    let input

    return (
        <div>
            <h1>Asteroid.io</h1>
            <form onSubmit={e => {
                e.preventDefault()

                if (!input.value.trim()) {
                    return
                }

                onSubmitDispatch()
            }}>
                <input
                    ref={node => {
                        input = node
                    }}
                    onChange={e => {
                        setNameDispatch(e.target.value)
                    }}
                    autoFocus
                    value={name}/>
                <button type="submit">
                    Play!
                </button>
            </form>
        </div>
    )
}

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

Login = connect(mapStateToProps, mapDispatchToProps)(Login)

export default Login
