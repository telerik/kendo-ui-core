namespace Kendo.Mvc.UI.Fluent
{
    public class PageableMessagesBuilder : IHideObjectMembers
    {
        private readonly PageableMessages messages;

        public PageableMessagesBuilder(PageableMessages messages)
        {
            this.messages = messages;
        }

        public PageableMessagesBuilder Display(string message)
        {
            messages.Display = message;

            return this;
        }

        public PageableMessagesBuilder Empty(string message)
        {
            messages.Empty = message;

            return this;
        }

        public PageableMessagesBuilder Page(string message)
        {
            messages.Page = message;

            return this;
        }

        public PageableMessagesBuilder Of(string message)
        {
            messages.Of = message;

            return this;
        }

        public PageableMessagesBuilder ItemsPerPage(string message)
        {
            messages.ItemsPerPage = message;

            return this;
        }

        public PageableMessagesBuilder First(string message)
        {
            messages.First = message;

            return this;
        }

        public PageableMessagesBuilder Previous(string message)
        {
            messages.Previous = message;

            return this;
        }

        public PageableMessagesBuilder Next(string message)
        {
            messages.Next = message;

            return this;
        }

        public PageableMessagesBuilder Last(string message)
        {
            messages.Last = message;

            return this;
        }

        public PageableMessagesBuilder Refresh(string message)
        {
            messages.Refresh = message;

            return this;
        }

        public PageableMessagesBuilder MorePages(string message)
        {
            messages.MorePages = message;

            return this;
        }
    }
}