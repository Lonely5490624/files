import React from 'react'
import classnames from 'classnames'
import bindAll from 'lodash.bindall'
import { connect } from 'react-redux'
import ajax from '../../utils/ajax'

import styles from './file-list.module.scss'

import UploadFile from '../upload-file/upload-file'
import ModifyFileBox from '../modify-file-box/modify-file-box'
import CreateDirBox from '../create-dir-box/create-dir-box'

class FileList extends React.PureComponent{
    constructor(props) {
        super(props)
        this.state = {
            uploadBox: false,
            modifyBox: false,
            currentFile: null
        }

        bindAll(this, [
            'handleOpenUploadBox',
            'handleCloseUploadBox',
            'handleOpenCreateDir',
            'handleCloseCreateDir',
            'handleDone',
            'handleFileDelete',
            'handleOpenModifyBox',
            'handleCloseModifyBox'
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
            createDir: true
        })
    }
    // 打开新建目录的弹窗
    handleCloseCreateDir() {
        this.setState({
            createDir: false
        })
    }
    // 当上传完成后的事件
    handleDone() {
        this.props.uploadDone && this.props.uploadDone(this.props.currentDir)
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
    render() {
        let {
            fileList
        } = this.props

        return (
            <div className={styles.filePage}>
                <div className={styles.fileHeader}>
                    <button onClick={this.handleOpenUploadBox}>上传文件</button>
                    <button onClick={this.handleOpenCreateDir}>新建目录</button>
                </div>
                {
                    fileList && fileList.length ?
                        <div className={styles.fileList}>
                            {
                                fileList.map(item => (
                                    <div className={styles.fileItem} key={item.file_id}>
                                        <div className={styles.fileName}>{item.file_name}</div>
                                        <div className={styles.fileControl}>
                                            <div className={classnames(styles.fileBtn, styles.fileModify)} onClick={this.handleOpenModifyBox.bind(this, item)}>修改</div>
                                            <div className={classnames(styles.fileBtn, styles.fileDelete)} onClick={this.handleFileDelete.bind(this, item.file_id)}>删除</div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div> :
                        <p>暂无文件</p>
                }
                {this.state.uploadBox && <UploadFile onClose={this.handleCloseUploadBox} onDone={this.handleDone} />}
                {this.state.createDir && <CreateDirBox onClose={this.handleCloseCreateDir} />}
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