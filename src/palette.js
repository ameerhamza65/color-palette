import React, {Component} from 'react';
import ColorBox from './colorbox';
import Navbar from './navbar';
import Footer from './palettefooter';

import './palette.css'
class Pallette extends Component{
    constructor(props){
        super(props);
        this.state={
            level:500,format:'hex',islink:true
        }
        this.changelevel=this.changelevel.bind(this);
        this.handlechange=this.handlechange.bind(this);
    }
    changelevel(lvl){
        this.setState({level:lvl});
    }
    handlechange(e){

        this.setState({format:e})

    }
    render(){
        const {format}=this.state;
        console.log(this.props.palette.colors);
        const colorbox=this.props.palette.colors[this.state.level].map(color=>(
            <ColorBox background={color[format]} name={color.name} 
            url={`${this.props.palette.id}/${color.id}`}
            islink={this.state.islink}
            key={color.name}
            />
        ))
        return(
            <div className="palette">
                <Navbar
                level={this.state.level}
                changelevel={this.changelevel}
                handlechange={this.handlechange}
                showlevel={this.state.islink}
                />
                <div className="palette-color">
                    {colorbox}
                    <Footer paletteName={this.props.palette.paletteName}
                    emoji={this.props.palette.emoji}
                    />
                </div>
            </div>
        )
    }
}
export default Pallette;