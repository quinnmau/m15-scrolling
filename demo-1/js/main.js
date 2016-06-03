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
  
  
  // Instantiate your chart with given settings
  var chartWrapper = d3.select('#vis');
  
  

  var update = function(index, val, data) {
      switch(index) {
        case 12:
          showVis();
          var yVal = val;
          break;
        case 13:
          showVis();
          var yVal = val;
          break;
        case 14:
          showVis();
          var yVal = val;
          break;
        case 15:
          showVis();
          var yVal = val;
          break;
        default:
          hideVis();
          var yVal = val;
          break;
      }
      graph.y(val);
      chartWrapper.datum([data]).call(graph);
    };
    
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
    
    var getData = function(index) {
      d3.csv('data/population.csv', function(data) {
        switch(index) {
          case 0:
            console.log('hair');
            break;
          case 1:
            console.log('hair');
            break;
          case 2:
            console.log('hair');
            break;
          case 10:
            console.log('melon');
            break;
          case 12:
          console.log('feet');
            showVis();
            var yVal = function(d) {
              return [
                {uk: +d.uk}
              ];
            };
            update(index, yVal, data);
            break;
          case 13:
            console.log('bones');
            var yVal = function(d) {
              return [
                {uk: +d.uk},
                {germany: +d.germany}
              ];
            };
            update(index, yVal, data);
            break;
          case 14:
            var yVal = function(d) {
              return [
                {uk: +d.uk},
                {germany: +d.germany},
                {japan: +d.japan}
              ];
            };
            update(index, yVal, data);
            break;
          case 15:
          var yVal = function(d) {
              return [
                {uk: +d.uk},
                {germany: +d.germany},
                {japan: +d.japan},
                {us: +d.us},
                {india: +d.india},
                {china: +d.china}
              ];
            };
            update(index, yVal, data);
            break;
          default:
            hideVis();
            var yVal = function(d) {
              return [
                {uk: +d.uk}
              ];
            };
            update(index, yVal, data);
            break;
        }
      });  
    };
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
