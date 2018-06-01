import React, { PureComponent } from 'react'
import { TextField } from 'material-ui'

export default class LoginForm extends PureComponent {
    state = {}

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.onSubmit(this.state)
    }

    handleChange = (event) => {
        const { name, value } = event.target

        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="signupForm">
                <div className="signupFormLabels">
                    <TextField label='email' autoComplete="true"
                        type="email" name="email" id="email" value={
                            this.state.email || ''
                        } onChange={this.handleChange} />
                </div>

                <div className="signupFormLabels">
                    <TextField label='wachtwoord' autoComplete="true"
                        type="password" name="password" id="password" value={
                            this.state.password || ''
                        } onChange={this.handleChange} />
                </div>

                <button type="submit" className="signupButton">Inloggen</button>
            </form>
        )
    }
}
