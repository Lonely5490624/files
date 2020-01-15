import React from 'react'
import ReactDOM from 'react-dom'
import bindAll from 'lodash.bindall'
import {baseOrigin} from '../../utils/ajax'

import styles from './preview.module.scss'

class Preview extends React.Component{
    constructor(){
        super()
        bindAll(this, [
            'handleClose'
        ])
    }
    handleClose() {
        this.props.onCancel && this.props.onCancel()
        const dom = document.querySelector('#lxm-preview')
        if (dom) {
            document.body.removeChild(dom)
        }
    }
    componentWillMount () {
        const file_path = this.props.item.file_path
        if (/\.(png|jpg|jpeg|svg|gif)$/.test(file_path)) {
            this.isImage = true
        }
        this.truePath = this.props.item.file_path.replace(/(.+\/lxm-files\/files\/)/, baseOrigin + '/')
        if (/\.(xls|xlsx|doc|docx|ppt|pptx)/.test(file_path)) {
            this.truePath = `https://view.officeapps.live.com/op/view.aspx?src=${this.truePath}`
        }
    }
    render() {
        return (
            <>
                <div className={styles.previewCover}>
                    <div className={styles.previewBox}>
                        {this.isImage ?
                            <img src={this.truePath} alt=""/> :
                            <iframe
                                src={this.truePath}
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                title="preview"
                            />
                        }
                        <div
                            className={styles.close}
                            onClick={this.handleClose}
                        ></div>
                    </div>
                </div>
            </>
        )
    }
}

function preview (item) {
    let dom = document.createElement('div')
    dom.setAttribute('id', 'lxm-preview')
    ReactDOM.render(
        <Preview item={item} />,
        dom
    )
    document.body.appendChild(dom)
}

export default preview