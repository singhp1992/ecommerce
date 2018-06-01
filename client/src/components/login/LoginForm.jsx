import React, { PureComponent } from 'react'


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
                    <label for="email"><b>Email:</b></label>
                    <input label='email' autoComplete="true"
                        type="email" placeholder="email" name="email" id="email" value={
                            this.state.email || ''
                        } onChange={this.handleChange} />
                </div>

                <div className="signupFormLabels">
                    <label for="password"><b>Password:</b></label>
                    <input label='password' autoComplete="true"
                        type="password" placeholder="password"name="password" id="password" value={
                            this.state.password || ''
                        } onChange={this.handleChange} />
                </div>

                <button type="submit" className="signupButton">Login</button>
            </form>
        )
    }
}
