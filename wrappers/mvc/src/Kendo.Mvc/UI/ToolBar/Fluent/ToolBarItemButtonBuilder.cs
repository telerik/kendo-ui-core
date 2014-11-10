namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the ToolBarItemButton settings.
    /// </summary>
    public class ToolBarItemButtonBuilder: IHideObjectMembers
    {
        private readonly ToolBarItemButton container;

        public ToolBarItemButtonBuilder(ToolBarItemButton settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Specifies the HTML attributes of a ButtonGroup's button.
        /// </summary>
        /// <param name="value">The value that configures the htmlattributes.</param>
        public ToolBarItemButtonBuilder HtmlAttributes(object value)
        {
            return this.HtmlAttributes(value.ToDictionary());
        }
        
        /// <summary>
        /// Specifies the HTML attributes of a ButtonGroup's button.
        /// </summary>
        /// <param name="value">The value that configures the htmlattributes.</param>
        public ToolBarItemButtonBuilder HtmlAttributes(IDictionary<string,object> value)
        {
            container.HtmlAttributes = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the click event handler of the button. Applicable only for the children of a ButtonGroup.
        /// </summary>
        /// <param name="value">The value that configures the click action.</param>
        public ToolBarItemButtonBuilder Click(Func<object, object> handler)
        {
            container.Click.TemplateDelegate = handler;

            return this;
        }

        /// <summary>
        /// Specifies the click event handler of the button. Applicable only for the children of a ButtonGroup.
        /// </summary>
        /// <param name="value">The value that configures the click action.</param>
        public ToolBarItemButtonBuilder Click(string handler)
        {
            container.Click.HandlerName = handler;

            return this;
        }
        
        /// <summary>
        /// Specifies whether the button is initially enabled or disabled.
        /// </summary>
        /// <param name="value">The value that configures the enable.</param>
        public ToolBarItemButtonBuilder Enable(bool value)
        {
            container.Enable = value;

            return this;
        }
        
        /// <summary>
        /// Assigns the button to a group. Applicable only for the children of a ButtonGroup that has togglable true.
        /// </summary>
        /// <param name="value">The value that configures the group.</param>
        public ToolBarItemButtonBuilder Group(string value)
        {
            container.Group = value;

            return this;
        }
        
        /// <summary>
        /// Sets icon for the menu button. The icon should be one of the existing in the Kendo UI theme sprite.
        /// </summary>
        /// <param name="value">The value that configures the icon.</param>
        public ToolBarItemButtonBuilder Icon(string value)
        {
            container.Icon = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the ID of the button.
        /// </summary>
        /// <param name="value">The value that configures the id.</param>
        public ToolBarItemButtonBuilder Id(string value)
        {
            container.Id = value;

            return this;
        }
        
        /// <summary>
        /// If set, the ToolBar will render an image with the specified URL in the button.
        /// </summary>
        /// <param name="value">The value that configures the imageurl.</param>
        public ToolBarItemButtonBuilder ImageUrl(string value)
        {
            container.ImageUrl = value;

            return this;
        }
        
        /// <summary>
        /// Specifies if the toggle button is initially selected. Applicable only for the children of a ButtonGroup that has togglable true.
        /// </summary>
        /// <param name="value">The value that configures the selected.</param>
        public ToolBarItemButtonBuilder Selected(bool value)
        {
            container.Selected = value;

            return this;
        }
        
        /// <summary>
        /// Defines a CSS class (or multiple classes separated by spaces) which will be used for button icon.
        /// </summary>
        /// <param name="value">The value that configures the spritecssclass.</param>
        public ToolBarItemButtonBuilder SpriteCssClass(string value)
        {
            container.SpriteCssClass = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the toggle event handler of the button. Applicable only for the children of a ButtonGroup.
        /// </summary>
        /// <param name="value">The value that configures the toggle action.</param>
        public ToolBarItemButtonBuilder Toggle(Func<object, object> handler)
        {
            container.Toggle.TemplateDelegate = handler;

            return this;
        }

        /// <summary>
        /// Specifies the toggle event handler of the button. Applicable only for the children of a ButtonGroup.
        /// </summary>
        /// <param name="value">The value that configures the toggle action.</param>
        public ToolBarItemButtonBuilder Toggle(string handler)
        {
            container.Toggle.HandlerName = handler;

            return this;
        }
        
        /// <summary>
        /// Specifies if the button is togglable, e.g. has a selected and unselected state. Applicable only for the children of a ButtonGroup.
        /// </summary>
        /// <param name="value">The value that configures the togglable.</param>
        public ToolBarItemButtonBuilder Togglable(bool value)
        {
            container.Togglable = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the text of the menu button.
        /// </summary>
        /// <param name="value">The value that configures the text.</param>
        public ToolBarItemButtonBuilder Text(string value)
        {
            container.Text = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the url of the button to navigate to.
        /// </summary>
        /// <param name="value">The value that configures the url.</param>
        public ToolBarItemButtonBuilder Url(string value)
        {
            container.Url = value;

            return this;
        }
        
        /// <summary>
        /// Specifies where the text of the menu button will be displayed. Applicable only for the buttons of a ButtonGroup.
        /// </summary>
        /// <param name="value">The value that configures the showtext.</param>
        public ToolBarItemButtonBuilder ShowText(ShowIn value)
        {
            container.ShowText = value;

            return this;
        }
        
        /// <summary>
        /// Specifies where the icon of the button will be displayed. Applicable only for the children of a ButtonGroup.
        /// </summary>
        /// <param name="value">The value that configures the showicon.</param>
        public ToolBarItemButtonBuilder ShowIcon(ShowIn value)
        {
            container.ShowIcon = value;

            return this;
        }
        
        //<< Fields
    }
}

