
var mru = [];
var slowSwitchOngoing = false;
var fastSwitchOngoing = false;
var intSwitchCount = 0;
var lastIntSwitchIndex = 0;
var altPressed = false;
var wPressed = false;

var domLoaded = false
var quickActive = 0;
var slowActive = 0;

var prevTimestamp = 0;
var slowtimerValue = 1500;
var fasttimerValue = 200;
var timer;

var slowswitchForward = false;

var initialized = false;

var loggingOn = false;

var logger = function(str) {
	if(loggingOn) {
		console.log(str);
	}
}

function createDevTools() {
	chrome.devtools.panels.create("alt-tab", "icon256.png","devtools.html",
    	function(panel) {
      		// code invoked on panel creation
    	}
	);
}

function onInstall() {
	logger("Extension Installed");
}

function onUpdate() {
	logger("Extension Updated");
}

function getVersion() {
	var details = chrome.app.getDetails();
	return details.version;
}

// Check if the version has changed.
var currVersion = getVersion();
var prevVersion = localStorage['version']
logger("prev version: "+prevVersion);
logger("curr version: "+currVersion);
if (currVersion != prevVersion) {
// Check if we just installed this extension.
	if (typeof prevVersion == 'undefined') {
        onInstall();
    } else {
		onUpdate();
	}
	localStorage['version'] = currVersion;
}


var processCommand = function(command) {
	logger('Command recd:' + command);
	var fastswitch = true;
	slowswitchForward = false;
	if(command == "alt_switch_fast") {
		fastswitch = true;
		quickSwitchActiveUsage();
	}

	if(!slowSwitchOngoing && !fastSwitchOngoing) {

		if(fastswitch) {
			fastSwitchOngoing = true;
		}
	
		logger("START_SWITCH");
		intSwitchCount = 0;
		doIntSwitch();

	} else if(slowSwitchOngoing && fastswitch) {
		endSwitch();
		fastSwitchOngoing = true;
		logger("START_SWITCH");
		intSwitchCount = 0;
		doIntSwitch();
	}

	if(timer) {
		if(fastSwitchOngoing || slowSwitchOngoing) {
			clearTimeout(timer);
		}
	}
	if(fastswitch) {
		timer = setTimeout(function() {endSwitch()},fasttimerValue);
	} else {
		timer = setTimeout(function() {endSwitch()},slowtimerValue);
	}

};

chrome.commands.onCommand.addListener(processCommand);

chrome.browserAction.onClicked.addListener(function(tab) {
	logger('Click recd');
	processCommand('alt_switch_fast');

});

chrome.runtime.onStartup.addListener(function () {
	logger("on startup");
	initialize();

});

chrome.runtime.onInstalled.addListener(function () {
	logger("on startup");
	initialize();

});


var doIntSwitch = function() {
	logger(" in int switch, intSwitchCount: "+intSwitchCount+", mru.length: "+mru.length);
	if (intSwitchCount < mru.length && intSwitchCount >= 0) {
		var tabIdToMakeActive;
		//check if tab is still present
		//sometimes tabs have gone missing
		var invalidTab = true;
		var thisWindowId;
		if(slowswitchForward) {
			decrementSwitchCounter();	
		} else {
			incrementSwitchCounter();	
		}
		tabIdToMakeActive = mru[intSwitchCount];
		chrome.tabs.get(tabIdToMakeActive, function(tab) {
			if(tab) {
				thisWindowId = tab.windowId;
				invalidTab = false;

				chrome.windows.update(thisWindowId, {"focused":true});
				chrome.tabs.update(tabIdToMakeActive, {active:true, highlighted: true});
				lastIntSwitchIndex = intSwitchCount;
				//break;
			} else {
				logger(" in int switch, >>invalid tab found.intSwitchCount: "+intSwitchCount+", mru.length: "+mru.length);
				removeItemAtIndexFromMRU(intSwitchCount);
				if(intSwitchCount >= mru.length) {
					intSwitchCount = 0;
				}
				doIntSwitch();
			}
		});	

		
	}
}

var endSwitch = function() {
	logger("END_SWITCH");

	fastSwitchOngoing = false;
	var tabId = mru[lastIntSwitchIndex];
	putExistingTabToTop(tabId);
}

chrome.tabs.onActivated.addListener(function(activeInfo){
	if(!slowSwitchOngoing && !fastSwitchOngoing) {
		var index = mru.indexOf(activeInfo.tabId);

		//probably should not happen since tab created gets called first than activated for new tabs,
		// but added as a backup behavior to avoid orphan tabs
		if(index == -1) {
			logger("Unexpected scenario hit with tab("+activeInfo.tabId+").")
			addTabToMRUAtFront(activeInfo.tabId)
		} else {
			putExistingTabToTop(activeInfo.tabId);	
		}
	}
});

chrome.tabs.onCreated.addListener(function(tab) {
	logger("Tab create event fired with tab("+tab.id+")");
	addTabToMRUAtBack(tab.id);
});

chrome.tabs.onRemoved.addListener(function(tabId, removedInfo) {
	logger("Tab remove event fired from tab("+tabId+")");
	removeTabFromMRU(tabId);
});


var addTabToMRUAtBack = function(tabId) {

	var index = mru.indexOf(tabId);
	if(index == -1) {
		//add to the end of mru
		mru.splice(-1, 0, tabId);
	}

}
	
var addTabToMRUAtFront = function(tabId) {

	var index = mru.indexOf(tabId);
	if(index == -1) {
		//add to the front of mru
		mru.splice(0, 0,tabId);
	}
	
}
var putExistingTabToTop = function(tabId){
	var index = mru.indexOf(tabId);
	if(index != -1) {
		mru.splice(index, 1);
		mru.unshift(tabId);
	}
}

var removeTabFromMRU = function(tabId) {
	var index = mru.indexOf(tabId);
	if(index != -1) {
		mru.splice(index, 1);
	}
}

var removeItemAtIndexFromMRU = function(index) {
	if(index < mru.length) {
		mru.splice(index, 1);
	}
}

var incrementSwitchCounter = function() {
	intSwitchCount = (intSwitchCount+1)%mru.length;
}

var decrementSwitchCounter = function() {
	if(intSwitchCount == 0) {
		intSwitchCount = mru.length - 1;
	} else {
		intSwitchCount = intSwitchCount - 1;
	}
}

var initialize = function() {

	if(!initialized) {
		initialized = true;
		chrome.windows.getAll({populate:true},function(windows){
			windows.forEach(function(window){
				window.tabs.forEach(function(tab){
					mru.unshift(tab.id);
				});
			});
			logger("MRU after init: "+mru);
		});
	}
}	

initialize();

var quickSwitchActiveUsage = function() {

	if(domLoaded) {
		if(quickActive == -1) {
			return;
		} else if(quickActive < 5){
			quickActive++;
		} else if(quickActive >= 5) {

			quickActive = -1;
		}
	}
}