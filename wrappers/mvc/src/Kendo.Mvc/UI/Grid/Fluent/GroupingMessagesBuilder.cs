using System;
using System.Linq;

namespace Kendo.Mvc.UI.Fluent
{
    public class GroupingMessagesBuilder : IHideObjectMembers
    {
        private readonly GroupableMessages messages;

        public GroupingMessagesBuilder(GroupableMessages messages)
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
