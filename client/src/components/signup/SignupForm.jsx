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
                    <label for="firstName"><b>First Name:</b></label>
                    <input label='firstName'
                        type="firstName" placeholder ='first name' name="firstName" id="firstName" value={
                            this.state.firstName || ''
                        } onChange={this.handleChange} />
                </div>
                <div className="signupFormLabels">
                    <label for="lastName"><b>Last Name:</b></label>
                    <input label='lastName'
                        type="lastName" placeholder='last name' name="lastName" id="lastName" value={
                            this.state.lastName || ''
                        } onChange={this.handleChange} />
                </div>
                <div className="signupFormLabels">
                    <label for="email"><b>Email:</b></label>
                    <input label='email'
                        type="email" placeholder='email' name="email" id="email" value={
                            this.state.email || ''
                        } onChange={this.handleChange} />
                </div>

                <div className="signupFormLabels">
                    <label for="password"><b>Password:</b></label>
                    <input label='password'
                        type="password" placeholder='password' name="password" id="password" value={
                            this.state.password || ''
                        } onChange={this.handleChange} />
                </div>

                <div className="signupFormLabels">
                    <label for="password"><b>Confirm Password:</b></label>
                    <input label='confirmPassword'
                        type="password" placeholder='one more time!' name="confirmPassword" id="confirmPassword" value={
                            this.state.confirmPassword || ''
                        } onChange={this.handleChange} />
                </div>

                {
                    this.state.password &&
                    this.state.confirmPassword &&
                    this.state.password !== this.state.confirmPassword &&
                    <p style={{ color: 'red' }}>The passwords don't match!</p>
                }

                <button type="submit" className="signupButton">Sign Up</button>
            </form>
        )
    }
}