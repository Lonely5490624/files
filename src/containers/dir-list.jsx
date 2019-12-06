import React from 'react'
import bindAll from 'lodash.bindall'
import { connect } from 'react-redux'
import ajax from '../utils/ajax'

import DirListComponet from '../components/dir-list/dir-list'

class DirList extends React.PureComponent{
    constructor(props) {
        super(props)
        bindAll(this, [
            'setRef',
            'handleUploadFile'
        ])
    }
    setRef(ref) {
        this.ref = ref
    }
    async handleUploadFile() {
        let file = this.ref.files[0]
        let param = new FormData()
        param.append('file', file)
        param.append('dir_id', this.props.currentDirId)
        let config = {
            header: {'Content-Type': 'multipart/form-data'}
        }
        let result = await ajax.post('files/uploadFile', param, config)
        console.log(result)
    }
    render() {
        const {
            fileList
        } = this.props
        return (
            <>
                <div>
                    <button onClick={this.handleUploadFile}>上传</button>
                    <input type="file" ref={this.setRef} />
                </div>
                {fileList && fileList.length ?
                    (<DirListComponet
                        fileList={fileList}
                    />) :
                    (<p>暂无文件</p>)
                }
            </>
        )
    }
}

const mapStateToProps = state => ({
    currentDirId: state.dir_id
})

export default connect(
    mapStateToProps
)(DirList)