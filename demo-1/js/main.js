var init = [
  {
    year: 1968,
    us: 12345
  },
  {
    year: 1973,
    us: 34254
  }
];

$(function() {
  var population = false;
  var introblock = d3.select('#intro')
                      .style('width', window.innerWidth)
                      .style('height', window.innerHeight);
  
  var fixmeTop = $('#vis').offset().top;       // get initial position of the element

  $(window).scroll(function() {                  // assign scroll event listener

      var currentScroll = $(window).scrollTop(); // get current position

      if (population) {           // apply position: fixed if you
          $('#vis').css({                      // scroll to that element or below it
              position: 'fixed'
          });
      } else {                                   // apply position: static
          $('#vis').css({                      // if you scroll above it
              position: 'static'
          });
      }

  });
  
  var graph = GroupedBarChart()
                .x(function(d) {return d.year})
                .y(function(d) {return [{us: +d.us}]})
                .showLegend(true);
  
  
  // Instantiate your chart with given settings
  var chartWrapper = d3.select('#vis')
                        .datum([init])
                        .call(graph);
  

  var update = function(index, val, data) {
      switch(index) {
        case 0:
          var yVal = val;
          break;
        case 1:
          var yVal = val;
          break;
        case 2:
          var yVal = val;
          break;
        case 3:
          var yVal = val;
          break;
        default:
          var yVal = val;
          break;
      }
      graph.y(val);
      chartWrapper.datum([data]).call(graph);
    };
    
    var getData = function(index) {
      d3.csv('data/population.csv', function(data) {
        switch(index) {
          case 10:
            population = true;
          case 11:
          console.log('feet');
            var yVal = function(d) {
              return [
                {us: +d.us}
              ];
            };
            update(index, yVal, data);
            break;
          case 12:
            console.log('bones');
            var yVal = function(d) {
              return [
                {us: +d.us},
                {india: +d.india}
              ];
            };
            update(index, yVal, data);
            break;
          case 13:
            var yVal = function(d) {
              return [
                {us: +d.us},
                {india: +d.india},
                {china: +d.china}
              ];
            };
            update(index, yVal, data);
            break;
          case 14:
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
          population = false;
            var yVal = function(d) {
              return [
                {us: +d.us}
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
