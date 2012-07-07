using System;
using System.Linq;

namespace Kendo.Mvc.UI.Fluent
{
    public class ColumnMenuMessagesBuilder : IHideObjectMembers
    {
        private readonly ColumnMenuMessages messages;

        public ColumnMenuMessagesBuilder(ColumnMenuMessages messages)
        {
            this.messages = messages;
        }

        public ColumnMenuMessagesBuilder Filter(string message)
        {
            messages.Filter = message;

            return this;
        }

        public ColumnMenuMessagesBuilder Columns(string message)
        {
            messages.Columns = message;

            return this;
        }

        public ColumnMenuMessagesBuilder SortAscending(string message)
        {
            messages.SortAscending = message;

            return this;
        }

        public ColumnMenuMessagesBuilder SortDescending(string message)
        {
            messages.SortDescending = message;

            return this;
        }
    }
}