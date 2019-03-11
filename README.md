# [⎇] alt-tab-chrome

An Chrome extension that lets you switch between the <u>current</u> and <u>previously viewed</u> tab, without having to cycle forwards / backwards though every window tab.



## Installation in Chrome

[![webstore](webstore.png)](https://chrome.google.com/webstore/detail/alt-tab/caffjcgoejncklegkijnfdnkdhljgeho)

You can install the extension from the [Google Web Extensions Store](https://chrome.google.com/webstore/detail/alt-tab/caffjcgoejncklegkijnfdnkdhljgeho). or by cloning this repository and using Chome's Extension Developer Mode to install the unpacked extension directly. 

Ensure that the *Developer Mode* switch is set to ***on*** in [*chrome://extensions*](chrome://extensions).



## Post Installation Setup

Recent versions of Chrome prevent you from setting reserved key-combinations such as [**`Alt`**]+[**`Tab`**] or [**`Ctrl`**]+[**`Tab`**]. 

In order to force Chrome to use a reserved keyboard shortcut, follow these steps after you installation.

- Navigate to the alt-tab *extension details* page by navigating to
   `Menu` > `More Tools` > `Extensions` > `alt-tab "Details" Button`

- Open the ***Developer Tools*** panel *on the details page* by navigating to:
   `Menu` > `More Tools` >`Developer Tools`

- Press the ***Console*** button in the Tools tab area at the top of the panel.

- Paste the following snippet into the console:
  ```javascript
  chrome.developerPrivate.updateExtensionCommand({
      extensionId: "caffjcgoejncklegkijnfdnkdhljgeho",
      commandName: "alt_switch_fast",
      keybinding: "Alt+Tab"
  });
  ```



#### Changing the default shortcut keys

To use a different tab-switching shortcut such as [`Ctrl`]+[`Tab`], replace:

> `keybinding: :Alt+Tab"`

with your desired shortcut, will become:

> `keybinding: "Ctrl+~"`

