---
title: Pager
page_title: Configuration, methods and events of Kendo UI Pager
description: 'Configuration steps for the Pager widget and methods for different actions: return number of pages, page size, specified page, update all values.'
res_type: api
---

# kendo.ui.Pager

Represents the Kendo UI Pager widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### adaptiveMode `String`*(default: "none")*
Specifies a value whether the page sizes dropdown will be adaptive. Possible values are:

* `none` - The pager will not be adaptive.
* `auto` - The page sizes dropdown will be adaptive and on small devices an action sheet will be displayed.


<div class="meta-api-description">
Adjust or configure the page sizes selector to respond dynamically to different screen sizes, enabling or disabling responsive dropdown behavior for pagination controls, including adapting the display to mobile devices by switching from a standard dropdown to an action sheet for easier selection on small screens, controlling how page size options render and behave across various device widths, managing the user interface of pagination selectors for better usability on desktops and mobile devices, setting the pagination control to either fixed or fluid modes depending on viewport size, and customizing whether the page sizes dropdown adjusts automatically or remains static in different display environments.
</div>

#### Example - setting the adaptiveMode property
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
            data: [
                { productName: "Tea", category: "Beverages" },
                { productName: "Coffee", category: "Beverages" },
                { productName: "Ham", category: "Food" },
                { productName: "Bread", category: "Food" }
            ],
            pageSize: 25
          });

        dataSource.read();

        $("#pager").kendoPager({
          adaptiveMode: "auto",
          dataSource: dataSource
        });
    </script>
    <style>
      #pager{
       margin-top: 100px;
      }
    </style>

### ARIATemplate `String`*(default: "Page navigation, page #=page# of #=totalPages#")*
Specifies a template used to populate the value of the aria-label attribute of the pager element.The parameters available for the template are:

* `page` - The current page.
* `totalPages` - The total number of pages.


<div class="meta-api-description">
Control and customize the accessible ARIA label for pagination controls by defining dynamic templates that update the screen-reader text with current page numbers and total page counts, allowing configuration of how pagination status is announced to assistive technologies, enabling precise management of aria-label content for pagers, adjusting verbal descriptions for navigational elements, and incorporating variables such as the active page and total pages to improve accessibility and user experience in pagination components.
</div>

#### Example - setting the aria-label of the pager element
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
            data: [
                { productName: "Tea", category: "Beverages" },
                { productName: "Coffee", category: "Beverages" },
                { productName: "Ham", category: "Food" },
                { productName: "Bread", category: "Food" }
            ],
            pageSize: 25
          });

        dataSource.read();

        $("#pager").kendoPager({
          ARIATemplate: "Current page is #=page#",
          dataSource: dataSource
        });
    </script>
    <style>
      #pager{
       margin-top: 100px;
      }
    </style>

### autoBind `Boolean`*(default: true)*
Indicates whether the pager refresh method will be called within its initialization.


<div class="meta-api-description">
Manage automatic data loading and page rendering during Pager initialization by enabling or disabling the initial refresh call. Configure whether pagination triggers a refresh on startup to automatically fetch and display pages, or defer loading to control exactly when page data loads and updates. Set or toggle initial paging behavior to refresh data immediately upon component setup or postpone refresh to manually invoke page rendering and data retrieval later. Optimize page management by controlling the automatic invocation of refresh to suit scenarios requiring either instant page rendering or delayed, programmatic paging control during initialization.
</div>

#### Example - disable reading the state of the DataSource instance during initialization
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
            data: [
                { productName: "Tea", category: "Beverages" },
                { productName: "Coffee", category: "Beverages" },
                { productName: "Ham", category: "Food" },
                { productName: "Bread", category: "Food" }
            ],
            pageSize: 25
          });

        dataSource.read();

        $("#pager").kendoPager({
          autoBind: false,
          dataSource: dataSource
        });
    </script>
    <style>
      #pager{
       margin-top: 100px;
      }
    </style>

### buttonCount `Number`*(default: 10)*
Defines the number of buttons displayed in the numeric pager.


