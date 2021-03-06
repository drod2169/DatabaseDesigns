import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Header from './header';
import { login } from '../actions/auth';
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            emailInput: '',
            passwordInput:''
        }
    }

    handleChangeText = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    handleKeyPress = (e) => {
        if(e.key === 'Enter')
            this.handleSubmit();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.token && this.props !== nextProps) {
            window.localStorage.setItem('jwt', nextProps.token); 
            this.context.router.history.push('/dashboard')
        }
    }

    handleSubmit = () => {
        this.props.login(this.state.emailInput, this.state.passwordInput)
    }

    render() {
        const { emailInput, passwordInput, submit, wrapper } = styles
        return(
            <div className='input-container' style={wrapper}>
                <Header />
                <div className='userinput' style={emailInput}>
                    <TextField
                        id="emailInput"
                        label="Employee Email"
                        value={this.state.emailInput}
                        onChange={this.handleChangeText}
                        margin="normal"
                    />
                </div>
                <div className='password-container' style={passwordInput}>
                    <TextField
                        id="passwordInput"
                        label="Password"
                        type="password"
                        value={this.state.passwordInput}
                        onChange={this.handleChangeText}
                        onKeyPress={this.handleKeyPress}
                        margin="normal"
                    />
                </div>
                <div className='submitbutton' style={submit}>
                    <Button color="contrast" onClick={this.handleSubmit}>Submit</Button>
                </div>
            </div>   
        )
    }
}

const styles = {
    wrapper: {
        alignItems: 'center',
        display: 'flex',
        flexFlow:'column'
    },
    emailInput: {
        background: 'white',
        color: 'black'
    },
    passwordInput: {
        background:'white',
        color:'black'
    },
    submit: { color: 'black' }
}

Login.contextTypes = {
    router: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        employees: state.employees,
        items: state.items
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ login }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)