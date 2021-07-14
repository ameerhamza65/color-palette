import React , {Component} from 'react';
import './colorbox.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Link} from 'react-router-dom';
import chroma from 'chroma-js'
class ColorBox extends Component{
    constructor(props){
        super(props);
        this.state={
            isCopied:false
        }
        this.changeCopy=this.changeCopy.bind(this);
    }
    changeCopy(){
        this.setState({isCopied:true},
            ()=>{setTimeout(()=>this.setState({isCopied:false}),1500)});
    }
    render(){
        const islight=chroma(this.props.background).luminance()<=0.08;
        const isdark=chroma(this.props.background).luminance()>=0.6;

        return(
            <CopyToClipboard text={this.props.background} onCopy={this.changeCopy}>
            <div style={{background:this.props.background}} className="colorbox">
                <div style={{background:this.props.background}} 
                className={`overlay ${this.state.isCopied && "show"}`}>
                </div>
                <div className={`message ${this.state.isCopied && "show"}`}>
                    <h3>Copied..!</h3>
                    <p>{this.props.background}</p>
                </div>
               <div className="copy-container">
                   <div className={`box-content ${islight && "light"}`}>
                    {this.props.name}
                   </div>
                   <button className={`copy-button ${isdark && "dark"}`}>copy</button>
               </div>
               {this.props.islink &&
               <Link to={this.props.url} onClick={e=>e.stopPropagation()}>
                  <span className={`see-more ${isdark && "dark"}`}>More</span>
               </Link>}
            </div>
            </CopyToClipboard>
        )
    }
}
export default ColorBox;