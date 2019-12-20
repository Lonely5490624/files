import React from 'react'
import ReactDOM from 'react-dom'
import bindAll from 'lodash.bindall'
import ajax from '../../utils/ajax'

import styles from './department-box.module.scss'

import DepartmentTree from '../department-tree/department-tree'

class DepartmentBox extends React.PureComponent{
    constructor(){
        super()
        this.state = {
            depList: null
        }

        bindAll(this, [
            'handleGetDirList'
        ])
    }
    async handleGetDirList() {
        let result = await ajax.get('users/getDepartment')
       
        if (result.code === 0) {
            this.setState({
                depList: result.data
            })
        }
    }
    componentWillMount() {
        this.handleGetDirList()
    }
    render() {
        const {
            onClose
        } = this.props

        const dom = (
            <div className={styles.cover}>
                <div className={styles.box}>
                    <div className={styles.header}>部门设置</div>
                    <div className={styles.content}>
                        <DepartmentTree item={this.state.depList} onDone={this.handleGetDirList} />
                    </div>
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

export default DepartmentBox