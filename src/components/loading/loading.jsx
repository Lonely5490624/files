import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'

import styles from './loading.module.scss'

class Loading extends React.Component{
    render() {
        return (
            <div id="lxm-toast-box" className={styles.loadingBox}>加载中...</div>
        )
    }
}

const loading = {
    open: function() {
        if (document.querySelector('#lxm-loading')) {
            document.body.removeChild(document.querySelector('#lxm-loading'))
        }
        const div = document.createElement('div')
        div.setAttribute('id', 'lxm-loading')
        document.body.appendChild(div)
    
        ReactDOM.render(
            <Loading />,
            div
        )
    },
    close: function() {
        if (document.querySelector('#lxm-loading')) {
            document.body.removeChild(document.querySelector('#lxm-loading'))
        }
    }
}

export default loading