import React from 'react'
import classnames from 'classnames'

import styles from './department-tree.module.scss'

class DepartmentTree extends React.PureComponent{
    render() {
        const {
            item
        } = this.props

        return (
                item && item.length ?
                    item.map(ele => (
                        <div className={classnames(styles.pLeft10)} key={ele.dep_id}>
                            <div className="dep-name">{ele.dep_name}</div>
                            {
                                ele.children && ele.children.length ?
                                <DepartmentTree item={ele.children} /> :
                                null
                            }
                        </div> 
                    )) :
                    null
        )
    }
}

export default DepartmentTree