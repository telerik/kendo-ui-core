namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the GanttMessagesEditorSettings settings.
    /// </summary>
    public class GanttMessagesEditorSettingsBuilder: IHideObjectMembers
    {
        private readonly GanttMessagesEditorSettings container;

        public GanttMessagesEditorSettingsBuilder(GanttMessagesEditorSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The text similar to "Assign" displayed in Gantt task editor.
        /// </summary>
        /// <param name="value">The value that configures the assignbutton.</param>
        public GanttMessagesEditorSettingsBuilder AssignButton(string value)
        {
            container.AssignButton = value;

            return this;
        }
        
        /// <summary>
        /// The text similar to "Task" displayed in Gantt task editor.
        /// </summary>
        /// <param name="value">The value that configures the editortitle.</param>
        public GanttMessagesEditorSettingsBuilder EditorTitle(string value)
        {
            container.EditorTitle = value;

            return this;
        }
        
        /// <summary>
        /// The text similar to "End" displayed in Gantt task editor.
        /// </summary>
        /// <param name="value">The value that configures the end.</param>
        public GanttMessagesEditorSettingsBuilder End(string value)
        {
            container.End = value;

            return this;
        }
        
        /// <summary>
        /// The text similar to "Complete" displayed in Gantt task editor.
        /// </summary>
        /// <param name="value">The value that configures the percentcomplete.</param>
        public GanttMessagesEditorSettingsBuilder PercentComplete(string value)
        {
            container.PercentComplete = value;

            return this;
        }
        
        /// <summary>
        /// The text similar to "Resources" displayed in Gantt task editor.
        /// </summary>
        /// <param name="value">The value that configures the resources.</param>
        public GanttMessagesEditorSettingsBuilder Resources(string value)
        {
            container.Resources = value;

            return this;
        }
        
        /// <summary>
        /// The text similar to "Resources" displayed in Gantt task editor.
        /// </summary>
        /// <param name="value">The value that configures the resourceseditortitle.</param>
        public GanttMessagesEditorSettingsBuilder ResourcesEditorTitle(string value)
        {
            container.ResourcesEditorTitle = value;

            return this;
        }
        
        /// <summary>
        /// The text similar to "Resources" displayed in Gantt task editor.
        /// </summary>
        /// <param name="value">The value that configures the resourcesheader.</param>
        public GanttMessagesEditorSettingsBuilder ResourcesHeader(string value)
        {
            container.ResourcesHeader = value;

            return this;
        }
        
        /// <summary>
        /// The text similar to "Start" displayed in Gantt task editor.
        /// </summary>
        /// <param name="value">The value that configures the start.</param>
        public GanttMessagesEditorSettingsBuilder Start(string value)
        {
            container.Start = value;

            return this;
        }
        
        /// <summary>
        /// The text similar to "Title" displayed in Gantt task editor.
        /// </summary>
        /// <param name="value">The value that configures the title.</param>
        public GanttMessagesEditorSettingsBuilder Title(string value)
        {
            container.Title = value;

            return this;
        }
        
        /// <summary>
        /// The text similar to "Units" displayed in Gantt task editor.
        /// </summary>
        /// <param name="value">The value that configures the unitsheader.</param>
        public GanttMessagesEditorSettingsBuilder UnitsHeader(string value)
        {
            container.UnitsHeader = value;

            return this;
        }
        
        //<< Fields
    }
}

