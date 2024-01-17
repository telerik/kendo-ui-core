---
title: Appearance
page_title: Appearance
description: "Learn how to customize the appearance of the Telerik UI Slider HtmlHelper for {{ site.framework }}."
slug: slider_appearance
position: 2
---

# Appearance

> As of the R1 2022 release, the Slider uses a brand new rendering.

In this article, you will find information about the new rendering of the {{ site.product }} Slider.

For additional information on the decision behind these changes, visit the [Components Rendering](https://docs.telerik.com/{{ site.platform }}/styles-and-layout/components-rendering-overview) article.

## Old vs New Rendering

The old rendering of the component consisted of the following elements:

- The outer `div` wrapper with the `k-slider` class:
    ```html 
    <div class="k-widget k-slider">
    </div>
    ```

- The `div` element with `k-slider-wrap` class holding the slider items and the increasing and decreasing buttons:
    ```html 
    <div class="k-slider-wrap k-slider-buttons">
    </div>
    ```

- The `a` element for the **Increase** button with the `k-button-increase` class. This element is a child of the `k-slider-wrap` `div` element:
    ```html
    <a role="button" class="k-button k-button-increase" title="Increase">
        <span class="k-icon k-i-arrow-60-right"></span>
    </a>
    ```

- The `a` element for the **Decrease** button with the `k-button-decrease` class. This element is a child of the `k-slider-wrap` `div` element:
    ```html
    <a role="button" class="k-button k-button-decrease" title="Decrease">
        <span class="k-icon k-i-arrow-60-left"></span>
    </a>
    ```

- The `ul` element with `k-slider-items` class holding information about the Slider ticks. This element is a child of the `k-slider-wrap` `div` element:
    ```html
    <ul class="k-reset k-slider-items" role="presentation">      
          .....
    </ul>
    ```

- The `div` element with `k-slider-track` class holding information about the Slider selection. This element is a child of the `k-slider-wrap` `div` element:
    ```html
    <ul class="k-reset k-slider-items" role="presentation">      
          .....
    </ul>
    ```

The following example demonstrates the full version of the old rendering:
```html
    <div class="k-widget k-slider">
        <div class="k-slider-wrap k-slider-buttons">
        
          <a role="button" class="k-button k-button-increase" title="Increase" aria-label="Increase">
            <span class="k-icon k-i-arrow-60-right"></span>
          </a>
      
          <a role="button" class="k-button k-button-decrease" title="Decrease" aria-label="Decrease">
            <span class="k-icon k-i-arrow-60-left"></span>
          </a>
      
          <ul class="k-reset k-slider-items" role="presentation">      
            .....
          </ul>
      
          <div class="k-slider-track">
            .....
          </div>
      
          <input id="slider" type="text" data-role="slider">
        </div>
    </div>
```

The new rendering of the component consists of a single wrapping `span` element that contains the child `input` and `button` elements.

With the new rendering additional classes are applied to the **Increase** and **Decrease** buttons inside the Slider. For more information on the new button rendering, visit the [Button Styling]({% slug button_appearance %}) article.

The new rendering of the Slider component consists of the following elements:

- The outer `div` wrapper with the `k-slider` class:
    ```html 
    <div class="k-widget k-slider">
    </div>
    ```

- The `a` button element for the **Decrease** button with the `k-button-decrease` class. This element is now a direct child of the `k-slider` `div` element:
    ```html
    <a role="button" class="k-button k-button-md k-rounded-full k-button-solid  k-button-solid-base k-icon-button k-button-decrease" title="Decrease" aria-label="Decrease">
        <span class="k-button-icon k-icon k-i-arrow-w"></span>
    </a>
    ```

- The `div` element with the `k-slider-track-wrap` class, which holds information about the Slider items and selection. This element is a child of the `k-slider` `div` element:
    ```html 
    <div class="k-slider-track-wrap">
    </div>
    ```

- The `a` element for the **Increase** button with the `k-button-increase` class. This element is now a direct child of the `k-slider` `div` element:
    ```html
    <a role="button" class="k-button k-button-md k-rounded-full k-button-solid  k-button-solid-base k-icon-button k-button-increase" title="Increase"    aria-label="Increase">
        <span class="k-button-icon k-icon k-i-arrow-e"></span>
    </a>
    ```

- The `ul` element with the `k-slider-items` class, which holds information about the Slider ticks. This element is now a child of the `k-slider-track-wrap` `div` element:
    ```html
    <ul class="k-reset k-slider-items" role="presentation">      
          .....
    </ul>
    ```

- The `div` element with the `k-slider-track` class, which holds information about the Slider selection. This element is now a child of the `k-slider-track-wrap` `div` element:
    ```html
    <ul class="k-reset k-slider-items" role="presentation">      
        .....
    </ul>
    ```
The following example demonstrates the full version of the new rendering:

```html
    <div class="k-widget k-slider">

        <a role="button" class="k-button k-button-md k-rounded-full k-button-solid k-button-solid-base k-icon-button k-button-decrease" title="Decrease" aria-label="Decrease">
            <span class="k-button-icon k-icon k-i-arrow-w"></span>
        </a>
    
        <div class="k-slider-track-wrap">
            <ul class="k-reset k-slider-items" role="presentation">      
              .....
            </ul>
            <div class="k-slider-track">
              ....
            </div>
            <input id="slider" type="text" data-role="slider" >
        </div>
    
        <a role="button" class="k-button k-button-md k-rounded-full k-button-solid k-button-solid-base k-icon-button k-button-increase" title="Increase" aria-label="Increase">
            <span class="k-button-icon k-icon k-i-arrow-e"></span>
        </a>
    
    </div>
```


## Visual Backwards Compatibility

> When a LESS theme is used, the new styling and rendering support only the [default options](#options).

Previously, the **Increase** button in the DOM was rendered before the **Decrease** button.  

```javascript
$('.k-slider .k-button')[0] // Returns a reference to the increase button in the old rendering.
$('.k-slider .k-button')[1] // Returns a reference to the decrease button in the old rendering.
```

With the new rendering, the **Increase** button in the DOM is rendered after the **Decrease** button.

```javascript
$('.k-slider .k-button')[0] // Returns a reference to the decrease button in the new rendering.
$('.k-slider .k-button')[1] // Returns a reference to the increase button in the new rendering. 
```

Both in the old and new rendering, you can also reference the **Increase** and **Decrease** buttons by using the `k-button-increase` and `k-button-decrease` classes respectively. 
```javascript
$('.k-button-increase') // Returns a reference to the increase button.
$('.k-button-decrease') // Returns a reference to the decrease button.
```

The following example showcases how to customize the styles of the **Slider** in both the new, and the old rendering:

```
    <style>
      .k-slider .k-button:nth-of-type(1){ /* applies red border to the Decrease button with the new rendering; applies red border to the Increase button with the new rendering;  */
        border: 2px solid red;
      }
      .k-slider .k-button:nth-of-type(2){ /* applies red border to the Decrease button with the new rendering; applies red border to the Increase button with the new rendering;  */
        border: 2px solid green;
      }
      /*  NEW RENDERING */
      /*  The style below will works with version R1 2022 or later */
      .k-slider .k-slider-track-wrap{ /* applies pink background to the Slider items in the new rendering */
        background-color: pink;
      }
      /*  OLD RENDERING */
      /*  The style below will works with versions prior to R1 2022 */
      .k-slider  .k-slider-wrap{ /* applies yellow background to the slider items and the increasing and decreasing buttons in the old version */
        background-color: yellow;
      }
    </style>
```

## See Also

* [Appearance of the Button HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/button/appearance)
* [Slider Server-Side API](/api/slider)
* [Slider Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/slider)


