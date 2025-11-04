---
title: Dialog
page_title: Configuration, methods and events of Kendo UI Dialog
description: How to initialize a Dialog UI widget and configure its behaviors, center a dialog, set its content and toggle the state of the UI widget.
res_type: api
component: dialog
---

# kendo.ui.Dialog

Represents the Kendo UI Dialog. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### actions `Array`

A collection of objects containing text, action and primary attributes used to specify the dialog buttons.

<div class="meta-api-description">
How to customize dialog button behavior in Kendo UI for jQuery? Set up dialog button configurations by defining an array of button objects that include label text, callback functions or action handlers, and flags to indicate the main or primary button. Customize dialog interactions by assigning button names, linking specific event triggers or method calls, highlighting the default or emphasized action, and managing multiple buttons within a modal or popup. Control how dialog buttons appear and behave by specifying identifiers, actions to execute on click, and prioritizing buttons for user flow or accessibility. Enable tailored dialog controls by providing structured button properties, including text labels, interaction callbacks, and primary button markers to shape user interface behavior and response handling.
</div>

#### Example

    <div id="dialog"></div>
    <script>
        $("#dialog").kendoDialog({
          title: "Kendo Dialog Component",
          content: "This is your Kendo Dialog.",
          actions: [{
              text: "OK",
              action: function(e){
                  // e.sender is a reference to the dialog widget object
                  // OK action was clicked
                  // Returning false will prevent the closing of the dialog
                  return false;
              },
              primary: true
          },{
              text: "Cancel"
          }]
        });
    </script>

### actions.text `String`

The text to be shown in the action's button.


<div class="meta-api-description">
How do I customize the button labels in Kendo UI for jQuery Dialog? Customize button labels, captions, or text displayed on dialog action buttons by setting or configuring the exact string users see within modal dialogs or pop-ups. Control, change, update, or specify the visible wording for interactive buttons in dialog interfaces, enabling tailored or localized action names, confirming or canceling prompts, and adjusting calls-to-action to match user expectations or UX requirements in dialog components. Adjust the text content shown on buttons inside modal dialogs, ensuring the action label matches functionality or context, including options to rename, localize, or dynamically set button captions during dialog setup or initialization.
</div>

#### Example

    <div id="dialog"></div>
    <script>
        $("#dialog").kendoDialog({
          title: "Kendo Dialog Component",
          content: "This is your Kendo Dialog.",
          actions: [{
              text: "OK",
          }]
        });
    </script>

### actions.action `Function`

The callback function to be called after pressing the action button.


<div class="meta-api-description">
How do I configure an action button in a Kendo UI dialog to perform custom actions after being clicked? Configure custom behavior triggered by pressing an action button within a dialog interface, enabling execution of callback functions to handle button clicks, manage form submissions, validate user input, close dialogs, or perform both synchronous and asynchronous operations after interaction. This setup supports defining event handlers for click events, controlling dialog flow based on user actions, executing post-click logic, managing responses to confirmation or cancellation buttons, and integrating custom workflows triggered by dialog button presses.
</div>

#### Example

    <div id="dialog"></div>
    <script>
        $("#dialog").kendoDialog({
          title: "Kendo Dialog Component",
          content: "This is your Kendo Dialog.",
          actions: [{
              text: "OK",
              action: function(e){
                  // e.sender is a reference to the dialog widget object
                  alert("OK action was clicked");
                  // Returning false will prevent the closing of the dialog
                  return true;
              },
          }]
        });
    </script>

### actions.primary `Boolean`

A boolean property indicating whether the action button will be decorated as primary button or not.


<div class="meta-api-description">
How to make the main action button in a Kendo UI dialog stand out? Control the main action button’s emphasis, styling, or primary highlight within dialog interfaces by enabling or disabling a boolean flag to switch between default and prominent button appearances, allowing customization of which dialog action stands out as the primary call-to-action, configuring emphasis, focus, or visual priority for dialog buttons during setup, toggling between standard and highlighted action button styles, or setting a flag to mark the key dialog action for enhanced visual prominence and user guidance.
</div>

#### Example

    <div id="dialog"></div>
    <script>
        $("#dialog").kendoDialog({
          title: "Kendo Dialog Component",
          content: "This is your Kendo Dialog.",
          actions: [{
              text: "OK",
              primary: true
          }]
        });
    </script>

### actions.cssClass `String`

Adds a custom class to the action button.


