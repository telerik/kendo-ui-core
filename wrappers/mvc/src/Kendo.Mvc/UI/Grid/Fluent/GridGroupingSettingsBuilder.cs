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
    }
}
