var foregroundColumns;
var lastScrollAmount;

function initHeader() {
  var angle = 60;
  var snap = Snap("#svgHeader");
  var width = document.getElementById("header").offsetWidth;
  var height = document.getElementById("header").offsetHeight;
  var heightMultiplier = 1/Math.cos((angle/180) * Math.PI);
  
  var background = snap.rect(0,0, width, height);
  background.attr({"fill": "#ddd"});
  
  drawBackgroundColumns(snap, 20, width, height * heightMultiplier, angle);
  foregroundColumns = drawForegroundColumns(snap, 3, width, height * heightMultiplier, angle);
  
  lastScrollAmount = window.scrollY;
  parallaxEffects();
  window.addEventListener("scroll", function() {
    requestAnimationFrame(parallaxEffects);
  });
}

function parallaxEffects() {
  var initialAboutHeight = document.getElementById("aboutme").offsetHeight;
  var scrollAmount = window.scrollY;
  if (scrollAmount < 500) {
    for (var index = 0; index < 3; ++index) {
      foregroundColumns[index].attr({"transform": "r60t0," + scrollAmount});
    }
  }
  if (scrollAmount >= 260 && lastScrollAmount <= 260) {
    document.getElementById("header").className = "down";
    document.body.className = "down";
  } else if (scrollAmount < 260 && lastScrollAmount >= 260) {
    document.getElementById("header").className = "";
    document.body.className = "";
  }
  if (scrollAmount < 320) {
    var transformAmount = (scrollAmount)/4;
    document.getElementById("aboutinner").style.transform = "translateY(-" + transformAmount + "px)";
  } else if (scrollAmount < 260) {
    document.getElementById("aboutinner").style.transform = ""; 
  }
  lastScrollAmount = scrollAmount;
}

function drawBackgroundColumns(snap, columnCount, backgroundWidth, backgroundHeight, angle) {
  var group = []
  for (var index = 0; index < columnCount; ++index) {
    var x = Math.random() * backgroundWidth + 100;
    var width = 64 + Math.random() * 64;
    var split = 32 + Math.random() * 16;
    var height = backgroundHeight + Math.random() * 200;
    var column = drawColumn(snap, x, -height, height * 2, width, split, 16);
    column.attr({"transform": "r" + angle});
    group.push(column);
  }
  return group;
}

function drawForegroundColumns(snap, columnCount, backgroundWidth, backgroundHeight, angle) {
  var group = []
  for (var index = 0; index < columnCount; ++index) {
    var x = backgroundWidth/2 + Math.random() * backgroundWidth/4;
    var width = 64 + Math.random() * 64;
    var split = width*2/3;
    var height = backgroundHeight/2 + Math.random() * backgroundHeight/4;
    var column = drawColumn(snap, x, -height, height * 2, width, split, 16);
    column.attr({"transform": "r" + angle});
    var duration = 15000 + Math.random() * 4000;
    group.push(column);
  }
  return group;
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
                   "fill": snap.gradient("l(0.5, 0, 0.5, 1)#BBDEFB-#1976D2"),
                   //"stroke": "#0D47A1"
                 });
  var side = snap.polygon(x1, y, x2, y, x2, y2, x1, y1)
                 .attr({
                   "fill": snap.gradient("l(0.5, 0, 0.5, 1)#FFFFFF-#2196F3"),
                   //"stroke": "#0D47A1"
                 });
  var top = snap.polygon(x, y2, x1, y1, x2, y2, x3, y3)
                 .attr({
                   "fill": "#0D47A1"
                 });
  return snap.group(face, side, top);
}