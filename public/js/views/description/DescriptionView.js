
define([
  'text!views/filteredList/templates/description.tpl'
], function (template) {

  "use strict";

  var Description = Backbone.View.extend({
    initialize : function () {}
  });

  return Description;

});

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