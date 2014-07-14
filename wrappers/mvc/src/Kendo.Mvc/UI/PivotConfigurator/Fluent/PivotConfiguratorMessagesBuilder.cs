namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PivotConfiguratorMessages"/>.
    /// </summary>
    public class PivotConfiguratorMessagesBuilder
    {
        private readonly PivotConfiguratorMessages messages;

        public PivotConfiguratorMessagesBuilder(PivotConfiguratorMessages messages)
        {
            this.messages = messages;
        }

        public PivotConfiguratorMessagesBuilder Measures(string message)
        {
            messages.Measures = message;

            return this;
        }

        public PivotConfiguratorMessagesBuilder Columns(string message)
        {
            messages.Columns = message;

            return this;
        }

        public PivotConfiguratorMessagesBuilder Rows(string message)
        {
            messages.Rows = message;

            return this;
        }

        public PivotConfiguratorMessagesBuilder MeasuresLabel(string message)
        {
            messages.MeasuresLabel = message;

            return this;
        }

        public PivotConfiguratorMessagesBuilder ColumnsLabel(string message)
        {
            messages.ColumnsLabel = message;

            return this;
        }

        public PivotConfiguratorMessagesBuilder RowsLabel(string message)
        {
            messages.RowsLabel = message;

            return this;
        }

        public PivotConfiguratorMessagesBuilder FieldsLabel(string message)
        {
            messages.FieldsLabel = message;

            return this;
        }
    }
}
