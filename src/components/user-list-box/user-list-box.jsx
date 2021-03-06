import React from 'react'
import ReactDOM from 'react-dom'
import bindAll from 'lodash.bindall'
import ajax from '../../utils/ajax'
import CreateUserBox from '../create-user-box/create-user-box'
import styles from './user-list-box.module.scss'
import confirm from "../../components/confirm/confirm";
import toast from "../../components/toast/toast";
import loading from '../../components/loading/loading'
class UserListBox extends React.PureComponent{
    constructor() {
        super()
        this.state = {
            userList: null,
            depItem:null,
            updateUserBox:false
        }
        bindAll(this,[
            'getUserList',
            'handleCloseAddUsers',
            'handleDoneAddUsers'
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
    async openUserInfoBox(item){
        let result = await ajax.get(`users/getUserStaffInfo?uid=${item.uid}`)
        
        this.setState({
            depItem:result.data.depInfo,
            jobItem:result.data.jobInfo,
            updateUserBox:true,
            userInfo:result.data
        })
    }
    async deleteUser(item){
        confirm("确认删除？",async ()=>{
            loading.open()
            const params = {
                uid: item.uid
            }
            const result = await ajax.post('users/deleteUser', params)
            if (result.code === 0) {
                toast("删除成功")
                this.getUserList()
            }else{
                toast(result.message,"error")
            }
            loading.close()
        })
        
    }
    handleCloseAddUsers() {
        this.setState({
            updateUserBox: false,
            jobItem: null,
            depItem:null
        })
    }
    handleDoneAddUsers() {
        this.setState({
            updateUserBox: false,
            jobItem: null,
            depItem:null
        })
        this.handleCloseAddUsers()
    }
    render() {
        const {userList,userInfo,depItem,jobItem,updateUserBox} = this.state
       // console.log(this.props)
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
                                <div key={item.uid}>
                                    <div>{item.true_name}</div>
                                    <ul>
                                        <li onClick={this.openUserInfoBox.bind(this,item)}>修改</li>
                                        <li onClick={this.deleteUser.bind(this,item)}>删除</li>
                                    </ul>
                                </div>
                            )) :
                            <div>暂无人员</div>
                        }
                    </div>
                    <div className={styles.close} onClick={onClose}></div>
                </div>
                {updateUserBox && <CreateUserBox isUpdate={true} userInfo={userInfo} depItem={depItem} jobItem={jobItem} onClose={this.handleCloseAddUsers} onDone={this.handleDoneAddUsers} />}
            </div>
        )
        return ReactDOM.createPortal(
            dom,
            document.body
        )
    }
}

export default UserListBox