<div class="meta-api-description">
How to set custom CSS classes for dialog action buttons in Kendo UI? Customize the styling, appearance, or theme of dialog action buttons by assigning one or multiple CSS classes to these elements for targeted control. Configure or set specific class names to control visual design, apply custom styles, enable theming, or facilitate selection through CSS selectors or JavaScript. Enable developers to add, manage, or override button styles in dialogs by applying class names that can be used for customizing layout, colors, animations, or interaction states. This functionality supports fine-tuning dialog action button presentation, theming consistency, or integration with design systems through CSS class manipulation and style targeting.
</div>

#### Example

    <div id="dialog"></div>
    <script>
        $("#dialog").kendoDialog({
          title: "Kendo Dialog Component",
          content: "This is your Kendo Dialog.",
          actions: [{
              text: "OK",
              primary: true,
              cssClass: "myClass"
          }]
        });
    </script>
	
	  <style>
		  .myClass{
			  background-color: green !important;
		  }
	  </style>

### animation `Boolean|Object`

A collection of {Animation} objects, used to change default animations. A value of `false` will disable all animations in the widget.

`animation:true` is not a valid configuration.


<div class="meta-api-description">
How can I control the animation of a Kendo UI dialog? Control the visual transition effects and animation settings for modal or popup dialogs by customizing the entry and exit animations, enabling smooth fade, slide, or other animated effects, toggling animations on or off, overriding default motion sequences with custom animation collections, and disabling all transition animations entirely for static dialog appearance.
</div>

#### Example - disable animation

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog.",
      animation: false
    });
    </script>

### animation.close `Object`

The animation that will be used when a Dialog closes.


<div class="meta-api-description">
How can I customize the closing animation of a Kendo UI dialog? Customize and control how a dialog or modal window disappears by configuring closing animations such as fade-out, slide-up, or zoom effects, including options to set the animation duration, easing curves, speed, intensity, or to enable and disable the closing transition entirely, allowing precise tuning of exit animations for dialogs or pop-ups to create smooth, responsive, or instant disappearing effects that match user experience needs and design preferences.
</div>

#### Example - disable close animation

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog.",
      animation: {
        close: false
      }
    });
    </script>

### animation.close.effects `String`

Effect to be used for closing of the popup.


<div class="meta-api-description">
How do I customize the closing animation of a Kendo UI Dialog? Configure and customize the closing animation effects for modal dialogs or popups, enabling fade-out, slide-away, zoom-out, or other transition styles with adjustable timing, speed, easing curves, and visual behaviors to enhance user interface feedback when dialogs disappear or close; this setting supports precise control over exit animations to create smooth, responsive, and visually appealing modal dismissal experiences through flexible effect combinations and duration adjustments.
</div>

#### Example - use only fade out animation when closing dialog

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog.",
      animation: {
        close: {
          effects: "fade:out"
        }
      }
    });
    </script>

### animation.close.duration `Number`

Defines the close animation duration.


<div class="meta-api-description">
How do I adjust the closing animation speed of a Kendo UI dialog? Adjust or configure the closing animation speed, transition duration, or fade out time for dialogs, modals, or popups by setting a numeric value that controls how long the close animation runs or how quickly the component disappears; customize, shorten, extend, or fine-tune the exit animation timing to create smooth or rapid closing effects, control animation speed during dialog shutdown, and optimize user interface responsiveness during the closing phase.
</div>

#### Example - make the close animation 2 seconds long

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog.",
      animation: {
        close: {
          duration: 2000
        }
      }
    });
    </script>

### animation.open `Object`

The animation that will be used when a Dialog opens.


<div class="meta-api-description">
How do I customize the animation effect when opening a Kendo UI dialog? Customize or configure the opening animation effect for dialogs, including selecting from fade, slide, scale, or other built-in transitions, or providing custom animation settings to control how a dialog or modal window appears when triggered, enabling smooth or dynamic entry effects for user interfaces, popups, or overlay components that activate on open.
</div>

#### Example - disable open animation

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog.",
      animation: {
        open: false
      },
      visible: false
    });
    $("#dialog").data("kendoDialog").open();
    </script>

### animation.open.effects `String`

Effect to be used for opening of the popup.


<div class="meta-api-description">
How do I customize the animation effect when opening a Kendo UI dialog? Set or customize the visual transition, animation, or effect that occurs when a dialog, popup, or modal window opens, including options to enable, configure, or control the entrance motion, fade-in, slide, zoom, or other show behaviors to match UI animations and improve user experience during dialog activation.
</div>

