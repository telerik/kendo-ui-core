---
title: Handle Blur and Focus Events in AngularJS
page_title: Handle Blur and Focus Events in AngularJS | Kendo UI Editor
description: "Learn how to handle the blur and the focus events of a Kendo UI Editor in AngularJS."
slug: howto_handleblurandfocuseventsangular_editor
---

# Handle Blur and Focus Events in AngularJS

The Kendo UI Editor does not expose `focus` and `blur` events as built-in functionalities. However, it is possible for you to handle them in AngularJS through a custom directive and depending on the mode of widget initialization.

The Editor can be initialized either from a `<textarea>` HTML element&mdash;[the classic mode]({% slug overview_kendoui_editor_widget %}#classic-mode), or from a `<div>` HTML element&mdash;[the inline mode]({% slug overview_kendoui_editor_widget %}#inline-mode). Depending on which mode you apply to render the widget, use either of the approaches provided by the examples below.

For more information on how to handle the `blur` and `focus` events outside the AngularJS context, refer to this [how-to article]({% slug howto_handleblurandfocusevents_editor %}).

## Classic Mode

The example below demonstrates how to handle the `blur` and the `focus` events of the Kendo UI Editor in AngularJS when initialized from a `<textarea>` HTML element.

###### Example

```html
    <style>
        #editor{
          position: absolute;
          width: 90%;
          top: 60px;
        }
      </style>
      <body ng-app="myApp">
        <textarea id="editor" kendo-editor="Editor" my-dom-directive >
        </textarea>
        <script>

          var app = angular.module('myApp', [ "kendo.directives" ]);

          app.directive('myDomDirective', function() {
            return {
              restrict: 'A',
              link: function (scope, element, attrs) {
                scope.$on("kendoWidgetCreated", function(event, widget){
                  // the event is emitted for every widget; if you have multiple
                  // widgets, check that the event
                  // is for the one you are interested in.
                  if (widget === scope.Editor) {
                    $(widget.body).focus(function(){
                      console.log('Focus');
                    })
                  }
                });

                element.bind('blur', function () {
                  console.log('Blur');
                });
              }
            };
          });
        </script>
```

## Inline Mode

The example below demonstrates how to handle the `blur` and the `focus` events of the Kendo UI Editor in AngularJS when initialized from a `<div>` HTML element.

###### Example

```html
    <style>
      #editor{
        position: absolute;
        width: 90%;
        top: 60px;
      }
    </style>
    <body ng-app="myApp">
      <div id="editor" kendo-editor my-dom-directive >
      </div>
      <script>

        var app = angular.module('myApp', [ "kendo.directives" ]);

        app.directive('myDomDirective', function() {
          return {
            restrict: 'A',
            link: function (scope, element, attrs) {
              element.focus(function () {
                console.log('Focus');
              });
              element.bind('blur', function () {
                console.log('Blur');
              });
            }
          };
        });
      </script>
```

## See Also

Other articles on the Kendo UI Editor:

* [Editor JavaScript API Reference](/api/javascript/ui/editor)
* [How to Get Reference to Child Widgets]({% slug howto_get_referenceto_child_widgets_editor %})
* [How to Insert HTML Content via Custom Popup Tools]({% slug howto_insert_html_content_custom_popup_tool_editor %})
* [How to Set Caret Position]({% slug howto_set_caret_position_editor %})
* [How to Show Editor in Full Screen]({% slug howto_show_infull_screen_editor %})
* [How to Use Inline Editor inside Windows]({% slug howto_use_inline_editor_inside_windows_editor %})

For more runnable examples on the Kendo UI Editor, browse its [**How To** documentation folder]({% slug howto_add_max_length_validation_editor %}).
