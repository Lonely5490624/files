import React from 'react'
import bindAll from 'lodash.bindall'
import ajax from '../utils/ajax'
import { connect } from 'react-redux'

import DepListComponent from '../components/dep-list/dep-list'
import JobListComponent from '../components/job-list/job-list'

import { setCurrentDep } from '../reducers/department'
import { setCurrentJob } from '../reducers/job'

class User extends React.PureComponent{
    constructor(props) {
        super(props)
        this.state = {
            depList: null,
            jobList: null,
            username: '',
            password: '',
            job_number: '',
            phone_number: '',
            true_name: '',
            nick_name: '',
            ID_card: ''
        }
        bindAll(this, [
            'getDepList',
            'getJobList',
            'handleDepItemClick',
            'handleJobItemClick',
            'handleInputUsername',
            'handleInputPassword',
            'handleInputJobNumber',
            'handleInputPhoneNumber',
            'handleInputTrueName',
            'handleInputNickName',
            'handleInputIDCard',
            'handleCreateUser'
        ])
    }
    async getDepList() {
        let result = await ajax.get('users/getDepartment')
        
        if (result.code === 0) {
            this.setState({
                depList: result.data
            })
        }
    }
    async getJobList(dep_id) {
        let result = await ajax.get(`users/getJobList?dep_id=${dep_id}`)
        
        if (result.code === 0) {
            this.setState({
                jobList: result.data
            })
        }
    }
    handleDepItemClick(id) {
        this.props.set_current_dep(id)
        this.props.set_current_job(0)
        this.getJobList(id)
    }
    handleJobItemClick(id) {
        this.props.set_current_job(id)
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
    async handleCreateUser() {
        let params = {
            username: this.state.username,
            password: this.state.password,
            dep_id: this.props.currentDepId,
            job_id: this.props.currentJobId,
            job_number: this.state.job_number,
            phone_number: this.state.phone_number,
            true_name: this.state.true_name,
            nick_name: this.state.nick_name,
            ID_card: this.state.ID_card
        }
        let result = await ajax.post('users/regUserStaff', params)
        if (result.code === 0) {
            
        }
    }
    async componentDidMount() {
        await this.getDepList()
        if (this.props.currentDepId) {
            await this.getJobList(this.props.currentDepId)
        }
    }
    render() {
        let {
            currentDepId,
            currentJobId
        } = this.props
        return (
            <>
                <h3>部门列表</h3>
                <DepListComponent
                    list={this.state.depList}
                    currentDepId={currentDepId}
                    onClickItem={this.handleDepItemClick}
                />
                <h3>岗位列表</h3>
                <JobListComponent
                    list={this.state.jobList}
                    currentJobId={currentJobId}
                    onClickItem={this.handleJobItemClick}
                />
                <div>
                    <input type="text" placeholder="用户名" value={this.state.username} onChange={this.handleInputUsername} />
                    <input type="text" placeholder="密码" value={this.state.password} onChange={this.handleInputPassword} />
                    <input type="text" placeholder="工号" value={this.state.job_number} onChange={this.handleInputJobNumber} />
                    <input type="text" placeholder="电话号码" value={this.state.phone_number} onChange={this.handleInputPhoneNumber} />
                    <input type="text" placeholder="真实姓名" value={this.state.true_name} onChange={this.handleInputTrueName} />
                    <input type="text" placeholder="昵称" value={this.state.nick_name} onChange={this.handleInputNickName} />
                    <input type="text" placeholder="身份证号码" value={this.state.ID_card} onChange={this.handleInputIDCard} />
                    <button onClick={this.handleCreateUser}>创建用户</button>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    currentDepId: state.department.dep_id,
    currentJobId: state.job.job_id
})

const mapDispatchToProps = dispatch => ({
    set_current_dep: dep_id => dispatch(setCurrentDep(dep_id)),
    set_current_job: job_id => dispatch(setCurrentJob(job_id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(User)