import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import bindAll from 'lodash.bindall'

import styles from './confirm.module.scss'

class Confirm extends React.Component{
    constructor() {
        super()
        bindAll(this, [
            'handleCancel',
            'handleConfirm'
        ])
    }
    handleCancel() {
        this.props.onCancel && this.props.onCancel()
        const dom = document.querySelector('#lxm-confirm')
        if (dom) {
            document.body.removeChild(dom)
        }
    }
    async handleConfirm() {
        this.props.onConfirm && await this.props.onConfirm()
        this.handleCancel()
    }
    render() {
        const {
            text,
            confirmBtnText,
            cancelBtnText
        } = this.props
        return (
            <div id="lxm-confirm-box" className={styles.confirmCover}>
                <div className={styles.confirmBox}>
                    <div className={styles.content}>{text}</div>
                    <div className={styles.control}>
                        <div className={classnames(styles.btn, styles.btnCancel)} onClick={this.handleCancel}>{cancelBtnText}</div>
                        <div className={classnames(styles.btn, styles.btnConfirm)} onClick={this.handleConfirm}>{confirmBtnText}</div>
                    </div>
                </div>
            </div>
        )
    }
}

Confirm.defaultProps = {
    confirmBtnText: '确认',
    cancelBtnText: '取消'
}

const confirm = function(text, onConfirm, onCancel) {
    const div = document.createElement('div')
    div.setAttribute('id', 'lxm-confirm')
    document.body.appendChild(div)

    ReactDOM.render(
        <Confirm text={text} onConfirm={onConfirm} onCancel={onCancel} />,
        div
    )
}

export default confirm