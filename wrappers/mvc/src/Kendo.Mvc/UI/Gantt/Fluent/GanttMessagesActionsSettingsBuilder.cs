namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the GanttMessagesActionsSettings settings.
    /// </summary>
    public class GanttMessagesActionsSettingsBuilder: IHideObjectMembers
    {
        private readonly GanttMessagesActionsSettings container;

        public GanttMessagesActionsSettingsBuilder(GanttMessagesActionsSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The text similar to "Append" displayed as gantt "append" buttons.
        /// </summary>
        /// <param name="value">The value that configures the append.</param>
        public GanttMessagesActionsSettingsBuilder Append(string value)
        {
            container.Append = value;

            return this;
        }
        
        /// <summary>
        /// The text similar to "Add child" displayed as gantt "add child" buttons.
        /// </summary>
        /// <param name="value">The value that configures the addchild.</param>
        public GanttMessagesActionsSettingsBuilder AddChild(string value)
        {
            container.AddChild = value;

            return this;
        }
        
        /// <summary>
        /// The text similar to "Add above" displayed as gantt "add above" buttons.
        /// </summary>
        /// <param name="value">The value that configures the insertbefore.</param>
        public GanttMessagesActionsSettingsBuilder InsertBefore(string value)
        {
            container.InsertBefore = value;

            return this;
        }
        
        /// <summary>
        /// The text similar to "Add below" displayed as gantt "add below" buttons.
        /// </summary>
        /// <param name="value">The value that configures the insetafter.</param>
        public GanttMessagesActionsSettingsBuilder InsetAfter(string value)
        {
            container.InsetAfter = value;

            return this;
        }
        
        //<< Fields
    }
}

