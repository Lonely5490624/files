import React from 'react'
import ajax from '../utils/ajax'
import bindAll from 'lodash.bindall'
import { connect } from 'react-redux'
import { listToTree } from '../utils/tools'
import { setCurrentDir } from '../reducers/file'

import Nav from '../components/Nav/Nav'
import FileList from '../components/file-list/files-list'
import DepartmentBox from '../components/department-box/department-box'

import styles from '../styles/home.module.scss'

class Home extends React.Component{
    constructor() {
        super()
        this.state = {
            departmentBox: false,
            dirList: {
                menu: []
            },
            fileList: null
        }
        this.menu = []
        bindAll(this, [
            'handleShowDepartmnet',
            'handleHideDepartmnet',
            'handleGetDirList',
            'handleGetShareDirList',
            'handleClickDir',
            'handleLogout',
        ])
    }
    // 打开部门设置
    handleShowDepartmnet () {
        this.setState({
            departmentBox: true
        })
    }
    // 关闭部门设置
    handleHideDepartmnet () {
        this.setState({
            departmentBox: false
        })
    }
    // 获取我的目录列表
    async handleGetDirList() {
        let result = await ajax.get('files/getDirList')
        if (result.code === 0) {
            this.menu.push(...listToTree(result.data))
        }
    }
    // 获取分享给我的目录列表
    async handleGetShareDirList() {
        let result = await ajax.get('files/getShareDir')
        if(result.code === 0) {
            this.menu.push(...listToTree(result.data))
        }
    }
    // 点击左侧目录事件
    async handleClickDir(id) {
        this.props.setCurrentDir(id)
        let result = await ajax.get(`files/getFileWithDirId?dir_id=${id}`)
        if (result.code === 0) {
            this.setState({
                fileList: result.data
            })
        }
    }
    async handleLogout () {
        let result = await ajax.post('users/logout')
        if (result.code === 0) {
            this.props.history.replace('/login')
        }
    }
    async componentWillMount() {
        await this.handleGetDirList()
        await this.handleGetShareDirList()
        this.setState({
            dirList: {
                menu: this.menu
            }
        })
    }
    render() {
        return (
            <>
                <div className={styles.home}>
                    <div className={styles.navTop}>
                        <h1>logo</h1>
                        <ul>
                            <li>菜单1</li>
                            <li onClick={this.handleShowDepartmnet}>部门设置</li>
                            <li onClick={this.handleLogout}>注销</li>
                        </ul>
                    </div>
                    <div className={styles.contentBody}>
                        <Nav type={"fileTree"} data={this.state.dirList} onDirClick={this.handleClickDir} />
                        <div className={styles.contentMain}>
                            <FileList fileList={this.state.fileList} uploadDone={this.handleClickDir} />
                        </div>
                    </div>
                </div>
                {this.state.departmentBox && <DepartmentBox onClose={this.handleHideDepartmnet} />}
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    currentDir: state.file.dir_id
})

const mapDispatchToProps = dispatch => ({
    setCurrentDir: id => dispatch(setCurrentDir(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
