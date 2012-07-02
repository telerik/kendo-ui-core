using System;
using System.Linq;

namespace Kendo.Mvc.UI.Fluent
{
    public class FilterableMessagesBuilder : IHideObjectMembers
    {
        private readonly FilterableMessages messages;

        public FilterableMessagesBuilder(FilterableMessages messages)
        {
            this.messages = messages;
        }

        public FilterableMessagesBuilder Info(string message)
        {
            messages.Info = message;

            return this;
        }

        public FilterableMessagesBuilder And(string message)
        {
            messages.And = message;

            return this;
        }

        public FilterableMessagesBuilder Or(string message)
        {
            messages.Or = message;

            return this;
        }

        public FilterableMessagesBuilder IsTrue(string message)
        {
            messages.IsTrue = message;

            return this;
        }

        public FilterableMessagesBuilder IsFalse(string message)
        {
            messages.IsFalse = message;

            return this;
        }

        public FilterableMessagesBuilder Filter(string message)
        {
            messages.Filter = message;

            return this;
        }

        public FilterableMessagesBuilder SelectValue(string message)
        {
            messages.SelectValue = message;

            return this;
        }

        public FilterableMessagesBuilder Clear(string message)
        {
            messages.Clear = message;

            return this;
        }
    }
}