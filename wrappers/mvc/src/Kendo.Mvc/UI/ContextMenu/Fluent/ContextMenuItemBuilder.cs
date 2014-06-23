namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the ContextMenuItem settings.
    /// </summary>
    public class ContextMenuItemBuilder: IHideObjectMembers
    {
        private readonly ContextMenuItem container;

        public ContextMenuItemBuilder(ContextMenuItem settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Specifies the text displayed by the item
        /// </summary>
        /// <param name="value">The value that configures the text.</param>
        public ContextMenuItemBuilder Text(string value)
        {
            container.Text = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the URL that the item links to
        /// </summary>
        /// <param name="value">The value that configures the url.</param>
        public ContextMenuItemBuilder Url(string value)
        {
            container.Url = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the URL of the image displayed by the item
        /// </summary>
        /// <param name="value">The value that configures the imageurl.</param>
        public ContextMenuItemBuilder ImageUrl(string value)
        {
            container.ImageUrl = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the class name for the sprite image displayed by the item
        /// </summary>
        /// <param name="value">The value that configures the spritecssclass.</param>
        public ContextMenuItemBuilder SpriteCssClass(string value)
        {
            container.SpriteCssClass = value;

            return this;
        }
        
        /// <summary>
        /// Specifies whether the item is initially enabled
        /// </summary>
        /// <param name="value">The value that configures the enabled.</param>
        public ContextMenuItemBuilder Enabled(bool value)
        {
            container.Enabled = value;

            return this;
        }
        
        /// <summary>
        /// Specifies whether the item is initially selected
        /// </summary>
        /// <param name="value">The value that configures the selected.</param>
        public ContextMenuItemBuilder Selected(bool value)
        {
            container.Selected = value;

            return this;
        }
        
        //<< Fields
    }
}

