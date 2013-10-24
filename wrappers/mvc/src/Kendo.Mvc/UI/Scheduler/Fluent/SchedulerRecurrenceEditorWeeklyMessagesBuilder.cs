namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerRecurrenceEditorWeeklyMessages"/>.
    /// </summary>
    public class SchedulerRecurrenceEditorWeeklyMessagesBuilder: IHideObjectMembers
    {
        private readonly SchedulerRecurrenceEditorWeeklyMessages editorMessages;

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerRecurrenceEditorWeeklyMessagesBuilder"/> class.
        /// </summary>
        /// <param name="editorMessages">The editorMessages.</param>
        public SchedulerRecurrenceEditorWeeklyMessagesBuilder(SchedulerRecurrenceEditorWeeklyMessages editorMessages)
        {
            this.editorMessages = editorMessages;
        }

        public SchedulerRecurrenceEditorWeeklyMessagesBuilder Interval(string message)
        {
            editorMessages.Interval = message;

            return this;
        }

        public SchedulerRecurrenceEditorWeeklyMessagesBuilder RepeatEvery(string message)
        {
            editorMessages.RepeatEvery = message;

            return this;
        }

        public SchedulerRecurrenceEditorWeeklyMessagesBuilder RepeatOn(string message)
        {
            editorMessages.RepeatOn = message;

            return this;
        }
    }
}
