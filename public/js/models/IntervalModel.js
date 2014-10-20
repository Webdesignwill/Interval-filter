
define([
  'Backbone',
  'Oauth2Model',
  'SelectionCollection'
], function (Backbone, Oauth2Model, SelectionCollection) {

  "use strict";

  var IntervalModel = Backbone.Model.extend({

    defaults : {
      selected : false,
      match : false
    },

    urls : {
      add : '/api/interval/add',
      update : '/api/interval/update',
      delete : '/api/interval/delete'
    },

    initialize : function () {
      this.listenTo(SelectionCollection, 'all', function (event, model, selectionCollection) {
        if(event === 'add' || event === 'remove') return this.filter();
      });
    },

    parse : function (object) {
      object['displayNotes'] = object.notes.toString();
      return object;
    },

    filter : function () {
      var selection = [];
      for(var i = 0;i<SelectionCollection.models.length;i++) {
        var model = SelectionCollection.models[i];
        selection.push(model.get('number'));
      }

      if(!selection.length) {
        this.set('match', false);
      } else {
        var ar = _.difference(selection, this.get('notes'));
        this.set({
          match : !ar.length ? true : false
        });
      }
    },

    add : function (user, done) {
      $.ajax({
        type : 'POST',
        context : this,
        url : this.urls.add,
        contentType : 'application/x-www-form-urlencoded',
        data : user,
        success : function (data, status) {
          this.set(data);
          done(true, data, status);
        },
        error : function (data, status) {
          done(false, data, status);
        }
      });
    },

    update : function (user, done) {
      $.ajax({
        type : 'PUT',
        context : this,
        url : this.urls.update,
        contentType : 'application/x-www-form-urlencoded',
        headers : {
          Authorization : 'Bearer ' + Oauth2Model.get('access_token')
        },
        data : user,
        success : function (data, status) {
          this.set(data);
          done(true, data, status);
        },
        error : function (data, status) {
          done(false, data, status);
        }
      });
    },

    delete : function (done) {
      $.ajax({
        type : 'DELETE',
        context : this,
        url : this.urls.delete,
        contentType : 'application/x-www-form-urlencoded',
        headers : {
          Authorization : 'Bearer ' + Oauth2Model.get('access_token')
        },
        success : function (data, status) {
          this.clearUser();
          done(true, data, status);
        },
        error : function (data, status) {
          done(false, data, status);
        }
      });
    }

  });

  return IntervalModel;

});