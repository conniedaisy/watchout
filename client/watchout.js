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

var Player = function() {
  this.x = x;
  this.y = y;
  this.r = r;
  this.player = d3.select('svg').selectAll('.player');  // creates player selection for use with D3
};

Player.prototype.movePlayer = function(dx, dy) {
  // take current position
  // add the drag event's position
  // set new position on the player selection to manifest on the DOM
};

Player.prototype.setupDrag = function() {
   var drag, dragMove;
   var context = this;
   var dragMove = function() {
      return context.movePlayer(d3.event.dx, d3.event.dy);  // need to implement moveRelative 
    };    // the d3 event object appears to have a dx and dy property giving current pos of player
    drag = d3.behavior.drag().on('drag', dragMove);  //^^ may be able to use for intersection ^^
    return context.player.call(drag);
  };
};



// IMPLEMENT DRAG
// var drag = d3.behavior.drag();
// d3.select('svg').selectAll('.player').cal l(drag);

// d3.select('svg').selectAll('.player').call(drag);

// var drag = force.drag()
// .on("dragstart", dragstart);

// var dragstart = function(d) {
//   d3.select(this).classed("fixed", d.fixed = true);
// };


