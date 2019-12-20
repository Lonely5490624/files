import React from 'react'
import ReactDOM from 'react-dom'
import bindAll from 'lodash.bindall'
import ajax from '../../utils/ajax'
import { connect } from 'react-redux'

import styles from './create-dir-box.module.scss'

class CreateDirBox extends React.PureComponent{
    constructor() {
        super()
        this.state = {
            new_name: ''
        }

        bindAll(this, [
            'handleInputChange',
            'handleCreateDir'
        ])
    }
    handleInputChange(e) {
        this.setState({
            new_name: e.target.value
        })
    }
    async handleCreateDir() {
        let {isRename} =this.props
        let newParams = {
            dir_name: this.state.new_name,
            dir_pid: this.props.currentDir
        }
        let params = {
            new_name: this.state.new_name,
            dir_id: this.props.currentDir
        }
        let result = isRename?await ajax.post('files/renameDir', params):await ajax.post('files/addDir', newParams)
        if (result.code === 0) {
            this.props.onClose()
            this.props.onDone && this.props.onDone()
        }
    }
    render() {
        const {
            onClose,
            isRename
        } = this.props
        const dom = (
            <div className={styles.cover}>
                <div className={styles.box}>
                    <input type="text" value={this.state.new_name} onChange={this.handleInputChange} placeholder="请输入目录名称" />
                    <button onClick={this.handleCreateDir}>{isRename?"修改":"新建"}</button>
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

const mapStateToProps = state => ({
    currentDir: state.file.dir_id
})

export default connect(
    mapStateToProps
)(CreateDirBox)