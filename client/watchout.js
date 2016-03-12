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

var gameSetup = {
  width: 700,
  height: 450,
  numPlayers: 30,
};

var axes = {
  x: d3.scale.linear().domain([0, 100]).range([0, gameSetup.width]),
  y: d3.scale.linear().domain([0, 100]).range([0, gameSetup.height])
};

var scoreBoard = {
  highscore: 0,
  current: 0,
  collisions: 0,
};



var trackScore = function() {
  scoreBoard.current += 1;
};

var increaseScore = setInterval(trackScore, 10);
// remeber to clearInterval when game over (at intersection)

var updateDOMScore = function() {
  // make a d3 selection of scoreboard class

  return d3.select('.scoreboard').selectAll('.highscore)').text(scoreBoard.current.toString());
  // update 
};

var updateHighScore = function() {
  //when collision happens/at end of game
  if (scoreBoard.current > scoreBoard.highscore) {
    scoreBoard.highscore = scoreBoard.current;
    return d3.select('.scoreboard').selectAll('.highscore').text(scoreBoard.highscore.toString());
  }
};

// below generates positions for enemies on the board
var generatePositions = function(num) {
  var enemyPositions = [];
  for (var i = 0; i < num; i++) {
    var enemyPosition = {};
    var x = Math.random() * gameSetup.width;
    var y = Math.random() * gameSetup.height;
    enemyPosition['x'] = x;
    enemyPosition['y'] = y;
    enemyPositions.push(enemyPosition);
  }
  return enemyPositions;
};

//UPDATING ENEMY POSITIONS -- used in the setInterval below
var generateEnemies = function() { 
  var enemyPositions = generatePositions(gameSetup.numPlayers);

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
var initialEnemyPositions = generatePositions(gameSetup.numPlayers);

// Initial placement of new enemies into game
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

// var Player = function() {

var dragMove = function(d) {
  // d3.select('svg').selectAll('circle')
  d3.select(this)
  .attr('cx', function(d) {
    return d.cx = d3.event.x;
  })
  .attr('cy', function(d) {
    return d.cy = d3.event.y;
  });
};

var drag = d3.behavior.drag()
.origin(function(d) {
  return d;
})
.on('drag', dragMove);

// var svg = d3.selectAll('svg').select('div')

d3.select('g').selectAll('circle')
.data([{'cx': 350, 'cy': 225, 'r': 15}])
.enter()
.append('circle')
.attr('cx', function(d) {
  return d.cx;
})
.attr('cy', function(d) {
  return d.cy;
})
.attr('r', function(d) {
  return d['r'];
})
.classed({'player': true})
.call(drag);

  // this.selection = d3.select('.player');  // creates player selection for use with D3
  
// };

// var player = new Player();




// IMPLEMENT DRAG
// var drag = d3.behavior.drag();
// d3.select('svg').selectAll('.player').cal l(drag);

// d3.select('svg').selectAll('.player').call(drag);

// var drag = force.drag()
// .on("dragstart", dragstart);

// var dragstart = function(d) {
//   d3.select(this).classed("fixed", d.fixed = true);
// };


