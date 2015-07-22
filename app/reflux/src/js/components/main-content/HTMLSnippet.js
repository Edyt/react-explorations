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






var HTMLSnippet = module.exports = React.createClass({

  componentDidUpdate() {
    loadSyntaxHighlight();
  },

  render() {
    return(
      <pre>
        <code className="html">
          {this.props.children}
        </code>
      </pre>
    )
  }
})