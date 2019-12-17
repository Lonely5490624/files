import React from 'react'
import bindAll from 'lodash.bindall'
import ajax from '../../utils/ajax'
import classnames from 'classnames'

import UserListBox from '../user-list-box/user-list-box'
import ModifyJobBox from '../modify-job-box/modify-job-box'
import CreateUserBox from '../create-user-box/create-user-box'

import styles from './job-tree.module.scss'

class JobTree extends React.PureComponent{
    constructor() {
        super()
        this.state = {
            jobList: null,
            userBox: false,
            addUserBox: false,
            modifyJobBox: false,
            currentJob: null
        }

        bindAll(this, [
            'handleGetJobList',
            'handleOpenUsers',
            'handleCloseUsers',
            'handleOpenAddUsers',
            'handleCloseAddUsers',
            'handleOpenModifyJob',
            'handleCloseModifyJob'
        ])
    }
    async handleGetJobList() {
        let result = await ajax.get(`users/getJobList?dep_id=${this.props.depId}`)
        if (result.code === 0) {
            this.setState({
                jobList: result.data
            })
        }
    }
    // 打开查看人员弹窗
    handleOpenUsers(item) {
        this.setState({
            userBox: true,
            currentJob: item
        })
    }
    // 关闭查看人员弹窗
    handleCloseUsers() {
        this.setState({
            userBox: false,
            currentJob: null
        })
    }
    // 打开新增人员弹窗
    handleOpenAddUsers(item) {
        this.setState({
            addUserBox: true,
            currentJob: item
        })
    }
    // 关闭新增人员弹窗
    handleCloseAddUsers() {
        this.setState({
            addUserBox: false,
            currentJob: null
        })
    }
    // 打开修改岗位弹窗
    handleOpenModifyJob(item) {
        this.setState({
            modifyJobBox: true,
            currentJob: item
        })
    }
    // 关闭修改岗位弹窗
    handleCloseModifyJob() {
        this.setState({
            modifyJobBox: false,
            currentJob: null
        })
    }
    componentDidMount() {
        this.handleGetJobList()
    }
    render() {
        let {
            jobList
        } = this.state
        return (
            <>
                {
                    jobList && jobList.length && jobList.map(item => (
                        <div className={classnames(styles.pLeft20)} key={item.job_id}>
                            <div className={styles.jobItem}>
                                <div className={styles.jobName}>{item.job_name}</div>
                                <div className={styles.jobCtrl}>
                                    <button className={styles.jobBtn} onClick={this.handleOpenUsers.bind(this, item)}>查看人员</button>
                                    <button className={styles.jobBtn} onClick={this.handleOpenAddUsers.bind(this, item)}>新增人员</button>
                                    <button className={styles.jobBtn} onClick={this.handleOpenModifyJob.bind(this, item)}>修改</button>
                                    <button className={styles.jobBtn}>删除</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
                {this.state.userBox && <UserListBox jobItem={this.state.currentJob} onClose={this.handleCloseUsers} />}
                {this.state.modifyJobBox && <ModifyJobBox jobItem={this.state.currentJob} onClose={this.handleCloseModifyJob} />}
                {this.state.addUserBox && <CreateUserBox jobItem={this.state.currentJob} onClose={this.handleCloseAddUsers} />}
            </>            
        )
    }
}

export default JobTree