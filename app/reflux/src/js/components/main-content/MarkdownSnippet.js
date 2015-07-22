var React = require('react');
var Markdown = require('markdown').markdown;

// CSS
var styles = require('./main-content.css');





var MarkdownSnippet = module.exports = React.createClass({

  componentDidMount() {
    this.appendHTML();
  },

  componentDidUpdate() {
    this.appendHTML();
  },

  render() {
    return(
      <div ref="markdownContainer"></div>
    )
  },

  appendHTML() {
    var $container = $(React.findDOMNode(this.refs.markdownContainer)),
        html = Markdown.toHTML(this.props.children);

    $container.html(html);
  }
})