<div class="meta-api-description">
Configure or set the number of numeric page links or buttons shown in pagination controls to customize how many page navigation options are visible at once, enabling control over pagination density, layout, and usability. Adjust or limit the count of page numbers displayed to optimize user experience during paging, manage how many clickable page indices appear, and control the size and scope of the pagination component’s numeric navigation links in lists, tables, or grids. This feature helps tune the visible range of pages in page selectors, letting developers control and customize the numeric pager’s button quantity for clearer, more concise navigation UI.
</div>

#### Example - set button count
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });


        $("#pager").kendoPager({
          dataSource: dataSource,
          buttonCount: 1
        });

        dataSource.read();
    </script>
    <style>
        #pager {
  	      margin-top: 100px;
        }
    </style>

### dataSource `Object|kendo.data.DataSource`
Instance of kendo DataSource. See the [**kendo.data.DataSource**](/api/javascript/data/datasource).

This option is mandatory because the Pager is tightly connected with DataSource. The pager is UI widget for managing paging over the DataSource. The Pager gets values like page size or total count of items from DataSource.


<div class="meta-api-description">
Configure paging behavior by linking the pager to a data collection source that controls current page, page size, and total item count; connect the paging component to a dynamic data provider or data manager to handle pagination logic, page navigation, and item retrieval counts. Set or bind the pagination widget to a structured data source object to synchronize page updates, manage page states, and reflect changing data sets. Enable paging control through a data abstraction layer that supports fetching, updating, and tracking total records for accurate page calculation across large or filtered datasets.
</div>

#### Example - standalone pager
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
            data: [
                { productName: "Tea", category: "Beverages" },
                { productName: "Coffee", category: "Beverages" },
                { productName: "Ham", category: "Food" },
                { productName: "Bread", category: "Food" }
            ],
            pageSize: 2
        });

        $("#pager").kendoPager({
            dataSource: dataSource,
            pageSizes: [10, 25, 50]
        });

        dataSource.read();
    </script>
    <style>
        #pager {
  	      margin-top: 100px;
        }
    </style>

If the Pager is used with another widget then we usually specify this Pager like object of options for given widget. In that case the DataSource is automatically injected to the Pager from the widget. See example for a Grid below.

#### Example - grid pager
    <div id="grid"></div>

    <script>
        $("#grid").kendoGrid({
          columns: [
            { field: "productName" },
            { field: "category" }
          ],
          dataSource: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageable: {
            // we don't set any DataSource here
            pageSize: 2,
            buttonCount: 1
          }
        });
    </script>

### selectTemplate `String`
The template for selected page number link.


<div class="meta-api-description">
Customize the appearance and content of the currently active page number link by configuring a template that controls how the selected page is displayed, enabling developers to modify markup, insert icons, apply styles, or include dynamic values for active pagination indicators. This setting supports scenarios like styling the current page differently, adding graphical elements, adjusting the selected page presentation in pagers, and dynamically updating the active page link’s content to enhance user navigation experience. Options include defining HTML structures, customizing visual cues for the active page, and programmatically controlling the rendered format of the highlighted page number in pagination components.
</div>

#### Example - declare custom template for the selected page number
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          selectTemplate: '<li class="k-link"><span style="color:red">#=text#</span></li>'
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### linkTemplate `String`
The template for page number links.


<div class="meta-api-description">
Configure and customize the HTML structure and content for pagination links by setting templates that control how page numbers render, including modifying link text, adding CSS classes, inserting custom attributes, embedding data-bound values, and defining the overall markup for page navigation elements. Enable flexible design and behavior for pager links by specifying templates that shape each page link’s appearance and functionality, supporting custom formatting, styling, dynamic attributes, and alternative label content for page links in pagination components.
</div>

#### Example - declare custom link Template
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          linkTemplate: '<li><a href="\\#" class="k-link" data-#=ns#page="#=idx#"><strong>#=text#</strong></a></li>'
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### info `Boolean`*(default: true)*
Defines if a label showing current paging information will be displayed.


