import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'

import styles from './toast.module.scss'

class Toast extends React.Component{
    render() {
        const {
            msg,
            type
        } = this.props
        return (
            <div id="lxm-toast-box" className={classnames(
                styles.toastBox,
                {
                    [styles.info] : !type,
                    [styles.success]: type === 'success',
                    [styles.error]: type === 'error'
                }
            )}>{msg}</div>
        )
    }
}

let timer = undefined

const toast = function(msg, type, time = 3000) {
    if (document.querySelector('#lxm-toast')) {
        document.body.removeChild(document.querySelector('#lxm-toast'))
        if (timer) clearTimeout(timer)
    }
    const div = document.createElement('div')
    div.setAttribute('id', 'lxm-toast')
    document.body.appendChild(div)

    ReactDOM.render(
        <Toast msg={msg} type={type} />,
        div
    )

    timer = setTimeout(() => {
        if (div) {
            document.body.removeChild(div)
        }
    }, time);
}

export default toast