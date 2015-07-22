var React = require('react');

// CSS
var styles = require('./main-content.css');





function loadSyntaxHighlight() {
  $(document).ready(function() {
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  });
};





var CSSSnippet = module.exports = React.createClass({

  componentDidUpdate() {
    loadSyntaxHighlight();
  },

  render() {
    return(
      <pre>
        <code className="css">
          {this.props.children}
        </code>
      </pre>
    )
  }
})