#### Example - use only fade animation when opening dialog

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog.",
      animation: {
        open: {
          effects: "fade:in"
        }
      },
      visible: false
    });
    $("#dialog").data("kendoDialog").open();
    </script>

### animation.open.duration `Number`

Defines the open animation duration.


<div class="meta-api-description">
How do I adjust the speed of a Kendo UI dialog's opening animation? Adjust the length of the dialog's opening animation to control the speed and smoothness of how dialogs appear on screen, customize the timing for better user experience, fine-tune animation duration to optimize perceived performance, configure how quickly or slowly dialogs fade in or slide open, manage entrance animation timing to match app responsiveness, set the delay or length of dialog opening effects, alter transition speed for dialog visibility, control how long the popup or modal entrance animation lasts, modify open animation speed to enhance UI fluidity, and enable precise control over dialog show timing.
</div>

#### Example - make the open animation 100 milliseconds long

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog.",
      animation: {
        open: {
          duration: 100
        }
      },
      visible: false
    });
    $("#dialog").data("kendoDialog").open();
    </script>

### buttonLayout `String` *(default: "stretched")*

Specifies the possible layout of the action buttons in the **Dialog**.

Note: Stretched layout has no effect in browsers, like IE9, that do not support flexbox.

Possible values are:

* normal
* stretched


<div class="meta-api-description">
How do I configure button layout in Kendo UI Dialog? Adjust and configure the arrangement and sizing of dialog action buttons, enabling options to set buttons in a standard compact layout or expand them to full width using flexible layout techniques, ensuring control over button alignment, spacing, and responsiveness for various interface designs and user experiences, with support considerations for browsers lacking flexbox support.
</div>

#### Example

    <div id="dialog"></div>
    <script>
        $("#dialog").kendoDialog({
            title: "Kendo Dialog Component",
            content: "This is your Kendo Dialog.",
            buttonLayout: "normal",
            actions: [{
              text: "OK",
              primary: true
          },{
              text: "Cancel"
          }]
        });
    </script>

### closable `Boolean` *(default: true)*

Specifies whether a close button should be rendered at the top corner of the dialog.


<div class="meta-api-description">
How do I enable or disable the close button in a Kendo UI dialog window? Enable or disable the visibility of the close button in a dialog window, allowing configuration to show or hide the top corner exit control, toggle the user’s ability to close the dialog via a UI element, customize dialog dismissal options, control whether the dialog includes an interactive close icon, and manage whether users can click a close button to exit or remain within modal or popup interfaces.
</div>

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog.",
      closable: true
    });
    </script>

### content `String`

Specifies the content of a **Dialog**.


<div class="meta-api-description">
How do I set the initial content of a Kendo UI dialog? Configure or set the inner content, markup, or template rendered within a dialog or modal window by specifying and binding dynamic data, HTML, or components for display at initialization or runtime; control, load, insert, or update the dialog’s displayed content to customize messages, forms, text, or interfaces inside the popup overlay, enabling flexible presentation and embedding of various content types during component setup or through data-driven bindings.
</div>

#### Example - fetch content from the server

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "<em>Dialog content</em>"
    });
    </script>

#### Example - use a template to define the Dialog's content

    <script id="template-dialog" type="text/x-kendo-template">
      <div class="form-group">
      <label>Label (Question)</label>
      <textarea id="editor" rows="10" cols="30"></textarea>
      </div>
    </script>
  
    <div id="dialog"></div>
    <script>
      $("#dialog").kendoDialog({
        width: '450px',
        title: 'Multiple Choice',
        closable: false,
        modal: false,
        content: kendo.template($('#template-dialog').html()),
        actions: [
          { text: 'Cancel' },
          {
            text: 'Save',
            primary: true,
  
          }
        ],
        initOpen: function() {
          $('#editor').kendoEditor();
          $('#upImport').kendoUpload();
        }
      });
    </script>

### height `Number | String`

Specifies height of the dialog.


<div class="meta-api-description">
How do I set the height of a Kendo UI dialog? Adjust, define, or limit the vertical dimension of modal or popup containers to control layout and content visibility, enabling responsive design adjustments, height scaling, resizing dialogs or windows, setting fixed or dynamic heights for overlays, configuring the vertical space dialogs occupy, managing display size constraints, and tailoring how content fits within pop-ups or modal components across devices and screen sizes.
</div>

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog.",
      height: 400
    });
    </script>

#### Example - specify dialog height in percent

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog.",
      height: "50%"
    });
    </script>

### maxHeight `Number` *(default: Infinity)*

The maximum height (in pixels) that may be achieved by resizing the dialog.


