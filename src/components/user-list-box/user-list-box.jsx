import React from 'react'
import ReactDOM from 'react-dom'
import bindAll from 'lodash.bindall'
import ajax from '../../utils/ajax'

import styles from './user-list-box.module.scss'

class UserListBox extends React.PureComponent{
    constructor() {
        super()
        this.state = {
            userList: null
        }
        bindAll(this,[
            'getUserList'
        ])
    }
    // 获取岗位下面的人员
    async getUserList() {
        let result = await ajax.get(`users/getUserStaff?job_id=${this.props.jobItem.job_id}`)
        if (result.code === 0) {
            this.setState({
                userList: result.data
            })
        }
    }
    componentDidMount() {
        this.getUserList()
    }
    render() {
        const {userList} = this.state
        const {
            onClose
        } = this.props
        const dom = (
            <div className={styles.cover}>
                <div className={styles.box}>
                    <div className={styles.header}>岗位名称</div>
                    <div className={styles.content}>
                        {
                            userList && userList.length ?
                            userList.map(item => (
                                <div key={item.uid}>{item.true_name}</div>
                            )) :
                            <div>暂无人员</div>
                        }
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

export default UserListBox