export function Mediator() {
  this.handles = [];
}

Mediator.prototype.unregister = function(handle) {
  const index = this.handles.indexOf(handle);

  if (index !== -1) {
    this.handles.splice(index, 1);
  }
};

Mediator.prototype.register = function(handle) {
  if (!containsObject(handle, this.handles)) {
    this.handles.push(handle);
  }
};

function containsObject(obj, list) {
  let x;
  for (x in list) {
    if (list.hasOwnProperty(x) && Object.keys(list[x])[0] === Object.keys(obj)[0]) {
      return true;
    }
  }

  return false;
}

Mediator.prototype.setFilterQuery = function(data) {
  this.handles.forEach(({updateQuery}) => {
    if (updateQuery) {
      updateQuery(data);
    }
  });
};

Mediator.prototype.getFilterQuery = function() {
  let query;
  this.handles.forEach(({filterQuery}) => {
    if (filterQuery !== undefined) {
      query = filterQuery();
    }
  });

  return query;
};

Mediator.prototype.reFetch = function() {
  this.setFilterQuery(this.getFilterQuery());
};

Mediator.prototype.updateRowData = function(data) {
  this.handles.forEach(({updateRowData}) => {
    if (updateRowData) {
      updateRowData(data);
    }
  });
};

Mediator.prototype.removeRowData = function(data) {
  this.handles.forEach(({removeRowData}) => {
    if (removeRowData) {
      removeRowData(data);
    }
  });
};

Mediator.prototype.addRowData = function(data) {
  this.handles.forEach(({addRowData}) => {
    if (addRowData) {
      addRowData(data);
    }
  });
};
