$(document).ready(function(){
	'user strict';
	paper.install(window);
	paper.setup(document.getElementById('mainCanvas'));
	var c=Shape.Circle(200,200,50);
	c.fillcolor='green';
	paper.view.draw();
});