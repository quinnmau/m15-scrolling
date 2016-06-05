var init = [
  {
    year: 1968,
    uk: 0
  },
  {
    year: 1973,
    uk: 0
  }
];

$(function() {
  
  var graph = GroupedBarChart()
                .width(800)
                .x(function(d) {return d.year})
                .y(function(d) {return [{uk: +d.uk}]})
                .showLegend(true);
                
  var graph2 = LineChart()
                .indy('year')
                .y('population')
                .yLabel('CO2 Emissions (kt)')
                .xLabel('Year');
                
  var united = MapPlot()
                .lat('lat')
                .lon('lon')
                .iden('name');
  
  
  // Instantiate your chart with given settings
  var chartWrapper = d3.select('#vis');
  
  function showVis() {
    d3.select('#vis')
      .transition()
      .duration(1500)
      .style('opacity', 1.0);
  }
    
  function hideVis() {
    d3.select('#vis')
      .transition()
      .duration(0)
      .style('opacity', 0);
  }
  
  var updateBar = function(index, val, data) {
      switch(index) {
        case 11:
          graph.yLabel('Birth Rate (live births per 1000 people)');
          showVis();
          var yVal = val;
          break;
        case 12:
          graph.yLabel('Birth Rate (live births per 1000 people)');
          showVis();
          var yVal = val;
          break;
        case 13:
          graph.yLabel('Birth Rate (live births per 1000 people)');
          showVis();
          var yVal = val;
          break;
        case 14:
          hideVis();
          break;
        case 15:
          showVis();
          graph.yLabel('Population');
          var yVal = val;
          break;
        case 16:
          showVis();
          graph.yLabel('Population');
          var yVal = val;
          break;
        case 17:
          showVis();
          graph.yLabel('Population');
          var yVal = val;
          break;
        default:
          hideVis();
          var yVal = val;
          break;
      }
      graph.y(val).xLabel('Year');
      chartWrapper.datum([data]).call(graph);
    };
    
    //determine which data to grab
    var getData = function(index) {
        if (index <= 9) {
          carbon(index);
        } else if (index <= 14) {
          rate(index);
        } else if (index <= 18) {
          pop(index);
        } else {
          birds(index);
        }
    };
    
    var carbon = function(index) {
      d3.csv('data/co2.csv', function(data) {
        switch(index) {
          case 7:
            showVis();
            data.filter(function(d) {return objFilter1(d)});
            chartWrapper.datum(data).call(graph2);
            break;
          case 8:
            showVis();
            data.filter(function(d) {return objFilter2(d)});
            chartWrapper.datum(data).call(graph2);
            break;
          case 9:
            showVis();
            data.filter(function(d) {return objFilter3(d)});
            chartWrapper.datum(data).call(graph2);
            break;
          default:
            hideVis();
            $('#vis').empty();
            break;
        }
      });
    };
    
    var pop = function(index) {
      d3.csv('data/population.csv', function(data) {
        switch(index) {
          case 15:
            $('#vis').empty();
            console.log('wet');
            showVis();
            var yVal = function(d) {
              return [{uk: +d.uk}];
            };
            updateBar(index, yVal, data);
            break;
          case 16:
            showVis();
            var yVal = function(d) {
              return [
                {uk: +d.uk},{japan: +d.japan}];
            };
            updateBar(index, yVal, data);
            break;
          case 17:
            showVis();
            var yVal = function(d) {
              return [
                {uk: +d.uk},{japan: +d.japan},{us: +d.us},{india: +d.india},{china: +d.china}];
            };
            updateBar(index, yVal, data);
            break;
          default:
            hideVis();
            $('#vis').empty();
            var yVal = function(d) {
              return [
                {uk: +d.uk}
              ];
            };
            updateBar(index, yVal, data);
            break;
        }
      });
    }
    
    var rate = function(index) {
      d3.csv('data/world.csv', function(data) {
        switch(index) {
          case 11:
            showVis();
            data.filter(function(d) {return objFilter1(d)});
            chartWrapper.datum(data).call(graph2);
            break;
          case 12:
            showVis();
            data.filter(function(d) {return objFilter2(d)});
            chartWrapper.datum(data).call(graph2);
            break;
          case 13:
            showVis();
            data.filter(function(d) {return objFilter3(d)});
            chartWrapper.datum(data).call(graph2);
            break;
          default:
            hideVis();
            $('#vis').empty();
            break;
        }
      });
    };
    
    var birds = function(index) {
      d3_queue.queue()
        .defer(d3.json, 'json/us.json')
        .defer(d3.csv, 'data/winter66avg.csv')
        .defer(d3.csv, 'data/winter05avg.csv')
        .await(function(error, map, pos1, pos2) {
          switch(index) {
            case 19:
              $('#vis').empty();
              showVis();
              united.map(map);
              chartWrapper.datum([]).call(united);
              break;
            case 20:
              united.map(map);
              showVis();
              chartWrapper.datum(pos1).call(united);
              break;
            case 21:
              united.map(map);
              showVis();
              chartWrapper.datum(pos2).call(united);
          }
        })
    };
    
    function objFilter1(obj) {
      for (var i in obj) {
        if (i !== 'us' && i !== 'year') 
          delete obj[i];
      }
      return obj;
    }
    
    function objFilter2(obj) {
      for (var i in obj) {
        console.log(i);
        if (i !== 'us' && i !== 'year' && i !== 'china') 
          delete obj[i];
      }
    }
    
    function objFilter3(obj) {
      for (var i in obj) {
        console.log(i);
        if (i !== 'us' && i !== 'year' && i !== 'china' && i !== 'india' && i !== 'uk' && i !== 'japan') 
          delete obj[i];
      }
    }
    
  // Define a new scroller, and use the `.container` method to specify the desired container
  var scroll = scroller()
      .container(d3.select('#graphic'));

  // Pass in a selection of all elements that you wish to fire a step event:
  scroll(d3.selectAll('.step')); // each section with class `step` is a new step

  // Specify the function you wish to activate when a section becomes active
  scroll.on('active', function(index) {
    getData(index);
  })
});
