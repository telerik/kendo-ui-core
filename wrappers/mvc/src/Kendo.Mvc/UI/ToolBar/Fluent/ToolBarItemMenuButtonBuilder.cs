namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the ToolBarItemMenuButton settings.
    /// </summary>
    public class ToolBarItemMenuButtonBuilder: IHideObjectMembers
    {
        private readonly ToolBarItemMenuButton container;

        public ToolBarItemMenuButtonBuilder(ToolBarItemMenuButton settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Specifies whether the menu button is initially enabled or disabled.
        /// </summary>
        /// <param name="value">The value that configures the enable.</param>
        public ToolBarItemMenuButtonBuilder Enable(bool value)
        {
            container.Enable = value;

            return this;
        }
        
        /// <summary>
        /// Sets icon for the menu buttons. The icon should be one of the existing in the Kendo UI theme sprite.
        /// </summary>
        /// <param name="value">The value that configures the icon.</param>
        public ToolBarItemMenuButtonBuilder Icon(string value)
        {
            container.Icon = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the ID of the menu buttons.
        /// </summary>
        /// <param name="value">The value that configures the id.</param>
        public ToolBarItemMenuButtonBuilder Id(string value)
        {
            container.Id = value;

            return this;
        }
        
        /// <summary>
        /// If set, the ToolBar will render an image with the specified URL in the menu button.
        /// </summary>
        /// <param name="value">The value that configures the imageurl.</param>
        public ToolBarItemMenuButtonBuilder ImageUrl(string value)
        {
            container.ImageUrl = value;

            return this;
        }
        
        /// <summary>
        /// Defines a CSS class (or multiple classes separated by spaces) which will be used for menu button icon.
        /// </summary>
        /// <param name="value">The value that configures the spritecssclass.</param>
        public ToolBarItemMenuButtonBuilder SpriteCssClass(string value)
        {
            container.SpriteCssClass = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the text of the menu buttons.
        /// </summary>
        /// <param name="value">The value that configures the text.</param>
        public ToolBarItemMenuButtonBuilder Text(string value)
        {
            container.Text = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the url of the menu button to navigate to.
        /// </summary>
        /// <param name="value">The value that configures the url.</param>
        public ToolBarItemMenuButtonBuilder Url(string value)
        {
            container.Url = value;

            return this;
        }
        
        //<< Fields
    }
}

