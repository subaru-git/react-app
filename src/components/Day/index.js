import React, { Component } from 'react'
import { SelectableGroup } from 'react-selectable'
import Row from '../Row'

export default class extends Component {
  state = {
    selectedItems: []
  }

  handleSelection (keys) {
    console.log(keys);
    
    this.setState({
      selectedItems: keys
    })
  }

  render () {
    return (
      <div className="Day">
        <SelectableGroup
          ref="selectable"
          className="main"
          enableDeselect
          tolerance={0}
          globalMouse={false}
          onSelection={this.handleSelection.bind(this)}
          allowClickWithoutSelected={false}
          selectOnMouseMove={true}>
          <Row selectableKey={1} key={1} selected={this.state.selectedItems.indexOf(1) > -1}/>
          <Row selectableKey={2} key={2} selected={this.state.selectedItems.indexOf(2) > -1}/>
          <Row selectableKey={3} key={3} selected={this.state.selectedItems.indexOf(3) > -1}/>
          <Row selectableKey={4} key={4} selected={this.state.selectedItems.indexOf(4) > -1}/>
          <Row selectableKey={5} key={5} selected={this.state.selectedItems.indexOf(5) > -1}/>
        </SelectableGroup>
      </div>
    )
  }
}
