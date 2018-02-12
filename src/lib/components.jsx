import React, { Component } from 'react';
import { generate } from 'shortid';
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/dist/light';
import tomorrowNightEighties from 'react-syntax-highlighter/styles/hljs/tomorrow-night-eighties'; 
import * as R from 'ramda';

import cpp from 'react-syntax-highlighter/dist/languages/hljs/cpp';
import java from 'react-syntax-highlighter/dist/languages/hljs/java';
import javascript from 'react-syntax-highlighter/dist/languages/hljs/javascript';
import coffeescript from 'react-syntax-highlighter/dist/languages/hljs/coffeescript';
import typescript from 'react-syntax-highlighter/dist/languages/hljs/typescript';
import kotlin from 'react-syntax-highlighter/dist/languages/hljs/kotlin';
import swift from 'react-syntax-highlighter/dist/languages/hljs/swift';
import go from 'react-syntax-highlighter/dist/languages/hljs/go';

import perl from 'react-syntax-highlighter/dist/languages/hljs/perl';
import php from 'react-syntax-highlighter/dist/languages/hljs/php';
import python from 'react-syntax-highlighter/dist/languages/hljs/python';
import ruby from 'react-syntax-highlighter/dist/languages/hljs/ruby';
import scala from 'react-syntax-highlighter/dist/languages/hljs/scala';
import smalltalk from 'react-syntax-highlighter/dist/languages/hljs/smalltalk';
import r from 'react-syntax-highlighter/dist/languages/hljs/r';

import makefile from 'react-syntax-highlighter/dist/languages/hljs/makefile';
import json from 'react-syntax-highlighter/dist/languages/hljs/json';
import sql from 'react-syntax-highlighter/dist/languages/hljs/sql';
import xml from 'react-syntax-highlighter/dist/languages/hljs/xml';
import vim from 'react-syntax-highlighter/dist/languages/hljs/vim';
import css from 'react-syntax-highlighter/dist/languages/hljs/css';

import bash from 'react-syntax-highlighter/dist/languages/hljs/bash';
import powershell from 'react-syntax-highlighter/dist/languages/hljs/powershell';
import markdown from 'react-syntax-highlighter/dist/languages/hljs/markdown';
import nginx from 'react-syntax-highlighter/dist/languages/hljs/nginx';

const langs = {
  'cpp': cpp, 
  'java': java, 
  'javascript': javascript, 
  'coffeescript': coffeescript, 
  'typescript': typescript, 
  'kotlin': kotlin,
  'swift': swift,
  'go': go,
  'perl': perl,
  'php': php,
  'python': python,
  'ruby': ruby,
  'scala': scala,
  'smalltalk': smalltalk,
  'r': r,
  'makefile': makefile,
  'json': json,
  'sql': sql,
  'xml': xml,
  'vim': vim,
  'css': css,
  'bash': bash,
  'powershell': powershell,
  'markdown': markdown,
  'nginx': nginx
}

R.forEachObjIndexed((v, k) => registerLanguage(k, v), langs);

class Markdown extends Component {
  render() {
    const refs = [];

    for (let refName in this.props.references) {
      const ref = this.props.references[refName];
      refs.push(<p key={ generate() } id={ refName }>[{ refName }] { ref.href }</p>);
    }

    return [ this.props.children, refs ];
  }
}

class H extends Component {
  render() {
    return React.createElement('h' + this.props.level, {}, this.props.children);
  }
}

class Hr extends Component {
  render() {
    return <hr />;
  }
}

class P extends Component {
  render() {
    return <p>{ this.props.children }</p>;
  }
}

class Span extends Component {
  render() {
    return <span>{ this.props.children }</span>;
  }
}

// FIXME 단순히 이렇게 리턴하는게 많은데 팩토리를 만드는게;
class Ul extends Component {
  render() {
    return <ul>{ this.props.children }</ul>;
  }
}

class Li extends Component {
  render() {
    return <li>{ this.props.children }</li>;
  }
}

class Ol extends Component {
  render() {
    return <ol>{ this.props.children }</ol>;
  }
}

class Em extends Component {
  render() {
    return <em>{ this.props.children }</em>;
  }
}

class Underline extends Component {
  render() {
    return <u>{ this.props.children }</u>;
  }
}

class Strike extends Component {
  render() {
    return <s>{ this.props.children }</s>;
  }
}

class Strong extends Component {
  render() {
    return <strong>{ this.props.children }</strong>;
  }
}

class A extends Component {
  render() {
    const url = this.props.src || this.props.href;

    if(/\.(bmp|png|jpg|jpeg|tiff|gif)$/.test(url)) {
      return (
        <a target='_blank' href={url}>
          <img src={url} alt={this.props.alt || url} />
        </a>
      );
    } else if(/\.(mp4|ogg)$/.test(url)) { 
      return (
        <video src={url} controls />
      );
    } else {
      return (
        <a target='_blank' href={url}>
          {this.props.children}
        </a>
      );
    }
  }
}

class Img extends Component {
  render() {
    const src = this.props.src || this.props.href;
    return (
      <a target='_blank' href={src}>
        <img src={src} alt={this.props.alt} />
      </a>
    );
  }
}

class Video extends Component {
  render() {
    return <video src={ this.props.src } controls />;
  }
}

class Blockquote extends Component {
  render() {
    return <blockquote>{ this.props.children }</blockquote>;
  }
}

class Codeblock extends Component {
  render() {
    if(!!this.props.lang) {
      return (
        <SyntaxHighlighter 
          language={this.props.lang || ''} 
          style={tomorrowNightEighties} 
          customStyle={{padding: '15px'}}
          lineNumberContainerStyle={{float: 'left', paddingRight: '20px'}}
          showLineNumbers >
          {this.props.children[0]}
        </SyntaxHighlighter>
      );
    } else {
      return (
        <pre className='md-code-simple'>
          <code className='md-code-simple'>{ this.props.children }</code>
        </pre>
      );
    }
  }
}

class Inlinecode extends Component {
  render() {
    return <code className='md-inlinecode'>{ this.props.children }</code>;
  }
}

class Table extends Component {
  render() {
    return <table>{ this.props.children }</table>;
  }
}

class Thead extends Component {
  render() {
    return <thead>{ this.props.children }</thead>;
  }
}

class Tbody extends Component {
  render() {
    return <tbody>{ this.props.children }</tbody>;
  }
}

class Tr extends Component {
  render() {
    return <tr>{ this.props.children }</tr>;
  }
}

class Th extends Component {
  render() {
    return <th>{ this.props.children }</th>;
  }
}

class Td extends Component {
  render() {
    return <td>{ this.props.children }</td>;
  }
}

class Toc extends Component {
  render() {
    return <div>{ this.props.children }</div>;
  }
}


export { 
  Markdown,    
  H,
  Hr,
  P,
  Span,
                                      
  Ul,
  Ol,
  Li,
                                      
  Strike,
  Strong,
  Em,
  Underline,
  A,
                                      
  Img,
  Video,
  Blockquote,
  Codeblock,
  Inlinecode,
                                      
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
                                      
  Toc,
};