<div class="meta-api-description">
How do I limit the maximum height of a Kendo UI dialog window? Set or control the maximum vertical size limit, maximum height boundary, or tallest allowable pixel height of resizable dialog windows or pop-up containers to restrict user resizing, enforce height constraints, limit dialog expansion, cap maximum window height, prevent overflow beyond a specified pixel value, configure maximum allowed height for modal or dialog boxes during initialization or runtime adjustments, and manage UI component vertical sizing limits.
</div>

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog.",
      maxHeight: 300
    });
    </script>

### maxWidth `Number` *(default: Infinity)*

The maximum width (in pixels) that may be achieved by resizing the dialog.


<div class="meta-api-description">
How to restrict dialog width when using Kendo UI for jQuery? Set or configure the maximum width limit for a resizable dialog, restricting how wide the dialog can grow in pixels during user resizing, controlling or capping the expansion to maintain consistent layout and prevent oversized popups or modals. This enables you to enforce upper bounds on dialog width, constrain manual resizing behavior, limit dialog horizontal size, and ensure UI elements do not stretch beyond a specified pixel dimension when adjusted by users or programmatically.
</div>

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog.",
      maxWidth: 300
    });
    </script>

### messages `Object`

Defines the text of the labels that are shown within the dialog. Used primarily for localization.


<div class="meta-api-description">
How do I customize the text in Kendo UI dialog windows? Control and customize the text labels, messages, and prompts displayed within dialog windows by setting localized strings, translations, or custom wording for dialog components, enabling tailored user interface language, dynamic message updates, internationalization support, and personalized dialog content to match specific application needs or user preferences.
</div>

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog.",
      messages:{
        close: "Close Me!"
      }
    });
    </script>

### messages.close `String` *(default: "Close")*

The title of the close button.


<div class="meta-api-description">
How can I customize the close button text in a Kendo UI dialog? Customize, configure, or set the text label, caption, or tooltip for the button responsible for closing dialogs, modals, pop-ups, or windows in user interfaces. Adjust or localize the close button text to match different languages, regions, or accessibility requirements by providing custom strings or translations for the dialog’s dismissal control. Enable changing the confirmation, exit, cancel, or close action label that users interact with to close popup windows, dialog boxes, or overlay components, ensuring proper internationalization and clarity in UI controls.
</div>

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog.",
      messages:{
        close: "Close Me!"
      }
    });
    </script>

### messages.promptInput `String` *(default: "Input")*

The title of the prompt input.


<div class="meta-api-description">
How do I customize the input prompt label in a Kendo UI Dialog box? Configure or customize the input prompt label, title, or placeholder text displayed in dialog boxes to guide user interaction; adjust, localize, translate, or override the prompt input message for dialogs, modals, or popups that request user input, ensuring the input field’s instruction or heading matches the desired language, phrasing, or context to enhance user interface clarity and usability.
</div>

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog.",
      messages:{
        promptInput: "Input!"
      }
    });
    </script>

### minHeight `Number` *(default: 50)*

The minimum height (in pixels) that may be achieved by resizing the dialog.


<div class="meta-api-description">
What's the minimum height for a resizable Kendo UI dialog window? Set or control the minimum vertical size, height, or pixel limit for resizable dialog windows to prevent shrinking below a threshold, ensure content visibility, maintain layout constraints, enforce minimum dimension limits during user resizing or drag handle adjustments, and configure dialog resizing boundaries to avoid collapsing or truncation in UI components.
</div>

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog.",
      minHeight: 100
    });
    </script>

### minWidth `Number` *(default: 50)*

The minimum width (in pixels) that may be achieved by resizing the dialog.


<div class="meta-api-description">
How to set minimum width for a resizable Kendo UI dialog box? Control the smallest horizontal size or minimum pixel width a resizable dialog box or modal can shrink to, ensuring it does not become too narrow when users drag or programmatically adjust its dimensions; configure or set constraints to limit downsizing, maintain layout integrity, prevent content clipping, and enforce a minimum width boundary during interactive resizing or automated adjustments.
</div>

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog.",
      minWidth: 100
    });
    </script>

### modal `Boolean|Object` *(default: true)*

Specifies whether the dialog should show a modal overlay over the page.


<div class="meta-api-description">
How do I make a Kendo UI dialog block the rest of the page? Control whether a dialog appears as a modal overlay that blocks interaction with the rest of the page by enabling or disabling a backdrop behind the dialog, allowing you to set a focused, attention-grabbing popup that prevents clicking or interacting with background content or create a non-modal dialog that lets users continue interacting with the page beneath, configuring whether the dialog demands user attention or permits multitasking and background activity while it is open.
</div>

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog.",
      modal: true
    });
    </script>

