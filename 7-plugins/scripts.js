var buttonSwitcher = document.querySelector('button');
buttonSwitcher.addEventListener('click', swapDivsForTesting, false);

var swapDivsForTesting = function () {
  console.log('boo')
  document.querySelector('.original-tabs').style.display = 'none'
}

var tabsDeluxe = (function () {
  'use strict;'
  
  // Public APIs
  var publicAPIs = {};
  var settings;
  
  // Defaults
  var defaults = {
    firstShowing: true,
    hiddenElems: '.tab-pane',
    activationElems: '.tabs'
  };
  
  /* Methods */
  /**
  * Merge two or more objects. Returns a new object.
  * @param {Object}   objects  The objects to merge together
  * @returns {Object}          Merged values of defaults and options
  */
  var extend = function () {
    
    // Variables
    var extended = {};
    
    // Merge the object into the extended object
    var merge = function (obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          extended[prop] = obj[prop];
        }
      }
    };
    
    // Loop through each object and conduct a merge
    for (var i = 0; i < arguments.length; i++) {
      merge(arguments[i]);
    }
    
    return extended;
    
  };
  
  var showTabs = function () {
    var tabDivs = Array.from(document.querySelectorAll(settings.hiddenElems));
    // OPTION - allow the user to show the first tab
    if (settings.firstShowing) {
      tabDivs[0].classList.add('shown');
      console.log(tabDivs[0]);
    }
    
    var show = function(tabToShow) {
      tabDivs.forEach(function (tab) {
        tab.classList.remove('shown')
        if (tab.id == tabToShow) {
          tab.classList.toggle('shown');
        }
      })
    }
    
    // Listen for clicks on the activators
    document.documentElement.addEventListener('click', function (event) {
      if (event.target.closest(settings.activationElems)) {
        var elToShow = (event.target.hash).replace('#', '');
        show(elToShow);
        event.preventDefault();
      }
    }, false);
  };


  
  publicAPIs.init = function (options) {
    // Merge user options into the defaults
    settings = extend(defaults, options || {});
    showTabs();
  };
  
  return publicAPIs;

})();

/* generic call */

// tabsDeluxe.init({
//   firstShowing: true
// });

/* for testing alternate defaults */

tabsDeluxe.init({
  firstShowing: true,
  hiddenElems: '.tab-pane',
  activationElems: '.tabs'
});



