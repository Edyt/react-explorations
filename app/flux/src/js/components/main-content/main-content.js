var React = require('react');
var MainContentStore = require('../../stores/MainContentStore');
var HTMLSnippet = require('./HTMLSnippet');
var CSSSnippet = require('./CSSSnippet');
var JSSnippet = require('./JSSnippet');
var MarkdownSnippet = require('./MarkdownSnippet');
var Tabs = require('react-simpletabs');

// CSS
var styles = require('./main-content.css');
require('../../../css/plugins/simpleTab.css');





// Controller-View
// Grab data from the Store using the Store's Getter methods
function getStateFromStores() {
  return {
    component: MainContentStore.getComponent()
  }
};





var MainContent = module.exports = React.createClass({

  getInitialState() {
    return getStateFromStores();
  },

  // Set-up communication between `Store` and `View`.
  // Data changes in the `Store` trigger the `setState` method in the View which will activate `Virtual DOM` to make appropriate changes in the UI
  componentDidMount() {
    MainContentStore.addChangeListener(this._onChange);

  },

  componentWillUnmount() {
    MainContentStore.removeChangeListener(this._onChange);
  },

  renderTabs() {
    if(!this.state.component.docs) {
      return;
    }

    var tab = this.state.component.docs.map(function(tab) {
      return (
        <Tabs.Panel title={tab.name}>
          <MarkdownSnippet>
            {tab.markdown}
          </MarkdownSnippet>
        </Tabs.Panel>
      )
    });

    return (
      <Tabs className={styles.tab}>
        {tab}
      </Tabs>
    )
  },

  render() {
    return (
      <div className={styles.container}>
        <h3 className={styles.header}>{this.state.component.name}</h3>

        <div className={styles.grid}>
          <div className={styles.colLg6}>
            <h4>HTML</h4>
            <HTMLSnippet>{this.state.component.html}</HTMLSnippet>
          </div>

          <div className={styles.colLg6}>
            <h4>SCSS</h4>
            <CSSSnippet>{this.state.component.css}</CSSSnippet>
          </div>
        </div>

        <h4>JS</h4>
        <JSSnippet>{this.state.component.js}</JSSnippet>

        {this.renderTabs()}
      </div>
    )
  },

  /**
   * Event handler for 'change' events coming from the MainContentStore
   */
  _onChange() {
    this.setState(getStateFromStores());
  }
})