### modal.preventScroll `Boolean` *(default: false)*

Specifies whether the document should stop scrolling when modal dialog is opened. Closing it should restore the initial document overflow. Note that it's not supported to have multiple dialogs with different `preventScroll` setting.


<div class="meta-api-description">
How to prevent page scrolling when a Kendo UI modal dialog is open? Control disabling or enabling page scrolling when a modal dialog or popup is active to prevent background content from moving, lock the document scroll position while the overlay or modal is open, stop scrolling behind modals or lightboxes, manage scroll locking and overflow to avoid background scroll bleed during dialogs, enforce scroll prevention so page content stays fixed when dialogs are displayed, configure scroll blocking behavior for modals to improve user focus and interaction, ensure that page scroll is restored after closing overlays, handle cases to prevent conflicts when multiple modals might request scroll lock, set document overflow hidden to disable scroll during modal visibility, and enable scroll freeze to maintain modal focus without background movement.
</div>

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog.",
      modal: {
          preventScroll: true
      }
    });
    </script>

### themeColor `String` *default: ""*

The `themeColor` option controls the color that will be applied.

The following values are available for the themeColor:

- `primary`
- `dark`
- `light`
- `none`


<div class="meta-api-description">
How do I customize the color scheme of a Kendo UI dialog box? Customize the color scheme or accent of dialog components by selecting or configuring theme colors such as primary, dark, light, or no accent; control the visual style, appearance, or color palette of modal windows, alert boxes, popups, or user interface dialogs by enabling or setting predefined color themes and adjusting the component’s look to match application branding or design preferences.
</div>

#### Example

    <div id="dialog"></div>
    <script>
      $("#dialog").kendoDialog({
        themeColor: "dark",
        content:"This is a dark-themed Kendo Dialog",
        actions: [
          {
            text: "OK",
          },
        ],
        title: "Customer details",
      });
    </script>

### title `String|Boolean` *default: ""*

The text in the dialog title bar. If `false`, the dialog will be displayed without a title bar.


<div class="meta-api-description">
How do I customize the title bar in a Kendo UI for jQuery dialog box? Configure the header text displayed at the top of a dialog box by specifying a custom string for the title bar, control whether the dialog includes a visible header or remove it entirely to create a clean, chrome-less popup without a title bar, adjust or disable the dialog header text for modal windows, set or hide the heading label to customize dialog appearance, and manage the text label or suppress the header for streamlined dialog interfaces.
</div>

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Customer details",
      content: "This is your Kendo Dialog.",
    });
    </script>

#### Example - create a dialog without a title

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: false,
      content: "This is your Kendo Dialog.",
    });
    </script>

### visible `Boolean` *(default: true)*

Specifies whether the dialog will be initially visible.


<div class="meta-api-description">
How to set initial visibility of Kendo UI Dialog widget? Control whether a dialog box or modal window starts off displayed or hidden when the interface loads, enabling the initial visibility state to be set to true or false at creation time; this setting configures the default open or closed state but can be toggled dynamically afterward through code, allowing developers to define if popups, overlays, or modal dialogs appear immediately on render or remain concealed until triggered or programmatically shown.
</div>

#### Example - show a dialog after one second delay

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog.",
      visible: false
    });
    setTimeout(function() {
      $("#dialog").data("kendoDialog").open();
    }, 1000);
    </script>

### width `Number | String`

Specifies width of the dialog.


<div class="meta-api-description">
How do I set the width of a Kendo UI dialog box? Adjust or configure the horizontal size, width, or dimension of popup dialogs, modals, or dialog boxes to control their layout, appearance, and screen space usage. Set or modify the dialog's width for better user interface design, responsive sizing, or custom dialog presentation, enabling precise control over how wide the interactive overlay or popup appears within the application or webpage. Manage UI component sizing, control dialog box width settings, and define how much horizontal space the dialog occupies for flexible and adaptive user experience design.
</div>

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog.",
      width: 400
    });
    </script>

#### Example - specify dialog width in percent

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog.",
      width: "50%"
    });
    </script>


### size `String` *(default: "auto")*

Set predefined size to the dialog. The `width` and `height` configuration options override the predefined `size`.

Possible values are:

* auto
* small
* medium
* large


