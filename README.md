## [⎇] alt-tab Chrome Extension

#### Installation

[![webstore](webstore.png)](https://chrome.google.com/webstore/detail/alt-tab/caffjcgoejncklegkijnfdnkdhljgeho)

You can install the extension from the [Google Web Extensions Store](https://chrome.google.com/webstore/detail/alt-tab/caffjcgoejncklegkijnfdnkdhljgeho). or by cloning this repository and using Chome's Extension Developer Mode to install the unpacked extension directly. 

Ensure that the *Developer Mode* switch is set to ***on*** in [*chrome://extensions*](chrome://extensions).



#### Post instalation (important)

Recent versions of Chrome prevent you from setting reserved key-combinations such as *Alt+Tab*, *Ctrl+~*, etc. 

In order to force Chrome to use a reserved keyboard shortcut, follow these steps after you installation.

*1)*  Navigate to the alt-tab *extension details* page by navigating to [chrome://extensions/?id=caffjcgoejncklegkijnfdnkdhljgeho](chrome://extensions/?id=caffjcgoejncklegkijnfdnkdhljgeho), *or* `Menu > "More Tools" > "Extensions"`.

*2)*  Press the ***Details*** button for the alt-tab extension.

*3)*  Open the ***Developer Tools*** panel *on the details page* by navigating to `Menu > More Tools > Extensions`.

*4)*  Press the *Console* button in the Tools tab area at the top of the panel.

*5)*  Paste the snippet into the console:

```javascript
chrome.developerPrivate.updateExtensionCommand({
    extensionId: "caffjcgoejncklegkijnfdnkdhljgeho",
    commandName: "alt_switch_fast",
    keybinding: "*Alt+Tab"
});
```


> To use a different tab-switching shortcut replace:
>
> > keybinding: **Alt**+**Tab**
>
> with your desired shortcut, so `Ctrl+~` will become:
>
> > keybinding: **Ctrl**+**~**
>

