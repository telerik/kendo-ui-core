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
        /// The configuration of the Gantt action messages. Use this option to customize or localize the Gantt action messages.
        /// </summary>
        /// <param name="configurator">The action that configures the actions.</param>
        public GanttMessagesSettingsBuilder Actions(Action<GanttMessagesActionsSettingsBuilder> configurator)
        {
            configurator(new GanttMessagesActionsSettingsBuilder(container.Actions));
            return this;
        }
        
        /// <summary>
        /// The text similar to "Cancel" displayed in Gantt.
        /// </summary>
        /// <param name="value">The value that configures the cancel.</param>
        public GanttMessagesSettingsBuilder Cancel(string value)
        {
            container.Cancel = value;

            return this;
        }
        
        /// <summary>
        /// The text similar to "Delete dependency" displayed in Gantt dependency delete dialog.
        /// </summary>
        /// <param name="value">The value that configures the deletedependencywindowtitle.</param>
        public GanttMessagesSettingsBuilder DeleteDependencyWindowTitle(string value)
        {
            container.DeleteDependencyWindowTitle = value;

            return this;
        }
        
        /// <summary>
        /// The text similar to "Delete task" displayed in Gantt task delete dialog.
        /// </summary>
        /// <param name="value">The value that configures the deletetaskwindowtitle.</param>
        public GanttMessagesSettingsBuilder DeleteTaskWindowTitle(string value)
        {
            container.DeleteTaskWindowTitle = value;

            return this;
        }
        
        /// <summary>
        /// The text similar to "Delete" displayed in Gantt.
        /// </summary>
        /// <param name="value">The value that configures the destroy.</param>
        public GanttMessagesSettingsBuilder Destroy(string value)
        {
            container.Destroy = value;

            return this;
        }
        
        /// <summary>
        /// The configuration of the Gantt editor messages. Use this option to customize or localize the Gantt editor messages.
        /// </summary>
        /// <param name="configurator">The action that configures the editor.</param>
        public GanttMessagesSettingsBuilder Editor(Action<GanttMessagesEditorSettingsBuilder> configurator)
        {
            configurator(new GanttMessagesEditorSettingsBuilder(container.Editor));
            return this;
        }
        
        /// <summary>
        /// The text similar to "Save" displayed in Gantt.
        /// </summary>
        /// <param name="value">The value that configures the save.</param>
        public GanttMessagesSettingsBuilder Save(string value)
        {
            container.Save = value;

            return this;
        }
        
        /// <summary>
        /// The configuration of the Gantt view messages. Use this option to customize or localize the Gantt view messages.
        /// </summary>
        /// <param name="configurator">The action that configures the views.</param>
        public GanttMessagesSettingsBuilder Views(Action<GanttMessagesViewsSettingsBuilder> configurator)
        {
            configurator(new GanttMessagesViewsSettingsBuilder(container.Views));
            return this;
        }
        
        //<< Fields
    }
}

