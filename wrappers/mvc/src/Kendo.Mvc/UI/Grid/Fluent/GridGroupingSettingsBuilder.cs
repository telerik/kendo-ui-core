namespace Kendo.Mvc.UI.Fluent
{
    using System;
    
    /// <summary>
    /// Defines the fluent interface for configuring <see cref="GridGroupableSettings"/>.
    /// </summary>
    public class GridGroupingSettingsBuilder : IHideObjectMembers
    {
        private readonly GridGroupableSettings settings;
        
        public GridGroupingSettingsBuilder(GridGroupableSettings settings)
        {
            this.settings = settings;
        }

        /// <summary>
        /// Configures messages.
        /// </summary>        
        /// <returns></returns>
        public GridGroupingSettingsBuilder Messages(Action<GroupingMessagesBuilder> configurator)
        {
            configurator(new GroupingMessagesBuilder(settings.Messages));

            return this;
        }

        /// <summary>
        /// Enables or disables filtering
        /// </summary>        
        public GridGroupingSettingsBuilder Enabled(bool value)
        {
            settings.Enabled = value;

            return this;
        }

        /// <summary>
        /// Specifies whether the footer should be displayed when the Group is collapsed
        /// </summary>        
        public GridGroupingSettingsBuilder ShowFooter(bool value)
        {
            settings.ShowFooter = value;

            return this;
        }
    }
}
