namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Resources;

    public class PagerMessages : JsonObject
    {
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
            if (Display != DefaultPagerMessages.Display)
            {
                json["display"] = Display;
            }

            if (Empty != DefaultPagerMessages.Empty)
            {
                json["empty"] = Empty;
            }

            if (Page != DefaultPagerMessages.Page)
            {
                json["page"] = Page;
            }

            if (Of != DefaultPagerMessages.Of)
            {
                json["of"] = Of;
            }

            if (ItemsPerPage != DefaultPagerMessages.ItemsPerPage)
            {
                json["itemsPerPage"] = ItemsPerPage;
            }

            if (First != DefaultPagerMessages.First)
            {
                json["first"] = First;
            }

            if (Previous != DefaultPagerMessages.Previous)
            {
                json["previous"] = Previous;
            }

            if (Next != DefaultPagerMessages.Next)
            {
                json["next"] = Next;
            }

            if (Last != DefaultPagerMessages.Last)
            {
                json["last"] = Last;
            }

            if (Refresh != DefaultPagerMessages.Refresh)
            {
                json["refresh"] = Refresh;
            }
        }
    }
}