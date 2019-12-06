import React from 'react'
import bindAll from 'lodash.bindall'
import ajax from '../utils/ajax'
import { connect } from 'react-redux'

import DepListComponent from '../components/dep-list/dep-list'

class Job extends React.PureComponent{
    constructor(props) {
        super(props)
        this.state = {
            depList: null,
            job_name: '',
            createUser: false,
            modifyUserinfo: false,
            modifyPassword: false,
            createDir: false,
            uploadFile: false,
            downloadFile: false,
            deleteFile: false,
            deleteDir: false,
            renameFile: false,
            renameDir: false
        }
        bindAll(this, [
            'getDepList',
            'addJob',
            'handleDepItemClick',
            'handleInputChange',
            'handleCheckCreateUser',
            'handleCheckModifyUserinfo',
            'handleCheckModifyPassword',
            'handleCheckCreateDir',
            'handleCheckUploadFile',
            'handleCheckDownloadFile',
            'handleCheckDeleteFile',
            'handleCheckDeleteDir',
            'handleCheckRenameFile',
            'handleCheckRenameDir'
        ])
    }
    async getDepList() {
        let result = await ajax.get('users/getDepartment')
        if (result.code === 0) {
            this.setState({
                depList: result.data
            })
        }
    }
    async addJob() {
        let params = {
            dep_id: this.props.currentDepId,
            job_name: this.state.job_name,
            create_user: this.state.createUser,
            modify_userinfo: this.state.modifyUserinfo,
            modify_password: this.state.modifyPassword,
            create_dir: this.state.createDir,
            upload_file: this.state.uploadFile,
            download_file: this.state.downloadFile,
            delete_file: this.state.deleteFile,
            delete_dir: this.state.deleteDir,
            rename_file: this.state.renameFile,
            rename_dir: this.state.renameDir
        }
        let result = await ajax.post('users/addJob', params)
        if (result === 0) {

        }
    }
    handleDepItemClick(id) {
        this.props.set_current_dep(id)
    }
    handleInputChange(e) {
        this.setState({
            job_name: e.target.value
        })
    }
    handleCheckCreateUser(e) {
        this.setState({
            createUser: e.target.checked
        })
    }
    handleCheckModifyUserinfo(e) {
        this.setState({
            modifyUserinfo: e.target.checked
        })
    }
    handleCheckModifyPassword(e) {
        this.setState({
            modifyPassword: e.target.checked
        })
    }
    handleCheckCreateDir(e) {
        this.setState({
            createDir: e.target.checked
        })
    }
    handleCheckUploadFile(e) {
        this.setState({
            uploadFile: e.target.checked
        })
    }
    handleCheckDownloadFile(e) {
        this.setState({
            downloadFile: e.target.checked
        })
    }
    handleCheckDeleteFile(e) {
        this.setState({
            deleteFile: e.target.checked
        })
    }
    handleCheckDeleteDir(e) {
        this.setState({
            deleteDir: e.target.checked
        })
    }
    handleCheckRenameFile(e) {
        this.setState({
            renameFile: e.target.checked
        })
    }
    handleCheckRenameDir(e) {
        this.setState({
            renameDir: e.target.checked
        })
    }
    componentDidMount() {
        this.getDepList()
    }
    render() {
        let {
            currentDepId
        } = this.props
        return (
            <>
                <DepListComponent
                    list={this.state.depList}
                    currentDepId={currentDepId}
                    onClickItem={this.handleDepItemClick}
                />
                <input type="text" value={this.state.job_name} placeholder="岗位名称" onChange={this.handleInputChange}/><br/>
                <input type="checkbox" checked={this.state.createUser} onChange={this.handleCheckCreateUser} id="createUser"/><label htmlFor="createUser">创建用户</label><br/>
                <input type="checkbox" checked={this.state.modifyUserinfo} onChange={this.handleCheckModifyUserinfo} id="modifyUserinfo"/><label htmlFor="modifyUserinfo">修改信息</label><br/>
                <input type="checkbox" checked={this.state.modifyPassword} onChange={this.handleCheckModifyPassword} id="modifyPassword"/><label htmlFor="modifyPassword">修改密码</label><br/>
                <input type="checkbox" checked={this.state.createDir} onChange={this.handleCheckCreateDir} id="createDir"/><label htmlFor="createDir">新建目录</label><br/>
                <input type="checkbox" checked={this.state.uploadFile} onChange={this.handleCheckUploadFile} id="uploadFile"/><label htmlFor="uploadFile">上传文件</label><br/>
                <input type="checkbox" checked={this.state.downloadFile} onChange={this.handleCheckDownloadFile} id="downloadFile"/><label htmlFor="downloadFile">下载文件</label><br/>
                <input type="checkbox" checked={this.state.deleteFile} onChange={this.handleCheckDeleteFile} id="deleteFile"/><label htmlFor="deleteFile">删除文件</label><br/>
                <input type="checkbox" checked={this.state.deleteDir} onChange={this.handleCheckDeleteDir} id="deleteDir"/><label htmlFor="deleteDir">删除目录</label><br/>
                <input type="checkbox" checked={this.state.renameFile} onChange={this.handleCheckRenameFile} id="renameFile"/><label htmlFor="renameFile">重命名文件</label><br/>
                <input type="checkbox" checked={this.state.renameDir} onChange={this.handleCheckRenameDir} id="renameDir"/><label htmlFor="renameDir">重命名目录</label><br/>
                <button onClick={this.addJob}>创建岗位</button>
            </>
        )
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Job)