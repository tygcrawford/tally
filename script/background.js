var badge_on_off;
var tally;
var badge_ctrl = document.getElementById("badge_ctrl");

function displayBadge(){
  chrome.storage.sync.get('badge_ctrlSync', function(out){
    if(isNaN(out.badge_ctrlSync)){
      badge_on_off = true;
    }
    else{
      badge_on_off = out.badge_ctrlSync;
    }
  });

  chrome.storage.sync.get('tallySync', function(out){
    if(isNaN(out.tallySync)){
      tally = 0;
    }
    else{
      tally = out.tallySync;
    }

    if(badge_on_off){
      chrome.browserAction.setBadgeBackgroundColor({ color: [52, 73, 94, 1] });
      chrome.browserAction.setBadgeText({text: tally.toString()});
    }
    else{
      chrome.browserAction.setBadgeText({text: ""});
      badge_ctrl.className = "ion-android-checkbox-blank checkbox";
    }
  });
}

displayBadge();
