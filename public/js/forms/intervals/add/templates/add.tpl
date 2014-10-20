<form role="form" class="row">
  <div class="col-md-6">
    <div class="form-group">
      <label class="control-label" for="intervalname-field">Name of the interval</label>
      <input type="text" class="form-control" id="intervalname-field" name="intervalname" placeholder="Interval name" />
    </div>
    <div class="form-group">
      <label class="control-label" for="intervalnumbers-field">The intervals</label>
      <input type="text" class="form-control" id="intervalnumbers-field" name="intervalnumbers" placeholder="Eg : 2,4,5,7,9,11,12" />
    </div>
  </div>
  <div class="col-md-6">
    <div class="form-group">
      <label class="control-label" for="intervaldescription-field">Description of the interval</label>
      <textarea class="form-control" id="intervaldescription-field" name="intervaldescription" placeholder="Add the description of the interval" rows="5"></textarea>
    </div>
    <div class="form-group pull-right">
      <button type="submit" class="btn btn-primary">Add interval</button>
    </div>
  </div>
</form>