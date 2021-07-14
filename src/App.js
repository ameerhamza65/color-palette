import React, { Component } from 'react';
import seedcolor from './seedColor';
import {Route,Switch} from 'react-router-dom'
import Palette from './palette'
import {generatePalette} from './colorhelper'
import Palettelist from'./palettelist';
import Single from './singlecolorpallete'
import Newpaletteform from './newpaletteform';
class App extends Component{
  constructor(props){
    super(props);
    const savedPalettes=JSON.parse(window.localStorage.getItem("palettes"));
    this.state={
      palette:savedPalettes||seedcolor
    }
    this.savePalette=this.savePalette.bind(this);
    this.findpalette=this.findpalette.bind(this);
    this.removePalette=this.removePalette.bind(this);
  }
  findpalette(id){
   return this.state.palette.find(function(palette){
      return palette.id===id;
    });
  }
  savePalette(palette){
    this.setState({palette:[...this.state.palette,palette]},this.asyncLocalStorage)
  }
  asyncLocalStorage(){
    window.localStorage.setItem('palettes',JSON.stringify(this.state.palette))
  }
  removePalette(id){
    this.setState({
      palette:this.state.palette.filter(pal=>pal.id!==id)
    },this.asyncLocalStorage)
  }
  render(){
    let id='material-ui-colors'
    return(
      
        <Switch>
          <Route path="/palette/new" render={(routeProps)=><Newpaletteform 
          palette={this.state.palette}
          savePalette={this.savePalette} {...routeProps}/>}/>
          <Route exact path="/" render={(routeProps)=><Palettelist
           palette={this.state.palette} removePalette={this.removePalette} 
           {...routeProps}/>}/>
          <Route exact path="/palette/:id" render={(routeProps)=><Palette
           palette={generatePalette(this.findpalette(routeProps.match.params.id))}/>}/>
           <Route   path="/palette/:paletteId/:colorid" render={(routeProps)=><Single
           palette={generatePalette(this.findpalette(routeProps.match.params.paletteId))}
            colorid={routeProps.match.params.colorid}/>}/>
           

           
        </Switch>
      
      //<Palette palette={generatePalette(seedcolor[1])}/>
    )
  }
}

export default App;
