function initHeader() {
  var angle = 60;
  var snap = Snap("#svgHeader");
  var width = document.getElementById("header").offsetWidth;
  var height = document.getElementById("header").offsetHeight;
  var heightMultiplier = 1/Math.cos((angle/180) * Math.PI);
  
  drawBackgroundColumns(snap, 20, width, height * heightMultiplier, angle);
  var background = snap.rect(0,0, width, height);
  background.attr({"fill": "#000", "opacity": "0.2"});
  foregroundColumns = drawForegroundColumns(snap, 3, width, height * heightMultiplier, angle);
  
  lastScrollAmount = window.scrollY;
  stickyHeader();
  window.addEventListener("scroll", function() {
    requestAnimationFrame(stickyHeader);
  });
  
  skrollr.init();
}

function stickyHeader() {
  var scrollAmount = window.scrollY;
  var header = document.getElementById("header");
  if (scrollAmount >= 260 && header.className == "") {
    document.getElementById("header").className = "down";
    document.body.className = "down";
  } else if (scrollAmount < 260 && header.className == "down") {
    document.getElementById("header").className = "";
    document.body.className = "";
  }
}

function drawBackgroundColumns(snap, columnCount, backgroundWidth, backgroundHeight, angle) {
  for (var index = 0; index < columnCount; ++index) {
    var x = Math.random() * backgroundWidth + 100;
    var width = 64 + Math.random() * 64;
    var split = 32 + Math.random() * 16;
    var height = backgroundHeight * 1.5 + Math.random() * 600;
    var column = drawColumn(snap, x, -height, height * 2, width, split, 16);
    column.attr({"data-0": "transform: rotate(" + angle + "deg) translateY(-" + height + "px)",
                "data-300": "transform: rotate(" + angle + "deg) translateY(-" + (height - 50) + "px)"});
  }
}

function drawForegroundColumns(snap, columnCount, backgroundWidth, backgroundHeight, angle) {
  for (var index = 0; index < columnCount; ++index) {
    var x = backgroundWidth/2 + Math.random() * backgroundWidth/4;
    var width = 64 + Math.random() * 64;
    var split = width*2/3;
    var height = backgroundHeight + Math.random() * backgroundHeight/4;
    var column = drawColumn(snap, x, -height, height * 2, width, split, 16);
    column.attr({"data-0": "transform: translateX(-" + backgroundWidth/2 + "px) rotate(" + angle + "deg) translateY(-" + height*3 + "px)",
                 "data-300": "transform: translateX(-" + backgroundWidth/2 + "px) rotate(" + angle + "deg) translateY(-" + height + "px)"});
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