<div class="meta-api-description">
How do I adjust the size of a Kendo UI dialog window? Adjust, configure, or control the dimensions and overall size of dialog or modal windows by selecting from predefined size presets such as small, medium, large, or automatic scaling, enabling setting fixed width and height or letting the dialog adjust dynamically. Support for initializing dialogs with specific size options, overriding default dimensions, and customizing modal appearance and layout to match UI design requirements or responsive behavior. Keywords include dialog size, modal dimensions, window scaling, preset sizes, width and height adjustments, dialog initialization sizing, configuring dialog width, and dynamic size control.
</div>

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog.",
      size: "medium"
    });
    </script>

## Methods

### center

Centers the Dialog within the viewport.


<div class="meta-api-description">
How do I reposition my Kendo UI dialog at the center of the screen after window resizing? Recalculate and reposition a dialog or modal window at the exact center of the visible screen area without changing its dimensions, enabling dynamic adjustment after window resizing, content updates, layout shifts, or programmatic openings; control or trigger centering to maintain optimal positioning on viewport changes, adapt placement after user interface modifications, or ensure consistent display alignment during runtime adjustments.
</div>

#### Example

    <div id="dialog"></div>
    <script>
    var dialog = $("#dialog").kendoDialog({
        title: "Centered Dialog",
        content: "This dialog will be centered in the viewport."
    }).data("kendoDialog");
    
    // Center the dialog in the viewport
    dialog.center();
    </script>

#### Returns

`kendo.ui.Dialog` - Returns the Dialog object to support chaining. 
### close

Closes a Dialog.


<div class="meta-api-description">
How do I programmatically close a Kendo UI dialog in jQuery? Close or dismiss modal dialogs programmatically by invoking a method that hides the popup, terminates user interaction, ends or cancels the dialog component, or removes the dialog from the screen. Control dialog visibility through code, such as within event handlers, asynchronous callbacks, or conditional logic to shut down, exit, or close modal windows, popups, overlays, or lightboxes after initialization or user actions. Enable closing or cancelling dialog elements dynamically to manage UI flow, user prompts, alerts, or confirmation boxes by triggering built-in close behavior via script.
</div>

#### Returns

`kendo.ui.Dialog` Returns the dialog object to support chaining.

#### Example - close a dialog after one second

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog.",
    });
    var dialog = $("#dialog").data("kendoDialog");
    setTimeout(function() {
      dialog.close();
    }, 1000);
    </script>

### content

Gets or set the content of a dialog. Supports chaining when used as a setter.


<div class="meta-api-description">
How do I change the content of a Kendo UI dialog window? Control, update, or retrieve the dynamic content inside a dialog window, enabling setting new HTML or text programmatically during runtime, reading the current displayed information, modifying dialog body content on the fly, chaining content updates fluently, and managing dialog inner content interactively through function calls that serve both as setters and getters for displayed text or markup within modal or popup components.
</div>

#### Parameters

##### content `String|jQuery` *(optional)*

The content of the Dialog. Can be an HTML string or jQuery object.

#### Returns

`String` The current dialog content, if used as a getter. If used as a setter, the method will return the dialog object to support chaining.

#### Example - get the dialog content

    <div id="dialog">foo</div>
    <script>
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
    });
    var dialog = $("#dialog").data("kendoDialog");
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(dialog.content()); // logs "foo"
    </script>

#### Example - set the dialog content

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component"
    });
    var dialog = $("#dialog").data("kendoDialog");
    dialog.content("Kendo UI all the things!");
    </script>

### destroy

Destroys the dialog and its modal overlay, if necessary. Removes the widget HTML elements from the DOM.


<div class="meta-api-description">
How do I completely remove a Kendo UI dialog instance from the webpage? Completely remove or delete a dialog box and its associated modal overlay from the webpage by eliminating all related HTML elements and cleaning up added markup, effectively destroying the dialog instance and ensuring no residual DOM presence remains; control, disable, or clear dialog components permanently, fully dispose of modal popups, remove overlays and dialog containers, tear down or dismantle dialog UI elements, and reset or unregister dialog instances when they are no longer needed.
</div>

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "The Dialog will be destroyed in a few seconds...",
    });
    setTimeout(function(){
        var dialog = $("#dialog").data("kendoDialog");
        dialog.destroy();
    }, 1500)
    </script>

### open

Opens a Dialog and brings it on top of any other open Dialog or Window instances by calling [`toFront`](/api/javascript/ui/dialog/methods/tofront) internally.


