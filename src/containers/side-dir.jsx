import React from 'react'

import SideDirComponent from '../components/side-dir/side-dir'


export default class SideDir extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            show: true
        }
    }
    render() {
        let {
            onClickDir,
            currentDirId,
            list
        } = this.props
        return(
            <SideDirComponent
                currentDirId={currentDirId}
                list={list}
                onClickDir={onClickDir}
            />
        )
    }
}

