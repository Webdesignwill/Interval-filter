
define([
  'ListItemView',
  'SelectionCollection',
  'ScalesCollection'
], function (ListItemView, SelectionCollection, ScalesCollection) {

  "use strict";

  var ListParentView = Backbone.View.extend({

    initialize : function () {
      this.listenTo(SelectionCollection, 'updated', function (model, options) {
        this.render();
      });
    },

    render : function () {
      var df = document.createDocumentFragment();
      ScalesCollection.each(function (model, index, collection) {
        if(model.get('match')) {
          var liv = new ListItemView({
            model : model
          });
          df.appendChild(liv.render().el);
        }
      });
      this.$el.html(df);
      return this;
    }
  });

  return ListParentView;

});

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