import React from 'react'
import ReactDOM from 'react-dom'
import bindAll from 'lodash.bindall'

import styles from './create-dep-box.module.scss'
import ajax from '../../utils/ajax'
import loading from '../loading/loading'
import toast from '../toast/toast'

class CreateDepBox extends React.PureComponent{
    constructor() {
        super()
        this.state = {
            dep_name: ''
        }
        bindAll(this, [
            'handleInputChange',
            'handleCreateDir'
        ])
    }
    handleInputChange(e) {
        this.setState({
            dep_name: e.target.value
        })
    }
    async handleCreateDir() {
        let params = {
            dep_name: this.state.dep_name,
            par_id: this.props.dep.dep_id,
            type: 1
        }
        loading.open()
        let result = await ajax.post('users/addDepartment', params)
        loading.close()
        toast(result.message)
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
                    <input type="text" value={this.state.dep_name} onChange={this.handleInputChange} placeholder="请输入部门名称" />
                    <button onClick={this.handleCreateDir}>新建</button>
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

export default CreateDepBox