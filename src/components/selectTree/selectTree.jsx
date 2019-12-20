import React from 'react'
import ReactDOM from 'react-dom'
import styles from './selectTree.module.scss'
/* import bindAll from 'lodash.bindall' */

/* import ajax from '../../utils/ajax' */

class SelectTree extends React.PureComponent {
    constructor() {
        super()
        this.state = {
            item:null,
            toggle:false
        }
        document.addEventListener("click",this.handleDomClick.bind(this))
        /*  bindAll(this, [
             '',
            
         ]) */
    }

    handleDomClick(e){
        if(e.target != this.refs.input){
            this.setState({
                toggle:false
            })
        }
       
    }
    componentDidMount() {
        this.setState({
            item:this.props.depItem
        })
    }
    createTree(dataTree){
        let list = [];

        dataTree.map((item, index) => {
            let next;
            if (item.children&&item.children.length>0) {

                next = this.createTree(item.children);
            }
            let li = <li key={index} >
                <label onClick={this.selectValue.bind(this,item)}><em>{item.dep_name}</em></label>
                {next}
            </li>;
            list.push(li);
        })
        return <ul >{list}</ul>
    }
    selectValue(item){
        let {onChange} =this.props
        this.setState({
            item:item,
            toggle:false
        })
        onChange(item)
    }
    
    handleToggle(toggle){
        this.setState({
            toggle:toggle
        })
    }
    
    render() {
        const {
            dataTree,
            className,
        } = this.props
        let { item,toggle } = this.state

        return (
            <div className={styles.selectTree + className}>
                <input ref="input" readOnly onClick={this.handleToggle.bind(this,true)}  type="text" value={item?item.dep_name:""}/>
                {toggle? <div>
                {this.createTree(dataTree)}
                </div>:null}
            </div>
        )
    }
}

export default SelectTree