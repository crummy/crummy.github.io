function initHeader() {
  var angle = 60;
  var snap = Snap("#svgHeader");
  var width = document.getElementById("svgHeader").offsetWidth;
  var height = document.getElementById("svgHeader").offsetHeight;
  var heightMultiplier = 1/Math.cos((angle/180) * Math.PI);
  
  var background = snap.rect(0,0, width, height);
  background.attr({"fill": "#ddd"});
  
  var backgroundColumns = drawBackgroundColumns(snap, 20, width, height * heightMultiplier);
  backgroundColumns.attr({"transform": "r" + angle});
  var animatedColumns = drawAnimatedColumns(snap, 3, width, height * heightMultiplier);
  animatedColumns.attr({"transform": "r" + angle});
  
  window.addEventListener("scroll", function(evt) {
    var scrollAmount = window.scrollY;
    animatedColumns.attr({"transform": "r" + angle + "t0," + scrollAmount});
  });
}

function drawBackgroundColumns(snap, columnCount, backgroundWidth, backgroundHeight) {
  var group = snap.group()
  for (var index = 0; index < columnCount; ++index) {
    var x = Math.random() * backgroundWidth;
    var width = 64 + Math.random() * 64;
    var split = 32 + Math.random() * 16;
    var height = backgroundHeight + Math.random() * 200;
    var column = drawColumn(snap, x, -height, height * 2, width, split, 16);
    group.add(column);
  }
  return group;
}

function drawAnimatedColumns(snap, columnCount, backgroundWidth, backgroundHeight) {
  var group = snap.group()
  for (var index = 0; index < columnCount; ++index) {
    var x = backgroundWidth/2 + Math.random() * backgroundWidth/4;
    var width = 64 + Math.random() * 64;
    var split = 32 + Math.random() * 16;
    var split = width*2/3;
    var height = backgroundHeight/2 + Math.random() * backgroundHeight/4;
    var column = drawColumn(snap, x, -height, height * 2, width, split, 16);
    var duration = 15000 + Math.random() * 4000;
    animateColumn(column, duration);
    group.add(column);
  }
  return group;
}

function animateColumn(column, duration) {
  animateOut();
  
  function animateOut() {
    column.animate({"transform": "t0,100"}, duration, mina.easeinout, animateIn);
  }
  
  function animateIn() {
    column.animate({"transform": "t0,-100"}, duration, mina.easeinout, animateOut);
  }
}

function drawColumn(snap, x, y, height, width, split, tilt) {
  // maybe I can do better with these variable names, but in the meantime:
  // (x, y) (x1, y) (x2, y)
  //  |-------|-------|
  //  |       |       |
  //  |       |       |
  //  |       |(x1,y1)|
  //  |      / \      |
  //  |    /     \    |
  //  |  /         \  |
  //  |/             \|(x2, y2)
  //   \             /
  //     \         /
  //       \     /
  //         \ /
  //        (x3, y3)
  var x1 = x + split;
  var x2 = x + width;
  var x3 = x + width - split;
  var y1 = y + height - tilt;
  var y2 = y + height;
  var y3 = y + height + tilt;
  var face = snap.polygon(x, y, x1, y, x1, y1, x, y2)
                 .attr({
                   "fill": snap.gradient("l(0.5, 0, 0.5, 1)#B6B6B6-#DCEDC8")
                 });
  var side = snap.polygon(x1, y, x2, y, x2, y2, x1, y1)
                 .attr({
                   "fill": snap.gradient("l(0.5, 0, 0.5, 1)#B6B6B6-#8BC34A")
                 });
  var top = snap.polygon(x, y2, x1, y1, x2, y2, x3, y3)
                 .attr({
                   "fill": "#689F38"
                 });
  return snap.group(face, side, top);
}