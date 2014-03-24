namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerViewMessages"/>.
    /// </summary>
    public class SchedulerViewMessagesBuilder: IHideObjectMembers
    {

        private readonly SchedulerViewMessages viewMessages;

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerViewMessagesBuilder"/> class.
        /// </summary>
        /// <param name="viewMessages">The viewMessages.</param>
        public SchedulerViewMessagesBuilder(SchedulerViewMessages viewMessages)
        {
            this.viewMessages = viewMessages;
        }

        public SchedulerViewMessagesBuilder Day(string message)
        {
            viewMessages.Day = message;

            return this;
        }

        public SchedulerViewMessagesBuilder Week(string message)
        {
            viewMessages.Week = message;

            return this;
        }

        public SchedulerViewMessagesBuilder WorkWeek(string message)
        {
            viewMessages.WorkWeek = message;

            return this;
        }

        public SchedulerViewMessagesBuilder Month(string message)
        {
            viewMessages.Month = message;

            return this;
        }

        public SchedulerViewMessagesBuilder Agenda(string message)
        {
            viewMessages.Agenda = message;

            return this;
        }
    }
}
