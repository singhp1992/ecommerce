import React, { PureComponent } from 'react'


export default class SignupForm extends PureComponent {
    state = {}

    handleSubmit = (e) => {
        e.preventDefault()
        // console.log(this.state)
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
                    <h1 label='voornaam'
                        type="firstName" name="firstName" id="firstName" value={
                            this.state.firstName || ''
                        } onChange={this.handleChange} />
                </div>
                <div className="signupFormLabels">
                    <h1 label='achternaam'
                        type="lastName" name="lastName" id="lastName" value={
                            this.state.lastName || ''
                        } onChange={this.handleChange} />
                </div>
                <div className="signupFormLabels">
                    <h1 label='email'
                        type="email" name="email" id="email" value={
                            this.state.email || ''
                        } onChange={this.handleChange} />
                </div>

                <div className="signupFormLabels">
                    <h1 label='wachtwoord'
                        type="password" name="password" id="password" value={
                            this.state.password || ''
                        } onChange={this.handleChange} />
                </div>

                <div className="signupFormLabels">
                    <h1 label='herhaal wachtwoord'
                        type="password" name="confirmPassword" id="confirmPassword" value={
                            this.state.confirmPassword || ''
                        } onChange={this.handleChange} />
                </div>

                {
                    this.state.password &&
                    this.state.confirmPassword &&
                    this.state.password !== this.state.confirmPassword &&
                    <p style={{ color: 'red' }}>De wachtwoorden komen niet overeen!</p>
                }

                <button type="submit" className="signupButton">Aanmelden</button>
            </form>
        )
    }
}