import React from 'react';
import { withStyles} from '@material-ui/core/styles';
import { Block } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import {SortableContainer,SortableElement} from 'react-sortable-hoc';

const styles={
    root:{
        width:'20%',
    height: '125px',
    margin: '0 auto',
    display: 'inline-Block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-6px',
    "&:hover svg":{
        color:"white"
    }
    },
    content:{
        position: 'absolute',
    left: '0px',
    bottom: '0px',
    width: '90%',
    padding: '10px',
    color: 'rgba(0,0,0,0.5)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
    display:'flex',
    justifyContent:'space-between'
    },
    deleteIcon:{
        transition:'all 0.3s ease-in-out'
    }
}
const Draggablecolorbox=SortableContainer(props=>{
    const {classes}=props
    
return(
    <div style={{background:props.color}} className={classes.root}>
        <div className={classes.content}>
            <span>{props.name}</span>
            <DeleteIcon className={classes.deleteIcon}
             onClick={props.deleteColor}
            />
        </div>
        
    </div>
)
});
export default withStyles(styles)(Draggablecolorbox);