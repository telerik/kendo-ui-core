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
        /// The configuration of the Gantt view messages. Use this option to customize or localize the Gantt view messages.
        /// </summary>
        /// <param name="configurator">The action that configures the views.</param>
        public GanttMessagesSettingsBuilder Views(Action<GanttMessagesViewsSettingsBuilder> configurator)
        {
            configurator(new GanttMessagesViewsSettingsBuilder(container.Views));
            return this;
        }
        
        /// <summary>
        /// The configuration of the Gantt action messages. Use this option to customize or localize the Gantt action messages.
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

