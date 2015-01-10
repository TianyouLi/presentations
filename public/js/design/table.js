/* exported SortableTable */
function SortableTable(selection, data) {
  
  function transform(table, data, attrName) {
    var t = d3.select(table);
    t.selectAll('tr').remove();
    
    // Header
    t.select('thead').selectAll('th')
      .data(jsonToArray(data[0]))
      .enter().append('th')
      .on('click', function (d) {
        transform(table, data, d[0]);
      })
      .text(function(d) { return d[0]; })

    // Rows
    var tr = t.select('tbody').selectAll('tr')
      .data(data)
      .enter().append('tr')
      .sort(function (a, b) { return a == null || b == null ? 0 : stringCompare(a[attrName], b[attrName]); });

    // Cells
    tr.selectAll('td')
      .data(function(d) { return jsonToArray(d); })
      .enter().append('td')
      .on('click', function (d) {
        transform(table, data, d[0]);
      })
      .text(function(d) { return d[1]; });
  }

  function stringCompare(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    return a > b ? 1 : a === b ? 0 : -1;
  }

  function jsonKeyValueToArray(k, v) {return [k, v];}

  function jsonToArray(json) {
    var ret = [];
    var key;
    for (key in json) {
      if (json.hasOwnProperty(key)) {
        ret.push(jsonKeyValueToArray(key, json[key]));
      }
    }
    return ret;
  }


  function getAttrName(data) {
    var attrName = jsonToArray(data[0])[0][0];
    return attrName;
  }

  selection.selectAll('table').remove();
  var tb = selection.append('table');
  tb.attr('class', 'reveal');
  tb.append('thead');
  tb.append('tbody');

  tb.data([data]).each(function(d) { transform(this, d, getAttrName(d)) });
}

