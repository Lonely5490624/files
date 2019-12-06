import React from 'react'
import ReactDOM from 'react-dom'
import bindAll from 'lodash.bindall'

import styles from './modify-dep-box.module.scss'
import ajax from '../../utils/ajax'

class ModifyDepBox extends React.PureComponent{
    constructor() {
        super()
        this.state = {
            new_name: ''
        }
        bindAll(this, [
            'handleInputChange',
            'handleModifyDir'
        ])
    }
    handleInputChange(e) {
        this.setState({
            new_name: e.target.value
        })
    }
    async handleModifyDir() {
        let params = {
            dep_id: this.props.dep.dep_id,
            new_name: this.state.new_name
        }
        let result = await ajax.post('users/updateDepartment', params)
        if (result.code === 0) {
            this.props.onClose()
            console.log(this.props)
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
                    <input type="text" value={this.state.new_name || dep.dep_name} onChange={this.handleInputChange} placeholder="请输入部门名称" />
                    <button onClick={this.handleModifyDir}>修改</button>
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

export default ModifyDepBox