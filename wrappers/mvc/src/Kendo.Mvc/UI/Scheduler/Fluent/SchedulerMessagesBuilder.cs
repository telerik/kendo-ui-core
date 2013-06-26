namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections;
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerMessages"/>.
    /// </summary>
    public class SchedulerMessagesBuilder: IHideObjectMembers
    {
        private readonly SchedulerMessages messages;

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerMessagesBuilder"/> class.
        /// </summary>
        /// <param name="messages">The messages.</param>
        public SchedulerMessagesBuilder(SchedulerMessages messages)
        {
            this.messages = messages;
        }

        public SchedulerMessagesBuilder Today(string message)
        {
            messages.Today = message;

            return this;
        }

        public SchedulerMessagesBuilder Save(string message)
        {
            messages.Save = message;

            return this;
        }

        public SchedulerMessagesBuilder Cancel(string message)
        {
            messages.Cancel = message;

            return this;
        }

        public SchedulerMessagesBuilder Destroy(string message)
        {
            messages.Destroy = message;

            return this;
        }

        public SchedulerMessagesBuilder Event(string message)
        {
            messages.Event = message;

            return this;
        }

        public SchedulerMessagesBuilder Date(string message)
        {
            messages.Date = message;

            return this;
        }

        public SchedulerMessagesBuilder Time(string message)
        {
            messages.Time = message;

            return this;
        }

        public SchedulerMessagesBuilder AllDay(string message)
        {
            messages.AllDay = message;

            return this;
        }

        /// <summary>
        /// Sets the View messages of the scheduler.
        /// </summary>
        /// <param name="addViewAction">The lambda which configures the scheduler view messages</param>
        public SchedulerMessagesBuilder Views(Action<SchedulerViewMessagesBuilder> addViewAction)
        {
            SchedulerViewMessagesBuilder builder = new SchedulerViewMessagesBuilder(messages.ViewMessages);

            addViewAction(builder);

            return this;
        }

        /// <summary>
        /// Sets the Recurrence messages of the scheduler.
        /// </summary>
        /// <param name="addViewAction">The lambda which configures the scheduler recurrence messages</param>
        public SchedulerMessagesBuilder Recurrence(Action<SchedulerRecurrenceMessagesBuilder> addViewAction)
        {
            SchedulerRecurrenceMessagesBuilder builder = new SchedulerRecurrenceMessagesBuilder(messages.RecurrenceMessages);

            addViewAction(builder);

            return this;
        }

        /// <summary>
        /// Sets the Editor messages of the scheduler.
        /// </summary>
        /// <param name="addViewAction">The lambda which configures the scheduler editor messages</param>
        public SchedulerMessagesBuilder RecurrenceEditor(Action<SchedulerRecurrenceEditorMessagesBuilder> addViewAction)
        {
            SchedulerRecurrenceEditorMessagesBuilder builder = new SchedulerRecurrenceEditorMessagesBuilder(messages.RecurrenceEditorMessages);

            addViewAction(builder);

            return this;
        }

        /// <summary>
        /// Sets the Editor messages of the scheduler.
        /// </summary>
        /// <param name="addViewAction">The lambda which configures the scheduler editor messages</param>
        public SchedulerMessagesBuilder Editor(Action<SchedulerEditorMessagesBuilder> addViewAction)
        {
            SchedulerEditorMessagesBuilder builder = new SchedulerEditorMessagesBuilder(messages.EditorMessages);

            addViewAction(builder);

            return this;
        }
    }
}
