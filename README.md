# [⎇] alt-tab-chrome

An extension for Google Chrome that lets you switch between the *current* and *previously seen* tabs, without having to cycle forwards or backwards though all open tabs in the window.

## Installation

[![webstore](webstore.png)](https://chrome.google.com/webstore/detail/alt-tab/caffjcgoejncklegkijnfdnkdhljgeho)

You can install the extension from the [Google Web Extensions Store](https://chrome.google.com/webstore/detail/alt-tab/caffjcgoejncklegkijnfdnkdhljgeho). or by cloning this repository and using Chome's Extension Developer Mode to install the unpacked extension directly. 

Ensure that the *Developer Mode* switch is set to ***on*** in [*chrome://extensions*](chrome://extensions).



## Post instalation (important)

Recent versions of Chrome prevent you from setting reserved key-combinations such as `Alt+Tab` or `Ctrl+~`.

In order to force Chrome to use a reserved keyboard shortcut, follow these steps after installation.

- Navigate to the alt-tab *extension details* page by navigating to [chrome://extensions/?id=caffjcgoejncklegkijnfdnkdhljgeho](chrome://extensions/?id=caffjcgoejncklegkijnfdnkdhljgeho), *or* `Menu > "More Tools" > "Extensions"`.

- Press the ***Details*** button for the alt-tab extension.

- Open the ***Developer Tools*** panel *on the details page* by navigating to `Menu > More Tools > Extensions`.

- Press the *Console* button in the Tools tab area at the top of the panel.

- Paste the snippet into the console:

```javascript
chrome.developerPrivate.updateExtensionCommand({
    extensionId: "caffjcgoejncklegkijnfdnkdhljgeho",
    commandName: "alt_switch_fast",
    keybinding: "Alt+Tab"
});
```


To use a different tab-switching shortcut replace:
> keybinding: "**Alt**+**Tab**"

> with your desired shortcut, so `Ctrl+~` will become:

> keybinding: "**Ctrl**+**~**"

