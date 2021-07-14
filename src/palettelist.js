
import React, {Component} from 'react'
import {withStyles} from '@material-ui/styles';

import {Link} from 'react-router-dom';
import Minipalette from './minipalette'
const style={
 root:{
     backgroundColor:'blue',
     height:"200vh",
     backgroundRepeat: 'repeat-y',
     dislpay:"flex",
     alignItems:"flex-start",
     justifyContent:"center"
 }   ,
 container:{
    width:'50%',
    display:'flex',
    alignItems:'flex-start',
    justifyContent:'center',
    flexDirection:"column",
    flexWrap:'wrap',
    margin:'auto',

 }   ,
nav:{
    display:'flex',
    alignItems:'center',
    color:'White',
    justifyContent:'space-between',

}   ,
palette:{
    boxSizing:'border-box',
    width:'100%',
    display:'grid',
    gridTemplateColumns:'repeat(3,30%)',
    gridGap:'3%'

},
createpalette:{
    position:'absolute',
    left:'890px',
    textDecoration:'none',
    color:'white',
}
};
class Palettelist extends Component{
    gotopalette(id){
        console.log(id);
        this.props.history.push(`palette/${id}`);
    }
    render(){
        const {classes}=this.props;
        return(
            <div className={classes.root}>
                <div className={classes.container}>
                        <nav className={classes.nav}>
                        <h3>Color Picker</h3>
                        <Link className={classes.createpalette} to="/palette/new">Create Palette</Link>
                        </nav>
                        <div className={classes.palette}>
                        {this.props.palette.map(palette=>(
                       <Minipalette {...palette} handleclick={()=>this.gotopalette(palette.id)}
                       key={palette.id}
                       id={palette.id}
                       removePalette={this.props.removePalette}
                       />
                          ))}
                        </div>
                </div>
            </div>
        )
    }
}
export default withStyles(style)(Palettelist);