<div class="meta-api-description">
Configure the visibility of the paging information label to show or hide summaries like current page number, item ranges, or navigation status within pagination controls, enabling customization of page indicators, compact page summaries, or detailed page info display during user navigation and content browsing.
</div>

#### Example - hide the paging information

    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          info: false
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### input `Boolean`*(default: false)*
Defines if an input element which allows the user to navigate to given page will be displayed. If enabled only the numeric input will be rendered in the numeric portion of the pager.


<div class="meta-api-description">
Enable or configure the ability for users to type and enter specific page numbers directly within pagination controls, allowing quick navigation to any page by inputting its numeric value. This feature supports keyboard input for page selection, facilitates jumping to targeted pages without clicking through, and replaces default numeric buttons with a focused number entry field. It enhances user control over page navigation by permitting direct page number entry, numeric page input, and instant page jumping within pagers or pagination components.
</div>

#### Example - show the navigate-to-page input

    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          input: true,
          numeric: true
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### numeric `Boolean`*(default: true)*
Defines if numeric portion of the pager will be shown.


<div class="meta-api-description">
Control display of numeric page buttons in pagination by enabling or disabling the page number links between previous and next controls, adjust whether the pagination shows full numeric page indices or a simplified pager without numbers, configure compact versus detailed pagination navigation, set visibility for page number controls, toggle rendering of numeric links to create either minimal or expanded page navigation interfaces, customize pagination UI to include or exclude explicit page numbers, manage whether users see clickable page numbers alongside navigation arrows for easier page selection, and enable flexible pagination designs that either display or hide numeric page indicators.
</div>

#### Example - hides the numeric page links
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          numeric: false
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>


### pageSizes `Boolean|Array` *(default: false)*
If set to `true` the pager will display a drop-down which allows the user to pick a page size.
By default the page size drop-down is not displayed.

Can be set to an array of predefined page sizes to override the default list.
A special `all` value is supported. It sets the page size to the total number of records.

If a `pageSize` setting is provided for the data source then this value will be selected initially.


<div class="meta-api-description">
Configure the pagination control to let users select how many items or records appear per page by enabling or customizing a page-size dropdown, allowing setting predefined options or enabling an automatic "all" option to show all records at once; this feature supports initializing the selected page size based on default or data source values and provides flexible control over page length, display counts, records per page selectors, and user-driven page sizing in lists, tables, grids, or paged data components.
</div>

#### Example - show the page size drop-down with default values
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          pageSizes: true
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

#### Example - show the page size drop-down with custom values
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          pageSizes: [2, 3, 4, "all"]
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>


### previousNext `Boolean`*(default: true)*
Defines if buttons for navigating to the first, last, previous and next pages will be shown.


<div class="meta-api-description">
Configure navigation controls to show or hide buttons for moving to the previous, next, first, or last page within pagination interfaces. Enable or disable fast navigation features like next and previous page buttons or comprehensive page jumps to improve user flow and control paging behavior in lists, tables, or content displays. Adjust settings to control visibility of pagination arrows and navigation links, allowing users to quickly access adjacent or boundary pages during browsing or data navigation. Set options to toggle the display of page navigation elements that facilitate sequential or quick jumps between pages in paginated content.
</div>

#### Example - hide the first, last, previous and next buttons
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          previousNext: false
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### refresh `Boolean`*(default: false)*
Defines if a refresh button will be displayed. Click on that button will call DataSource read() method to get actual data.


<div class="meta-api-description">
Control the availability and behavior of a manual refresh or reload button within the paging interface, enabling users to trigger data updates on demand by invoking the data source’s fetch or read operations; configure, enable, or disable user-initiated refresh controls for paginated data views, supporting scenarios where manual data reloading, live updates, or on-demand synchronization of bound or remote data sets is necessary to keep displayed information current without automatic polling.
</div>

#### Example - show the refresh button
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          refresh: true
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### responsive `Boolean`*(default: true)*
Defines if the pager will be responsive.


