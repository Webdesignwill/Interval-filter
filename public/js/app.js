
/* TODO

Remove the selectionCollection and set the models in the ScalesCollection when the fret is clicked
Then everything is revolving around a single colection as opposed to two

check the fret view how it triggers a change event of sorts to the SelectionCollection and
instead, set that respective model in the ScalesCollection

Listen then everywhere for tha change event.

*/
define([
  'Backbone',
  'require',
  'ScalesCollection'
], function (Backbone, require, ScalesCollection) {

  "use strict";

  var App = Backbone.Model.extend({

    $broker : $({}),
    defaults : {
      octave : 12
    },

    init : function () {
      this.loadScales(this.loadBody);
    },

    loadScales : function (done) {
      ScalesCollection.fetch({success : done});
    },

    loadBody : function () {
      require(['BodyView'], function (BodyView) {});
    }

  });

  return new App();

});


// var App = (function (response) {

  // var $broker = $({});

  // var config = {
  //   frets : 12,
  //   scales : response
  // };

  // var $body = $('body'),
  //       $fretBoard = $body.find('#fret-board'),
  //       $controls = $body.find('#controls'),
  //       $selectionDescription = $body.find('#selection-description');

  // var View = function ($element) {
  //   this.$el = $element;
  //   this.el = this.$el[0];
  //   return this;
  // };

  //////////////////////////////
  /* Fretboard is the parent view */
  //////////////////////////////

  // var FretBoard = function () {

  //   this.selection = {};
  //   this.fretsArray = [];

  //   this.init = function () {
  //     this.setElements();
  //     this.setEvents();
  //     this.render();
  //   };

  //   this.setElements = function () {
  //     this.$fretBoard = this.$el.find('.fret-board');
  //     this.$resultCountText = this.$el.parent().find('.result-count-text');
  //     this.$resultCount = this.$resultCountText.find('.result-count');
  //   };

  //   this.setEvents = function () {
  //     var self = this;
  //     $broker.on('interval:selected', function (e) {
  //       self.addSelection(e.interval);
  //       self.filterResults(e.element);
  //     });
  //     $broker.on('interval:removed', function (e) {
  //       self.removeSelection(e.interval);
  //       self.filterResults(e.element);
  //     });
  //     $broker.on('scale:selected', function (e) {
  //       self.highlightSelection(e.scale.notes);
  //     });
  //   };

  //   this.addSelection = function (interval) {
  //     this.selection[interval] = interval;
  //   };

  //   this.removeSelection = function (interval) {
  //     delete this.selection[interval];
  //   };

  //   this.removeAllSelections = function () {
  //     for(var key in this.selection) {
  //       delete this.selection[key];
  //     }
  //   };

  //   this.clearClass = function (rmClass, unselect) {
  //     alert('CLEAR CLASS');
  //     // for(var i = 0;i<this.fretsArray.length;i++) {
  //     //   fret = this.fretsArray[i];
  //     //   if(fret.$el.hasClass(rmClass)) {
  //     //     fret.$el.removeClass(rmClass);
  //     //   }
  //     //   if(unselect) {
  //     //     fret.selected = false;
  //     //   }
  //     // }
  //   };

  //   this.highlightSelection = function (notes) {

  //     var self = this;
  //     this.highlighting = true;

  //     function iterateNotes () {
  //       for(var key in notes) {
  //         matchFret(notes[key]);
  //       }
  //     }

  //     function matchFret (note) {
  //       var fret;
  //       for(var i = 0;i<self.fretsArray.length;i++) {
  //         fret = self.fretsArray[i];
  //         if(note === fret.iterator) {
  //           fret.$el.addClass('highlight');
  //         }
  //       }
  //     }

  //     this.clearClass('highlight');
  //     iterateNotes();

  //   };

  //   this.filterResults = function ($element) {

  //     var self = this;

  //     function testScales () {
  //       var scales = [];
  //       for(var key in self.selection) {
  //         scales.push(checkMatch(self.selection[key]));
  //       }
  //       self.renderResults(scales);
  //     }

  //     function checkMatch (selection) {
  //       var scale, selections = [];
  //       for(var i = 0;i<config.scales.length;i++) {
  //         scale = config.scales[i];
  //         selections.push({
  //           match : scale.notes[selection] ? true : false,
  //           name : scale.name,
  //           notes : scale.notes,
  //           description : scale.description || ""
  //         });
  //       }
  //       return selections;
  //     }

  //     if(this.highlighting) {
  //       this.clearClass('highlight');
  //       this.highlighting = false;
  //     }

  //     testScales();

  //   };

  //   this.renderResults = function (scales) {

  //     var self = this,
  //           renderObject = {},
  //           docFrag = document.createDocumentFragment(),
  //           result,
  //           resultCount = 0;

  //     function iterateScales () {
  //       for(var i = 0; i<scales.length; i++) {
  //         testScales(scales[i]);
  //       }
  //     }

  //     function testScales (scale) {
  //       for(var i = 0;i<scale.length;i++) {
  //         var renderObjectMatch = renderObject[scale[i].name] && renderObject[scale[i].name].match;
  //         if(scale[i].match && renderObjectMatch !== false) {
  //           renderObject[scale[i].name] = {
  //             notes : scale[i].notes,
  //             name : scale[i].name,
  //             match : scale[i].match,
  //             description : scale[i].description
  //           };
  //         } else {
  //           renderObject[scale[i].name] = {
  //             match : false
  //           };
  //         }
  //       }
  //     }

  //     function createResult (scale) {
  //       var $element = $('<a href="#" class="list-group-item"></a>'),
  //             result = $.extend(new View($element), new Result());

  //       result.init(scale);
  //       return result;
  //     }

  //     iterateScales();

  //     for(var key in renderObject) {
  //       if(renderObject[key].match) {
  //         resultCount += 1;
  //         result = createResult(renderObject[key]);
  //         docFrag.appendChild(result.render().el);
  //       }
  //     }

  //     if(resultCount > 0) {
  //       this.$resultCountText.show();
  //       this.$resultCount.html(resultCount);
  //     } else {
  //       this.$resultCountText.hide();
  //     }

  //     this.$el.closest('#scale').find('#results').html(docFrag);

  //   };

  //   this.render = function () {
  //     var docFrag = document.createDocumentFragment();
  //     for(var i = 0; i<config.frets; i++) {
  //       var fret = this.createFret(i+1);
  //       docFrag.appendChild(fret.render().el);
  //       this.fretsArray.push(fret);
  //     }
  //     this.$el.html(docFrag);
  //   };

  //   this.createFret = function (i) {
  //     var $element = $('<li class="col-md-1 col-xs-1">'),
  //           fret = $.extend(new View($element), new Fret());

  //     fret.init({
  //       iterator : i
  //     });

  //     return fret;
  //   };
  // };

  // var SelectionDescription = function () {

  //   this.init = function () {
  //     this.setEvents();
  //   };

  //   this.setEvents = function () {
  //     var self = this;
  //     $broker.on('scale:selected', function (e) {
  //       self.render(e.scale);
  //     });
  //     $broker.on('selection:cleared', function () {
  //       self.clearDescription();
  //     });
  //   };

  //   this.render = function (scale) {
  //     var docFrag = document.createDocumentFragment();

  //     var $h3 = $('<h3>' + scale.name + '</h3>'),
  //           $p = $('<p>' + scale.description + '</p>');

  //     docFrag.appendChild($h3[0]);
  //     docFrag.appendChild($p[0]);

  //     this.$el.html(docFrag);

  //   };

  //   this.clearDescription = function () {
  //     this.$el.empty();
  //   };

  // };

  // var selectionDescription = $.extend(new View($selectionDescription), new SelectionDescription());
  // selectionDescription.init();

  //////////////////////////////////
  /* Each fret has it's own click event */
  //////////////////////////////////

  // var Fret = function () {

  //   this.selected = false;

  //   this.init = function (options) {
  //     this.iterator = options.iterator;
  //     this.setEvents();
  //   };

  //   this.setEvents = function () {
  //     var self = this;
  //     this.$el.on('click', function (e) {
  //       self.clickHandler(e);
  //     });
  //   };

  //   this.clickHandler = function (e) {
  //     e.stopPropagation();
  //     this.toggleSelection();
  //   };

  //   this.toggleSelection = function () {

  //     var cla = this.selected ? 'removeClass' : 'addClass';
  //     this.$el[cla]('selected');

  //     var action = this.selected ? 'removed' : 'selected';
  //     $broker.trigger({
  //       type : 'interval:' + action,
  //       interval : this.iterator,
  //       element : this.$el
  //     });

  //     this.selected = this.selected ? false : true;

  //   };

  //   this.render = function () {
  //     this.$el.html('<span class="interval">' + this.iterator + '<span />');
  //     return this;
  //   };

  //   return this;
  // };

  ////////////////////////////
  /* Buttons and control panel */
  ////////////////////////////

  // var Controls = function () {
  //   this.init = function () {
  //     this.setElements();
  //     this.setEvents();
  //   };
  //   this.setElements = function () {
  //     this.$clearHighlighting = this.$el.parent().find('.clear-highlighting');
  //     this.$clearSelection = this.$el.parent().find('.clear-selection');
  //   };
  //   this.setEvents = function () {
  //     this.$clearHighlighting.on('click', function (e) {
  //       self.clearClass('highlight');
  //       self.highlighting = false;
  //     });
  //     this.$clearSelection.on('click', function (e) {
  //       self.clearClass('selected', true);
  //       self.removeAllSelections();
  //       self.filterResults();

  //       $broker.trigger('selection:cleared');

  //     });
  //   };
  // };

  // var controls = $.extend(new View($controls), new Controls());
  // controls.init();

  ////////////////////////////////////////
  /* Each result displays the title and notes */
  ////////////////////////////////////////

  // var Result = function () {

  //   this.init = function (scale) {
  //     this.scale = scale;
  //     this.setEvents();
  //   };

  //   this.setEvents = function () {
  //     var self = this;
  //     this.$el.on('click', function (e) {
  //       e.preventDefault();
  //       self.handler();
  //     });
  //   };

  //   this.render = function () {
  //     var $heading = $('<h3>' + this.scale.name + '</h3>'),
  //           $ul = $('<ul></ul>'),
  //           docFrag = document.createDocumentFragment();

  //     for(var key in this.scale.notes) {
  //       var $li = $('<li>' + this.scale.notes[key] + '</li>');
  //       docFrag.appendChild($li[0]);
  //     }

  //     $ul.html(docFrag);
  //     this.$el.html([$heading, $ul]);

  //     return this;
  //   };

  //   this.handler = function (e) {
  //     $broker.trigger({
  //       type : 'scale:selected',
  //       scale : this.scale
  //     });
  //   };

  // };

  // var fretBoard = $.extend(new View($fretBoard), new FretBoard());
  // fretBoard.init();

// });

// $(document).ready(function() {

//   function parseNotes (notes) {
//     var n = {};
//     notes = notes.split(',');
//     for(var i = 0; i<notes.length; i++) {
//       n[notes[i]] = parseFloat(notes[i]);
//     }
//     return n;
//   }

//   $.ajax({
//     url : '/api/scale/all',
//     method : 'GET',
//     success : function (response) {
//       for(var i = 0; i<response.length;i++) {
//         response[i].notes = parseNotes(response[i].notes);
//       }
//       new App(response);
//     }
//   });
// });
