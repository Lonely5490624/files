import React from 'react'
import ajax from '../utils/ajax'
import bindAll from 'lodash.bindall'
import { connect } from 'react-redux'
import { listToTree } from '../utils/tools'
import { setCurrentDir } from '../reducers/file'
import { setDirIsShare } from '../reducers/dir'

import Nav from '../components/Nav/Nav'
import FileList from '../components/file-list/files-list'
import FileListShare from '../components/file-list-share/files-list-share'
import DepartmentBox from '../components/department-box/department-box'
import toast from '../components/toast/toast'
import loading from '../components/loading/loading'
import confirm from '../components/confirm/confirm'

import styles from '../styles/home.module.scss'

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            depSet: 0,
            departmentBox: false,
            dirList: {
                menu: []
            },
            fileList: null,
            dirs: ["1", "2", "3"]
        }
        this.menu = []
        bindAll(this, [
            'handleShowDepartmnet',
            'handleHideDepartmnet',
            'handleGetDirList',
            'handleGetShareDirList',
            'handleClickDir',
            'handleRefreshFileList',
            'handleLogout',
            'getCurrentJob'
        ])
    }
    // 打开部门设置
    handleShowDepartmnet() {
        this.setState({
            departmentBox: true
        })
    }
    // 关闭部门设置
    handleHideDepartmnet() {
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
        if (result.code === 0) {
            this.menu.push(...listToTree(result.data, true))
        }
    }
    // 点击左侧目录事件
    async handleClickDir(item, isShare) {
        await this.props.setCurrentDir(item.id)
        await this.props.setDirIsShare(isShare)
        const url = this.props.isShare ? `files/getShareFileWithDirId?dir_id=${item.id}` : `files/getFileWithDirId?dir_id=${item.id}`
        let result = await ajax.get(url);
        let dirArr = []
        console.log(item)
        /* console.log("item",item);
        console.log("this",this.menu); */
        let arrs = []
        let getDir = (dataArr) => {
            dataArr.forEach((i) => {

                if (item.dir_pid === i.id) {
                    dirArr.push(i.name)
                }
                if (i.menu && i.menu.length > 0) {
                    getDir(i.menu)
                }
                arrs.push(i);
            })
        }
        getDir(this.menu);
        console.log(dirArr)
        if (result.code === 0) {
            this.setState({
                fileList: result.data
            })
        }
    }
    async handleRefreshFileList(id) {
        let result = await ajax.get(`files/getFileWithDirId?dir_id=${id}`);
        if (result.code === 0) {
            this.setState({
                fileList: result.data
            })
        }
    }
    async handleLogout () {
        let result = await ajax.post('users/logout')
        if (result.code === 0) {
            localStorage.removeItem('token')
            this.props.history.replace('/login')
        }
    }
    // 查询当前岗位信息，能否设置部门
    async getCurrentJob() {
        const result = await ajax.get('users/canSetDep')
        if (result.code === 0) {
            this.setState({
                depSet: result.data
            })
        }
    }
    async componentWillMount() {
        await this.getCurrentJob()
        await this.handleGetDirList()
        await this.handleGetShareDirList()
        this.setState({
            dirList: {
                menu: this.menu
            }
        })
    }
    handleToast() {
        toast('删除失败')
    }
    handleOpenloading() {
        loading.open()
        setTimeout(() => {
            loading.close()
        }, 3000);
    }
    handleOpenConfirm() {
        confirm('确认删除吗', this.timeout)
    }
    timeout() {
        console.log(11111)
    }
    render() {
        let { dirs } = this.state;
        return (
            <>
                <div className={styles.home}>
                    <div className={styles.navTop}>
                        <h1>logo</h1>
                        <ul>
                            {this.state.depSet ? <li onClick={this.handleShowDepartmnet}>部门设置</li> : null}
                            <li onClick={this.handleToast.bind(this)}>Toast</li>
                            <li onClick={this.handleOpenloading.bind(this)}>Loading</li>
                            <li onClick={this.handleOpenConfirm.bind(this)}>Confirm</li>
                            <li onClick={this.handleLogout}>注销</li>
                        </ul>
                    </div>
                    <div className={styles.contentBody}>
                        <Nav type={"fileTree"} data={this.state.dirList} onDirClick={this.handleClickDir} />
                        <div className={styles.contentMain}>
                            <div className={styles.dir}>
                                <h3>当前目录：</h3>
                                <ul>
                                {dirs.map((i, index) => {
                                    return (<li key={index}>{i}{
                                        
                                        index===dirs.length-1?"":
                                        <span>{">"}</span>
                                    }</li>)
                                })}
                                </ul>
                            </div>
                            {
                                this.props.isShare ? 
                                <FileListShare fileList={this.state.fileList} cancelDone={this.handleClickDir} /> :
                                <FileList fileList={this.state.fileList} uploadDone={this.handleRefreshFileList} />
                            }
                        </div>
                    </div>
                </div>
                {this.state.departmentBox && <DepartmentBox onClose={this.handleHideDepartmnet} />}
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    currentDir: state.file.dir_id,
    isShare: state.dir.isShare
})

const mapDispatchToProps = dispatch => ({
    setCurrentDir: id => dispatch(setCurrentDir(id)),
    setDirIsShare: isShare => dispatch(setDirIsShare(isShare))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