<div class="meta-api-description">
Enable or disable adaptive pagination that dynamically adjusts layout, collapses, repositions, or reorganizes pager controls and navigation elements based on viewport width or screen size changes. Configure the pagination component to be mobile-friendly, responsive, fluid, or flexible across devices by controlling whether it automatically resizes, hides, or rearranges page indicators and buttons when the available display area shrinks or expands. Manage pagination responsiveness to support cross-device usability, improve user experience on small screens, and toggle responsive behavior during component setup or initialization.
</div>

#### Example - show the responsive button
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          responsive: false
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### messages `Object`
Defines texts shown within the pager. Use this option to customize or localize the pager messages.


<div class="meta-api-description">
Adjust, configure, or localize the text labels, captions, prompts, and messages shown in pagers, enabling customization of displayed content such as button labels, navigation hints, and informational text to fit different languages, user preferences, or branding requirements. Modify messages for next, previous, first, last buttons, page indicators, error notices, or accessibility prompts in pagination components to tailor the user interface for internationalization, readability, or contextual relevance across various applications and UI frameworks.
</div>

#### Example

    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" },
            { productName: "Milk", category: "Beverages" },
            { productName: "Cheese", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          input: true,
          numeric: true,
          pageSizes: [2, 4, "all"],
          messages: {
            display: "Showing {0}-{1} of {2} items",
            empty: "No data available",
            page: "Page",
            of: "of {0}",
            itemsPerPage: "items per page",
            first: "Go to first page",
            previous: "Go to previous page",
            next: "Go to next page",
            last: "Go to last page",
            allPages: "All"
          }
        });

        dataSource.read();
    </script>

### messages.display `String`*(default: "{0} - {1} of {2} items")*
The pager info text. Uses [kendo.format](/api/javascript/kendo/methods/format).

Contains three placeholders:
- {0} - the first data item index
- {1} - the last data item index
- {2} - the total number of data items


<div class="meta-api-description">
Customize and localize pagination messages by configuring display text with dynamic placeholders for the first item index, last item index, and total item count, enabling formatted, user-friendly page navigation info, supporting internationalization and adaptable messaging formats for different languages and contexts in paging interfaces.
</div>

#### Example - set the "display" message
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          messages: {
            display: "Showing {0}-{1} from {2} data items"
          }
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### messages.empty `String`*(default: "No items to display")*,
The text displayed when the DataSource view does no contain items.


<div class="meta-api-description">
Customize, translate, or set the notification, alert, or message displayed when a data grid, list, or collection view is empty or contains no records. Control how users see empty state text, no results feedback, or placeholder messages during data source loading with no items available. Adjust the user interface language or wording for empty content displays, blank views, or zero results notifications in pagination or data-bound components. Enable localization, internationalization, or customization of messages indicating the absence of data entries in a paged dataset or data source view.
</div>

#### Example - set the "empty" message
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          messages: {
            empty: "No data"
          }
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### messages.allPages `String`*(default: "All")*,
The text displayed for the item that represents the allPages option when allPages is enabled.


<div class="meta-api-description">
Control and customize the display text or label for the "all pages" option within pagination components, enabling or setting the wording that appears when users select to view every page or the entire dataset, including configuring messages, captions, or prompts related to showing all pages, full pagination views, or complete listings in user interfaces.
</div>

#### Example - set the label before the pager input
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          numeric: false,
          pageSizes: [ 2, 3, 'all'],
          messages: {
            allPages: "See All"
          }
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>


### messages.page `String`*(default: "Page")*,
The label displayed before the pager input.


<div class="meta-api-description">
Customize or translate the text label displayed before the page number input in pagination controls, enabling setting, configuring, or localizing the prompt such as "page," "page number," or other indicators seen beside pager input fields to match language preferences, UI terminology, or user interface localization needs in navigation or content pagination components.
</div>

#### Example - set the label before the pager input
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          input: true,
          numeric: true,
          messages: {
            page: "Enter page"
          }
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### messages.pageButtonLabel `String`*(default: "Page {0}")*,
The title of the numeric link page buttons of the **Pager**. The parameters available for the template are:

* `page` - The page that will becomes selected when clicking the button.


