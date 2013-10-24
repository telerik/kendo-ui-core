namespace Kendo.Mvc.UI.Fluent
{
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

        public SchedulerRecurrenceEditorEndMessagesBuilder Label(string message)
        {
            editorMessages.Label = message;

            return this;
        }

        public SchedulerRecurrenceEditorEndMessagesBuilder Never(string message)
        {
            editorMessages.Never = message;

            return this;
        }

        public SchedulerRecurrenceEditorEndMessagesBuilder After(string message)
        {
            editorMessages.After = message;

            return this;
        }

        public SchedulerRecurrenceEditorEndMessagesBuilder Occurrence(string message)
        {
            editorMessages.Occurrence = message;

            return this;
        }

        public SchedulerRecurrenceEditorEndMessagesBuilder On(string message)
        {
            editorMessages.On = message;

            return this;
        }
    }
}
