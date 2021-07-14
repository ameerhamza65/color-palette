import React,{Component} from 'react';
import {withStyles} from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const styles={
    root:{
        backgroundColor:"white",
        
        borderRadius:"5px",
        padding:"0.2rem",
        position:"relative",
        height:'160px',
        overflow:"hidden",
       cursor:'pointer',
      "&:hover svg":{
          opacity:'1',
      }
    },
    color:{
        backgroundColor:'#dae1e4',
        height:'120px',
        width:'100%',
        borderRadius:'5px',
        overflow:'hidden'
    },
    title:{
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            margin:'0',
            color:'black',
            paddingBottom:'0.1',
            fontSize:'0.8rem',
            position:'relative'

    },
    emoji:{
        marginLeft:'0.5rem',
        fontSize:'1rem'
    },
    miniColor:{
        width:'20%',
        height: '25%',
        margin: '0 auto',
        marginBottom:'-6px',
        display: 'inline-block',
        position: 'relative',
    },
    delete:{

    },
    deleteicon:{
        color:'white',
        backgroundColor:'#eb3d30',
        width:'20px',
        height:'20px',
        position:'absolute',
        right:'0px',
        top:'0px',
        padding:'10px',
        marginLeft:'2px',
        zIndex:'10',
        opacity:'0',
    }
};
function Minipalette(props){
    const {classes,paletteName,emoji,colors}=props;
    const handleremove= (e)=>{
        e.stopPropagation()
        props.removePalette(props.id);
    };
    return(
        
        <div className={classes.root} onClick={props.handleclick}>
        <DeleteIcon className={classes.deleteicon} 
        style={{tarnsition:"all 500ms cubic-bezier(0.4, 0, 0.2, 1) 0mst"}}
        onClick={handleremove}
        />
            
            <div className={classes.color}>
                {colors.map(color=>(
                    <div className={classes.miniColor} style={{background:color.color}}></div>
                ))}
            </div>
            <div className={classes.title}>
                <h4>{paletteName}</h4>
                <span className={classes.emoji}>{emoji}</span>
            </div>
        </div>
        
    )
}
export default withStyles(styles)(Minipalette);