namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the MobileActionSheetItem settings.
    /// </summary>
    public class MobileActionSheetItemBuilder: IHideObjectMembers
    {
        private readonly MobileActionSheetItem container;

        public MobileActionSheetItemBuilder(MobileActionSheetItem settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Specifies the name of the handler that will be executed when the item is clicked
        /// </summary>
        /// <param name="value">The value that configures the action.</param>
        public MobileActionSheetItemBuilder Action(string value)
        {
            container.Action = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the text of the item
        /// </summary>
        /// <param name="value">The value that configures the text.</param>
        public MobileActionSheetItemBuilder Text(string value)
        {
            container.Text = value;

            return this;
        }
        
        //<< Fields

        
        /// <summary>
        /// Sets the HTML attributes.
        /// </summary>
        /// <param name="attributes">The HTML attributes.</param>
        /// <returns></returns>
        public virtual MobileActionSheetItemBuilder HtmlAttributes(object attributes)
        {
            return HtmlAttributes(attributes.ToDictionary());
        }

        /// <summary>
        /// Sets the HTML attributes.
        /// </summary>
        /// <param name="attributes">The HTML attributes.</param>
        /// <returns></returns>
        public virtual MobileActionSheetItemBuilder HtmlAttributes(IDictionary<string, object> attributes)
        {

            container.HtmlAttributes.Clear();
            container.HtmlAttributes.Merge(attributes);

            return this;
        }
        
    }
}

