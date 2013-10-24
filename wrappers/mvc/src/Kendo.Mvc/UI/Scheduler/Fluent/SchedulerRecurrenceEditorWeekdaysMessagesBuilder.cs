namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerRecurrenceEditorWeekdaysMessagesBuilder"/>.
    /// </summary>
    public class SchedulerRecurrenceEditorWeekdaysMessagesBuilder: IHideObjectMembers
    {
        private readonly SchedulerRecurrenceEditorWeekdaysMessages editorMessages;

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerRecurrenceEditorWeekdaysMessages"/> class.
        /// </summary>
        /// <param name="editorMessages">The editorMessages.</param>
        public SchedulerRecurrenceEditorWeekdaysMessagesBuilder(SchedulerRecurrenceEditorWeekdaysMessages editorMessages)
        {
            this.editorMessages = editorMessages;
        }

        public SchedulerRecurrenceEditorWeekdaysMessagesBuilder Day(string message)
        {
            editorMessages.Day = message;

            return this;
        }

        public SchedulerRecurrenceEditorWeekdaysMessagesBuilder Weekday(string message)
        {
            editorMessages.Weekday = message;

            return this;
        }

        public SchedulerRecurrenceEditorWeekdaysMessagesBuilder Weekend(string message)
        {
            editorMessages.Weekend = message;

            return this;
        }
    }
}
