namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the GanttMessagesSettings settings.
    /// </summary>
    public class GanttMessagesSettingsBuilder: IHideObjectMembers
    {
        private readonly GanttMessagesSettings container;

        public GanttMessagesSettingsBuilder(GanttMessagesSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The configuration of the gantt view messages. Use this option to customize or localize the gantt view messages.
        /// </summary>
        /// <param name="configurator">The action that configures the views.</param>
        public GanttMessagesSettingsBuilder Views(Action<GanttMessagesViewsSettingsBuilder> configurator)
        {
            configurator(new GanttMessagesViewsSettingsBuilder(container.Views));
            return this;
        }
        
        /// <summary>
        /// The configuration of the gantt action messages. Use this option to customize or localize the gantt action messages.
        /// </summary>
        /// <param name="configurator">The action that configures the actions.</param>
        public GanttMessagesSettingsBuilder Actions(Action<GanttMessagesActionsSettingsBuilder> configurator)
        {
            configurator(new GanttMessagesActionsSettingsBuilder(container.Actions));
            return this;
        }
        
        //<< Fields
    }
}