<div class="meta-api-description">
Configure and localize numeric pagination button labels by setting custom text that dynamically updates based on the current page number or selected page index, enabling control over pager button titles, page navigation prompts, and numeric page indicators for multilingual support, adaptive UI labeling, customized page selectors, and enhanced user interaction with page buttons.
</div>

#### Example - set the label before the pager input
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          input: true,
          messages: {
            pageButtonLabel: "This is page {0}"
          }
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### messages.pageSizeDropDownLabel `String`*(default: "Page sizes drop down")*

The label applied to the page size DropDownList.


<div class="meta-api-description">
Configure the text label or caption displayed next to the page size dropdown selector that controls how many items or rows appear per page in pagination controls, enabling customization of the dropdown prompt, title, or description to guide users in selecting page sizes, adjusting page length options, or setting the label for page size selection menus in paginated interfaces, search result navigation, or data grids.
</div>

#### Example
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          input: true,
          numeric: true,
          messages: {
            pageSizeDropDownLabel: "page size"
          },
          pageSizes: [1, 2, 5]
        });

        dataSource.read();
    </script>

### messages.of `String`*(default: "of {0}")*,
The label displayed before the pager input. Uses [kendo.format](/api/javascript/kendo/methods/format). Contains one optional placeholder {0} which represents the total number of pages.


<div class="meta-api-description">
Configure or customize the text label displayed before the pagination input field, enabling dynamic formatting that can include the total number of pages or other variables using format patterns like placeholders, templates, or string interpolation to control how page counts or page-related messages appear in navigational UI components.
</div>

#### Example - set the label after the pager input
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          input: true,
          numeric: true,
          messages: {
            of: "from {0}"
          }
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### messages.itemsPerPage `String`*(default: "items per page")*,
The label displayed after the page size DropDownList.


<div class="meta-api-description">
Control and customize the text or label shown after the page size selector or dropdown in pagination controls, enabling you to set how the number of items per page is described or displayed. Adjust, configure, or change the wording that follows the page size dropdown, customize pagination item count descriptions, modify labels for items per page in pagers, set or control the phrase that appears next to page size selectors, and enable personalized or localized text for page items count. Facilitate user interface text adjustments related to pagination and page size display in lists or grids with flexible configuration of the items per page label.
</div>

#### Example - set the label after the page size DropDownList
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          pageSizes: true,
          numeric:false,
          messages: {
            itemsPerPage: "data items per page"
          }
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### messages.first `String`*(default: "Go to the first page")*,
The tooltip of the button which navigates to the first page.


<div class="meta-api-description">
Set or customize the tooltip, hover text, or localized label for the first navigation control, enable accessibility or user hints for the initial page button, define or configure the descriptive message shown when users focus or mouse over the first pager element, adjust or provide internationalized or translated tooltip content for paging controls starting the sequence, control or specify the text that appears as a tooltip or helper tip on the first paging button in UI navigation components.
</div>

#### Example - set the tooltip of the first page button
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2,
          page: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          messages: {
            first: "First Page"
          }
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### messages.previous `String`*(default: "Go to the previous page")*,
The tooltip of the button which navigates to the previous page.


<div class="meta-api-description">
Configure or customize the tooltip text that appears when hovering over the pagination control for navigating to the previous page, including setting localized or translated labels, defining accessible hover descriptions for backward page navigation buttons, adjusting the previous-page button hints, enabling multilingual or custom tooltip messages for user interface elements controlling page stepping backward in paginated views, and setting user-friendly or context-specific descriptions that help users identify the function of moving to the prior page in data grids or list navigators.
</div>

#### Example - set the tooltip of the previous page button
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2,
          page: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          messages: {
            previous: "Previous Page"
          }
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### messages.next `String`*(default: "Go to the next page")*,
The tooltip of the button which navigates to the next page.


<div class="meta-api-description">
Customize or configure the label and tooltip text for the control that advances to the next page in a paginated interface, enabling developers to set, localize, or translate the navigation prompt that appears on hover or focus for moving forward through pages, sequences, or lists. This functionality covers adjusting the descriptive text for accessibility, user guidance, or multilingual support when users click or tap to proceed to subsequent pages, steps, or items in pagination controls.
</div>

