namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the MobileButtonGroupItem settings.
    /// </summary>
    public class MobileButtonGroupItemBuilder: IHideObjectMembers
    {
        private readonly MobileButtonGroupItem container;

        public MobileButtonGroupItemBuilder(MobileButtonGroupItem settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The icon of the button. It can be either one of the built-in icons, or a custom one
        /// </summary>
        /// <param name="value">The value that configures the icon.</param>
        public MobileButtonGroupItemBuilder Icon(string value)
        {
            container.Icon = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the text of the item
        /// </summary>
        /// <param name="value">The value that configures the text.</param>
        public MobileButtonGroupItemBuilder Text(string value)
        {
            container.Text = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the value shown in badge icon
        /// </summary>
        /// <param name="value">The value that configures the badge.</param>
        public MobileButtonGroupItemBuilder Badge(string value)
        {
            container.Badge = value;

            return this;
        }
        
        //<< Fields

        
        /// <summary>
        /// Sets the HTML attributes.
        /// </summary>
        /// <param name="attributes">The HTML attributes.</param>
        /// <returns></returns>
        public virtual MobileButtonGroupItemBuilder HtmlAttributes(object attributes)
        {
            return HtmlAttributes(attributes.ToDictionary());
        }

        /// <summary>
        /// Sets the HTML attributes.
        /// </summary>
        /// <param name="attributes">The HTML attributes.</param>
        /// <returns></returns>
        public virtual MobileButtonGroupItemBuilder HtmlAttributes(IDictionary<string, object> attributes)
        {

            container.HtmlAttributes.Clear();
            container.HtmlAttributes.Merge(attributes);

            return this;
        }
        
    }
}

