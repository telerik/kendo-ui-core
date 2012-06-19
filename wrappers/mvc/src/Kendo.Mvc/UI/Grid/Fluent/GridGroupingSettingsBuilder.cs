namespace Kendo.Mvc.UI.Fluent
{
    using System;
    
    public class GridGroupingSettingsBuilder : IHideObjectMembers
    {
        private readonly GridGroupableSettings settings;
        
        public GridGroupingSettingsBuilder(GridGroupableSettings settings)
        {
            this.settings = settings;
        }

        public GridGroupingSettingsBuilder Messages(Action<GroupingMessagesBuilder> configurator)
        {
            configurator(new GroupingMessagesBuilder(settings.Messages));

            return this;
        }

        public GridGroupingSettingsBuilder Enabled(bool value)
        {
            settings.Enabled = value;

            return this;
        }

        //TODO: invisible group panel
        /// <summary>
        /// Determines if group header should be shown.
        /// </summary>
        /// <param name="value">true if visible, otherwise false.</param>
        public GridGroupingSettingsBuilder Visible(bool value)
        {
            settings.Visible = value;

            return this;
        }
    }
}