#### Example - set the tooltip of the next page button
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          messages: {
            next: "Next Page"
          }
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### messages.last `String`*(default: "Go to the last page")*,
The tooltip of the button which navigates to the last page.


<div class="meta-api-description">
Set or customize the hover text, tooltip label, or informational message displayed on the navigation control directing users to the final page of a paginated list or grid. Configure the descriptive prompt, accessibility hint, or UI tip for the last page button in paging components, enabling clear user guidance for jumping to the end of data sets or page sequences. Adjust, update, or localize the text that appears when users mouse over or focus on the control used to move to the last segment or page of content in pagination controls or widgets.
</div>

#### Example - set the tooltip of the last page button
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          messages: {
            last: "Last Page"
          }
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### messages.refresh `String`*(default: "Refresh")*,
The tooltip of the refresh button.


<div class="meta-api-description">
Customize or translate the label, tooltip, or hover text for the refresh control on pagination components, enabling localization of the refresh button's accessible description, adjusting or setting the displayed message when users interact with the refresh action within paging interfaces, and supporting different languages, internationalization, or UI text variations related to refreshing paged data or reloading content in navigational pagers.
</div>

#### Example - set the tooltip of the refresh button
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          messages: {
            refresh: "Refresh data"
          },
          refresh: true
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### navigatable `Boolean`*(default: false)*
If set to `true` the user could navigate the widget using the keyboard navigation. By default keyboard navigation is disabled.


<div class="meta-api-description">
Enable or control keyboard navigation and focus management within the paging interface to allow users to move between pages or items using arrow keys, tab keys, or other keyboard shortcuts; configure accessibility keyboard support, keyboard interactions, and navigation controls for the pagination component to enhance usability for keyboard-only users, enabling or disabling focus traversal and keyboard event handling for seamless paging navigation during initialization or runtime.
</div>

#### Example - enable keyboard navigation
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
            data: [
                { productName: "Tea", category: "Beverages" },
                { productName: "Coffee", category: "Beverages" },
                { productName: "Ham", category: "Food" },
                { productName: "Bread", category: "Food" },
                { productName: "Potatoes", category: "Food" },
                { productName: "Rice", category: "Food" },
                { productName: "Tomatoes", category: "Food" },
                { productName: "Carrots", category: "Food" }
            ],
            pageSize: 2
          });

        dataSource.read();

        $("#pager").kendoPager({
          dataSource: dataSource,
          navigatable: true
        });
    </script>
    <style>
      #pager{
       margin-top: 100px;
      }
    </style>

### size `String`*(default: "medium")*

Sets a value controlling size of the component. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "none"


<div class="meta-api-description">
Control the pagination component's visual scale, density, and overall size by configuring the dimension setting to numeric values or descriptive keywords like small, medium, large, or none, enabling customization of the pager’s footprint, spacing, and appearance in user interfaces. Adjust the control’s size to create compact navigation controls for space-saving designs or larger, more prominent pagers for accessibility and visibility. Modify pager scaling to fit various UI layouts, optimize for touch targets, or tailor pagination elements’ dimensions according to user preferences or device types. This setting affects how the pager renders in terms of height, width, padding, and spacing, supporting flexible design adaptations from minimal to expansive pagination controls.
</div>

#### Example - sets a size

    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          size: "small",
          refresh: true
        });

        dataSource.read();
    </script>

## Methods

### totalPages

Returns the number of pages.


<div class="meta-api-description">
Get or calculate the total number of pages available based on the total items and items per page, enabling dynamic pagination controls, page count labels, or conditional rendering depending on the overall dataset size. Use this to fetch or compute how many pages exist given the current item count and page size, supporting scenarios like updating navigation buttons, displaying total pages to users, or adjusting logic flows based on the full pagination length. Whether you need to determine overall page numbers for UI, verify if further pages exist, or control pagination state programmatically, this method helps retrieve the total page count reflecting current pagination settings.
</div>

#### Example - get the total number of pages
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        dataSource.read();

        var pager = $("#pager").kendoPager({
          dataSource: dataSource
        }).data("kendoPager");

	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(pager.totalPages()); // displays "2"
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

