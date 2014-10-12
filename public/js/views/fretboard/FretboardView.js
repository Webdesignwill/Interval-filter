
define([
  'App',
  'FretView'
], function (App, FretView) {

  "use strict";

  var Fretboard = Backbone.View.extend({
    initialize : function () {
      this.render();
    },
    render : function () {

      var dc = document.createDocumentFragment();
      for(var i = 0; i<App.get('octave');i++) {
        var fv = new FretView({number : i});
        dc.appendChild(fv.render().el);
      }
      this.$el.html(dc);

      return this;
    }
  });

  return Fretboard;

});

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