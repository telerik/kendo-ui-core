namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the ToolBarItem settings.
    /// </summary>
    public class ToolBarItemBuilder: IHideObjectMembers
    {
        private readonly ToolBarItem container;

        public ToolBarItemBuilder(ToolBarItem settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Specifies the buttons of ButtonGroup.
        /// </summary>
        /// <param name="configurator">The action that configures the buttons.</param>
        public ToolBarItemBuilder Buttons(Action<ToolBarItemButtonFactory> configurator)
        {
            configurator(new ToolBarItemButtonFactory(container.Buttons));
            return this;
        }
        
        /// <summary>
        /// Specifies the click event handler of the button. Applicable only for commands of type button and splitButton.
        /// </summary>
        /// <param name="value">The value that configures the click.</param>
        public ToolBarItemBuilder Click(string value)
        {
            container.Click = value;

            return this;
        }
        
        /// <summary>
        /// Specifies whether the control is initially enabled or disabled. Default value is "true".
        /// </summary>
        /// <param name="value">The value that configures the enable.</param>
        public ToolBarItemBuilder Enable(bool value)
        {
            container.Enable = value;

            return this;
        }
        
        /// <summary>
        /// Assigns the button to a group. Applicable only for buttons with togglable: true.
        /// </summary>
        /// <param name="value">The value that configures the group.</param>
        public ToolBarItemBuilder Group(string value)
        {
            container.Group = value;

            return this;
        }
        
        /// <summary>
        /// Sets icon for the item. The icon should be one of the existing in the Kendo UI theme sprite.
        /// </summary>
        /// <param name="value">The value that configures the icon.</param>
        public ToolBarItemBuilder Icon(string value)
        {
            container.Icon = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the ID of the button.
        /// </summary>
        /// <param name="value">The value that configures the id.</param>
        public ToolBarItemBuilder Id(string value)
        {
            container.Id = value;

            return this;
        }
        
        /// <summary>
        /// If set, the ToolBar will render an image with the specified URL in the button.
        /// </summary>
        /// <param name="value">The value that configures the imageurl.</param>
        public ToolBarItemBuilder ImageUrl(string value)
        {
            container.ImageUrl = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the menu buttons of a SplitButton.
        /// </summary>
        /// <param name="configurator">The action that configures the menubuttons.</param>
        public ToolBarItemBuilder MenuButtons(Action<ToolBarItemMenuButtonFactory> configurator)
        {
            configurator(new ToolBarItemMenuButtonFactory(container.MenuButtons));
            return this;
        }
        
        /// <summary>
        /// Specifies what element will be added in the command overflow popup. Applicable only for items that have a template.
        /// </summary>
        /// <param name="value">The value that configures the overflowtemplate.</param>
        public ToolBarItemBuilder OverflowTemplate(string value)
        {
            container.OverflowTemplate = value;

            return this;
        }

        /// <summary>
        /// Specifies what element will be added in the command overflow popup. Applicable only for items that have a template.
        /// </summary>
        /// <param name="value">The value that configures the overflowtemplate.</param>
        public ToolBarItemBuilder OverflowTemplateId(string value)
        {
            container.OverflowTemplateId = value;

            return this;
        }
        
        /// <summary>
        /// Specifies whether the button is primary. Primary buttons receive different styling.
        /// </summary>
        /// <param name="value">The value that configures the primary.</param>
        public ToolBarItemBuilder Primary(bool value)
        {
            container.Primary = value;

            return this;
        }
        
        /// <summary>
        /// Specifies if the toggle button is initially selected. Applicable only for buttons with togglable: true.
        /// </summary>
        /// <param name="value">The value that configures the selectable.</param>
        public ToolBarItemBuilder Selectable(bool value)
        {
            container.Selectable = value;

            return this;
        }
        
        /// <summary>
        /// Defines a CSS class (or multiple classes separated by spaces) which will be used for button icon.
        /// </summary>
        /// <param name="value">The value that configures the spritecssclass.</param>
        public ToolBarItemBuilder SpriteCssClass(string value)
        {
            container.SpriteCssClass = value;

            return this;
        }
        
        /// <summary>
        /// Specifies what element will be added in the ToolBar wrapper. Items with template does not have a type.
        /// </summary>
        /// <param name="value">The value that configures the template.</param>
        public ToolBarItemBuilder Template(string value)
        {
            container.Template = value;

            return this;
        }

        /// <summary>
        /// Specifies what element will be added in the ToolBar wrapper. Items with template does not have a type.
        /// </summary>
        /// <param name="value">The value that configures the template.</param>
        public ToolBarItemBuilder TemplateId(string value)
        {
            container.TemplateId = value;

            return this;
        }
        
        /// <summary>
        /// Sets the text of the button.
        /// </summary>
        /// <param name="value">The value that configures the text.</param>
        public ToolBarItemBuilder Text(string value)
        {
            container.Text = value;

            return this;
        }
        
        /// <summary>
        /// Specifies if the button is togglable, e.g. has a selected and unselected state.
        /// </summary>
        /// <param name="value">The value that configures the togglable.</param>
        public ToolBarItemBuilder Togglable(bool value)
        {
            container.Togglable = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the toggle event handler of the button. Applicable only for commands of type button and togglable: true.
        /// </summary>
        /// <param name="value">The value that configures the toggle.</param>
        public ToolBarItemBuilder Toggle(string value)
        {
            container.Toggle = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the url to navigate to.
        /// </summary>
        /// <param name="value">The value that configures the url.</param>
        public ToolBarItemBuilder Url(string value)
        {
            container.Url = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the type of the item.
        /// </summary>
        /// <param name="value">The value that configures the type.</param>
        public ToolBarItemBuilder Type(CommandType value)
        {
            container.Type = value;

            return this;
        }
        
        /// <summary>
        /// Specifies where the text will be displayed.
        /// </summary>
        /// <param name="value">The value that configures the showtext.</param>
        public ToolBarItemBuilder ShowText(ShowIn value)
        {
            container.ShowText = value;

            return this;
        }
        
        /// <summary>
        /// Specifies where the icon will be displayed.
        /// </summary>
        /// <param name="value">The value that configures the showicon.</param>
        public ToolBarItemBuilder ShowIcon(ShowIn value)
        {
            container.ShowIcon = value;

            return this;
        }
        
        /// <summary>
        /// Specifies how the button behaves when the ToolBar is resized.
        /// </summary>
        /// <param name="value">The value that configures the overflow.</param>
        public ToolBarItemBuilder Overflow(ShowInOverflowPopup value)
        {
            container.Overflow = value;

            return this;
        }
        
        //<< Fields
    }
}

