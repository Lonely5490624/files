import React from 'react'
import ReactDOM from 'react-dom'
import bindAll from 'lodash.bindall'

import styles from './create-job-box.module.scss'
import ajax from '../../utils/ajax'

class CreateJobBox extends React.PureComponent{
    constructor() {
        super()
        this.state = {
            job_name: '',
            isCreateUser: false,
            isModifyUserInfo: false,
            isModifyPassword: false,
            isCreateDir: false,
            isUploadFile: false,
            isDownloadFile: false,
            isDeleteFile: false,
            isDeleteDir: false,
            isRenameFile: false,
            isRenameDir: false
        }

        bindAll(this, [
            'handleInputChange',
            'handleInputCreateUser',
            'handleInputModifyUserInfo',
            'handleInputModifyPassword',
            'handleInputCreateDir',
            'handleInputUploadFile',
            'handleInputDownloadFile',
            'handleInputDeleteFile',
            'handleInputDeleteDir',
            'handleInputRenameFile',
            'handleInputRenameDir',
            'handleCreateJob'
        ])
    }
    handleInputChange(e) {
        this.setState({
            job_name: e.target.value
        })
    }
    // 能否创建用户
    handleInputCreateUser(e) {
        this.setState({
            isCreateUser: e.target.checked
        })
    }
    // 能否修改用户信息
    handleInputModifyUserInfo(e) {
        this.setState({
            isModifyUserInfo: e.target.checked
        })
    }
    // 能否修改用户密码
    handleInputModifyPassword(e) {
        this.setState({
            isModifyPassword: e.target.checked
        })
    }
    // 能否创建目录
    handleInputCreateDir(e) {
        this.setState({
            isCreateDir: e.target.checked
        })
    }
    // 能否上传文件
    handleInputUploadFile(e) {
        this.setState({
            isUploadFile: e.target.checked
        })
    }
    // 能否下载文件
    handleInputDownloadFile(e) {
        this.setState({
            isDownloadFile: e.target.checked
        })
    }
    // 能否删除文件
    handleInputDeleteFile(e) {
        this.setState({
            isDeleteFile: e.target.checked
        })
    }
    // 能否删除目录
    handleInputDeleteDir(e) {
        this.setState({
            isDeleteDir: e.target.checked
        })
    }
    // 能否重命名文件
    handleInputRenameFile(e) {
        this.setState({
            isRenameFile: e.target.checked
        })
    }
    // 能否重命名目录
    handleInputRenameDir(e) {
        this.setState({
            isRenameDir: e.target.checked
        })
    }
    // 创建岗位
    async handleCreateJob() {
        let params = {
            dep_id: this.props.dep.dep_id,
            job_name: this.state.job_name,
            create_user: this.state.isCreateUser,
            modify_userinfo: this.state.isModifyUserInfo,
            modify_password: this.state.isModifyPassword,
            create_dir: this.state.isCreateDir,
            upload_file: this.state.isUploadFile,
            download_file: this.state.isDownloadFile,
            delete_file: this.state.isDeleteFile,
            delete_dir: this.state.isDeleteDir,
            rename_file: this.state.isRenameFile,
            rename_dir: this.state.isRenameDir
        }
        let result = await ajax.post('users/addJob', params)
        if (result.code === 0) {
            this.props.onClose()
            this.props.onDone && this.props.onDone()
        }
    }
    render() {
        const {
            dep,
            onClose
        } = this.props
        const dom = (
            <div className={styles.cover}>
                <div className={styles.box}>
                    <p className={styles.p1}>上级部门：<span>{dep.dep_name}</span></p>
                    <input type="text" value={this.state.job_name} onChange={this.handleInputChange} placeholder="请输入岗位名称" />
                    <label><input type="checkbox" checked={this.state.isCreateUser} onChange={this.handleInputCreateUser}/>创建用户</label>
                    <label><input type="checkbox" checked={this.state.isModifyUserInfo} onChange={this.handleInputModifyUserInfo}/>修改用户信息</label>
                    <label><input type="checkbox" checked={this.state.isModifyPassword} onChange={this.handleInputModifyPassword}/>修改用户密码</label>
                    <label><input type="checkbox" checked={this.state.isCreateDir} onChange={this.handleInputCreateDir}/>创建目录</label>
                    <label><input type="checkbox" checked={this.state.isUploadFile} onChange={this.handleInputUploadFile}/>上传文件</label>
                    <label><input type="checkbox" checked={this.state.isDownloadFile} onChange={this.handleInputDownloadFile}/>下载文件</label>
                    <label><input type="checkbox" checked={this.state.isDeleteFile} onChange={this.handleInputDeleteFile}/>删除文件</label>
                    <label><input type="checkbox" checked={this.state.isDeleteDir} onChange={this.handleInputDeleteDir}/>删除目录</label>
                    <label><input type="checkbox" checked={this.state.isRenameFile} onChange={this.handleInputRenameFile}/>重命名文件</label>
                    <label><input type="checkbox" checked={this.state.isRenameDir} onChange={this.handleInputRenameDir}/>重命名目录</label>
                    <button onClick={this.handleCreateJob}>新建</button>
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

export default CreateJobBox