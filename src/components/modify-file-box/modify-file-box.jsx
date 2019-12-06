import React from 'react'
import ReactDOM from 'react-dom'
import bindAll from 'lodash.bindall'

import styles from './modify-file-box.module.scss'
import ajax from '../../utils/ajax'

class ModifyFileBox extends React.PureComponent{
    constructor(props) {
        super(props)
        this.state = {
            file_name: null
        }
        bindAll(this, [
            'handleInputChange',
            'handleModifyFileName'
        ])
    }
    handleInputChange (e) {
        this.setState({
            file_name: e.target.value
        })
    }
    async handleModifyFileName() {
        let params = {
            file_id: this.props.item.file_id,
            new_name: this.state.file_name
        }
        let result = await ajax.post('files/updateFile', params)
        if (result.code === 0) {
            this.props.onClose()
            this.props.onDone && this.props.onDone()
        }
    }
    render() {
        let {
            item,
            onClose
        } = this.props
        const dom = (
            <div className={styles.modifyCover}>
                <div className={styles.modifyBox}>
                    <input type="text" value={this.state.file_name || item.file_name} onChange={this.handleInputChange} />
                    <button onClick={this.handleModifyFileName}>修改</button>
                    <div className={styles.modifyClose} onClick={onClose}></div>
                </div>
            </div>
        )
        return ReactDOM.createPortal(
            dom,
            document.body
        )
    }
}

export default ModifyFileBox