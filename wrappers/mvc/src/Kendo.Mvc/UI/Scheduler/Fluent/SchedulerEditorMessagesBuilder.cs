namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections;
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerEditorMessages"/>.
    /// </summary>
    public class SchedulerEditorMessagesBuilder: IHideObjectMembers
    {
        private readonly SchedulerEditorMessages editorMessages;

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerEditorMessagesBuilder"/> class.
        /// </summary>
        /// <param name="editorMessages">The editorMessages.</param>
        public SchedulerEditorMessagesBuilder(SchedulerEditorMessages editorMessages)
        {
            this.editorMessages = editorMessages;
        }

        public SchedulerEditorMessagesBuilder Title(string message)
        {
            editorMessages.Title = message;

            return this;
        }

        public SchedulerEditorMessagesBuilder Start(string message)
        {
            editorMessages.Start = message;

            return this;
        }

        public SchedulerEditorMessagesBuilder End(string message)
        {
            editorMessages.End = message;

            return this;
        }

        public SchedulerEditorMessagesBuilder AllDayEvent(string message)
        {
            editorMessages.AllDayEvent = message;

            return this;
        }

        public SchedulerEditorMessagesBuilder Description(string message)
        {
            editorMessages.Description = message;

            return this;
        }

        public SchedulerEditorMessagesBuilder Repeat(string message)
        {
            editorMessages.Repeat = message;

            return this;
        }

        public SchedulerEditorMessagesBuilder Timezone(string message)
        {
            editorMessages.Timezone = message;

            return this;
        }

        public SchedulerEditorMessagesBuilder StartTimezone(string message)
        {
            editorMessages.StartTimezone = message;

            return this;
        }

        public SchedulerEditorMessagesBuilder EndTimezone(string message)
        {
            editorMessages.EndTimezone = message;

            return this;
        }

        public SchedulerEditorMessagesBuilder SeparateTimezones(string message)
        {
            editorMessages.SeparateTimezones = message;

            return this;
        }

        public SchedulerEditorMessagesBuilder TimezoneEditorTitle(string message)
        {
            editorMessages.TimezoneEditorTitle = message;

            return this;
        }

        public SchedulerEditorMessagesBuilder TimezoneEditorButton(string message)
        {
            editorMessages.TimezoneEditorButton = message;

            return this;
        }

        public SchedulerEditorMessagesBuilder EditorTitle(string message)
        {
            editorMessages.EditorTitle = message;

            return this;
        }
    }
}
