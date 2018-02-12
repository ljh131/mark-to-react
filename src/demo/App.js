import React from 'react';
import Reboot from 'material-ui/Reboot';
import Input from 'material-ui/Input';
import Typography from 'material-ui/Typography';

import Markdown from '../lib';

import './index.css';

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
      <div className="Demo">
        <Reboot />
        <div className="Demo-head">
          <Typography variant="headline" gutterBottom>
            mark-to-react Live Demo
          </Typography>
        </div>
        <div className="Demo-input">
          <Typography variant="title" gutterBottom>
            MARKDOWN TEXT:
          </Typography>
          <Input 
            className="Demo-input-text"
            multiline={true}
            fullWidth={true}
            type="text" 
            value={this.state.text} 
            onChange={this.handleChangeText}/>
        </div>

        <div className="Demo-output">
          <Typography variant="title" gutterBottom>
            RENDERED:
          </Typography>
          <div className="Demo-output-markdown">
            <Markdown 
              className="Markdown"
              text={this.state.text}/>
          </div>
        </div>
      </div>
    );
  }

  handleChangeText = (e) => {
    this.setState({text: e.target.value});
  }
}

export default App;
