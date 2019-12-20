import React from 'react'
import classnames from 'classnames'
import bindAll from 'lodash.bindall'
import { connect } from 'react-redux'
import ajax from '../../utils/ajax'

import styles from './file-list-share.module.scss'

class FileListShare extends React.PureComponent{
    constructor(props) {
        super(props)
        this.state = {
            uploadBox: false,
            modifyBox: false,
            currentFile: null
        }

        bindAll(this, [
            'handleCancelShare',

            'handleDownloadFile'
        ])
    }
    // 取消共享文件 
    async handleCancelShare(id) {
        const params = {
            file_id: id
        }
        const result = await ajax.post('files/cancelShareFile', params)
        if (result.code === 0) {
            this.props.cancelDone && this.props.cancelDone(this.props.currentDir, this.props.isShare)
        }
    }
    // 下载文件
    handleDownloadFile(item) {
        ajax.download(`files/fileDownload?file_id=${item.file_id}`)
    }
    render() {
        let {
            fileList
        } = this.props

        return (
            <div className={styles.filePage}>
                {
                    fileList && fileList.length ?
                        <div className={styles.fileList}>
                            {
                                fileList.map(item => (
                                    <div className={styles.fileItem} key={item.file_id}>
                                        <div className={styles.fileName}>{item.file_name}</div>
                                        <div className={styles.fileControl}>
                                            <div className={classnames(styles.fileBtn, styles.fileDownload)} onClick={this.handleDownloadFile.bind(this, item)}>下载</div>
                                            <div className={classnames(styles.fileBtn, styles.fileShare)} onClick={this.handleCancelShare.bind(this, item.file_id)}>取消共享</div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div> :
                        this.props.currentDir ?
                        <p>暂无文件</p> :
                        <p>请选择目录</p>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentDir: state.file.dir_id,
    isShare: state.dir.isShare
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FileListShare)