using System;
using System.Linq;

namespace Kendo.Mvc.UI.Fluent
{
    public class GroupingMessagesBuilder : IHideObjectMembers
    {
        private readonly GroupingMessages messages;

        public GroupingMessagesBuilder(GroupingMessages messages)
        {
            this.messages = messages;
        }

        public GroupingMessagesBuilder Empty(string message)
        {
            messages.Empty = message;

            return this;
        }
    }
}
