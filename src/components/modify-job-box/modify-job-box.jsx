import React from 'react'
import ReactDOM from 'react-dom'
import bindAll from 'lodash.bindall'

import styles from './modify-job-box.module.scss'
import ajax from '../../utils/ajax'

class ModifyJobBox extends React.PureComponent{
    constructor() {
        super()
        this.state = {
            new_name: '',
            isManager: false,
            depSet: false,
            isCreateUser: false,
            isModifyUserInfo: false,
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
            'handleInputManager',
            'handleInputDepSet',
            'handleInputCreateUser',
            'handleInputModifyUserInfo',
            'handleInputCreateDir',
            'handleInputUploadFile',
            'handleInputDownloadFile',
            'handleInputDeleteFile',
            'handleInputDeleteDir',
            'handleInputRenameFile',
            'handleInputRenameDir',
            'handleModifyJob',
            'getJobInfo'
        ])
    }
    handleInputChange(e) {
        this.setState({
            new_name: e.target.value
        })
    }
    // 是否管理者
    handleInputManager(e) {
        this.setState({
            isManager: e.target.checked
        })
    }
    // 能否设置部门
    handleInputDepSet(e) {
        this.setState({
            depSet: e.target.checked
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
    async handleModifyJob() {
        let params = {
            job_id: this.props.jobItem.job_id,
            new_name: this.state.new_name,
            is_manager: this.state.isManager,
            dep_set: this.state.depSet,
            create_user: this.state.isCreateUser,
            modify_userinfo: this.state.isModifyUserInfo,
            create_dir: this.state.isCreateDir,
            upload_file: this.state.isUploadFile,
            download_file: this.state.isDownloadFile,
            delete_file: this.state.isDeleteFile,
            delete_dir: this.state.isDeleteDir,
            rename_file: this.state.isRenameFile,
            rename_dir: this.state.isRenameDir
        }
        let result = await ajax.post('users/updateJob', params)
        if (result.code === 0) {
            this.props.onClose()
            this.props.onDone && this.props.onDone()
        }
    }
    async getJobInfo() {
        const result = await ajax.get(`users/getJobInfo?job_id=${this.props.jobItem.job_id}`)
        if (result.code === 0) {
            this.setState({
                new_name: result.data.job_name,
                isManager: result.data.dep_set,
                depSet: result.data.is_manager,
                isCreateUser: result.data.create_user,
                isModifyUserInfo: result.data.modify_userinfo,
                isCreateDir: result.data.create_dir,
                isUploadFile: result.data.upload_file,
                isDownloadFile: result.data.download_file,
                isDeleteFile: result.data.delete_file,
                isDeleteDir: result.data.delete_dir,
                isRenameFile: result.data.rename_file,
                isRenameDir: result.data.rename_dir
            })
        }
    }
    componentDidMount() {
        this.getJobInfo()
    }
    render() {
        const {
            jobItem,
            onClose
        } = this.props
        const dom = (
            <div className={styles.cover}>
                <div className={styles.box}>
                    <input type="text" value={this.state.new_name} onChange={this.handleInputChange} placeholder="请输入岗位名称" />
                    <label><input type="checkbox" checked={this.state.isManager} onChange={this.handleInputManager}/>管理者</label>
                    <label><input type="checkbox" checked={this.state.depSet} onChange={this.handleInputDepSet}/>设置部门</label>
                    <label><input type="checkbox" checked={this.state.isCreateUser} onChange={this.handleInputCreateUser}/>创建用户</label>
                    <label><input type="checkbox" checked={this.state.isModifyUserInfo} onChange={this.handleInputModifyUserInfo}/>修改用户信息</label>
                    <label><input type="checkbox" checked={this.state.isCreateDir} onChange={this.handleInputCreateDir}/>创建目录</label>
                    <label><input type="checkbox" checked={this.state.isUploadFile} onChange={this.handleInputUploadFile}/>上传文件</label>
                    <label><input type="checkbox" checked={this.state.isDownloadFile} onChange={this.handleInputDownloadFile}/>下载文件</label>
                    <label><input type="checkbox" checked={this.state.isDeleteFile} onChange={this.handleInputDeleteFile}/>删除文件</label>
                    <label><input type="checkbox" checked={this.state.isDeleteDir} onChange={this.handleInputDeleteDir}/>删除目录</label>
                    <label><input type="checkbox" checked={this.state.isRenameFile} onChange={this.handleInputRenameFile}/>重命名文件</label>
                    <label><input type="checkbox" checked={this.state.isRenameDir} onChange={this.handleInputRenameDir}/>重命名目录</label>
                    <button onClick={this.handleModifyJob}>修改</button>
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

export default ModifyJobBox