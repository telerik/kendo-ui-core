  title: Displaying Switch Label with Bootstrap Main Sass Theme
  description: Learn how to display the switch label correctly when using the Bootstrap Main Sass theme for the Kendo UI Switch.
  type: how-to
  page_title: Displaying Switch Label with Bootstrap Main Sass Theme
  slug: switch-displaying-label-bootstrap-main-theme-kendo-jquery
  tags: switch, bootstrap, label, theme, display, kendo, jQuery
  res_type: kb
  ---
  ## Environment
  | Product | Version |
  |-----------|----------------|
  | Switch for Progress® Kendo UI®  | 2024.1.319  |
  
  ## Description
  When using the Bootstrap Main Sass theme with the Switch for Kendo UI, the switch label by default will not be displayed.
  
  ## Solution
  To display the Kendo UI Switch labels with the Bootstrap Main theme, add the following CSS styles to your code:
  
     ```css
     .k-switch-label-on, .k-switch-label-off {
       display: block;
       font-size: 11px;
     }
     
     .k-switch-label-on {
       color: white;
       left: 4px;
     }
     
     .k-switch-label-off {
       right: 4px;
     }
     ```
  
  Please refer to this [Progress Kendo UI Dojo](https://dojo.telerik.com/ijeNiduD) for a live example demonstrating this approach.
