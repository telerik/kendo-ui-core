namespace Kendo.Mvc.UI.Fluent
{
    public class PagerMessagesBuilder : IHideObjectMembers
    {
        private readonly PagerMessages messages;

        public PagerMessagesBuilder(PagerMessages messages)
        {
            this.messages = messages;
        }

        public PagerMessagesBuilder Display(string message)
        {
            messages.Display = message;

            return this;
        }

        public PagerMessagesBuilder Empty(string message)
        {
            messages.Empty = message;

            return this;
        }

        public PagerMessagesBuilder Page(string message)
        {
            messages.Page = message;

            return this;
        }

        public PagerMessagesBuilder Of(string message)
        {
            messages.Of = message;

            return this;
        }

        public PagerMessagesBuilder ItemsPerPage(string message)
        {
            messages.ItemsPerPage = message;

            return this;
        }

        public PagerMessagesBuilder First(string message)
        {
            messages.First = message;

            return this;
        }

        public PagerMessagesBuilder Previous(string message)
        {
            messages.Previous = message;

            return this;
        }

        public PagerMessagesBuilder Next(string message)
        {
            messages.Next = message;

            return this;
        }

        public PagerMessagesBuilder Last(string message)
        {
            messages.Last = message;

            return this;
        }

        public PagerMessagesBuilder Refresh(string message)
        {
            messages.Refresh = message;

            return this;
        }
    }
}