<div class="meta-api-description">
How do I programmatically show a Kendo UI dialog above other windows and elements on my page? Trigger dialog display programmatically to show a modal or popup window, bring the dialog to the forefront above other dialogs or windows, control layering and stacking order to ensure visibility, activate or launch overlays or popups via code, manage z-index to prioritize dialog appearance, open or reveal interactive dialog boxes on demand, bring specific dialog instances forward dynamically, handle displaying dialogs over existing UI elements, programmatically show or activate modal panels or windows ensuring they are topmost and fully visible.
</div>

#### Returns

`kendo.ui.Dialog` Returns the dialog object to support chaining.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog.",
      visible: false
    });
    var dialog = $("#dialog").data("kendoDialog");
    dialog.open();
    </script>

### close

Closes the Dialog.

<div class="meta-api-description">
How do I programmatically close a Kendo UI dialog in jQuery? Close or dismiss modal dialogs programmatically by invoking a method that hides the popup, terminates user interaction, ends or cancels the dialog component, or removes the dialog from the screen. Control dialog visibility through code, such as within event handlers, asynchronous callbacks, or conditional logic to shut down, exit, or close modal windows, popups, overlays, or lightboxes after initialization or user actions. Enable closing or cancelling dialog elements dynamically to manage UI flow, user prompts, alerts, or confirmation boxes by triggering built-in close behavior via script.
</div>

#### Example

    <div id="dialog"></div>
      <script>
      $("#dialog").kendoDialog({
        title: "Kendo Dialog Component",
        content: "This is your Kendo Dialog.",
        visible: true
      });
      var dialog = $("#dialog").data("kendoDialog");
      
      setTimeout(function(){
        dialog.close();
      },3000)
      
    </script>

### title `String` *(optional)*

Gets or sets the title of a Dialog. Can be a text string. Supports chaining when used as a setter. If passed to the method, an HTML string would be escaped.


<div class="meta-api-description">
How can I update the title of a Kendo UI dialog box? Configure, set, update, or retrieve the window or popup header text, control the visible top label or caption of a dialog box, customize the displayed plain text or sanitized title content, support method chaining for streamlined title updates, prevent HTML injection by escaping input strings, get the current title value, dynamically modify or read the dialog heading, manage dialog box naming or heading text safely without interpreting HTML tags, and handle both setting and fetching the dialog’s title property within an interface.
</div>

#### Parameters

##### text `String` *(optional)*

The title of the Dialog.

#### Returns

`String` The current dialog title, if used as a getter. If used as a setter, the method will return the dialog object to support chaining.

#### Example - get the title of the dialog

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog.",
    });
    var dialog = $("#dialog").data("kendoDialog");
    var title = dialog.title();
    </script>

#### Example - set the title of a dialog

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      content: "This is your Kendo Dialog."
    });
    var dialog = $("#dialog").data("kendoDialog");
    dialog.title("Hello");
    </script>

### toFront

Increases the `z-index` style of a Dialog [`wrapper`](/intro/widget-basics/wrapper-element) to bring the instance on top of other open Dialogs. This method is executed automatically when the [`open`](/api/javascript/ui/dialog/methods/open) method is used.


<div class="meta-api-description">
How can I bring a Kendo UI dialog to the top of other open dialogs? Bring a dialog window or modal to the top of all other open dialogs or overlays by controlling and adjusting its stacking order and visual layering, ensuring it appears prominently in front of other interface elements; this functionality enables focusing, prioritizing, or raising pop-ups, modals, or dialog boxes dynamically by modifying their display order or z-index, useful for managing multiple overlapping windows, modals, or UI layers within an application to enhance user interactions, accessibility, or interface clarity when multiple dialogs are present.
</div>

#### Returns

`kendo.ui.Dialog` Returns the dialog object to support chaining.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog.",
    });
    var dialog = $("#dialog").data("kendoDialog");
    dialog.toFront();
    </script>

## Events

### close

Triggered when a Dialog is closed (by a user or through the close() method).


<div class="meta-api-description">
How do I detect when a Kendo UI dialog is completely closed? Detect and handle events that signify when modal dialogs or popup windows have finished closing, whether the closure occurs through user interaction, clicking outside, pressing escape, or programmatic commands. Capture signals to perform cleanup tasks, restore keyboard focus to the originating element, update UI state, trigger animations or transitions, or synchronize application data following the dialog’s dismissal. Enable event listeners, bindings, callbacks, or hooks that respond precisely to the end of dialog closure actions to manage subsequent workflows, accessibility focus management, and state updates triggered by closing modals or overlays.
</div>

#### Event Data

##### e.userTriggered `Boolean`

