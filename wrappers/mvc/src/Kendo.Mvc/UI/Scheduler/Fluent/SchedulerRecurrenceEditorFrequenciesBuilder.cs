namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections;
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerRecurrenceEditorFrequenciesMessages"/>.
    /// </summary>
    public class SchedulerRecurrenceEditorFrequenciesMessagesBuilder: IHideObjectMembers
    {
        private readonly SchedulerRecurrenceEditorFrequenciesMessages editorMessages;

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerRecurrenceEditorFrequenciesMessagesBuilder"/> class.
        /// </summary>
        /// <param name="editorMessages">The editorMessages.</param>
        public SchedulerRecurrenceEditorFrequenciesMessagesBuilder(SchedulerRecurrenceEditorFrequenciesMessages editorMessages)
        {
            this.editorMessages = editorMessages;
        }

        public SchedulerRecurrenceEditorFrequenciesMessagesBuilder Never(string message)
        {
            editorMessages.Never = message;

            return this;
        }

        public SchedulerRecurrenceEditorFrequenciesMessagesBuilder Daily(string message)
        {
            editorMessages.Daily = message;

            return this;
        }

        public SchedulerRecurrenceEditorFrequenciesMessagesBuilder Weekly(string message)
        {
            editorMessages.Weekly = message;

            return this;
        }

        public SchedulerRecurrenceEditorFrequenciesMessagesBuilder Monthly(string message)
        {
            editorMessages.Monthly = message;

            return this;
        }

        public SchedulerRecurrenceEditorFrequenciesMessagesBuilder Yearly(string message)
        {
            editorMessages.Yearly = message;

            return this;
        }
    }
}
