import React from 'react'
import bindAll from 'lodash.bindall'
import classnames from 'classnames'

import styles from './department-tree.module.scss'

import CreateDepBox from '../create-dep-box/create-dep-box'
import ModifyDepBox from '../modify-dep-box/modify-dep-box'

class DepartmentTree extends React.PureComponent{
    constructor(){
        super()
        this.state = {
            depBox: false,
            modifyDepBox: false,
            currentDep: null
        }

        bindAll(this, [
            'handleOpenAddDep',
            'handleCloseAddDep',
            'handleOpenModifyDep',
            'handleCloseModifyDep'
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
    // 打开新增部门弹窗
    handleOpenModifyDep(item) {
        this.setState({
            modifyDepBox: true,
            currentDep: item
        })
    }
    // 关闭新增部门弹窗
    handleCloseModifyDep() {
        this.setState({
            modifyDepBox: false,
            currentDep: null
        })
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
                        <div className={classnames(styles.pLeft10)} key={ele.dep_id}>
                            <div className={styles.department}>
                                <div className={styles.depName}>{ele.dep_name}</div>
                                <div className={styles.depCtrl}>
                                    <button className={styles.depBtn}>查看人员</button>
                                    <button className={styles.depBtn} onClick={this.handleOpenAddDep.bind(this, ele)}>新增</button>
                                    <button className={styles.depBtn} onClick={this.handleOpenModifyDep.bind(this, ele)}>修改</button>
                                    <button className={styles.depBtn}>删除</button>
                                </div>
                            </div>
                            {
                                ele.children && ele.children.length ?
                                <DepartmentTree item={ele.children} onDone={onDone} /> :
                                null
                            }
                        </div> 
                    )) :
                    null
                }
                {this.state.depBox && <CreateDepBox onClose={this.handleCloseAddDep} dep={this.state.currentDep} onDone={onDone} />}
                {this.state.modifyDepBox && <ModifyDepBox onClose={this.handleCloseModifyDep} dep={this.state.currentDep} onDone={onDone} />}
            </>
        )
    }
}

export default DepartmentTree