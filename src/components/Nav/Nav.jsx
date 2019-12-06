import React from 'react';
import "./Nav.scss";
import nav from "./navData";

class Nav extends React.Component {
    constructor() {
        super();
        this.handleToggle = this.handleToggle.bind(this);
        this.navMouseOver = this.navMouseOver.bind(this);
        this.navMouseLeave = this.navMouseLeave.bind(this);
        this.handleDomClick= this.handleDomClick.bind(this)
        document.addEventListener("click",this.handleDomClick)
        this.state = {
            data: nav,
            hasMax: true,
        }

    }
    handleDomClick(e){
        let targetDom = document.getElementsByClassName("show");
        for (var i = 0; i < targetDom.length; i++) {
            if(targetDom[i].previousSibling.tagName === "I"){
                targetDom[i].className = ""
            }
        }
    }
    handleToggle(e) {
        /* if(e.target.html==="+"){
            
        } */
        e.target.innerHTML = e.target.innerHTML === "+" ?
            "-" :
            "+";

        e.target.parentNode.nextSibling.className === "" ?
            e.target.parentNode.nextSibling.className = "show" :
            e.target.parentNode.nextSibling.className = "";
    }
    handleFileCtr(ctrType, id, e) {
        console.log(ctrType, id, e)
    }
    handleCtrToggle(e) {
        
        let className;
        if (e.target.tagName === "I") {
            className =e.target.nextSibling.className
            className === "" ? e.target.nextSibling.className = "show" : e.target.nextSibling.className = "";
        } else if (e.target.tagName === "EM") {
            className =e.target.childNodes[1].className
            className === "" ? e.target.childNodes[1].className = "show" : e.target.childNodes[1].className = "";
        }
    }
    handleToRoute(id) {
        this.props.onDirClick(id)
    }

    createTree(data, type) {
        let list = [];
        data.menu.map((item, index) => {
            let next;
            if (item.menu) {
                next = this.createTree(item, type);
            }
            let li = <li key={index}>
                <dl style={{ paddingLeft: item.depth * 10 }}>
                    <dt onClick={item.menu ? this.handleToggle : null}>{item.menu ? "+" : ""}</dt>
                    <dd>
                        <span onClick={this.handleToRoute.bind(this, item.id)}>{item.name}</span>
                        {type === "fileTree" ?
                            <em onClick={this.handleCtrToggle.bind(this)}>
                                <i></i>
                                <ul>
                                    <li onClick={this.handleFileCtr.bind(this, item.id, "add")}>增</li>
                                    <li onClick={this.handleFileCtr.bind(this, item.id, "del")}>删</li>
                                    <li onClick={this.handleFileCtr.bind(this, item.id, "update")}>改</li>
                                </ul>
                            </em>
                            :
                            ""
                        }
                    </dd>
                </dl>
                {next}
            </li>;
            list.push(li);
        })
        return <ul>{list}</ul>
    }
    navMouseOver(e) {
        this.setState({
            hasMax: false
        })
    }
    navMouseLeave() {
        this.setState({
            hasMax: true
        })
    }
    render() {
        let { hasMax } = this.state;
        let { data, type } = this.props;

        hasMax = hasMax ? " hasMax" : "";
        return (
            <div className={"navLeft" + hasMax} onMouseLeave={this.navMouseLeave}>
                <div className={type} onMouseEnter={this.navMouseOver}>
                    {this.createTree(data, type)}
                </div>
                <div className="ctrBar" ref="ctrBar" >
                    <div>
                        <span></span>
                    </div>
                </div>
            </div>


        )
    }
}

export default Nav