
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {Link } from 'react-router-dom';
import { withStyles} from '@material-ui/core/styles';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'


const styles={
    navbtn:{
       marginLeft:'50px',
       inlineText:'none',
},
btn:{
    textDecoration:'none'

}

    }

class PaletteMataForm extends Component{
    constructor(props){
        super(props);
        this.state={
            open:false,
            paletteName:'',
            condition:'form'
        }
        this.handleClickOpen=this.handleClickOpen.bind(this)
        this.handleClose=this.handleClose.bind(this);
        this.handleNameChange=this.handleNameChange.bind(this);
        this.changeCondition=this.changeCondition.bind(this);
        this.submitForms=this.submitForms.bind(this);
       // this.handleSavePalette=this.handleSavePalette.bind(this);
    }
    componentDidMount(){
        ValidatorForm.addValidationRule('isPaletteNameUnique',value=>
       this.props.palette.every(({paletteName})=>paletteName.toLowerCase()!==value.toLowerCase())
  )
    }

    handleClickOpen () {
        this.setState({open:true})
      }
    
    handleClose (){
        this.setState({open:false,condition:'form'})
      };
      handleNameChange(evt){
        this.setState({[evt.target.name]:evt.target.value})
      }
      changeCondition(){
          this.setState({condition:'emoji',open:false})
      }
      submitForms(emoj){
          
          const name=this.state.paletteName;
          const emoji=emoj.native;
          this.props.handleSavePalette(name,emoji);
      }
    render(){
        const {open}=this.state;
        const {classes}=this.props
        return (
            <div>
                <Dialog open={this.state.condition==='emoji'}
                onClose={this.handleClose}
                >
                <Picker
                onSelect={this.submitForms} 
                />
                </Dialog>
                <div className={classes.navbtn}>
              <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                save
              </Button>
              <Link className={classes.btn} to='/'> <Button variant='contained'color='secondary'>
                  Go Back
             </Button></Link>
             </div>
              <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create A palette</DialogTitle>
                <ValidatorForm onSubmit={this.changeCondition}>
                <DialogContent>
                  <DialogContentText>
                   Please write a unique name for your beautiful Palette
                  </DialogContentText>
                  <TextValidator
                  value={this.state.paletteName}
                  validators={['required','isPaletteNameUnique']}
                  errorMessages={['Enter a palette Name','Palette Name Already Exist']}
                 onChange={this.handleNameChange}
                 name='paletteName'
                 fullWidth
               />
           

                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button variant="contained" color="primary"
                 type='submit'
                 >Save palette</Button>
                </DialogActions>
                </ValidatorForm>
              </Dialog>
            </div>
          );
    }
}
export default withStyles(styles)(PaletteMataForm); 