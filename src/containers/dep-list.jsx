import React from 'react'
import bindAll from 'lodash.bindall'
import ajax from '../utils/ajax'

import DepListComponent from '../components/dep-list/dep-list'

export default class DepList extends React.PureComponent{
    constructor() {
        super()
        this.state = {
            depList: null
        }
        bindAll(this, [
            'getDepList'
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
    componentDidMount() {
        this.getDepList()
    }
    render() {
        return (
            <DepListComponent
                list={this.state.depList}
            />
        )
    }
}