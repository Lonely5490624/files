import React from 'react'
import ReactDOM from 'react-dom'
import bindAll from 'lodash.bindall'

import styles from './create-user-box.module.scss'
import ajax from '../../utils/ajax'

class CreateUserBox extends React.PureComponent{
    constructor() {
        super()
        this.state = {
            username: '',
            password: '123456',
            dep_id: 0,
            job_id: 0,
            job_number: '',
            phone_number: '',
            true_name: '',
            nick_name: '',
            ID_card: ''
        }
        bindAll(this, [
            'handleInputUsername',
            'handleInputPassword',
            'handleInputDepId',
            'handleInputJobId',
            'handleInputJobNumber',
            'handleInputPhoneNumber',
            'handleInputTrueName',
            'handleInputNickName',
            'handleInputIDCard',
            'handleCreateUser',
        ])
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
    handleInputDepId(e) {
        const select = e.target
        this.setState({
            dep_id: +select.options[select.selectedIndex].value
        })
    }
    handleInputJobId(e) {
        const select = e.target
        this.setState({
            job_id: +select.options[select.selectedIndex].value
        })
    }
    handleInputJobNumber(e) {
        this.setState({
            job_number: e.target.value
        })
    }
    handleInputPhoneNumber(e) {
        this.setState({
            phone_number: e.target.value
        })
    }
    handleInputTrueName(e) {
        this.setState({
            true_name: e.target.value
        })
    }
    handleInputNickName(e) {
        this.setState({
            nick_name: e.target.value
        })
    }
    handleInputIDCard(e) {
        this.setState({
            ID_card: e.target.value
        })
    }
    // 创建用户
    async handleCreateUser() {
        let params = {
        }
    }
    render() {
        const {
            jobItem,
            onClose
        } = this.props
        const dom = (
            <div className={styles.cover}>
                <div className={styles.box}>
                    <div className={styles.content}>
                        <div className={styles.formItem}>
                            <div className={styles.formItemLabel}>用户名</div>
                            <div className={styles.formItemInput}>
                                <input type="text" placeholder="请输入用户名" value={this.state.username} onChange={this.handleInputUsername}/>
                            </div>
                        </div>
                        <div className={styles.formItem}>
                            <div className={styles.formItemLabel}>密码</div>
                            <div className={styles.formItemInput}>
                                <input type="password" placeholder="请输入密码" value={this.state.password} onChange={this.handleInputPassword}/>
                            </div>
                        </div>
                        <div className={styles.formItem}>
                            <div className={styles.formItemLabel}>部门</div>
                            <div className={styles.formItemInput}>
                                <select onChange={this.handleInputDepId}>
                                    <option value="1">总部</option>
                                    <option value="2">技术部</option>
                                    <option value="3">总部</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.formItem}>
                            <div className={styles.formItemLabel}>岗位</div>
                            <div className={styles.formItemInput}>
                                <select onChange={this.handleInputJobId}>
                                    <option value="1">前端岗</option>
                                    <option value="2">后端岗</option>
                                    <option value="3">设计岗</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.formItem}>
                            <div className={styles.formItemLabel}>工号</div>
                            <div className={styles.formItemInput}>
                                <input type="text" placeholder="请输入工号" value={this.state.job_number} onChange={this.handleInputJobNumber}/>
                            </div>
                        </div>
                        <div className={styles.formItem}>
                            <div className={styles.formItemLabel}>电话号码</div>
                            <div className={styles.formItemInput}>
                                <input type="text" placeholder="请输入电话号码" maxLength="11" value={this.state.phone_number} onChange={this.handleInputPhoneNumber}/>
                            </div>
                        </div>
                        <div className={styles.formItem}>
                            <div className={styles.formItemLabel}>真实姓名</div>
                            <div className={styles.formItemInput}>
                                <input type="text" placeholder="请输入真实姓名" value={this.state.true_name} onChange={this.handleInputTrueName}/>
                            </div>
                        </div>
                        <div className={styles.formItem}>
                            <div className={styles.formItemLabel}>昵称</div>
                            <div className={styles.formItemInput}>
                                <input type="text" placeholder="请输入昵称" value={this.state.nick_name} onChange={this.handleInputNickName}/>
                            </div>
                        </div>
                        <div className={styles.formItem}>
                            <div className={styles.formItemLabel}>身份证号码</div>
                            <div className={styles.formItemInput}>
                                <input type="text" placeholder="请输入身份证号码" maxLength="18" value={this.state.ID_card} onChange={this.handleInputIDCard}/>
                            </div>
                        </div>
                        <button onClick={this.handleCreateUser}>创建</button>
                    </div>
                    <div className={styles.close} onClick={onClose}></div>
                </div>
            </div>
        )
        return ReactDOM.createPortal(
            dom,
            document.body
        )
    }
}

export default CreateUserBox