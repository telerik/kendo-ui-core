namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Resources;

    public class PagerMessages : JsonObject
    { 
        public const string DefaultDisplay = "{0} - {1} of {2} items";

        public const string DefaultEmpty = "No items to display";

        public const string DefaultPage = "Page";

        public const string DefaultOf = "of {0}";

        public const string DefaultItemsPerPage = "items per page";

        public const string DefaultFirst = "Go to the first page";

        public const string DefaultPrevious = "Go to the previous page";

        public const string DefaultNext = "Go to the next page";

        public const string DefaultLast = "Go to the last page";

        public const string DefaultRefresh = "Refresh";

        public PagerMessages()
        {
            Display = Messages.Pager_Display;
            Empty = Messages.Pager_Empty;
            Page = Messages.Pager_Page;
            Of = Messages.Pager_Of;
            ItemsPerPage = Messages.Pager_ItemsPerPage;
            First = Messages.Pager_First;
            Previous = Messages.Pager_Previous;
            Next = Messages.Pager_Next;
            Last = Messages.Pager_Last;
            Refresh = Messages.Pager_Refresh;
        }

        public string Display { get; set; }

        public string Empty { get; set; }

        public string Page { get; set; }

        public string Of { get; set; }

        public string ItemsPerPage { get; set; }

        public string First { get; set; }

        public string Previous { get; set; }

        public string Next { get; set; }

        public string Last { get; set; }

        public string Refresh { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Display != DefaultDisplay)
            {
                json["display"] = Display;
            }

            if (Empty != DefaultEmpty)
            {
                json["empty"] = Empty;
            }

            if (Page != DefaultPage)
            {
                json["page"] = Page;
            }

            if (Of != DefaultOf)
            {
                json["of"] = Of;
            }

            if (ItemsPerPage != DefaultItemsPerPage)
            {
                json["itemsPerPage"] = ItemsPerPage;
            }

            if (First != DefaultFirst)
            {
                json["first"] = First;
            }

            if (Previous != DefaultPrevious)
            {
                json["previous"] = Previous;
            }

            if (Next != DefaultNext)
            {
                json["next"] = Next;
            }

            if (Last != DefaultLast)
            {
                json["last"] = Last;
            }

            if (Refresh != DefaultRefresh)
            {
                json["refresh"] = Refresh;
            }
        }
    }
}