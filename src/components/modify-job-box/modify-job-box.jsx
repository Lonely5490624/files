import React from 'react'
import ReactDOM from 'react-dom'
import bindAll from 'lodash.bindall'

import styles from './modify-job-box.module.scss'
import ajax from '../../utils/ajax'

class ModifyJobBox extends React.PureComponent{
    constructor() {
        super()
        this.state = {
            new_name: ''
        }
        bindAll(this, [
            'handleInputChange',
            'handleModifyJob'
        ])
    }
    handleInputChange(e) {
        this.setState({
            new_name: e.target.value
        })
    }
    async handleModifyJob() {
        let params = {
            job_id: this.props.jobItem.job_id,
            new_name: this.state.new_name
        }
        let result = await ajax.post('users/updateJob', params)
        if (result.code === 0) {
            this.props.onClose()
            this.props.onDone && this.props.onDone()
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
                    <input type="text" value={this.state.new_name || jobItem.job_name} onChange={this.handleInputChange} placeholder="请输入岗位名称" />
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