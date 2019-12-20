import React from 'react'
import ReactDOM from 'react-dom'
import bindAll from 'lodash.bindall'

import styles from './create-user-box.module.scss'
import ajax from '../../utils/ajax'
import SelectTree from "../selectTree/selectTree"

class CreateUserBox extends React.PureComponent{
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            job_number: '',
            phone_number: '',
            true_name: '',
            nick_name: '',
            ID_card: '',
            depData:null,
            jobValue:''
        }
        bindAll(this, [
            'handleInputUsername',
            'handleInputPassword',
            'handleInputJobNumber',
            'handleInputPhoneNumber',
            'handleInputTrueName',
            'handleInputNickName',
            'handleInputIDCard',
            'handleCreateUser',
        ])
    }
    handleInputUsername(e) {
        this.setState({
            username: e.target.value
        })
    }
    handleInputPassword(e) {
        this.setState({
            password: e.target.value
        })
    }
    handleInputJobNumber(e) {
        this.setState({
            job_number: e.target.value
        })
    }
    handleInputPhoneNumber(e) {
        this.setState({
            phone_number: e.target.value
        })
    }
    handleInputTrueName(e) {
        this.setState({
            true_name: e.target.value
        })
    }
    handleInputNickName(e) {
        this.setState({
            nick_name: e.target.value
        })
    }
    handleInputIDCard(e) {
        this.setState({
            ID_card: e.target.value
        })
    }
    handleInputDep(){
        
    }
    // 创建用户
    componentWillMount(){
        let {isUpdate,userInfo} = this.props;
        /* ajax.get('users/getDepartment').then(res=>{
            console.log(res)
        }) */
        let str = "{\"code\":0,\"message\":\"查询成功\",\"data\":[{\"dep_id\":270,\"par_id\":0,\"dep_name\":\"总部\",\"dep_dir\":\"/Users/lilong/Documents/中科思远/lxm-files/files/staff/1576754160000总部\",\"type\":1,\"address\":\"\",\"create_uid\":\"004c26d0-2137-11ea-b1c9-19ec08ea7d9d\",\"create_time\":\"2019-12-19T11:16:00.000Z\",\"update_uid\":null,\"update_time\":null,\"delete_uid\":null,\"delete_time\":null,\"is_delete\":0,\"children\":[{\"dep_id\":272,\"par_id\":270,\"dep_name\":\"技术部\",\"dep_dir\":\"/Users/lilong/Documents/中科思远/lxm-files/files/staff/1576754160000总部/1576754198000技术部\",\"type\":1,\"address\":\"\",\"create_uid\":\"004c26d0-2137-11ea-b1c9-19ec08ea7d9d\",\"create_time\":\"2019-12-19T11:16:38.000Z\",\"update_uid\":null,\"update_time\":null,\"delete_uid\":null,\"delete_time\":null,\"is_delete\":0,\"children\":[]}]},{\"dep_id\":271,\"par_id\":0,\"dep_name\":\"学校\",\"dep_dir\":\"/Users/lilong/Documents/中科思远/lxm-files/files/staff/1576754165000学校\",\"type\":1,\"address\":\"\",\"create_uid\":\"004c26d0-2137-11ea-b1c9-19ec08ea7d9d\",\"create_time\":\"2019-12-19T11:16:05.000Z\",\"update_uid\":null,\"update_time\":null,\"delete_uid\":null,\"delete_time\":null,\"is_delete\":0,\"children\":[]}]}"
        let res = JSON.parse(str)
        let jobstr = "{\"code\":0,\"message\":\"查询成功\",\"data\":[{\"job_id\":51,\"job_name\":\"技术经理岗\",\"job_dir\":\"/Users/lilong/Documents/中科思远/lxm-files/files/staff/1576754160000总部/1576754198000技术部/1576754216000技术经理岗\",\"dep_id\":272,\"is_manager\":1,\"dep_set\":1,\"create_uid\":\"004c26d0-2137-11ea-b1c9-19ec08ea7d9d\",\"create_time\":\"2019-12-19T11:16:56.000Z\",\"update_uid\":null,\"update_time\":null,\"delete_uid\":null,\"delete_time\":null,\"is_delete\":0},{\"job_id\":52,\"job_name\":\"前端岗\",\"job_dir\":\"/Users/lilong/Documents/中科思远/lxm-files/files/staff/1576754160000总部/1576754198000技术部/1576757600000前端岗\",\"dep_id\":272,\"is_manager\":1,\"dep_set\":1,\"create_uid\":\"004c26d0-2137-11ea-b1c9-19ec08ea7d9d\",\"create_time\":\"2019-12-19T11:17:11.000Z\",\"update_uid\":\"004c26d0-2137-11ea-b1c9-19ec08ea7d9d\",\"update_time\":\"2019-12-19T12:13:20.000Z\",\"delete_uid\":null,\"delete_time\":null,\"is_delete\":0}]}"
        let jobres= JSON.parse(jobstr)
        if(isUpdate){
            this.setState({
                username: userInfo.username,
                job_number: userInfo.job_number,
                phone_number: userInfo.phone_number,
                true_name: userInfo.true_name,
                nick_name: userInfo.nick_name,
                ID_card: userInfo.ID_card,
                depData:res.data,
                jobData:jobres.data
            })
        }
    }
    componentWillUnmount(){
        this.setState({
            
        })
    }
    async handleCreateUser() {
        const params = {
            username: this.state.username,
            password: this.state.password,
            dep_id: this.props.depItem.dep_id,
            job_id: this.props.jobItem.job_id,
            job_number: this.state.job_number,
            phone_number: this.state.phone_number,
            true_name: this.state.true_name,
            nick_name: this.state.nick_name,
            ID_card: this.state.ID_card
        }
        const result = await ajax.post('users/regUserStaff', params)
        if (result.code === 0) {
            this.props.onDone && this.props.onDone()
        }
    }
    onSelectChange(item){
        console.log(item)
    }
    selectJob(e){
        this.setState({
            jobValue: e.target.value
        });
    }
    render() {
        const {
            depItem,
            jobItem,
            onClose,
            isUpdate
        } = this.props
        let {depData,jobData,jobValue} = this.state;
    
        const dom = (
            <div className={styles.cover}>
                <div className={styles.box}>
                    <div className={styles.content}>
                        <div className={styles.formItem}>
                            <div className={styles.formItemLabel}>用户名</div>
                            <div className={styles.formItemInput}>
                                <input type="text" placeholder="请输入用户名" value={this.state.username} onChange={this.handleInputUsername}/>
                            </div>
                        </div>
                        <div className={styles.formItem}>
                            <div className={styles.formItemLabel}>密码</div>
                            <div className={styles.formItemInput}>
                                <input type="password" placeholder="请输入密码" value={this.state.password} onChange={this.handleInputPassword}/>
                            </div>
                        </div>
                        <div className={styles.formItem}>
                            <div className={styles.formItemLabel}>部门</div>
                            <div className={styles.formItemInput}>
                                {
                                    isUpdate?
                                    <SelectTree onChange={this.onSelectChange.bind(this)} className={" test"} dataTree={depData} ref="selectTree"/>
                                    :
                                    <input type="text" value={depItem.dep_name} readOnly/>
                                }
                            </div>
                        </div>
                        <div className={styles.formItem}>
                            <div className={styles.formItemLabel}>岗位</div>
                            <div className={styles.formItemInput}>
                                {
                                    isUpdate?
                                    <select onChange={this.selectJob.bind(this)} value={jobValue}>
                                        {jobData.map((item,index)=>{
                                            return ( <option key={index} value ={item.job_name}>{item.job_name}</option>)
                                        })}
                                    </select>
                                    :
                                    <input type="text" value={jobItem.job_name} readOnly/>
                                }
                            </div>
                        </div>
                        <div className={styles.formItem}>
                            <div className={styles.formItemLabel}>工号</div>
                            <div className={styles.formItemInput}>
                                <input type="text" placeholder="请输入工号" value={this.state.job_number} onChange={this.handleInputJobNumber}/>
                            </div>
                        </div>
                        <div className={styles.formItem}>
                            <div className={styles.formItemLabel}>电话号码</div>
                            <div className={styles.formItemInput}>
                                <input type="text" placeholder="请输入电话号码" maxLength="11" value={this.state.phone_number} onChange={this.handleInputPhoneNumber}/>
                            </div>
                        </div>
                        <div className={styles.formItem}>
                            <div className={styles.formItemLabel}>真实姓名</div>
                            <div className={styles.formItemInput}>
                                <input type="text" placeholder="请输入真实姓名" value={this.state.true_name} onChange={this.handleInputTrueName}/>
                            </div>
                        </div>
                        <div className={styles.formItem}>
                            <div className={styles.formItemLabel}>昵称</div>
                            <div className={styles.formItemInput}>
                                <input type="text" placeholder="请输入昵称" value={this.state.nick_name} onChange={this.handleInputNickName}/>
                            </div>
                        </div>
                        <div className={styles.formItem}>
                            <div className={styles.formItemLabel}>身份证号码</div>
                            <div className={styles.formItemInput}>
                                <input type="text" placeholder="请输入身份证号码" maxLength="18" value={this.state.ID_card} onChange={this.handleInputIDCard}/>
                            </div>
                        </div>
                        <button onClick={this.handleCreateUser}>{isUpdate?"修改":"创建"}</button>
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

export default CreateUserBox