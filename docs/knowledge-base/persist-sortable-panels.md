---
title: Persist Sortable Panels
description: An example on how to persist the order of panels in the Kendo UI Sortable widget.
type: how-to
page_title: Persist the Same Rendering of Panels | Kendo UI Sortable
slug: persist-sortable-panels
tags: sortable, panels, persist, order, state
res_type: kb
component: sortable
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Sortable</td>
 </tr>
</table>

## Description

How can I persist the order of the panels in the Sortable, so that when the user returns to the page, the panels are arranged in the same way?

## Solution

Keep the DOM for the panels in the web storage.

````dojo
<button id="reset">Reset</button>

    <div id="sidebar">
      <div id="profile" class="widget">
        <h3>Profile <span class="collapse k-icon k-i-sort-asc-sm"></span></h3>
        <div>
          <div class="profile-photo"></div>
          <h4>Lynda Schleifer</h4>
          <p>Sales Associate</p>
        </div>
      </div>
      <div id="teammates" class="widget">
        <h3>Teammates <span class="collapse k-icon k-i-sort-asc-sm"></span></h3>
        <div>
          <div class="team-mate">
            item 1
          </div>
          <div class="team-mate">
            item 2
          </div>
          <div class="team-mate">
            item 3
          </div>
        </div>
      </div>
    </div>
    <div id="main-content">
      <div id="news" class="widget">
        <h3>News <span class="collapse k-icon k-i-sort-asc-sm"></span></h3>
        <div>

          <h4><span>Jan 22, 2014</span>story 1</h4>

          <h4><span>Dec 10, 2013</span>story 2</h4>

          <h4><span>Nov 22, 2013</span>story 3</h4>

          <h4><span>Nov 20, 2013</span>story 4</h4>
        </div>
      </div>
      <div id="blogs" class="widget">
        <h3>Blogs <span class="collapse k-icon k-i-sort-asc-sm"></span></h3>
        <div>
          <h4>Upgrading OpenAccess ORM to Telerik Data Access</h4>
          <p class="blog-info">content</p>

          <h4>Design, then Develop Experiences</h4>
          <p class="blog-info">Friday, February 14, 2014 by Telerik Services</p>
          <p>content</p>

          <h4>What Carl Sagan Taught Me About Software</h4>
          <p class="blog-info">Thursday, February 13, 2014 by Kendo UI</p>
          <p>content</p>
        </div>
      </div>
    </div>

    <div class="responsive-message"></div>

    <script>
      $(document).ready(function() {

        if(localStorage.getItem("sideBar")) {
          $("#sidebar").html(localStorage.getItem("sideBar"));
        }

        if(localStorage.getItem("mainContent")) {
          $("#main-content").html(localStorage.getItem("mainContent"));
        }

        $("#sidebar").kendoSortable({
          filter: ">div",
          cursor: "move",
          connectWith: "#main-content",
          placeholder: placeholder,
          hint: hint,
          change: sideBarChange
        });

        $("#main-content").kendoSortable({
          filter: ">div",
          cursor: "move",
          connectWith: "#sidebar",
          placeholder: placeholder,
          hint: hint,
          change: mainContentChange
        });


        $("#reset").click(function() {
          localStorage.clear(); //clear the local storage
          alert("Local storage is cleared. Please reload the page!");
        });

      });

      function sideBarChange(e) {
        var content = $("#sidebar").getKendoSortable().element[0].innerHTML;
        localStorage.setItem("sideBar", content);
      }

      function mainContentChange(e) {
        var content = $("#main-content").getKendoSortable().element[0].innerHTML;
        localStorage.setItem("mainContent", content);
      }

      function placeholder(element) {
        return element.clone().addClass("placeholder");
      }

      function hint(element) {
        return element.clone().addClass("hint")
          .height(element.height())
          .width(element.width());
      }
    </script>
````

For the complete implementation of this approach, refer to [this runnable example](http://dojo.telerik.com/ixono/7).
