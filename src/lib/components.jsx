import React, {Component} from 'react';

class Markdown extends Component {
  render() {
    const refs = [];
    let seq = 0;

    for (let refName in this.props.references) {
      const ref = this.props.references[refName];
      refs.push(<p key={`ref${seq++}`} id={refName}>[{refName}] {ref.href}</p>);
    }

    return (
      <div>
        {this.props.children}
        {refs}
      </div>
    );
  }
}

class H extends Component {
  render() {
    return React.createElement('h' + this.props.level, {}, this.props.children);
  }
}

class Hr extends Component {
  render() {
    return <hr/>;
  }
}

class P extends Component {
  render() {
    return <p>{this.props.children}</p>;
  }
}

class Br extends Component {
  render() {
    return <br/>;
  }
}

class Span extends Component {
  render() {
    return <span>{this.props.children}</span>;
  }
}

// FIXME 단순히 이렇게 리턴하는게 많은데 팩토리를 만드는게;
class Ul extends Component {
  render() {
    return <ul>{this.props.children}</ul>;
  }
}

class Li extends Component {
  render() {
    return <li>{this.props.children}</li>;
  }
}

class Ol extends Component {
  render() {
    return <ol>{this.props.children}</ol>;
  }
}

class Em extends Component {
  render() {
    return <em>{this.props.children}</em>;
  }
}

class Underline extends Component {
  render() {
    return <u>{this.props.children}</u>;
  }
}

class Strike extends Component {
  render() {
    return <s>{this.props.children}</s>;
  }
}

class Strong extends Component {
  render() {
    return <strong>{this.props.children}</strong>;
  }
}

class A extends Component {
  render() {
    const url = this.props.src || this.props.href;
    return (
      <a href={url}>
        {this.props.children}
      </a>
    );
  }
}

class Blockquote extends Component {
  render() {
    return <blockquote>{this.props.children}</blockquote>;
  }
}

class Codeblock extends Component {
  render() {
    return (
      <pre className='md-code-simple'>
        <code className='md-code-simple'>{this.props.children}</code>
      </pre>
    );
  }
}

class Inlinecode extends Component {
  render() {
    return <code className='md-inlinecode'>{this.props.children}</code>;
  }
}

class Table extends Component {
  render() {
    return <table>{this.props.children}</table>;
  }
}

class Thead extends Component {
  render() {
    return <thead>{this.props.children}</thead>;
  }
}

class Tbody extends Component {
  render() {
    return <tbody>{this.props.children}</tbody>;
  }
}

class Tr extends Component {
  render() {
    return <tr>{this.props.children}</tr>;
  }
}

class Th extends Component {
  render() {
    return <th>{this.props.children}</th>;
  }
}

class Td extends Component {
  render() {
    return <td>{this.props.children}</td>;
  }
}

class Toc extends Component {
  render() {
    return <div>
      <p>Table of Content</p>
      {this.props.children}
    </div>;
  }
}

class TocItem extends Component {
  render() {
    return <p>{this.props.children}</p>;
  }
}

export {
  Markdown,
  H,
  Hr,
  Br,
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
  TocItem
};
