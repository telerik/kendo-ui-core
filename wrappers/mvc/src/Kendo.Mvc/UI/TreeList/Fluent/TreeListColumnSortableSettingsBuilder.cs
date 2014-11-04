namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the TreeListColumnSortableSettings settings.
    /// </summary>
    public class TreeListColumnSortableSettingsBuilder<T>: IHideObjectMembers where T : class
    {
        private readonly TreeListColumnSortableSettings container;

        public TreeListColumnSortableSettingsBuilder(TreeListColumnSortableSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// A JavaScript function which is used to compare the values - should return -1 if first argument is less than second one, 0 if both are the same or +1 if the first one is greater than second one.
        /// </summary>
        /// <param name="value">The value that configures the compare.</param>
        public TreeListColumnSortableSettingsBuilder<T> Compare(string value)
        {
            container.Compare = value;

            return this;
        }
        
        //<< Fields
    }
}

