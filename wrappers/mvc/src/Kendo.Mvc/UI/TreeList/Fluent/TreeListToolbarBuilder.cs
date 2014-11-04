namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the TreeListToolbar settings.
    /// </summary>
    public class TreeListToolbarBuilder<T>: IHideObjectMembers where T : class
    {
        private readonly TreeListToolbar container;

        public TreeListToolbarBuilder(TreeListToolbar settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The name of the toolbar command. Either a built-in ("create" and "excel") or custom. The name is reflected in one of the CSS classes, which is applied to the button - k-grid-name.
		/// This class can be used to obtain reference to the button after TreeList initialization and attach click handlers.
        /// </summary>
        /// <param name="value">The value that configures the name.</param>
        public TreeListToolbarBuilder<T> Name(string value)
        {
            container.Name = value;

            return this;
        }
        
        /// <summary>
        /// The text displayed by the command button. If not set the name` option would be used as the button text instead.
        /// </summary>
        /// <param name="value">The value that configures the text.</param>
        public TreeListToolbarBuilder<T> Text(string value)
        {
            container.Text = value;

            return this;
        }
        
        //<< Fields
    }
}

