<form role="form" class="row">
  <div class="col-md-6">
    <div class="form-group">
      <label class="control-label" for="name-field">Name of the interval</label>
      <input type="text" class="form-control" id="name-field" name="name" placeholder="Interval name" />
    </div>
    <div class="form-group">
      <label class="control-label" for="notes-field">The notes</label>
      <input type="text" class="form-control" id="notes-field" name="notes" placeholder="Eg : 2,4,5,7,9,11,12" />
    </div>
  </div>
  <div class="col-md-6">
    <div class="form-group">
      <label class="control-label" for="description-field">Description of the interval</label>
      <textarea class="form-control" id="description-field" name="description" placeholder="Add the description of the interval" rows="5"></textarea>
    </div>
    <div class="form-group pull-right">
      <button type="submit" class="btn btn-primary">Add interval</button>
    </div>
  </div>
</form>