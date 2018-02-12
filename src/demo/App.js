import React from 'react';
import Markdown from '../lib';

const DEFAULT_TEXT = `{toc}                          
# hello parser!                                  
* first                                          
* second **bold ~~and strike~~** plain           
 * nested                                        
  1. deeply *nested*                             
  1. and ordered                                 
## try _this!_                                   
\`\`\`javascript                                 
console.log("hello parser!");                    
\`\`\``;                                         

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: DEFAULT_TEXT};
  }

  render() {
    return (
      <div>
        <div>
          <span>MARKDOWN TEXT:</span>
          <input type="text" value={this.state.text} onChange={this.handleChangeText}/>
        </div>

        <div>
          <span>RENDERED:</span>
          <Markdown text={this.state.text}/>
        </div>
      </div>
    );
  }

  handleChangeText = (e) => {
    this.setState({text: e.target.value});
  }
}

export default App;
