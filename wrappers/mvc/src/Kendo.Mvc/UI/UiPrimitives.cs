namespace Kendo.Mvc.UI
{
    public static class UIPrimitives
    {
        /// <summary>
        /// Active state of items
        /// </summary>
        public const string ActiveState = "k-state-active";

        /// <summary>
        /// Button with plain text content
        /// </summary>
        public const string Button = "k-button";

		/// <summary>
		/// Button with an icon and text content
		/// </summary>
		public const string ButtonIconText = "k-button-icontext";

		/// <summary>
		/// Button with an icon only
		/// </summary>
		public const string ButtonIcon = "k-button-icon";

		/// <summary>
		/// Bare button with an icon only (no background and borders)
		/// </summary>
		public const string ButtonBare = "k-button-bare";

		/// <summary>
        /// Content - rendered around custom content
        /// </summary>
        public const string Content = "k-content";

        /// <summary>
        /// Default state of items
        /// </summary>
        public const string DefaultState = "k-state-default";

        /// <summary>
        /// Disabled state of items
        /// </summary>
        public const string DisabledState = "k-state-disabled";

        /// <summary>
        /// Group - rendered around grouped items (children)
        /// </summary>
        public const string Group = "k-group";

        /// <summary>
        /// Header - rendered on headers or header items
        /// </summary>
        public const string Header = "k-header";

        /// <summary>
        /// Hovered state of items
        /// </summary>
        public const string HoverState = "k-state-hover";

        /// <summary>
        /// Icon - icon from default icon set
        /// </summary>
        public const string Icon = "k-icon";

        /// <summary>
        /// Image - image rendered through ImageUrl
        /// </summary>
        public const string Image = "k-image";

        /// <summary>
        /// Item - rendered on items
        /// </summary>
        public const string Item = "k-item";

        /// <summary>
        /// First in list of items
        /// </summary>
        public const string First = "k-first";

        /// <summary>
        /// Last in list of items
        /// </summary>
        public const string Last = "k-last";

        /// <summary>
        /// Top in list of items
        /// </summary>
        public const string Top = "k-top";

        /// <summary>
        /// Bottom in list of items
        /// </summary>
        public const string Bottom = "k-bot";

        /// <summary>
        /// Middle in list of items
        /// </summary>
        public const string Middle = "k-mid";

        /// <summary>
        /// Last in list of headers
        /// </summary>
        public const string LastHeader = "k-last-header";

        /// <summary>
        /// Link - rendered on all links
        /// </summary>
        public const string Link = "k-link";

        /// <summary>
        /// Reset - removes inherited styles
        /// </summary>
        public const string ResetStyle = "k-reset";

        /// <summary>
        /// Selected state of items
        /// </summary>
        public const string SelectedState = "k-state-selected";

        /// <summary>
        /// Sprite - sprite rendered in the begging of the item.
        /// </summary>
        public const string Sprite = "k-sprite";

        /// <summary>
        /// Widget - rendered always on the outmost HTML element of a UI component
        /// </summary>
        public const string Widget = "k-widget";

        /// <summary>
        /// Input - input rendered in the div wrapper
        /// </summary>
        public const string Input = "k-input";

        /// <summary>
        /// CheckBox - rendered on all checkbox
        /// </summary>
        public const string CheckBox = "k-checkbox";

        /// <summary>
        /// ToolBar - rendered on all toolbars
        /// </summary>
        public const string ToolBar = "k-toolbar";

        /// <summary>
        /// Alternating class for zebra stripes
        /// </summary>
        public const string Alt = "k-alt";

        /// <summary>
        /// Scrollable - rendered on all elements that wish to be scrollable on touch devices
        /// </summary>
        public const string Scrollable = "k-scrollable";

        /// <summary>
        /// Contains CSS classes for icons
        /// </summary>
        public static class Icons
        {
            /// <summary>
            /// "Delete" icon
            /// </summary>
            public const string Delete = "k-delete";

            /// <summary>
            /// "Delete Group" icon
            /// </summary>
            public const string GroupDelete = "k-group-delete";

            /// <summary>
            /// "Refresh" icon
            /// </summary>
            public const string Refresh = "k-i-refresh";

            /// <summary>
            /// "Maximize" icon
            /// </summary>
            public const string Maximize = "k-i-maximize";

            /// <summary>
            /// "Minimize" icon
            /// </summary>
            public const string Minimize = "k-i-minimize";

            /// <summary>
            /// "Pin" icon
            /// </summary>
            public const string Pin = "k-i-pin";

            /// <summary>
            /// "Close" icon
            /// </summary>
            public const string Close = "k-i-close";

            /// <summary>
            /// "Custom" icon
            /// </summary>
            public const string Custom = "k-i-custom";
        }

        /// <summary>
        /// Contains CSS classes, used in the grid
        /// </summary>
        public static class Grid
        {
            public const string GroupFooter = "k-group-footer";

            public const string Action = "k-grid-action";
            
            public const string Edit = "k-grid-edit";
            
            public const string Delete = "k-grid-delete";
            
            public const string Update = "k-grid-update";

            public const string SaveChanges = "k-grid-save-changes";
            
            public const string CancelChanges = "k-grid-cancel-changes";
            
            public const string Cancel = "k-grid-cancel";
            
            public const string Insert = "k-grid-insert";

            public const string Add = "k-grid-add";
            
            public const string Select = "k-grid-select";

            public const string GroupCell = "k-group-cell";
            
            public const string HierarchyCell = "k-hierarchy-cell";

            public const string GroupCol = "k-group-col";
            
            public const string HierarchyCol = "k-hierarchy-col";

            public const string GroupIndicator = "k-group-indicator";

            public const string FooterTemplateRow = "k-footer-template";

            public const string FooterTemplateRowWrap = "k-footer-template-wrap";
            
            public const string ScrollableContent = "k-grid-content";

            /// <summary>
            /// Grid action
            /// </summary>
            public const string ActionForm = "k-grid-actions";

            /// <summary>
            /// Container element for editing / inserting form
            /// </summary>
            public const string EditingContainer = "k-edit-container";

            public const string InFormContainer = "k-edit-form-container";

            public const string EditButtonsContainer = "k-edit-buttons";

            public const string PopupEditForm = "k-popup-edit-form";

            /// <summary>
            /// Container element for editing / inserting form
            /// </summary>
            public const string EditingForm = "k-edit-form";

            /// <summary>
            /// Toolbar which contains different commands
            /// </summary>
            public const string ToolBar = "k-grid-toolbar";
        }

        /// <summary>
        /// Contains CSS classes, used in the treeview
        /// </summary>
        public static class TreeView
        {
            /// <summary>
            /// Class that shows treeview lines
            /// </summary>
            public const string Lines = "k-treeview-lines";
        }

        /// <summary>
        /// Contains CSS classes, used in the editor
        /// </summary>
        public static class Editor
        {
            /// <summary>
            /// Button in editor toolbar
            /// </summary>
            public const string ToolbarButton = "k-editor-button";

            /// <summary>
            /// Color picker in editor toolbar
            /// </summary>
            public const string ToolbarColorPicker = "k-editor-colorpicker";

            /// <summary>
            /// Editor tool icon
            /// </summary>
            public const string ToolIcon = "k-tool-icon";

            /// <summary>
            /// Editor custom tool
            /// </summary>
            public const string Custom = "k-i-custom";

            /// <summary>
            /// Editor textarea element
            /// </summary>
            public const string RawContent = "k-raw-content";
        }

        public static class Slider
        {
            /// <summary>Slider increase button.</summary>
            public const string IncreaseButton = "k-increase";

            /// <summary>Slider decrease button.</summary>
            public const string DecreaseButton = "k-decrease";

            public const string Items = "k-slider-items";

            public const string Item = "k-tick";

            public const string DragHandle = "k-draghandle";

            public const string SlectedDiv = "k-draghandle";

            public const string TrackDiv = "k-draghandle";
        }

        public static class Splitter
        {
            /// <summary>Horizontal splitter</summary>
            public const string Horizontal = "k-splitter-horizontal";

            /// <summary>Vertical splitter</summary>
            public const string Vertical = "k-splitter-vertical";

            /// <summary>Splitter pane</summary>
            public const string Pane = "k-pane";
        }

        /// <summary>
        /// Contains CSS classes, used in the window
        /// </summary>
        public static class Window
        {
            /// <summary>
            /// Window content area
            /// </summary>
            public const string Content = "k-window-content";

            /// <summary>
            /// Window title bar
            /// </summary>
            public const string TitleBar = "k-window-titlebar";
        }
    }
}
