import React ,{ Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUsername } from '../../ducks/reducer.js';
import './Auth.css'
 
class Auth extends Component {
    constructor() {
        super()
        
        this.state = {
            username: '',
            password: '',
        }
    }

    handleInput = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value});
    }

    login = () => {
        const { username, password } = this.state;
        axios.post('/auth/login', { username, password })
            .then(res => {
                this.setState({username: '', password: ''});
                this.props.updateUsername(res.data.username)
                this.props.history.push('/dashboard');
            }).catch(error => {
                console.log(`Auth.login ${error}`);
            })
    }

    register = () => {
        const { username, password } = this.state;
        axios.post('/auth/register', { username, password })
            .then(res => {
                this.setState({username: '', password: ''});
                this.props.updateUsername(res.data.username)
                this.props.history.push('/dashboard');
            }).catch(error => {
                console.log(`Auth.register ${error}`);
            })
    }
    
    render() {
        return (
            <div className='Auth'>
                <img className='Auth-img' src='http://freevector.co/wp-content/uploads/2011/12/12902-robot-face1-200x200.png' />
                <h1 className='Auth-title'>Helo</h1>
                <div>
                    <p className="label">Username:</p>
                    <input 
                        className='Auth-input'
                        type="text"
                        name='username'
                        onChange={this.handleInput}
                        />
                </div>
                <div>
                    <p className="label">Password:</p>
                    <input 
                        className='Auth-input'
                        type="text"
                        name='password'
                        onChange={this.handleInput}
                        />
                </div>
                <div>
                    <button className='Auth-button' onClick={this.login}>Login</button>
                    <button className='Auth-button' onClick={this.register}>Register</button>
                </div>
            </div>
        )
    }
}

export default connect(null, { updateUsername })(Auth);