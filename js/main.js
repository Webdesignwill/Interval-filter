
var App = (function (response) {

  var $broker = $({});

  var config = {
    frets : 12
  };

  config.scales = response;

  var $body = $('body'),
        $fretBoard = $body.find('#fret-board'),
        $selectionDescription = $body.find('#selection-description');

  var View = function ($element) {
    this.$el = $element;
    this.el = this.$el[0];
    return this;
  };

  //////////////////////////////
  /* Fretboard is the parent view */
  //////////////////////////////

  var FretBoard = function () {

    this.selection = {};
    this.fretsArray = [];

    this.init = function () {
      this.setElements();
      this.setEvents();
      this.render();
    };

    this.setElements = function () {
      this.$fretBoard = this.$el.find('.fret-board');
      this.$clearHighlighting = this.$el.parent().find('.clear-highlighting');
      this.$clearSelection = this.$el.parent().find('.clear-selection');
      this.$resultCountText = this.$el.parent().find('.result-count-text');
      this.$resultCount = this.$resultCountText.find('.result-count');
    };

    this.setEvents = function () {
      var self = this;
      $broker.on('interval:selected', function (e) {
        self.addSelection(e.interval);
        self.filterResults(e.element);
      });
      $broker.on('interval:removed', function (e) {
        self.removeSelection(e.interval);
        self.filterResults(e.element);
      });
      $broker.on('scale:selected', function (e) {
        self.highlightSelection(e.scale.notes);
      });
      this.$clearHighlighting.on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        self.clearClass('highlight');
        self.highlighting = false;
      });
      this.$clearSelection.on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        self.clearClass('selected', true);
        self.removeAllSelections();
        self.filterResults();

        $broker.trigger('selection:cleared');

      });
    };

    this.addSelection = function (interval) {
      this.selection[interval] = interval;
    };

    this.removeSelection = function (interval) {
      delete this.selection[interval];
    };

    this.removeAllSelections = function () {
      for(var key in this.selection) {
        delete this.selection[key];
      }
    };

    this.clearClass = function (rmClass, unselect) {
      for(var i = 0;i<this.fretsArray.length;i++) {
        fret = this.fretsArray[i];
        if(fret.$el.hasClass(rmClass)) {
          fret.$el.removeClass(rmClass);
        }
        if(unselect) {
          fret.selected = false;
        }
      }
    };

    this.highlightSelection = function (notes) {

      var self = this;
      this.highlighting = true;

      function iterateNotes () {
        for(var key in notes) {
          matchFret(notes[key]);
        }
      }

      function matchFret (note) {
        var fret;
        for(var i = 0;i<self.fretsArray.length;i++) {
          fret = self.fretsArray[i];
          if(note === fret.iterator) {
            fret.$el.addClass('highlight');
          }
        }
      }

      this.clearClass('highlight');
      iterateNotes();

    };

    this.filterResults = function ($element) {

      var self = this;

      function testScales () {
        var scales = [];
        for(var key in self.selection) {
          scales.push(checkMatch(self.selection[key]));
        }
        self.renderResults(scales);
      }

      function checkMatch (selection) {
        var scale, selections = [];
        for(var i = 0;i<config.scales.length;i++) {
          scale = config.scales[i];
          selections.push({
            match : scale.notes[selection] ? true : false,
            name : scale.name,
            notes : scale.notes,
            description : scale.description || ""
          });
        }
        return selections;
      }

      if(this.highlighting) {
        this.clearClass('highlight');
        this.highlighting = false;
      }

      testScales();

    };

    this.renderResults = function (scales) {

      var self = this,
            renderObject = {},
            docFrag = document.createDocumentFragment(),
            result,
            resultCount = 0;

      function iterateScales () {
        for(var i = 0; i<scales.length; i++) {
          testScales(scales[i]);
        }
      }

      function testScales (scale) {
        for(var i = 0;i<scale.length;i++) {
          var renderObjectMatch = renderObject[scale[i].name] && renderObject[scale[i].name].match;
          if(scale[i].match && renderObjectMatch !== false) {
            renderObject[scale[i].name] = {
              notes : scale[i].notes,
              name : scale[i].name,
              match : scale[i].match,
              description : scale[i].description
            };
          } else {
            renderObject[scale[i].name] = {
              match : false
            };
          }
        }
      }

      function createResult (scale) {
        var $element = $('<li class="result">'),
              result = $.extend(new View($element), new Result());

        result.init(scale);
        return result;
      }

      iterateScales();

      for(var key in renderObject) {
        if(renderObject[key].match) {
          resultCount += 1;
          result = createResult(renderObject[key]);
          docFrag.appendChild(result.render().el);
        }
      }

      if(resultCount > 0) {
        this.$resultCountText.show();
        this.$resultCount.html(resultCount);
      } else {
        this.$resultCountText.hide();
      }

      this.$el.closest('#scale').find('#results').html(docFrag);

    };

    this.render = function () {
      var docFrag = document.createDocumentFragment();
      for(var i = 0; i<config.frets; i++) {
        var fret = this.createFret(i+1);
        docFrag.appendChild(fret.render().el);
        this.fretsArray.push(fret);
      }
      this.$el.html(docFrag);
    };

    this.createFret = function (i) {
      var $element = $('<li>'),
            fret = $.extend(new View($element), new Fret());

      fret.init({
        iterator : i
      });

      return fret;
    };
  };

  var SelectionDescription = function () {

    this.init = function () {
      this.setEvents();
    };

    this.setEvents = function () {
      var self = this;
      $broker.on('scale:selected', function (e) {
        self.render(e.scale);
      });
      $broker.on('selection:cleared', function () {
        self.clearDescription();
      });
    };

    this.render = function (scale) {
      var docFrag = document.createDocumentFragment();

      var $h3 = $('<h3>' + scale.name + '</h3>'),
            $p = $('<p>' + scale.description + '</p>');

      docFrag.appendChild($h3[0]);
      docFrag.appendChild($p[0]);

      this.$el.html(docFrag);

    };

    this.clearDescription = function () {
      this.$el.empty();
    };

  };

  var selectionDescription = $.extend(new View($selectionDescription), new SelectionDescription());
  selectionDescription.init();

  //////////////////////////////////
  /* Each fret has it's own click event */
  //////////////////////////////////

  var Fret = function () {

    this.selected = false;

    this.init = function (options) {
      this.iterator = options.iterator;
      this.setEvents();
    };

    this.setEvents = function () {
      var self = this;
      this.$el.on('click', function (e) {
        self.clickHandler(e);
      });
    };

    this.clickHandler = function (e) {
      e.stopPropagation();
      this.toggleSelection();
    };

    this.toggleSelection = function () {
      if(this.selected) {
        this.$el.removeClass('selected');
        this.selected = false;
        $broker.trigger({
          type : 'interval:removed',
          interval : this.iterator,
          element : this.$el
        });
        return;
      }
      this.$el.addClass('selected');
      this.selected = true;
      $broker.trigger({
        type : 'interval:selected',
        interval : this.iterator,
        element : this.$el
      });
    };

    this.render = function () {
      this.$el.html('<span class="interval">' + this.iterator + '<span />');
      return this;
    };

    return this;
  };

  ////////////////////////////////////////
  /* Each result displays the title and notes */
  ////////////////////////////////////////

  var Result = function () {

    this.init = function (scale) {
      this.scale = scale;
      this.setEvents();
    };

    this.setEvents = function () {
      var self = this;
      this.$el.on('click', function (e) {
        e.stopPropagation();
        self.handler();
      });
    };

    this.render = function () {
      var $heading = $('<h3>' + this.scale.name + '</h3>'),
            $ul = $('<ul></ul>'),
            docFrag = document.createDocumentFragment();

      for(var key in this.scale.notes) {
        var $li = $('<li>' + this.scale.notes[key] + '</li>');
        docFrag.appendChild($li[0]);
      }

      $ul.html(docFrag);
      this.$el.html([$heading, $ul]);

      return this;
    };

    this.handler = function (e) {
      $broker.trigger({
        type : 'scale:selected',
        scale : this.scale
      });
    };

  };

  var fretBoard = $.extend(new View($fretBoard), new FretBoard());
  fretBoard.init();

});

$(document).ready(function() {
  $.ajax({
    url : './../js/scales.json',
    method : 'GET',
    success : function (response) {
      new App(response);
    }
  });
});
