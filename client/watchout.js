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

//IMPLEMENT DRAG
var drag = d3.behavior.drag()
    .origin(function(d) { return d; })
    .on("drag", dragmove);

var svg = d3.select("svg")
    .data([{x: gameSetup.width / 2, y: gameSetup.height / 2}])
    // .attr("width", gameSetup.width)
    // .attr("height", gameSetup.height);

svg.append("circle")
    .attr("r", 15)
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    // .classed({'player': true})
    .call(drag);

function dragmove(d) {
  d3.select(this)
      .attr("cx", d.x = d3.event.x)
      .attr("cy", d.y = d3.event.y);
}

var allEnemiesSelection = d3.select('svg').selectAll('image');
var playerSelection = d3.select('svg').selectAll('circle');

var checkCollision = function(callback) {
  allEnemiesSelection.each(function(item) {
    var radiusSum = 15 + parseFloat(playerSelection.attr('r'));
    // console.log(playerSelection.attr('cx'));
    var xDiff = parseFloat(item.x) - parseFloat(playerSelection.attr('cx'));
    var yDiff = parseFloat(item.y) - parseFloat(playerSelection.attr('cy'));
    var separation = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    if (separation < radiusSum) {
      // callback;
      console.log(true);
    }
  });
};

setInterval(function() {
  checkCollision();
}, 100);



