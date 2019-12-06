import React from 'react'
import ReactDOM from 'react-dom'
import bindAll from 'lodash.bindall'
import { connect } from 'react-redux'
import ajax from '../../utils/ajax'

import styles from './upload-file.module.scss'

class UploadFile extends React.PureComponent{
    constructor() {
        super()
        this.state = {
            file: null
        }
        bindAll(this, [
            'handleInputChange',
            'handleFileUpload'
        ])
    }
    handleInputChange(e) {
        this.setState({
            file: e.target.files[0]
        })
    }
    async handleFileUpload() {
        if (!this.state.file) return
        let params = new FormData()
        params.append('file', this.state.file)
        params.append('dir_id', this.props.currentDir)
        let config = {
            header: {'Content-Type': 'multipart/form-data'}
        }
        let result = await ajax.post('files/uploadFile', params, config)
        if (result.code === 0) {
            this.props.onClose()
            this.props.onDone && this.props.onDone()
        }
    }
    render() {
        let {
            onClose
        } = this.props
        const dom = (
            <div className={styles.uploadCover}>
                <div className={styles.uploadBox}>
                    <input type="file" className={styles.uploadInput} onChange={this.handleInputChange} />
                    <button className={styles.uploadBtn} onClick={this.handleFileUpload}>上传</button>
                    <div className={styles.uploadClose} onClick={onClose}></div>
                </div>
            </div>
        )
        return ReactDOM.createPortal(
            dom,
            document.body
        )
    }
}

const mapStateToProps = state => ({
    currentDir: state.file.dir_id
})

export default connect(
    mapStateToProps
)(UploadFile)