(function () {
  'use strict';

  var ui,
    styleObjects = [],
    stylesheetUL;

  function initialize() {
    createUI();
  }

  // Helper Funtctions

  function createUI() {
    var div = document.createElement('div');
    div.className = 'my-ui';
    div.style.minWidth = '150px';
    div.style.padding = '4px';
    div.style.position = 'fixed';
    div.style.bottom = '10px';
    div.style.right = '10px';
    div.style.background = 'red';
    div.style.color = 'white';

    // Text
    div.innerHTML = '<h2>Stylesheets:</2><ul class=\'stylesheet-list\'><ul>';

    document.querySelector('body').appendChild(div);

    getCurrentStylesheets();
  }

  function getCurrentStylesheets() {
    var s = document.querySelectorAll('link[rel=stylesheet]');
    [].slice.call(s).forEach(function (stylesheet) {
      styleObjects.push({ fileName: stylesheet.attributes.href.value, file: stylesheet, visible: true });
    });

    printCurrentStylesheets();
  }

  function printCurrentStylesheets() {
    stylesheetUL = document.querySelector('.my-ui ul.stylesheet-list');
    styleObjects.forEach(function (style, index) {
      var li = document.createElement('li');
      li.innerHTML = style.fileName;
      li.attributes.fileName = style.fileName;
      li.attributes.file = style.file;
      li.attributes.index = index;
      li.onclick = function (e) {
        style.visible = !style.visible;
        style.visible ? addStyling(style) : removeStyling(style)
      };
      stylesheetUL.appendChild(li)
    });

    resetMyUICss();
  }

  function removeStyling(style) {
    document.head.removeChild(style.file);
  }

  function addStyling(style) {
    styleObjects.forEach(function (s) {
      if (s.visible) {
        document.head.appendChild(s.file);
      }
    });
  }

  function resetMyUICss() {
    ui = document.querySelector('.my-ui');
    [].slice.call(ui.getElementsByTagName('*'))
      .forEach(function (element) {
        element.style.margin = '0px';
        element.style.padding = '0px';
        element.style.color = 'white';
        element.style.fontSize = '14px';
        element.style.textTransform = 'none';
        element.style.fontStyle = 'normal';
        element.style.border = '0';
        element.style.listStyleType = 'none';

        if (element.tagName === 'LI') {
          element.style.cursor = 'pointer';
        }
      });

  }


  // initialize

  initialize();

})();
