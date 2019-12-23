import React from 'react'
import ajax from '../utils/ajax'

export default class Login extends React.Component{
    constructor() {
        super()
        this.state = {
            username: '',
            password: ''
        }
        this.handleInputUsername = this.handleInputUsername.bind(this)
        this.handleInputPassword = this.handleInputPassword.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    handleInputUsername(e) {
        this.setState({
            username: e.target.value
        })
    }
    handleInputPassword(e) {
        this.setState({
            password: e.target.value
        })
    }
    handleLogin() {
        let data = {
            username: this.state.username,
            password: this.state.password
        }
        ajax.post('users/login', data)
            .then(res => {
                if (res.code === 0) {
                    localStorage.setItem('token', res.data.token)
                    this.props.history.replace('/home')
                }
            })
    }
    render() {
        return (
            <div>
                <input type="text" placeholder="用户名" value={this.state.username} onChange={this.handleInputUsername}/>
                <input type="password" placeholder="密码" value={this.state.password} onChange={this.handleInputPassword}/>
                <button onClick={this.handleLogin}>登录</button>
            </div>
        )
    }
}