import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { signup } from '../../actions/users'
import SignupForm from './SignupForm'
import { Redirect } from 'react-router-dom'

class SignupPage extends PureComponent {
    handleSubmit = (data) => {
        this.props.postSignup(data)
    }

    render() {
        if (this.props.signup.success) return (
            <Redirect to="/login" />
        )

        return (
            <div className='center'>
                <h1 className="roosTitle">Welkom bij Roos</h1>

                <SignupForm onSubmit={this.handleSubmit} />

                <p style={{ color: 'red' }}>{this.props.signup.error}</p>
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        signup: state.signup
    }
}

export default connect(mapStateToProps, { postSignup: signup })(SignupPage)