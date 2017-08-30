import React from 'react';
import { render } from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Router, IndexRoute, Route, Link } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import $ from 'jquery';
import fullpage from 'fullpage.js';

require('./style.css');
require('./jquery.fullPage.css');

var navLinks = [
  {id: 0, title: 'Home', to: '/'},
  {id: 1, title: 'Writings', to: '/writings'},
  {id: 2, title: 'Projects', to: '/projects'},
  {id: 3, title: 'Contact', to: '/contact'},
];

var homeSections = [
  {id: 0, title: null, anchor: 'about', text: 'A brief bit of information about this web site and me, Aaron Browne.'},
  {id: 1, title: 'Writings', anchor: 'writings', text: 'A description of why and what I write.'},
  {id: 2, title: 'Projects', anchor: 'projects', text: 'Some information about what projects I\'ve done and why and for who.'},
  {id: 3, title: 'Contact', anchor: 'contact', text: 'How and for what reasons I\'m willing to be contacted.'}
];

function App(props) {
  var child = React.Children.only(props.children);
  var sidebar = child.type === Home
  return (
    <div>
      <Header sidebar={sidebar} nav={navLinks}/>
      <Background sidebar={sidebar}/>
      {props.children}
    </div>
  )
}

function Writings(props) {
  return <div />
}

function Projects(props) {
  return <div />
}

function Contact(props) {
  return <div />
}

function Background(props) {
  var width = props.sidebar ? '50%' : '100%';
  var opacity = props.sidebar ? '1' : '.1';
  var key = props.sidebar ? 'sidebar' : 'background';
  var className = key;

  var styles = {
    width: width,
    height: '100%',
    opacity: opacity,
    float: 'left',
    position: 'fixed',
    zIndex: '-1',
    top: '0',
    left: '0',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left center',
    backgroundSize: 'cover',
    backgroundImage: 'url(' + require('file!baby.jpg') + ')'
  };

  return (
    <ReactCSSTransitionGroup
      transitionName='background'
      transitionEnterTimeout={1000}
      transitionLeaveTimeout={100}
    >
      <div className={className} key={key} style={styles}/>
    </ReactCSSTransitionGroup>
  )
}
Background.defaultProps = {sidebar: false};

function Header(props) {
  var width = props.sidebar ? '50%' : '100%';
  var marginLeft = props.sidebar ? '50%' : '0';
  var key = props.sidebar ? 'right': 'full';
  var className = key;

  var headerStyles = {
    width: width,
    marginLeft: marginLeft,
    float: 'left',
    position: 'fixed',
    top: '0',
    left: '0'
  };

  var authorStyles = {
    textAlign: 'left',
    float: 'left',
    position: 'relative',
    marginLeft: '.5em'
  };

  return (
    <ReactCSSTransitionGroup
      transitionName='header'
      transitionEnterTimeout={1000}
      transitionLeaveTimeout={100}
    >
      <div key={key} className={className} style={headerStyles}>
        <div style={authorStyles}>
          <h2 style={{marginTop: '0'}}>Aaron Browne</h2>
        </div>
        <TitleNav nav={props.nav}/>
      </div>
    </ReactCSSTransitionGroup>
  )
}
Header.defaultProps = {sidebar: false};

var TitleNav = React.createClass({
  getInitialState: function() {
    return {visible: false}
  },

  handleClick: function() {
    this.setState({visible: !this.state.visible})
  },

  render: function() {
    var titleStyles = {
      textAlign: 'right',
      float: 'right',
      position: 'relative',
      marginRight: '.5em'
    };

    var listStyles = {
      listStyle: 'none',
      margin: '0',
      padding: '0'
    };

    var headerStyles = {
      marginTop: '0',
      marginBottom: '.2em',
      fontSize: '2em'
    };

    var navStyles = {
      position: 'relative',
      float: 'left',
      margin: '0',
      padding: '0 .5em',
      borderRightStyle: 'solid',
      borderRightWidth: 'thin',
    };

    var lastNavStyles = {
      position: 'relative',
      float: 'left',
      margin: '0',
      padding: '0 .5em',
    };

    var linkStyles = {
      color: 'inherit',
      textDecoration: 'none'
    };

    var navs = []

    if (this.state.visible) {
      var maxNavId = this.props.nav[this.props.nav.length - 1].id,
        styles = navStyles;

      navs = this.props.nav.map(function(nav, i) {
        if (nav.id === maxNavId) {
          styles = lastNavStyles;
        } else {
          styles = navStyles;
        }

        return (
          <li style={styles} key={nav.id}>
            <Link to={nav.to} style={linkStyles}>
              {nav.title}
            </Link>
          </li>
        )

      });
    }

    return (
      <nav style={titleStyles}>
        <ul style={listStyles}>
          <li>
            <h1 style={headerStyles} onClick={this.handleClick}>
              Developing Human
            </h1>
            <ul style={listStyles}>
              <ReactCSSTransitionGroup
                transitionName='navs'
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
              >
                {navs}
              </ReactCSSTransitionGroup>
            </ul>
          </li>
        </ul>
      </nav>
    )
  }
});

var Home = React.createClass({
  componentDidMount: function() {
    $('#fullpage').fullpage({
      sectionSelector: '.home-section',
      navigation: true,
      navigationPosition: 'right',
      lockAnchors: true
    });
  },

  componentWillUnmount: function() {
    try {
      $.fn.fullpage.destroy('all');
    } catch (e) {}
  },

  render: function() {
    var styles = {
      marginLeft: '50%',
      zIndex: '-1',
      height: '60%'
    };

    var sections = homeSections.map(function(section, i) {
      return <HomeSection key={section.id} {...section} />
    });

    return <div id='fullpage' style={styles}>{sections}</div>
  }
});

function HomeSection(props) {
  var textStyles = {
    maxWidth: '20em',
    margin: '0 auto'
  };

  var hrStyles = {
    height: '.2em',
    background: 'rgb(0, 0, 0)',
    width: '5em',
    border: '0',
    margin: '1.5em 0'
  };

  return (
    <div className='home-section' data-anchor={props.anchor}>
      <div className='home-section-text' style={textStyles}>
        {(() => {
          if (props.title !== null) {
            return <h2>{props.title}</h2>
          }
        })()}
        <hr style={hrStyles}/>
        <p>{props.text}</p>
      </div>
    </div>
  )
}

render((
  <Router history={createBrowserHistory()}>
    <Route path='/' component={App}>
      <IndexRoute component={Home}/>
      <Route path='writings' component={Writings}/>
      <Route path='projects' component={Projects}/>
      <Route path='contact' component={Contact}/>
    </Route>
  </Router>
), document.getElementById('layout'));
