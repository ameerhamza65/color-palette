import React,{Component} from 'react';
import ColorBox from './colorbox';
import Navbar from './navbar';
import Footer from './palettefooter';
import {Link} from 'react-router-dom';
import './colorbox.css';
class Single extends Component{
    constructor(props){
        super(props);
        this.state={
            islink:false,format:'hex'
        }
        this._shade=this.getshades(this.props.palette,this.props.colorid)
        //console.log(this._shade);
        this.handlechange=this.handlechange.bind(this);
    }
    getshades(palette,id){
        let shades=[]
        let allcolors=palette.colors;
    for(let key in allcolors){
            shades=shades.concat(
                allcolors[key].filter(color=>color.id===id)
            )
    }
    return shades.slice(1);

    }
    handlechange(e){

        this.setState({format:e})

    }
    render(){
        const singlebox=this._shade.map(color=>(
            <ColorBox background={color[this.state.format]} name={color.name}
            key={color.name}/>
        ))
        return(
            <div className="single palette" >
                <Navbar
                handlechange={this.handlechange}
                showlevel={false}
                />
                <div className="palette-color">{singlebox}
            
                <Link className="goback-button" to={`/palette/${this.props.palette.id}`}>Go Back</Link>
                
                </div>    
                <Footer paletteName={this.props.palette.paletteName}
                  emoji={this.props.palette.emoji}/>
            </div>
        )
    }
}
export default Single;