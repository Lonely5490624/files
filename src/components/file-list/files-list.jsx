import React from 'react'
import classnames from 'classnames'
import bindAll from 'lodash.bindall'
import { connect } from 'react-redux'
import ajax from '../../utils/ajax'

import styles from './file-list.module.scss'

import UploadFile from '../upload-file/upload-file'
import ModifyFileBox from '../modify-file-box/modify-file-box'
import CreateDirBox from '../create-dir-box/create-dir-box'

class FileList extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            uploadBox: false,
            modifyBox: false,
            currentFile: null,
            isRename:false
        }

        bindAll(this, [
            'handleOpenUploadBox',
            'handleCloseUploadBox',
            'handleOpenCreateDir',
            'handleCloseCreateDir',
            'handleDone',
            'handleFileShare',
            'handleCancelFileShare',
            'handleCollect',
            'handleFileDelete',
            'handleOpenModifyBox',
            'handleCloseModifyBox',
            'handleDownloadFile',
            'handleRename',
            'handleDeleteDir'
        ])
    }
    // 打开上传文件的弹窗
    handleOpenUploadBox() {
        this.setState({
            uploadBox: true
        })
    }
    // 关闭上传文件的弹窗
    handleCloseUploadBox() {
        this.setState({
            uploadBox: false
        })
    }
    // 打开新建目录的弹窗
    handleOpenCreateDir() {

        this.setState({
            isRename:false,
            createDir: true
        })
    }
    // 关闭开新建目录的弹窗
    handleCloseCreateDir() {
       
        this.props.refreDir()
        this.setState({
            isRename:false,
            createDir: false
        })
    }
    // 当上传完成后的事件
    handleDone(currentDir) {
        this.props.uploadDone && this.props.uploadDone(currentDir)
    }
    // 共享文件 
    async handleFileShare(id) {
        const params = {
            file_id: id
        }
        const result = await ajax.post('files/shareFile', params)
        if (result.code === 0) {
            this.props.uploadDone && this.props.uploadDone(this.props.currentDir)
        }
    }
    // 取消共享文件
    async handleCancelFileShare(id) {
        const params = {
            file_id: id
        }
        const result = await ajax.post('files/cancelShareFile', params)
        if (result.code === 0) {
            this.props.uploadDone && this.props.uploadDone(this.props.currentDir)
        }
    }
    // 收藏文件
    async handleCollect(id,type) {
        const params = {
            file_id: id+""
        }
        const result = type&&type=="cancel"?await ajax.post('files/cancelCollect', params):await ajax.post('files/collectFile', params)
        if (result.code === 0) {
            
            this.props.uploadDone && this.props.uploadDone(this.props.currentDir,type&&type=="cancel"?1:null)
        }
    }
    // 删除文件
    async handleFileDelete(id) {
        let params = {
            file_id: id
        }
        let result = await ajax.post('files/deleteFile', params)
        if (result.code === 0) {
            this.props.uploadDone && this.props.uploadDone(this.props.currentDir)
        }
    }
    // 打开修改文件名弹窗
    handleOpenModifyBox(item) {
        this.setState({
            modifyBox: true,
            currentFile: item
        })
    }
    // 关闭修改文件名弹窗
    handleCloseModifyBox() {
        this.setState({
            modifyBox: false
        })
    }
    // 下载文件
    handleDownloadFile(item) {
        ajax.download(`files/fileDownload?file_id=${item.file_id}`)
    }
    handleRename(){
        this.setState({
            isRename:true,
            createDir: true
        })
    }
    handleDeleteDir(){

    }
    render() {
        let {
            fileList,
            dirData
        } = this.props
        let {isRename} = this.state
        return (
            <div className={styles.filePage}>
                {
                    this.props.currentDir ?
                        <div className={styles.fileHeader}>
                            <button onClick={this.handleOpenUploadBox}>上传文件</button>
                            <button onClick={this.handleOpenCreateDir}>新建目录</button>
                            {
                                dirData && dirData.can_delete ? <button onClick={this.handleRename}>修改目录</button> : null
                            }
                            {
                                dirData && dirData.can_delete ? <button onClick={this.handleDeleteDir}>删除目录</button> : null
                            }
                        </div> :
                        null
                }
                {
                    fileList && fileList.length ?
                        <div className={styles.fileList}>
                            {
                                fileList.map((item,i) => (
                                    <div className={styles.fileItem} key={i}>
                                        <div className={styles.fileName}>{item.file_name}</div>
                                        {dirData.name == "收藏" ?
                                            <div className={styles.fileControl}>
                                                <div className={classnames(styles.fileBtn, styles.fileDownload)} onClick={this.handleDownloadFile.bind(this, item)}>下载</div>
                                                <div className={classnames(styles.fileBtn, styles.fileCollect)} onClick={this.handleCollect.bind(this, item.file_id,"cancel")}>取消收藏</div>
                                            </div>
                                            :
                                            <div className={styles.fileControl}>
                                                <div className={classnames(styles.fileBtn, styles.fileDownload)} onClick={this.handleDownloadFile.bind(this, item)}>下载</div>
                                                <div className={classnames(styles.fileBtn, styles.fileModify)} onClick={this.handleOpenModifyBox.bind(this, item)}>重命名</div>
                                                {item.is_share === 1 ?
                                                    <div className={classnames(styles.fileBtn, styles.fileShare)} onClick={this.handleCancelFileShare.bind(this, item.file_id)}>取消共享</div> :
                                                    <div className={classnames(styles.fileBtn, styles.fileShare)} onClick={this.handleFileShare.bind(this, item.file_id)}>共享</div>
                                                }
                                                <div className={classnames(styles.fileBtn, styles.fileCollect)} onClick={this.handleCollect.bind(this, item.file_id)}>收藏</div>
                                                <div className={classnames(styles.fileBtn, styles.fileDelete)} onClick={this.handleFileDelete.bind(this, item.file_id)}>删除</div>
                                            </div>}

                                    </div>
                                ))
                            }
                        </div> :
                        this.props.currentDir ?
                            <p>暂无文件</p> :
                            <p>请选择目录</p>
                }
                {this.state.uploadBox && <UploadFile onClose={this.handleCloseUploadBox} onDone={this.handleDone} />}
                {this.state.createDir && <CreateDirBox isRename={isRename} onClose={this.handleCloseCreateDir} />}
                {this.state.modifyBox && <ModifyFileBox onClose={this.handleCloseModifyBox} onDone={this.handleDone} item={this.state.currentFile} />}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentDir: state.file.dir_id
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FileList)