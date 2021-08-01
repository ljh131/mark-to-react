import React, {Component} from 'react';
import * as R from 'ramda';
import Typography from '@material-ui/core/Typography';

import SyntaxHighlighter, {registerLanguage} from 'react-syntax-highlighter/dist/light';
import tomorrowNightEighties from 'react-syntax-highlighter/styles/hljs/tomorrow-night-eighties';

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
  'js': javascript,
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

class A extends Component {
  render() {
    const url = this.props.src || this.props.href;

    if (/\.(bmp|png|jpg|jpeg|tiff|gif)$/.test(url)) {
      return (
        <a target='_blank' href={url}>
          <img src={url} alt={this.props.alt || url}/>
        </a>
      );
    } else if (/\.(mp4|ogg)$/.test(url)) {
      return (
        <video src={url} controls/>
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

class Codeblock extends Component {
  render() {
    if (this.props.lang) {
      return (
        <SyntaxHighlighter
          language={this.props.lang || ''}
          style={tomorrowNightEighties}
          customStyle={{padding: '15px'}}
          lineNumberContainerStyle={{float: 'left', paddingRight: '20px'}}
          showLineNumbers>
          {this.props.children[0]}
        </SyntaxHighlighter>
      );
    } else {
      return (
        <pre className='md-code-simple'>
          <code className='md-code-simple'>{this.props.children}</code>
        </pre>
      );
    }
  }
}

class Toc extends React.Component {
  render() {
    return (
      <div className='Toc' id='toc'>
        <div>
          <Typography gutterBottom align="left">
            Table of Content
          </Typography>
        </div>
        {this.props.children}
      </div>
    );
  }
}

class TocItem extends React.Component {
  render() {
    const INDENT_UNIT = 10;
    const indent = (this.props.level - 1) * INDENT_UNIT + 'px';

    return (
      <div className='Toc-item' style={{marginLeft: indent}}>
        {this.props.number}
        <a href={`#`}> {this.props.children}</a>
      </div>
    );
  }
}

export {
  A,
  Codeblock,
  Toc,
  TocItem
}
