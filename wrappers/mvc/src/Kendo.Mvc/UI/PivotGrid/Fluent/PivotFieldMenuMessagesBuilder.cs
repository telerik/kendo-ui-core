namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PivotFieldMenuMessages"/>.
    /// </summary>
    public class PivotFieldMenuMessagesBuilder
    {
        private readonly PivotFieldMenuMessages messages;

        public PivotFieldMenuMessagesBuilder(PivotFieldMenuMessages messages)
        {
            this.messages = messages;
        }

        public PivotFieldMenuMessagesBuilder Info(string message)
        {
            messages.Info = message;

            return this;
        }

        public PivotFieldMenuMessagesBuilder FilterFields(string message)
        {
            messages.FilterFields = message;

            return this;
        }

        public PivotFieldMenuMessagesBuilder Filter(string message)
        {
            messages.Filter = message;

            return this;
        }

        public PivotFieldMenuMessagesBuilder Include(string message)
        {
            messages.Include = message;

            return this;
        }

        public PivotFieldMenuMessagesBuilder Title(string message)
        {
            messages.Title = message;

            return this;
        }

        public PivotFieldMenuMessagesBuilder Clear(string message)
        {
            messages.Clear = message;

            return this;
        }

        public PivotFieldMenuMessagesBuilder Ok(string message)
        {
            messages.Ok = message;

            return this;
        }

        public PivotFieldMenuMessagesBuilder Cancel(string message)
        {
            messages.Cancel = message;

            return this;
        }

        /// <summary>
        /// Sets the messages of the pivotFieldMenu filter operators.
        /// </summary>
        /// <param name="addViewAction">The lambda which configures the pivotFieldMenu operator messages</param>
        public PivotFieldMenuMessagesBuilder Operators(Action<StringOperatorsBuilder> addViewAction)
        {
            StringOperatorsBuilder builder = new StringOperatorsBuilder(messages.Operators);

            addViewAction(builder);

            return this;
        }
    }
}
