---
title: Cannot read properties of undefined (reading 'getRandomValues')
page_title: Cannot read properties of undefined (reading 'getRandomValues')
description: "Learn how to resolve the error message about the getRandomValues method."
slug: howto_resolve_getrandomvalues_message
tags: telerik, kendo, jquery, guid, crypto, getRandomValues, grid, error, defined
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® for jQuery</td>
 </tr>
</table>

## Description

I am getting the following error when I try to initialize a component or when I try to call the `kendo.guid()` method. Why?

```
Cannot read properties of undefined (reading 'getRandomValues')
```

## Solution

Newer versions of Kendo UI for jQuery use the [`Crypto`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto) interface to generate cryptographically secure unique ids. This interface is available in the `window` object of all modern browsers.

However, if you are working in an environment such as `jsdom`, it is possible that the `crypto` interface will not be available. In such cases, you can manually require it and assign it to the `window` object before you import the Kendo components.

```javascript
    window.crypto = require("crypto");
```

Alternatively, you could create a custom implementation of the `getRandomValues` method:

```javascript
 const crypto = {
  getRandomValues: () => {
    // Custom implementation that returns an array of 16 random integers.
    // Using Math.random is not advisable. For more information read the note here:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    const get16RandomNumbers = myCustomFunctionThatGenerates16RandomIntegers();
    return get16RandomNumbers;
  }
 };
 
 window.crypto = crypto;
```

However, we'd strongly advise against doing that as this could compromise the randomness of the generated numbers.

## See Also

* [getRandomValues Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues)
* [Crypto Interface](https://developer.mozilla.org/en-US/docs/Web/API/Crypto)
* [Crypto Interface in JSDOM Discussion](https://github.com/jsdom/jsdom/issues/1612)
