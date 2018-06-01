import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { login } from '../../actions/users'
import LoginForm from './LoginForm'
import { Redirect } from 'react-router-dom'

class LoginPage extends PureComponent {
    handleSubmit = (data) => {
        this.props.login(data.email, data.password)
    }

    render() {
        if (this.props.currentUser && this.props.currentUser.user) {
            return (
                <Redirect to="/products" />
            )
        }

        return (
            <div className='center'>
                <h1 className='inloggen'>Login</h1>

                <LoginForm onSubmit={this.handleSubmit} />

                {this.props.error && <span style={{ color: 'red' }}>{this.props.error}</span>}
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        currentUser: state.currentUser,
        error: state.login.error
    }
}

export default connect(mapStateToProps, { login })(LoginPage)
