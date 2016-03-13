// start slingin' some d3 here.

var gameSetup = {
  width: 700,
  height: 450,
  numPlayers: 30,
};

var scoreBoard = {
  highscore: 0,
  current: 0,
  collisions: 0,
};
var enemies;

var trackScore = function() {
  scoreBoard.current += 1;
  d3.select('.current').selectAll('span')
    .text(scoreBoard.current.toString());
};

var increaseScore = setInterval(function() {
  trackScore();
  // console.log("running score");
}, 100);

var updateHighScore = function() {
  //when collision happens/at end of game
  if (scoreBoard.current > scoreBoard.highscore) {
    console.log('hi');
    scoreBoard.highscore = scoreBoard.current;
    d3.select('.highscore').selectAll('span')
      .text(scoreBoard.highscore.toString());
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

  enemies = d3.select('svg').selectAll('image')
  .data(enemyPositions);
  
  enemies.transition()
  .duration(1500)
  .style('x', function(d) {
    return d['x'] + 'px';
  })
  .style('y', function(d) {
    return d['y'] + 'px';
  });
};

//ENTERING NEW ENEMIES
var initEnemies = function() {
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
};

//IMPLEMENT DRAG
var initPlayer = function() {
  var dragmove = function(d) {
    d3.select(this)
      .attr('cx', d.x = d3.event.x)
      .attr('cy', d.y = d3.event.y);
  };

  var drag = d3.behavior.drag()
    .origin(function(d) { return d; })
    .on('drag', dragmove);

  var svg = d3.select('svg')
  .data([{x: gameSetup.width / 2, y: gameSetup.height / 2}]);

  svg.append('circle')
    .attr('r', 15)
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    // .classed({'player': true})
    .call(drag);
  //create circle, implement drag
};

var playerSelection = d3.select('svg').selectAll('circle');

var checkCollision = function(collisionCallback) {
  enemies = d3.select('svg').selectAll('image').each(function(item) {
    console.log("allEnemiesSelection");
    // var radiusSum = 15 + parseFloat(playerSelection.attr('r'));
    var radiusSum = 30;
    // console.log(playerSelection.attr('cx'));
    var xDiff = parseFloat(item.x) - parseFloat(playerSelection.attr('cx'));
    var yDiff = parseFloat(item.y) - parseFloat(playerSelection.attr('cy'));
    var separation = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    console.log('sep: ',separation, ' rad: ', radiusSum);
    if (separation < radiusSum) {
      collisionCallback();
      // console.log(true);
    }
  });
};


var onCollision = function() {
  console.log("inside onCollision");
  scoreBoard.collisions++;
  d3.select('.collisions').selectAll('span')
    .text(scoreBoard.collisions.toString());
  updateHighScore();

  //change background to red and back
  d3.select('svg')
    .style('background', 'red');
      // .transition();
      // .duration(250)
};

var initDetectCollisions = function() { 
  console.log("before setInterval");
  setInterval(function() {
    console.log("after setInterval");
    checkCollision(onCollision);
  }, 1000);
};

var initGame = function() {
  scoreBoard.current = 0;
  d3.select('svg').style('background', 'lightblue');
  initPlayer();
  initEnemies();
  initDetectCollisions();
};

d3.select('button').
  on('click', initGame);
