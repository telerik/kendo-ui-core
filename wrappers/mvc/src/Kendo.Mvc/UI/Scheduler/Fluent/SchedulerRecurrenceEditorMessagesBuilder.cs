namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections;
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerRecurrenceEditorMessages"/>.
    /// </summary>
    public class SchedulerRecurrenceEditorMessagesBuilder: IHideObjectMembers
    {
        private readonly SchedulerRecurrenceEditorMessages editorMessages;

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerRecurrenceEditorMessagesBuilder"/> class.
        /// </summary>
        /// <param name="editorMessages">The editorMessages.</param>
        public SchedulerRecurrenceEditorMessagesBuilder(SchedulerRecurrenceEditorMessages editorMessages)
        {
            this.editorMessages = editorMessages;
        }

        /// <summary>
        /// Sets the Recurrence Editor Frequencies messages of the scheduler.
        /// </summary>
        /// <param name="addViewAction">The lambda which configures the scheduler recurrence editor frequencies messages</param>
        public SchedulerRecurrenceEditorMessagesBuilder Frequencies(Action<SchedulerRecurrenceEditorFrequenciesMessagesBuilder> addViewAction)
        {
            SchedulerRecurrenceEditorFrequenciesMessagesBuilder builder = new SchedulerRecurrenceEditorFrequenciesMessagesBuilder(editorMessages.FrequenciesMessages);

            addViewAction(builder);

            return this;
        }

        /// <summary>
        /// Sets the Recurrence Editor Daily messages of the scheduler.
        /// </summary>
        /// <param name="addViewAction">The lambda which configures the scheduler recurrence editor daily messages</param>
        public SchedulerRecurrenceEditorMessagesBuilder Daily(Action<SchedulerRecurrenceEditorDailyMessagesBuilder> addViewAction)
        {
            SchedulerRecurrenceEditorDailyMessagesBuilder builder = new SchedulerRecurrenceEditorDailyMessagesBuilder(editorMessages.DailyMessages);

            addViewAction(builder);

            return this;
        }

        /// <summary>
        /// Sets the Recurrence Editor Weekly messages of the scheduler.
        /// </summary>
        /// <param name="addViewAction">The lambda which configures the scheduler recurrence editor weekly messages</param>
        public SchedulerRecurrenceEditorMessagesBuilder Weekly(Action<SchedulerRecurrenceEditorWeeklyMessagesBuilder> addViewAction)
        {
            SchedulerRecurrenceEditorWeeklyMessagesBuilder builder = new SchedulerRecurrenceEditorWeeklyMessagesBuilder(editorMessages.WeeklyMessages);

            addViewAction(builder);

            return this;
        }

        /// <summary>
        /// Sets the Recurrence Editor Montly messages of the scheduler.
        /// </summary>
        /// <param name="addViewAction">The lambda which configures the scheduler recurrence editor montly messages</param>
        public SchedulerRecurrenceEditorMessagesBuilder Monthly(Action<SchedulerRecurrenceEditorMonthlyMessagesBuilder> addViewAction)
        {
            SchedulerRecurrenceEditorMonthlyMessagesBuilder builder = new SchedulerRecurrenceEditorMonthlyMessagesBuilder(editorMessages.MonthlyMessages);

            addViewAction(builder);

            return this;
        }

        /// <summary>
        /// Sets the Recurrence Editor Yearly messages of the scheduler.
        /// </summary>
        /// <param name="addViewAction">The lambda which configures the scheduler recurrence editor yearly messages</param>
        public SchedulerRecurrenceEditorMessagesBuilder Yearly(Action<SchedulerRecurrenceEditorYearlyMessagesBuilder> addViewAction)
        {
            SchedulerRecurrenceEditorYearlyMessagesBuilder builder = new SchedulerRecurrenceEditorYearlyMessagesBuilder(editorMessages.YearlyMessages);

            addViewAction(builder);

            return this;
        }

        /// <summary>
        /// Sets the Recurrence Editor End messages of the scheduler.
        /// </summary>
        /// <param name="addViewAction">The lambda which configures the scheduler recurrence editor end messages</param>
        public SchedulerRecurrenceEditorMessagesBuilder End(Action<SchedulerRecurrenceEditorEndMessagesBuilder> addViewAction)
        {
            SchedulerRecurrenceEditorEndMessagesBuilder builder = new SchedulerRecurrenceEditorEndMessagesBuilder(editorMessages.EndMessages);

            addViewAction(builder);

            return this;
        }

        /// <summary>
        /// Sets the Recurrence Editor OffsetPositions messages of the scheduler.
        /// </summary>
        /// <param name="addViewAction">The lambda which configures the scheduler recurrence editor offsetPositions messages</param>
        public SchedulerRecurrenceEditorMessagesBuilder OffsetPositions(Action<SchedulerRecurrenceEditorOffsetPositionsMessagesBuilder> addViewAction)
        {
            SchedulerRecurrenceEditorOffsetPositionsMessagesBuilder builder = new SchedulerRecurrenceEditorOffsetPositionsMessagesBuilder(editorMessages.OffsetPositionsMessages);

            addViewAction(builder);

            return this;
        }
    }
}
