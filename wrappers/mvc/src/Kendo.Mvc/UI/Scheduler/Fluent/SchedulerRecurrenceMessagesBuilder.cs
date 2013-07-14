namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections;
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerRecurrenceMessages"/>.
    /// </summary>
    public class SchedulerRecurrenceMessagesBuilder: IHideObjectMembers
    {
        
        private readonly SchedulerRecurrenceMessages recurrenceMessages;

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerRecurrenceMessagesBuilder"/> class.
        /// </summary>
        /// <param name="recurrenceMessages">The recurrenceMessages.</param>
        public SchedulerRecurrenceMessagesBuilder(SchedulerRecurrenceMessages recurrenceMessages)
        {
            this.recurrenceMessages = recurrenceMessages;
        }

        public SchedulerRecurrenceMessagesBuilder DeleteWindowTitle(string message)
        {
            recurrenceMessages.DeleteWindowTitle = message;

            return this;
        }

        public SchedulerRecurrenceMessagesBuilder DeleteWindowOccurrence(string message)
        {
            recurrenceMessages.DeleteWindowOccurrence = message;

            return this;
        }

        public SchedulerRecurrenceMessagesBuilder DeleteWindowSeries(string message)
        {
            recurrenceMessages.DeleteWindowSeries = message;

            return this;
        }

        public SchedulerRecurrenceMessagesBuilder EditWindowTitle(string message)
        {
            recurrenceMessages.EditWindowTitle = message;

            return this;
        }

        public SchedulerRecurrenceMessagesBuilder EditWindowOccurrence(string message)
        {
            recurrenceMessages.EditWindowOccurrence = message;

            return this;
        }

        public SchedulerRecurrenceMessagesBuilder EditWindowSeries(string message)
        {
            recurrenceMessages.EditWindowSeries = message;

            return this;
        }

        public SchedulerRecurrenceMessagesBuilder EditRecurring(string message)
        {
            recurrenceMessages.EditRecurring = message;

            return this;
        }

        public SchedulerRecurrenceMessagesBuilder DeleteRecurring(string message)
        {
            recurrenceMessages.DeleteRecurring = message;

            return this;
        }
    }
}
