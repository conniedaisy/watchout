// start slingin' some d3 here.


//location data
//[{x, y}, {x1, y1}]
//pass through D3 data binding
//use style method to update the nodes
  // function(d) {
    // return 'top: '+d.x +'right: '+d.y
  //}
//use transition method

// user click, if statement, if click === player position, then update position according to mouse position
// d3.behavior.drag

//update span element for score


//create an array with random positions
//position ranges: 

//append to svg

// create an array of position objects
// for with loop with 30 iterations
  // Math.random() * width
  // Math.random() * SVGheight
  // set those as properties of the newly created object
  // push to storage array


var SVGwidth = 700;
var SVGheight = 450;

var generatePositions = function(num) {// num is number of enemies to generate
  var enemyPositions = [];
  for (var i = 0; i < num; i++) {
    var enemyPosition = {};
    var x = Math.random() * SVGwidth;
    var y = Math.random() * SVGheight;
    enemyPosition['x'] = x;
    enemyPosition['y'] = y;
    enemyPositions.push(enemyPosition);
  }
  return enemyPositions;
};

//UPDATING ENEMY POSITIONS
var generateEnemies = function() { 
  var enemyPositions = generatePositions(30);

  d3.select('svg').selectAll('image')
  .data(enemyPositions)
  .transition()
  .duration(1500)
  .style('x', function(d) {
    return d['x'] + 'px';
  })
  .style('y', function(d) {
    return d['y'] + 'px';
  });

};

//ENTERING NEW ENEMIES
var initialEnemyPositions = generatePositions(30);

d3.select('svg').selectAll('image')
.data(initialEnemyPositions)
.enter()
.append('image') //add class
.classed({'enemy': true})
.style('x', function(d) {
  return d['x'] + 'px';
})
.style('y', function(d) {
  return d['y'] + 'px';
})
.attr('xlink:href', 'asteroid.png');



setInterval(generateEnemies, 1500);


//.text to update scores