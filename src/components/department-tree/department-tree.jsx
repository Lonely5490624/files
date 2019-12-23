import React from 'react'
import bindAll from 'lodash.bindall'
import classnames from 'classnames'

import styles from './department-tree.module.scss'

import CreateDepBox from '../create-dep-box/create-dep-box'
import CreateJobBox from '../create-job-box/create-job-box'
import ModifyDepBox from '../modify-dep-box/modify-dep-box'
import JobTree from '../job-tree/job-tree'
import ajax from '../../utils/ajax'
import confirm from '../confirm/confirm'
import loading from '../loading/loading'
import toast from '../toast/toast'

class DepartmentTree extends React.PureComponent{
    constructor(){
        super()
        this.state = {
            depBox: false,
            jobBox: false,
            modifyDepBox: false,
            currentDep: null,
            childRef: null
        }
        
        /* let str = "{\"code\":0,\"message\":\"查询成功\",\"data\":[{\"dep_id\":270,\"par_id\":0,\"dep_name\":\"总部\",\"dep_dir\":\"/Users/lilong/Documents/中科思远/lxm-files/files/staff/1576754160000总部\",\"type\":1,\"address\":\"\",\"create_uid\":\"004c26d0-2137-11ea-b1c9-19ec08ea7d9d\",\"create_time\":\"2019-12-19T11:16:00.000Z\",\"update_uid\":null,\"update_time\":null,\"delete_uid\":null,\"delete_time\":null,\"is_delete\":0,\"children\":[{\"dep_id\":272,\"par_id\":270,\"dep_name\":\"技术部\",\"dep_dir\":\"/Users/lilong/Documents/中科思远/lxm-files/files/staff/1576754160000总部/1576754198000技术部\",\"type\":1,\"address\":\"\",\"create_uid\":\"004c26d0-2137-11ea-b1c9-19ec08ea7d9d\",\"create_time\":\"2019-12-19T11:16:38.000Z\",\"update_uid\":null,\"update_time\":null,\"delete_uid\":null,\"delete_time\":null,\"is_delete\":0,\"children\":[]}]},{\"dep_id\":271,\"par_id\":0,\"dep_name\":\"学校\",\"dep_dir\":\"/Users/lilong/Documents/中科思远/lxm-files/files/staff/1576754165000学校\",\"type\":1,\"address\":\"\",\"create_uid\":\"004c26d0-2137-11ea-b1c9-19ec08ea7d9d\",\"create_time\":\"2019-12-19T11:16:05.000Z\",\"update_uid\":null,\"update_time\":null,\"delete_uid\":null,\"delete_time\":null,\"is_delete\":0,\"children\":[]}]}"
        console.log("ssssss",JSON.parse(str)) */
        bindAll(this, [
            'handleOpenAddDep',
            'handleCloseAddDep',
            'handleOpenAddJob',
            'handleCloseAddJob',
            'handleOpenModifyDep',
            'handleCloseModifyDep',
            'handleDeleteDepConfirm',
            'handleDeleteDep'
        ])
    }
    // 打开新增部门弹窗
    handleOpenAddDep(item) {
        this.setState({
            depBox: true,
            currentDep: item
        })
    }
    // 关闭新增部门弹窗
    handleCloseAddDep() {
        this.setState({
            depBox: false,
            currentDep: null
        })
    }
    // 打开修改部门弹窗
    handleOpenModifyDep(item) {
        this.setState({
            modifyDepBox: true,
            currentDep: item
        })
    }
    // 关闭修改部门弹窗
    handleCloseModifyDep() {
        this.setState({
            modifyDepBox: false,
            currentDep: null
        })
    }
    // 打开新增岗位弹窗
    handleOpenAddJob(item) {
        this.setState({
            jobBox: true,
            currentDep: item
        })
    }
    // 关闭新增岗位弹窗
    handleCloseAddJob() {
        this.setState({
            jobBox: false,
            currentDep: null
        })
    }
    // 删除部门confirm
    handleDeleteDepConfirm(dep) {
        confirm('确认删除部门吗？', this.handleDeleteDep.bind(this, dep))
    }
    // 删除部门
    async handleDeleteDep(dep) {
        let params = {
            dep_id: dep.dep_id
        }
        loading.open()
        const result = await ajax.post('users/deleteDep', params)
        loading.close()
        if (result.code === 0) {
            toast('删除成功')
        } else {
            toast(result.message, 'error')
        }
    }
    createRef(ref) {
        this.setState({
            childRef: ref
        })
    }
    handleOnDone() {
        this.state.childRef.handleGetJobList()
    }
    render() {
        const {
            item,
            onDone
        } = this.props

        return (
            <>
                {
                    item && item.length ?
                    item.map(ele => (
                        <div key={ele.dep_id}>
                            <div className={classnames(styles.pLeft10)} key={ele.dep_id}>
                                <div className={styles.department}>
                                    <div className={styles.depName}>{ele.dep_name}</div>
                                    <div className={styles.depCtrl}>
                                        <button className={styles.depBtn} onClick={this.handleOpenAddDep.bind(this, ele)}>新增部门</button>
                                        <button className={styles.depBtn} onClick={this.handleOpenAddJob.bind(this, ele)}>新增岗位</button>
                                        <button className={styles.depBtn} onClick={this.handleOpenModifyDep.bind(this, ele)}>修改</button>
                                        <button className={styles.depBtn} onClick={this.handleDeleteDepConfirm.bind(this, ele)}>删除</button>
                                    </div>
                                </div>
                                {
                                    ele.children && ele.children.length ?
                                    <DepartmentTree item={ele.children} onDone={onDone} /> :
                                    null
                                }
                            </div>
                            <JobTree depItem={ele} depId={ele.dep_id} ref={this.createRef.bind(this)} />
                        </div>
                    )) :
                    null
                }
                {this.state.depBox && <CreateDepBox onClose={this.handleCloseAddDep} dep={this.state.currentDep} onDone={onDone} />}
                {this.state.jobBox && <CreateJobBox onClose={this.handleCloseAddJob} dep={this.state.currentDep} onDone={this.handleOnDone.bind(this)} />}
                {this.state.modifyDepBox && <ModifyDepBox onClose={this.handleCloseModifyDep} dep={this.state.currentDep} onDone={onDone} />}
            </>
        )
    }
}

export default DepartmentTree