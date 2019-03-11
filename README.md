# ⎇  alt-tab

A lightweight Chrome extension that enables fast switching between the <u>*current*</u> and <u>*last viewed*</u> tabs, without having to cycle though every tab in the window.

This a simplified fork originally created by [harshayburadkar](<https://github.com/harshayburadkar/clut-chrome-extension>). It removes analytics tracking, and simplifies some code. It is distributed under the MIT license.



## Installation

[![webstore](webstore.png)](https://chrome.google.com/webstore/detail/alt-tab/caffjcgoejncklegkijnfdnkdhljgeho)

######  Easy Install

You can install the extension from the [Google Web Store](https://chrome.google.com/webstore/detail/alt-tab/caffjcgoejncklegkijnfdnkdhljgeho). 

###### Manual Install

To install from source directly, clone this repository, and in the Chrome *Extensions* screen, first ensure the *Developer Mode* switch is set to ***on***, then select `Load unpack` and navigate to your locally cloned folder.



## Post Installation

Recent versions of Chrome prevent you from setting reserved keyboard bindings such as [**`Alt`**]+[**`Tab`**] or [**`Ctrl`**]+[**`Tab`**]. You can also use multiple shortcut combinations like [**`Cmd`**]+[**`Shift`**]+[**`X`**]

In order to force Chrome to use a reserved keyboard shortcut, follow these steps after you installation.

1. Open the [Chrome Extensions](chrome://extensions/?id=aeblfdkhhhdcdjpifhhbdiojplfjncoa) page:

   `Menu` > `More Tools` > `Extensions`, and press `Details` on alt-tab.

1. Open the ***Developer Tools*** panel on the alt-tab extension page:

   > `Menu` > `More Tools` > `Developer Tools`

1. Select the `Console` tab at the top of the `Developer Tools` panel.

1. Paste the following snippet into the console:
  ```javascript
  chrome.developerPrivate.updateExtensionCommand({
      extensionId: "caffjcgoejncklegkijnfdnkdhljgeho",
      commandName: "alt_switch_fast",
      keybinding: "Alt+Tab"
  });
  ```



#### Changing the default shortcut keys

To specify your own modify the `keybinding:` property (i.e. [**`⌘`**]+[**`X`**]:

   ```javascript
   keybinding: "Cmd+X"
   ```

