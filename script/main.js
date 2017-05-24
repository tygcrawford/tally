var tally;
var badge_ctrlStore;
var display = document.getElementById("tally");
var plus = document.getElementById("plus");
var clos = document.getElementById("close");
var gear = document.getElementById("gear");
var set_ov = document.getElementById("settings_overlay");
var badge_ctrl = document.getElementById("badge_ctrl");
var minus = document.getElementById("minus");
var set_ov_switch = 2;
var badge_ctrl_switch = 2;

function checkForData(){
  chrome.storage.sync.get('badge_ctrlSync', function(out){
    if(isNaN(out.badge_ctrlSync)){
      badge_ctrlStore = true;
    }
    else {
      badge_ctrlStore = out.badge_ctrlSync;
    }
  });
  chrome.storage.sync.get('tallySync', function(out){
    if(isNaN(out.tallySync)){
      tally = 0;
    }
    else{
      tally = out.tallySync;
    }

    display.innerHTML = tally;
    if(badge_ctrlStore){
      chrome.browserAction.setBadgeBackgroundColor({ color: [52, 73, 94, 1] });
      chrome.browserAction.setBadgeText({text: tally.toString()});
    }
    else{
      chrome.browserAction.setBadgeText({text: ""});
      badge_ctrl.className = "ion-android-checkbox-blank checkbox";
    }
  });
}

badge_ctrl.addEventListener('click', function(){
  if(badge_ctrl_switch % 2 === 0){
    badge_ctrl.className = "ion-android-checkbox-blank checkbox";
    badge_ctrlStore = false;
    chrome.storage.sync.set({'badge_ctrlSync':false}, function(){
    });
    chrome.browserAction.setBadgeText({text: ""});
  }
  else if (badge_ctrl_switch % 2 === 1){
    badge_ctrl.className = "ion-android-checkbox checkbox";
    badge_ctrlStore = true;
    chrome.storage.sync.set({'badge_ctrlSync':true}, function(){
    });
    chrome.browserAction.setBadgeText({text: tally.toString()});
  }
  badge_ctrl_switch++;
});

gear.addEventListener('click', function(){
  if(set_ov_switch % 2 === 0){
    set_ov.style.visibility = 'visible';
  }
  else if (set_ov_switch % 2 === 1) {
    set_ov.style.visibility = 'hidden';
  }

  set_ov_switch++;
});

plus.addEventListener('click', function(){
  tally++;
  display.innerHTML = tally;
  if(badge_ctrlStore){
    chrome.browserAction.setBadgeText({text: tally.toString()});
  }
  chrome.storage.sync.set({'tallySync':tally}, function(){
  });
});

clos.addEventListener('click', function(){
  tally = 0;
  display.innerHTML = tally;
  if(badge_ctrlStore){
    chrome.browserAction.setBadgeText({text: tally.toString()});
  }
  chrome.storage.sync.set({'tallySync':tally}, function(){
  });
});

minus.addEventListener('click', function(){
  tally--;
  display.innerHTML = tally;
  if(badge_ctrlStore){
    chrome.browserAction.setBadgeText({text: tally.toString()});
  }
  chrome.storage.sync.set({'tallySync':tally}, function(){
  });
});

checkForData();
