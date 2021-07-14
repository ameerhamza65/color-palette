import React ,{Component} from 'react'
import Slider from 'rc-slider';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import {Link} from 'react-router-dom'
import 'rc-slider/assets/index.css';
import './navbar.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { IconButton } from '@material-ui/core';

class Navbar extends Component{
    constructor(props){
        super(props);
        this.state={
            value:'hex',open:false
        }
        this.handlechange=this.handlechange.bind(this);
        this.closesnack=this.closesnack.bind(this);
    }
    handlechange(e){
        this.setState({value:e.target.value})
        this.props.handlechange(e.target.value);
        this.setState({open:true})
    }
    closesnack(){
        this.setState({open:false})
    }
    render(){
        return(
            <header className="navbar">
                <div className="logo">
                    <Link to="/">reactcolorpicker</Link>
                </div>
                {this.props.showlevel &&
                <div className="slider-container">
                    <span className="slider-level">
                        Level: {this.props.level}
                    </span>
                <div className="slider">
                <Slider
                min={100}
                max={900}
                step={100}
                defaultValue={this.props.level}
                onAfterChange={this.props.changelevel}
                />
                </div>
                </div>}
                <div className="select-container">
                    <Select value={this.state.value} onChange={this.handlechange}>
                        <MenuItem value='hex'>HEX-#fffff</MenuItem>
                        <MenuItem value='rgb'>RGB-(255,255,255)</MenuItem>
                        <MenuItem value='rgba'>RGBA-(255,255,255,0.1)</MenuItem>
                    </Select>
                </div>
                <Snackbar
                anchorOrigin={{vertical:'bottom',horizontal:'left',}}
                open={this.state.open}
                autoHideDuration={3000}
                message={<span id="message-id">Format Changed By {this.state.value}</span>}
                ContentProps={{
                    "aria-describedby":"message-id"
                    
                }}  
                onClose={this.closesnack}   
                action={[
                    <IconButton
                    onClick={this.closesnack}
                    color='inherit'
                    key='close'
                    aria-label='close'
                    >
                     <CloseIcon/>
                    </IconButton>
                ]}           
                />
            </header>
        )
    }
}
export default Navbar;