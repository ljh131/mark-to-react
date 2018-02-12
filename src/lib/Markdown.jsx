import React from 'react';
import _ from 'lodash';
import { Parser } from 'mark-to-jsonml';

import * as Components from './components';

const MARKDOWN_COMPONENT_MAP = {
  'markdown': Components.Markdown,
  'h': Components.H,
  'hr': Components.Hr,
  'p': Components.P,

  'ul': Components.Ul,
  'ol': Components.Ol,
  'li': Components.Li,

  's': Components.Strike,
  'b': Components.Strong,
  'i': Components.Em,
  'u': Components.Underline,
  'a': Components.A,

  'img': Components.Img,
  'video': Components.Video,
  'blockquote': Components.Blockquote,
  'codeblock': Components.Codeblock,
  'code': Components.Inlinecode,

  'table': Components.Table,
  'thead': Components.Thead,
  'tbody': Components.Tbody,
  'tr': Components.Tr,
  'th': Components.Th,
  'td': Components.Td,
};

const parser = new Parser({ parseToc: true });   

export class Markdown extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    let elements = this.props.parsed;

    if(!elements) {
      elements = parser.parse(this.props.text);
    }

    if(elements.length > 0 && elements[0] !== 'markdown') {
      console.error("jsonml markdown should be start with 'markdown'");
      return null;
    }

    console.log('text', this.props.text);
    console.log('parsed', elements);

    return this.componentLoop(elements);
  }

  componentLoop = (elements) => {
    //console.log('begin componentLoop', elements);

    const children = [];
    let name;
    let args = {};
    elements.forEach((element, i) => {
      if (i === 0) {
        name = element;
      } else {
        if (_.isObject(element) && !_.isArray(element)) {
          args = element;
        } else {
          if (_.isArray(element)) {
            children.push(this.componentLoop(element));
          } else {
            children.push(element);
          }
        }
      }
    });

    return this.findComponent(name, args, children);
  };

  findComponent = (name, args, children) => {
    //console.log('begin findComponent', name, args, children);

    const replace = this.props.replace || {};
    const replaceProps = this.props.replaceProps || {};

    const el = replace[name] || MARKDOWN_COMPONENT_MAP[name] || Components.P;
    if(!el) return null;

    const elProps = Object.assign({}, args, { key: 'r' + Math.random(), target: args.ref }, replaceProps);
    return React.createElement(el, elProps, children);
  };

};

export default Markdown;
