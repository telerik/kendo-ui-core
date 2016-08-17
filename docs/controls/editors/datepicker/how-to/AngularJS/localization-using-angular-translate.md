---
title: Localize with Angular Translate
page_title: Localize with Angular Translate | Kendo UI DatePicker
description: "Learn how to localize the Kendo UI DatePicker in AngularJS environment with Angular Translate."
slug: howto_localize_datepicker_using_angular_translate
---

# Localize with Angular Translate

The example below demonstrates how to localize a Kendo UI DatePicker in an AngularJS environment using Angular Translate.

###### Example

```html
<script src="http://cdnjs.cloudflare.com/ajax/libs/bower-angular-translate/2.0.1/angular-translate.min.js"></script>
    <script src="http://cdn.kendostatic.com/2014.2.903/js/cultures/kendo.culture.de-DE.min.js"></script>
    <script src="http://cdn.kendostatic.com/2014.2.903/js/cultures/kendo.culture.en-US.min.js"></script>
    <div id="example" ng-app="KendoDemos">
      <div ng-controller="MyCtrl">
        <p>{{ 'TITLE' | translate }}</p>
        <p>{{ 'FOO' | translate }}</p>

        <!-- the DropDown is used to change the culture -->
        <kendo-dropdownlist options="dropDownOptions" ng-model="lang"></kendo-dropdownlist>

        <!-- k-rebind="mainGridOptions.language" is used to force the widget update -->
        <kendo-grid options="mainGridOptions" k-rebind="mainGridOptions.language"></kendo-grid>

        <!-- k-rebind="calendarOptions.culture" is used to force the widget update -->
        <kendo-calendar options="calendarOptions" k-rebind="calendarOptions.culture"></kendo-calendar>
      </div>
    </div>

    <script>
      var app = angular.module("KendoDemos", [ "kendo.directives", "pascalprecht.translate"]);

      //set up the language provider (http://angular-translate.github.io/docs/#/guide)
      app.config(['$translateProvider', function ($translateProvider) {
        $translateProvider.translations('en-US', {
          'TITLE': 'Hello',
          'FOO': 'This is a paragraph'
        });

        $translateProvider.translations('de-DE', {
          'TITLE': 'Hallo',
          'FOO': 'Dies ist ein Paragraph'
        });

        $translateProvider.preferredLanguage('en-US');
      }]);

      function MyCtrl($scope, $translate) {

        $scope.lang = "en-US";

        $scope.calendarOptions = {
          culture: "en-US"
        }

        $scope.dropDownOptions = {
          dataValueField: "value",
          dataTextField: "text",
          dataSource : {
            data: [{value: "en-US", text: "English"}, {value: "de-DE", text:"German"}]
          },
          change: function(){

            /* The kendo.culture.xx-XX.js files can be pre-loaded in the <head> section of the document,
                    but the kendo.messages.xx-XX.js file should be loaded on demand when the language is about to change */

            /* We are using the jQuery.getScript method to load the messages file
                    and use the callback function to change the kendo culture, kendo messages and angular-translate language */

            $.getScript("http://cdn.kendostatic.com/2014.2.903/js/messages/kendo.messages." + $scope.lang + ".min.js", function() {

              /* $scope.$apply should be used in order to notify the $scope for language change */
              $scope.$apply(function(){

                $translate.use($scope.lang); //change angular-translate language
                kendo.culture($scope.lang); //change kendo culture

                /* we use dummy language option in order to force the Grid to rebind */
                $scope.mainGridOptions.language = $scope.lang;

                /* we change the calendar widget culture option in order to force the Calendar to rebind */
                $scope.calendarOptions.culture = $scope.lang;

              })
            });
          }
        }

        $scope.mainGridOptions = {
          dataSource: {
            type: "odata",
            transport: {
              read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
            },
            pageSize: 5,
            serverPaging: true,
            serverSorting: true
          },
          sortable: true,
          pageable: true,
          language: "english",
          columns: [{
            field: "FirstName",
            title: "First Name",
            width: "120px"
          },{
            field: "LastName",
            title: "Last Name",
            width: "120px"
          },{
            field: "Country",
            width: "120px"
          },{
            field: "City",
            width: "120px"
          },{
            field: "Extension"
          }]
        };
      }
    </script>
```

## See Also

Other articles on the Kendo UI DatePicker:

* [DatePicker JavaScript API Reference](/api/javascript/ui/datepicker)
* [How to Set the First Weekday]({% slug howto_set_first_weekday_datepicker %})
* [How to Create Date Masking]({% slug howto_create_date_masking_datepicker %})
* [How to Globally Modify Default Options]({% slug howto_globally_modify_default_options_datepicker %})
* [How to Hide the Deafult Button]({% slug howto_hide_default_button_datepicker %})
* [How to Integrate DatePicker with DateJS Library]({% slug howto_integrate_withdatejs_library_datepicker %})
* [How to Make Input Elements Readonly]({% slug howto_make_input_elements_readonly_datepicker %})
* [How to Persist Entered Dates]({% slug howto_persist_entered_dates_datepicker %})
* [How to Resize Calendar Based on Input Width]({% slug howto_use_resize_calendar_basedon_input_width_datepicker %})

For more runnable examples on the Kendo UI DatePicker, browse its [**How To** documentation folder]({% slug howto_select_ranges_between_datepicker %}).
