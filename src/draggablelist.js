import React from 'react';
import Draggablecolorbox from './draggablecolorbox';
import {SortableContainer,SortableElement} from 'react-sortable-hoc';
const Draggablecolorlist=SortableContainer(({color,removeColor})=>{
    return(
        <div style={{height:'100%',overflow: 'hidden',
    }}>
            {color.map((color,i)=>(
          <Draggablecolorbox color={color.color}
          index={i}
           name={color.name}
           key={color.name}
           deleteColor={()=>removeColor(color.name)}
           />
        ))}
        </div>
    );
});
export default Draggablecolorlist;