#### Returns

`Number` The number of pages.

### pageSize

Returns the page size - maximum number of items allowed on one page.


<div class="meta-api-description">
Accessing or retrieving the maximum number of items displayed per page, controlling or checking the pagination limit, obtaining the current page size setting, reading how many entries appear on one page, querying or comparing item count restrictions in pagination, determining or fetching the configured items-per-page value, inspecting the number that defines the page limit, using the items count for updating or adjusting pagination behavior, and managing or referencing the allowed entries on a single page within a paginated view.
</div>

#### Example - get the page size
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        dataSource.read();

        var pager = $("#pager").kendoPager({
          dataSource: dataSource
        }).data("kendoPager");

	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(pager.pageSize()); // displays "2"
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

#### Returns

`Number` The maximum number of items allowed on one page.

### page

Gets or sets the current page.


<div class="meta-api-description">
Retrieve or update the current page of a pagination control by accessing or setting the page index; get the active page number to check which page is displayed, navigate to a specific page programmatically, control pagination state, jump to a desired numeric page, read current paging position, modify or set the pagination display index, manage or query page number, enable page navigation via code, and synchronize the pager’s current view with application logic.
</div>

#### Example - get current page
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        dataSource.read();

        var pager = $("#pager").kendoPager({
          dataSource: dataSource
        }).data("kendoPager");

	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(pager.page()); // displays "1"
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

#### Example - set current page
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        dataSource.read();

        var pager = $("#pager").kendoPager({
          dataSource: dataSource
        }).data("kendoPager");

        pager.page(2);
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

#### Parameters

##### page `Number`

The new page number.

#### Returns

`Number` The current page number.

### refresh

Updates all values of pager elements so that these values fit the values of DataSource. This method is automatically called after DataSource change event is fired.


<div class="meta-api-description">
Update or synchronize the paging UI to reflect the latest data source changes by recalculating and rendering current page numbers, selected page, page size, and total item count; manually trigger or automatically refresh page elements to ensure pagination controls match the underlying data state, reload pagination display, reset paging values, resync with updated dataset, force pager UI to reflect data updates, or update navigation controls after data changes.
</div>

#### Example - refresh the pager
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        dataSource.read();

        var pager = $("#pager").kendoPager({
          dataSource: dataSource
        }).data("kendoPager");

        pager.refresh();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### destroy

Unbinds all callbacks created within pager initialization. This method doesn't remove pager element from DOM.

> This method does not remove the widget element from DOM.


<div class="meta-api-description">
Remove or disable all event listeners, callbacks, or handlers set up during the initialization of a pager or pagination component without deleting or removing the pager’s HTML or DOM element, effectively stopping all pager-related events and preventing memory leaks while preserving the pager structure for further use or reinitialization, allowing developers to cleanly unwind event bindings, unhook event handlers, or reset the pager’s interactive state without affecting the surrounding markup or requiring a full component removal.
</div>

#### Example - destroy pager
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        dataSource.read();

        var pager = $("#pager").kendoPager({
          dataSource: dataSource
        }).data("kendoPager");

        pager.destroy();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

## Events

### change
Fires when the current page has changed.


<div class="meta-api-description">
Detect or respond to page navigation, track current page updates, listen for page change events, handle pagination state transitions, trigger data loading upon page switch, update user interface elements dynamically when pages shift, synchronize components based on new page numbers, implement logic reacting to page moves, process pagination event details, manage navigation changes and page updates for smooth paging experiences.
</div>

#### Event Data

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "change" event during initialization
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        dataSource.read();

        $("#pager").kendoPager({
          dataSource: dataSource,
          change: function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("pager change event");
          }
        });
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

#### Example - subscribe to the "change" event after initialization
    <div id="pager"></div>

    <script>
        function pager_change() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("pager change event");
        }

        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        dataSource.read();

        var pager = $("#pager").kendoPager({
          dataSource: dataSource
        }).data("kendoPager");

        pager.bind("change", pager_change);
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>
