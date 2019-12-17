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
            job_number: '',
            phone_number: '',
            true_name: '',
            nick_name: '',
            ID_card: ''
        }
        bindAll(this, [
            'handleInputUsername',
            'handleInputPassword',
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
        const params = {
            username: this.state.username,
            password: this.state.password,
            dep_id: this.props.depItem.dep_id,
            job_id: this.props.jobItem.job_id,
            job_number: this.state.job_number,
            phone_number: this.state.phone_number,
            true_name: this.state.true_name,
            nick_name: this.state.nick_name,
            ID_card: this.state.ID_card
        }
        const result = await ajax.post('users/regUserStaff', params)
        if (result.code === 0) {
            this.props.onDone && this.props.onDone()
        }
    }
    render() {
        const {
            depItem,
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
                                <input type="text" value={depItem.dep_name} readOnly/>
                            </div>
                        </div>
                        <div className={styles.formItem}>
                            <div className={styles.formItemLabel}>岗位</div>
                            <div className={styles.formItemInput}>
                                <input type="text" value={jobItem.job_name} readOnly/>
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