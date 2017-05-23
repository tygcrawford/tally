var tally = 0;
var display = document.getElementById("tally");
var plus = document.getElementById("plus");

plus.addEventListener('click', function(){
  tally++;
  display.innerHTML = tally;
});