Indicates whether the close action has been triggered by the user (by clicking the close button or hitting the escape key). When the close method has been called, this field is **false**.

#### Example - subscribe to the "close" event during initialization

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog.",
      close: function(e) {
        // close animation has finished playing
      }
    });
    </script>

#### Example - subscribe to the "close" event after initialization

    <div id="dialog"></div>
    <script>
    function dialog_close(e) {
      // close animation has finished playing
    }
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog."
    });
    var dialog = $("#dialog").data("kendoDialog");
    dialog.bind("close", dialog_close);
    </script>

### hide

Triggered when a Dialog has finished its closing animation.


<div class="meta-api-description">
What triggers when a Kendo UI dialog finishes closing? Detect when a modal, popup, or dialog finishes closing or hiding, enabling code execution after the close animation or transition completes; useful for triggering cleanup tasks, restoring focus to elements, running post-close actions, responding to animation end events, handling dialog hide or after-close states, and controlling behavior once the UI overlay or window fully disappears.
</div>

#### Example - subscribe to the "hide" event during initialization

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog.",
      hide: function() {
        // close animation is about to finish
      }
    });
    </script>

#### Example - subscribe to the "hide" event after initialization

    <div id="dialog"></div>
    <script>
    function dialog_hide() {
      // close animation will start soon
    }
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog."
    });
    var dialog = $("#dialog").data("kendoDialog");
    dialog.bind("hide", dialog_hide);
    </script>

### initOpen

Triggered when a Dialog is opened for the first time (i.e. the open() method is called).


<div class="meta-api-description">
How to execute code when a Kendo UI dialog opens for the first time? Trigger actions or run setup routines when a dialog or modal window opens for the very first time, such as initializing content, lazy-loading data or resources, attaching event listeners, performing layout calculations, configuring UI elements, or executing one-time startup code only on the initial open invocation to optimize performance and ensure proper readiness before any further openings or interactions occur.
</div>

#### Example - subscribe to the "initOpen" event during initialization

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog.",
      initOpen: function() {
        // open animation will start soon
      }
    });
    </script>

#### Example - subscribe to the "initOpen" event after initialization

    <div id="dialog" style="display: none;"></div>
    <script>
    function dialog_initOpen() {
      // open animation will start soon
    }
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog."
    });
    var dialog = $("#dialog").data("kendoDialog");
    dialog.bind("initOpen", dialog_initOpen);
    dialog.open();
    </script>

### open

Triggered when a Dialog is opened (i.e. the open() method is called).


<div class="meta-api-description">
How can I execute code when a Kendo UI dialog box appears on screen? Trigger actions or execute code immediately when a dialog box or modal window appears on screen, enabling developers to detect when the popup becomes visible, respond right after opening, initialize or update content dynamically, set input focus programmatically, start animations or timed events, or hook into the moment the modal is activated through calling open functions or methods, supporting event-driven workflows related to dialog visibility changes and user interface activation.
</div>

#### Example - subscribe to the "open" event during initialization

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog.",
      open: function() {
        // open animation will start soon
      }
    });
    </script>

#### Example - subscribe to the "open" event after initialization

    <div id="dialog"></div>
    <script>
    function dialog_open() {
      // open animation will start soon
    }
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog."
    });
    var dialog = $("#dialog").data("kendoDialog");
    dialog.bind("open", dialog_open);
    </script>

### show

Triggered when a Dialog has finished its opening animation.


<div class="meta-api-description">
When does Kendo UI dialog show event occur after opening? Trigger actions or execute code immediately after a dialog or modal finishes opening and becomes fully visible, enabling developers to set input focus, load dynamic content, start animations, initialize interactions, or perform tasks that depend on the dialog being displayed on screen. Handle events fired upon dialog reveal or completion of opening transitions to run setup routines, manage UI focus, fetch or update data, or enable interactive features requiring the dialog’s presence. Configure event listeners for post-open timing to ensure that logic executes only after visibility and animations complete, supporting seamless user experience and dynamic dialog behavior.
</div>

#### Example - subscribe to the "show" event during initialization

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog.",
      show: function() {
        // open animation has finished playing
      }
    });
    </script>

#### Example - subscribe to the "show" event after initialization

    <div id="dialog"></div>
    <script>
    function dialog_show() {
      // open animation has finished playing
    }
    $("#dialog").kendoDialog({
      title: "Kendo Dialog Component",
      content: "This is your Kendo Dialog."
    });
    var dialog = $("#dialog").data("kendoDialog");
    dialog.bind("show", dialog_show);
    </script>
