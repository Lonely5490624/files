import React from 'react';
import "./Nav.scss";
import nav from "./navData";

class Nav extends React.Component {
    constructor() {
        super();
        this.handleToggle = this.handleToggle.bind(this);
        this.navMouseOver = this.navMouseOver.bind(this);
        this.navMouseLeave = this.navMouseLeave.bind(this);
        this.handleDomClick= this.handleDomClick.bind(this);
        this.handleNavToggle = this.handleNavToggle.bind(this);

        document.addEventListener("click",this.handleDomClick)
        this.state = {
            data: nav,
            hasMax: true,
            navShow:true
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
    handleToRoute(item, isShare,e) {
        if(document.getElementsByClassName("active")[0]){
            document.getElementsByClassName("active")[0].className="";
        }
        
        e.target.className = "active";
        this.props.onDirClick(item, isShare);
    }
    handleNavToggle(){
        let {navShow} =this.state;
        this.setState({
            navShow:!navShow
        })
    }
    createTree(data, type) {
        let list = [];
        data.menu.forEach((item, index) => {
            let next;
            if (item.menu) {
                next = this.createTree(item, type);
            }
            let nameArr =item.name.split("/")
            let nameIndex = nameArr.length-1
            let li = <li key={index}>
                <dl style={{ paddingLeft: item.depth * 10 }}>
                    <dt onClick={item.menu ? this.handleToggle : null}>{item.menu ? "+" : ""}</dt>
                    <dd>
                        <span className={""} onClick={this.handleToRoute.bind(this, item, item.isShare)}>{nameArr[nameIndex]}</span>
                        {/* {type === "fileTree" ?
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
                        } */}
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
        let { hasMax ,navShow} = this.state;
        let { data, type } = this.props;
        hasMax = hasMax ? " hasMax" : "";
        navShow = navShow?"":" hide"
        return (
            <div className={"navLeft" +  hasMax + navShow} onMouseLeave={this.navMouseLeave}>
                <div className={type} onMouseEnter={this.navMouseOver}>
                    {this.createTree(data, type)}
                </div>
                <div className="ctrBar" ref="ctrBar" >
                    <div onClick={this.handleNavToggle}>
                        <span></span>
                    </div>
                </div>
            </div>


        )
    }
}

export default Nav