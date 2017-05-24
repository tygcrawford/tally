var tally;
var display = document.getElementById("tally");
var plus = document.getElementById("plus");
var clos = document.getElementById("close");

function checkForData(){
  chrome.storage.sync.get('tallySync', function(out){
    if(isNaN(out.tallySync)){
      tally = 0;
    }
    else{
      tally = out.tallySync;
    }
    display.innerHTML = tally;
  });
}

checkForData();

plus.addEventListener('click', function(){
  tally++;
  display.innerHTML = tally;
  chrome.storage.sync.set({'tallySync':tally}, function(){
  });
});

clos.addEventListener('click', function(){
  tally = 0;
  display.innerHTML = tally;
  chrome.storage.sync.set({'tallySync':tally}, function(){

  });
});

checkForData();
