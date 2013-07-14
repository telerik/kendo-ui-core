namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections;
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerRecurrenceEditorOffsetPositionsMessagesBuilder"/>.
    /// </summary>
    public class SchedulerRecurrenceEditorOffsetPositionsMessagesBuilder: IHideObjectMembers
    {
        private readonly SchedulerRecurrenceEditorOffsetPositionsMessages editorMessages;

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerRecurrenceEditorOffsetPositionsMessages"/> class.
        /// </summary>
        /// <param name="editorMessages">The editorMessages.</param>
        public SchedulerRecurrenceEditorOffsetPositionsMessagesBuilder(SchedulerRecurrenceEditorOffsetPositionsMessages editorMessages)
        {
            this.editorMessages = editorMessages;
        }

        public SchedulerRecurrenceEditorOffsetPositionsMessagesBuilder First(string message)
        {
            editorMessages.First = message;

            return this;
        }

        public SchedulerRecurrenceEditorOffsetPositionsMessagesBuilder Second(string message)
        {
            editorMessages.Second = message;

            return this;
        }

        public SchedulerRecurrenceEditorOffsetPositionsMessagesBuilder Third(string message)
        {
            editorMessages.Third = message;

            return this;
        }

        public SchedulerRecurrenceEditorOffsetPositionsMessagesBuilder Fourth(string message)
        {
            editorMessages.Fourth = message;

            return this;
        }

        public SchedulerRecurrenceEditorOffsetPositionsMessagesBuilder Last(string message)
        {
            editorMessages.Last = message;

            return this;
        }
    }
}
