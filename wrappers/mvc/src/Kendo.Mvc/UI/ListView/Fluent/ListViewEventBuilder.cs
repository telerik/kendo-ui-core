using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    public class ListViewEventBuilder : EventBuilder
    {
        public ListViewEventBuilder(IDictionary<string, object> events) : base(events)
        {
        }

        public ListViewEventBuilder Change(Func<object, object> handler)
        {
            Handler("change", handler);

            return this;
        }

        public ListViewEventBuilder Change(string handler)
        {
            Handler("change", handler);

            return this;
        }

        public ListViewEventBuilder Edit(Func<object, object> handler)
        {
            Handler("edit", handler);

            return this;
        }

        public ListViewEventBuilder Edit(string handler)
        {
            Handler("edit", handler);

            return this;
        }        

        public ListViewEventBuilder Remove(Func<object, object> handler)
        {
            Handler("remove", handler);

            return this;
        }

        public ListViewEventBuilder Remove(string handler)
        {
            Handler("remove", handler);

            return this;
        }

        public ListViewEventBuilder DataBound(Func<object, object> handler)
        {
            Handler("dataBound", handler);

            return this;
        }

        public ListViewEventBuilder DataBound(string handler)
        {
            Handler("dataBound", handler);

            return this;
        }
    }
}