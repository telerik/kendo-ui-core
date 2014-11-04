namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the TreeListColumnFilterableSettings settings.
    /// </summary>
    public class TreeListColumnFilterableSettingsBuilder<T>: IHideObjectMembers where T : class
    {
        private readonly TreeListColumnFilterableSettings container;

        public TreeListColumnFilterableSettingsBuilder(TreeListColumnFilterableSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The role data attribute of the widget used in the filter menu or a JavaScript function which initializes that widget.
        /// </summary>
        /// <param name="value">The value that configures the ui.</param>
        public TreeListColumnFilterableSettingsBuilder<T> Ui(string value)
        {
            container.Ui = value;

            return this;
        }
        
        //<< Fields
    }
}

