namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the MobileListViewFilterableSettings settings.
    /// </summary>
    public class MobileListViewFilterableSettingsBuilder: IHideObjectMembers
    {
        private readonly MobileListViewFilterableSettings container;

        public MobileListViewFilterableSettingsBuilder(MobileListViewFilterableSettings settings)
        {
            container = settings;

            settings.Enabled = true;
        }        
        
        /// <summary>
        /// Placeholder text for search input.
        /// </summary>
        /// <param name="value">The value that configures the placeholder.</param>
        public MobileListViewFilterableSettingsBuilder Placeholder(string value)
        {
            container.Placeholder = value;

            return this;
        }
        
        /// <summary>
        /// Indicates whether filtering should be performed on every key up event or not.
        /// </summary>
        /// <param name="value">The value that configures the autofilter.</param>
        public MobileListViewFilterableSettingsBuilder AutoFilter(bool value)
        {
            container.AutoFilter = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the field which will be used in the filter expression.
        /// </summary>
        /// <param name="value">The value that configures the field.</param>
        public MobileListViewFilterableSettingsBuilder Field(string value)
        {
            container.Field = value;

            return this;
        }
        
        /// <summary>
        /// Specifies whether the filter expression must be case sensitive or not.
        /// </summary>
        /// <param name="value">The value that configures the ignorecase.</param>
        public MobileListViewFilterableSettingsBuilder IgnoreCase(bool value)
        {
            container.IgnoreCase = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the comparison operator used in the filter expression.
        /// </summary>
        /// <param name="value">The value that configures the operator.</param>
        public MobileListViewFilterableSettingsBuilder Operator(string value)
        {
            container.Operator = value;

            return this;
        }                
    }
}

