namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PivotGridMessages"/>.
    /// </summary>
    public class PivotGridMessagesBuilder
    {
        private readonly PivotGridMessages messages;

        public PivotGridMessagesBuilder(PivotGridMessages messages)
        {
            this.messages = messages;
        }

        public PivotGridMessagesBuilder MeasureFields(string message)
        {
            messages.MeasureFields = message;

            return this;
        }

        public PivotGridMessagesBuilder ColumnFields(string message)
        {
            messages.ColumnFields = message;

            return this;
        }

        public PivotGridMessagesBuilder RowFields(string message)
        {
            messages.RowFields = message;

            return this;
        }
    }
}
