namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections;
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerRecurrenceEditorEndMessages"/>.
    /// </summary>
    public class SchedulerRecurrenceEditorEndMessagesBuilder: IHideObjectMembers
    {
        private readonly SchedulerRecurrenceEditorEndMessages editorMessages;

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerRecurrenceEditorEndMessagesBuilder"/> class.
        /// </summary>
        /// <param name="editorMessages">The editorMessages.</param>
        public SchedulerRecurrenceEditorEndMessagesBuilder(SchedulerRecurrenceEditorEndMessages editorMessages)
        {
            this.editorMessages = editorMessages;
        }

        public SchedulerRecurrenceEditorEndMessagesBuilder EndLabel(string message)
        {
            editorMessages.EndLabel = message;

            return this;
        }

        public SchedulerRecurrenceEditorEndMessagesBuilder EndNever(string message)
        {
            editorMessages.EndNever = message;

            return this;
        }

        public SchedulerRecurrenceEditorEndMessagesBuilder EndCountAfter(string message)
        {
            editorMessages.EndCountAfter = message;

            return this;
        }

        public SchedulerRecurrenceEditorEndMessagesBuilder EndCountOccurrence(string message)
        {
            editorMessages.EndCountOccurrence = message;

            return this;
        }

        public SchedulerRecurrenceEditorEndMessagesBuilder EndUntilOn(string message)
        {
            editorMessages.EndUntilOn = message;

            return this;
        }
    }
}
