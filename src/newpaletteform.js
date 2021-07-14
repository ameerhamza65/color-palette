import React , {Component} from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom'
import Draggablecolorbox from './draggablecolorbox'
import { withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { CallReceived } from '@material-ui/icons';
import Draggablecolorlist from './draggablelist'
import {arrayMove} from 'react-sortable-hoc';
import PaletteMataForm from './paletteMetaForm';
//import { Link } from '@material-ui/core';

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
      
    }),
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    height:'64px',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height:"calc(100vh-64px)",
    padding: '0px',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  colorPickerContainer:{
    width:'90%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    height:'100%'
  },
  picker:{
    width:'80% !important',
    marginTop:'2rem',
  },
  addColor:{
    width:'100%',
    padding:'.5rem',
    marginTop:'70px',
    fontSize:'1rem',
  },
  colorNameInput:{
    width:'100%',
    height:'15px',
    marginTop:'10px',
  },
  Buttons:{
    width:'100%',
    marginLeft:'20px'
  },
  Button:{
    width:'50%',
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class Newpaletteform extends Component{
static defaultProps={
  max:20
}
constructor(props){
  super(props);
  this.state={
    open:false,
    newName:'',
    paletteName:'',
    currentcolor:'pink',
    color:this.props.palette[0].colors
  }
  this.updatecolor=this.updatecolor.bind(this);
  //this.handleNameChange=this.handleNameChange.bind(this);
  this.handleSavePalette=this.handleSavePalette.bind(this);
  this.removeColor=this.removeColor.bind(this);
  this.clearColor=this.clearColor.bind(this);
  this.addRandomColor=this.addRandomColor.bind(this);
  this.handleNameChange=this.handleNameChange.bind(this);
}
componentDidMount(){
  ValidatorForm.addValidationRule('isColorNameUnique',value=>
  this.state.color.every(({name})=>name.toLowerCase()!==value.toLowerCase())
  )
  ValidatorForm.addValidationRule('isColorUnique',value=>
  this.state.color.every(({color})=>color.toLowerCase()!==this.state.currentcolor.toLowerCase())
  )
  
}
handleDrawerOpen=()=>{
  this.setState({open:true})
}
handleDrawerClose=()=>{
  this.setState({open:false})
}
changecurrentcolor(newcolor){
  //console.log(newcolor);
  this.setState({currentcolor:newcolor.hex})
}
updatecolor(){
  const newcolor={name:this.state.newName,color:this.state.currentcolor}

  this.setState({color:[...this.state.color,newcolor],newName:''})

}
handleSavePalette(newName,emoji){
  const palette={
    paletteName:newName,
    id:newName.toLowerCase().replace(/ /g, "-"),
    colors:this.state.color,
    emoji:emoji
  }
  this.props.savePalette(palette);
  this.props.history.push(`/`);
}
handleNameChange(evt){
  this.setState({[evt.target.name]:evt.target.value})
}
removeColor(colorName){
  this.setState({
    color:this.state.color.filter(color=>color.name!==colorName)
  })
}
onSortEnd = ({oldIndex, newIndex}) => {
  this.setState(({color}) => ({
    color: arrayMove(color, oldIndex, newIndex),
  }))
};
clearColor(){
  this.setState({color:[]})
}
addRandomColor(){
  const allColors=this.props.palette.map(p=>p.colors).flat();
  let randcolor=allColors[Math.floor(Math.random()*allColors.length)]
  this.setState({color:[...this.state.color,randcolor]});

}
  render(){
    const {classes,theme}=this.props
    const {open}=this.state
    return(
      <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="default"
        className={classNames(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={this.handleDrawerOpen}
            edge="start"
            className={classNames(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Craete A Color Palette
          </Typography>
          <PaletteMataForm
                  palette={this.props.palette}
                  handleSavePalette={this.handleSavePalette}
                  />
                  </Toolbar>
                  
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
          <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.colorPickerContainer}>
        <Typography variant='h4' gutterBottom>Design your Palette</Typography>
        <div className={classes.Buttons}>
        <Button variant="contained" color="secondary"
         onClick={this.clearColor}
         className={classes.Button}
         >
         Clear Palette
       </Button>
       <Button variant="contained" color="primary" 
       disabled={this.state.color.length>=this.props.max}
       onClick={this.addRandomColor}
       className={classes.Button}

       >
         Add Random
       </Button>
       </div>
        <ChromePicker
        onChangeComplete={(newcolor)=>this.changecurrentcolor(newcolor)}
        color="black"
        className={classes.picker}
        />
        
          <ValidatorForm onSubmit={this.updatecolor}>
            <TextValidator
              value={this.state.newName}
              name='newName'
              className={classes.colorNameInput}
              onChange={this.handleNameChange}
              variant='filled'
          
              placeholder='Color Name'
              validators={['required', 'isColorNameUnique','isColorUnique']}
              errorMessages={['Enter a color name', 
              'Color Name Already exist',
              'Color Already exist']}
            />
            <Button style={{ background: this.state.color.length>=this.props.max? 
            'gray':this.state.currentcolor}}
              variant="contained" color="primary"
              type='submit'
              disabled={this.state.color.length>=this.props.max}
              className={classes.addColor}
            >
            {this.state.color.length>=this.props.max?'Palette Full':'Add color'}
         </Button>
          </ValidatorForm>
          </div>
        </Drawer>
        
      <main
        className={classNames(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Draggablecolorlist
        color={this.state.color}
        removeColor={this.removeColor}
        onSortEnd={this.onSortEnd}
        axis='xy'
        />
      </main>
    </div>
  );
  }
}
export default withStyles(styles,{withTheme:true})(Newpaletteform);