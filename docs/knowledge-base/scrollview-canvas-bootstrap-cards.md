---
title: Create a ScrollView-based Canvas with Bootstrap Cards 
page_title: Create a ScrollView-based Canvas with Bootstrap Cards - Kendo UI ScrollView for jQuery
description: "Learn how to create a canvas with Bootstrap cards in the Kendo UI ScrollView for jQuery."
slug: howto_create_canvas_scrollview
tags: canvas, cards, scrollview
component: scrollview
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® ScrollView for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

How can I create a ScrollView-based canvas with Bootstrap cards?

## Solution

Your project might require you to create a canvas containing Bootstrap cards. In order to create the ScrollView-based canvas, the markup from which the widget should be initialized has to be prepopulated with the Bootstrap cards segmented in div HTML elements with data-role attribute set to `page`.

The following example demonstrates how create a ScrollView-based canvas with Bootstrap cards.

```dojo
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <div id="example">
      <div style="margin:auto; width:70%">
        <div id="scrollView" style="height: 268px; max-width: 100%;">
          <div class="page1" data-role="page">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Card 1</h5>
                <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="card-link">Card link</a>
              </div>
            </div>
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Card 2</h5>
                <h6 class="card-subtitle mb-2 text-muted">Card 2 subtitle</h6>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="card-link">Card link</a>

              </div>
            </div>

          </div>
          <div class="page2" data-role="page">

            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Card 3</h5>
                <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="card-link">Card link</a>
              </div>
            </div>
            <div class="card" >
              <div class="card-body">
                <h5 class="card-title">Card 4</h5>
                <h6 class="card-subtitle mb-2 text-muted">Card 4 subtitle</h6>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="card-link">Card link</a>
              </div>
            </div>
          </div>

          <div class="page3" data-role="page">
            <div class="card" >
              <div class="card-body">
                <h5 class="card-title">Card 5</h5>
                <h6 class="card-subtitle mb-2 text-muted">Card 5 subtitle</h6>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="card-link">Card link</a>

              </div>
            </div>

            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Card 6</h5>
                <h6 class="card-subtitle mb-2 text-muted">Card 6 subtitle</h6>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="card-link">Card link</a>

              </div>
            </div>
          </div> 
          <div class="page4" data-role="page">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Card 7</h5>
                <h6 class="card-subtitle mb-2 text-muted">Card 7 subtitle</h6>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="card-link">Card link</a>

              </div>
            </div>
          </div> 
        </div>
      </div>
      <script>
        $(document).ready(function() {
          $("#scrollView").kendoScrollView({
            enablePager: true,
            width:700,
            contentHeight: "100%"
          });
        });
      </script>
      <style>
        #scrollView .card {
          display: inline-block;
          height: 100%;
          width: 50%;
          word-wrap: break-word;
        }
        p {
          word-break: break-all;
          white-space: normal;
        }
      </style>
    </div>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/scrollview)
