// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    /// <summary>
    /// Contains constants for CSS class names
    /// </summary>
    public static class UIPrimitives
    {
        /// <summary>
        /// Active state of items
        /// </summary>
        public const string ActiveState = "t-state-active";

        /// <summary>
        /// Button with plain text content
        /// </summary>
        public const string Button = "t-button";

		/// <summary>
		/// Button with an icon and text content
		/// </summary>
		public const string ButtonIconText = "t-button-icontext";

		/// <summary>
		/// Button with an icon only
		/// </summary>
		public const string ButtonIcon = "t-button-icon";

		/// <summary>
		/// Bare button with an icon only (no background and borders)
		/// </summary>
		public const string ButtonBare = "t-button-bare";

		/// <summary>
        /// Content - rendered around custom content
        /// </summary>
        public const string Content = "t-content";

        /// <summary>
        /// Default state of items
        /// </summary>
        public const string DefaultState = "t-state-default";

        /// <summary>
        /// Disabled state of items
        /// </summary>
        public const string DisabledState = "t-state-disabled";

        /// <summary>
        /// Group - rendered around grouped items (children)
        /// </summary>
        public const string Group = "t-group";

        /// <summary>
        /// Header - rendered on headers or header items
        /// </summary>
        public const string Header = "t-header";

        /// <summary>
        /// Hovered state of items
        /// </summary>
        public const string HoverState = "t-state-hover";

        /// <summary>
        /// Icon - icon from default icon set
        /// </summary>
        public const string Icon = "t-icon";

        /// <summary>
        /// Image - image rendered through ImageUrl
        /// </summary>
        public const string Image = "t-image";

        /// <summary>
        /// Item - rendered on items
        /// </summary>
        public const string Item = "t-item";

        /// <summary>
        /// First in list of items
        /// </summary>
        public const string First = "t-first";

        /// <summary>
        /// Last in list of items
        /// </summary>
        public const string Last = "t-last";

        /// <summary>
        /// Top in list of items
        /// </summary>
        public const string Top = "t-top";

        /// <summary>
        /// Bottom in list of items
        /// </summary>
        public const string Bottom = "t-bot";

        /// <summary>
        /// Middle in list of items
        /// </summary>
        public const string Middle = "t-mid";

        /// <summary>
        /// Last in list of headers
        /// </summary>
        public const string LastHeader = "t-last-header";

        /// <summary>
        /// Link - rendered on all links
        /// </summary>
        public const string Link = "t-link";

        /// <summary>
        /// Reset - removes inherited styles
        /// </summary>
        public const string ResetStyle = "t-reset";

        /// <summary>
        /// Selected state of items
        /// </summary>
        public const string SelectedState = "t-state-selected";

        /// <summary>
        /// Sprite - sprite rendered in the begging of the item.
        /// </summary>
        public const string Sprite = "t-sprite";

        /// <summary>
        /// Widget - rendered always on the outmost HTML element of a UI component
        /// </summary>
        public const string Widget = "t-widget";

        /// <summary>
        /// Input - input rendered in the div wrapper
        /// </summary>
        public const string Input = "t-input";

        /// <summary>
        /// CheckBox - rendered on all checkbox
        /// </summary>
        public const string CheckBox = "t-checkbox";

        /// <summary>
        /// ToolBar - rendered on all toolbars
        /// </summary>
        public const string ToolBar = "t-toolbar";

        /// <summary>
        /// Alternating class for zebra stripes
        /// </summary>
        public const string Alt = "t-alt";

        /// <summary>
        /// Scrollable - rendered on all elements that wish to be scrollable on touch devices
        /// </summary>
        public const string Scrollable = "t-scrollable";

        /// <summary>
        /// Contains CSS classes for icons
        /// </summary>
        public static class Icons
        {
            /// <summary>
            /// "Delete" icon
            /// </summary>
            public const string Delete = "t-delete";

            /// <summary>
            /// "Delete Group" icon
            /// </summary>
            public const string GroupDelete = "t-group-delete";

            /// <summary>
            /// "Minimize" icon
            /// </summary>
            public const string Refresh = "t-refresh";

            /// <summary>
            /// "Maximize" icon
            /// </summary>
            public const string Maximize = "t-maximize";

            /// <summary>
            /// "Close" icon
            /// </summary>
            public const string Close = "t-close";
        }

        /// <summary>
        /// Contains CSS classes, used in the grid
        /// </summary>
        public static class Grid
        {
            public const string GroupFooter = "t-group-footer";

            public const string Action = "t-grid-action";
            
            public const string Edit = "t-grid-edit";
            
            public const string Delete = "t-grid-delete";
            
            public const string Update = "t-grid-update";

            public const string SaveChanges = "t-grid-save-changes";
            
            public const string CancelChanges = "t-grid-cancel-changes";
            
            public const string Cancel = "t-grid-cancel";
            
            public const string Insert = "t-grid-insert";

            public const string Add = "t-grid-add";
            
            public const string Select = "t-grid-select";

            public const string GroupCell = "t-group-cell";
            
            public const string HierarchyCell = "t-hierarchy-cell";

            public const string GroupCol = "t-group-col";
            
            public const string HierarchyCol = "t-hierarchy-col";

            public const string GroupIndicator = "t-group-indicator";

            public const string FooterTemplateRow = "t-footer-template";

            public const string FooterTemplateRowWrap = "t-footer-template-wrap";
            
            public const string ScrollableContent = "t-grid-content";

            /// <summary>
            /// Grid action
            /// </summary>
            public const string ActionForm = "t-grid-actions";

            /// <summary>
            /// Container element for editing / inserting form
            /// </summary>
            public const string EditingContainer = "t-edit-container";

            public const string InFormContainer = "t-edit-form-container";

            /// <summary>
            /// Container element for editing / inserting form
            /// </summary>
            public const string EditingForm = "t-edit-form";

            /// <summary>
            /// Toolbar which contains different commands
            /// </summary>
            public const string ToolBar = "t-grid-toolbar";
        }

        /// <summary>
        /// Contains CSS classes, used in the treeview
        /// </summary>
        public static class TreeView
        {
            /// <summary>
            /// Class that shows treeview lines
            /// </summary>
            public const string Lines = "t-treeview-lines";
        }

        /// <summary>
        /// Contains CSS classes, used in the editor
        /// </summary>
        public static class Editor
        {
            /// <summary>
            /// Button in editor toolbar
            /// </summary>
            public const string ToolbarButton = "t-editor-button";

            /// <summary>
            /// Color picker in editor toolbar
            /// </summary>
            public const string ToolbarColorPicker = "t-editor-colorpicker";

            /// <summary>
            /// Editor tool icon
            /// </summary>
            public const string ToolIcon = "t-tool-icon";

            /// <summary>
            /// Editor custom tool
            /// </summary>
            public const string Custom = "t-custom";

            /// <summary>
            /// Editor textarea element
            /// </summary>
            public const string RawContent = "t-raw-content";
        }

        public static class Slider
        {
            /// <summary>Slider increase button.</summary>
            public const string IncreaseButton = "t-increase";

            /// <summary>Slider decrease button.</summary>
            public const string DecreaseButton = "t-decrease";

            public const string Items = "t-slider-items";

            public const string Item = "t-tick";

            public const string DragHandle = "t-draghandle";

            public const string SlectedDiv = "t-draghandle";

            public const string TrackDiv = "t-draghandle";
        }

        public static class Splitter
        {
            /// <summary>Horizontal splitter</summary>
            public const string Horizontal = "t-splitter-horizontal";

            /// <summary>Vertical splitter</summary>
            public const string Vertical = "t-splitter-vertical";

            /// <summary>Splitter pane</summary>
            public const string Pane = "t-pane";
        }

        /// <summary>
        /// UI primitives for Upload
        /// </summary>
        public static class Upload
        {
            /// <summary>
            /// Upload button
            /// </summary>
            public const string Button = "t-button t-upload-button";
        }

        /// <summary>
        /// Contains CSS classes, used in the window
        /// </summary>
        public static class Window
        {
            /// <summary>
            /// Window content area
            /// </summary>
            public const string Content = "t-window-content";

            /// <summary>
            /// Window title bar
            /// </summary>
            public const string TitleBar = "t-window-titlebar";
        }
    }
}
