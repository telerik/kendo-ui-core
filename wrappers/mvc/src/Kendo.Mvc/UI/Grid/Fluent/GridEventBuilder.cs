using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    public class GridEventBuilder : EventBuilder
    {
        public GridEventBuilder(IDictionary<string, object> events) : base(events)
        {
        }

        public GridEventBuilder Change(Func<object, object> handler)
        {
            Handler("change", handler);

            return this;
        }

        public GridEventBuilder Change(string handler)
        {
            Handler("change", handler);

            return this;
        }

        public GridEventBuilder Edit(Func<object, object> handler)
        {
            Handler("edit", handler);

            return this;
        }

        public GridEventBuilder Edit(string handler)
        {
            Handler("edit", handler);

            return this;
        }

        public GridEventBuilder Save(Func<object, object> handler)
        {
            Handler("save", handler);

            return this;
        }

        public GridEventBuilder Save(string handler)
        {
            Handler("save", handler);

            return this;
        }

        public GridEventBuilder SaveChanges(Func<object, object> handler)
        {
            Handler("saveChanges", handler);

            return this;
        }

        public GridEventBuilder SaveChanges(string handler)
        {
            Handler("saveChanges", handler);

            return this;
        }

        public GridEventBuilder DetailExpand(Func<object, object> handler)
        {
            Handler("detailExpand", handler);

            return this;
        }

        public GridEventBuilder DetailExpand(string handler)
        {
            Handler("detailExpand", handler);

            return this;
        }

        public GridEventBuilder DetailInit(Func<object, object> handler)
        {
            Handler("detailInit", handler);

            return this;
        }

        public GridEventBuilder DetailInit(string handler)
        {
            Handler("detailInit", handler);

            return this;
        }

        public GridEventBuilder DetailCollapse(Func<object, object> handler)
        {
            Handler("detailCollapse", handler);

            return this;
        }

        public GridEventBuilder DetailCollapse(string handler)
        {
            Handler("detailCollapse", handler);

            return this;
        }

        public GridEventBuilder Remove(Func<object, object> handler)
        {
            Handler("remove", handler);

            return this;
        }

        public GridEventBuilder Remove(string handler)
        {
            Handler("remove", handler);

            return this;
        }

        public GridEventBuilder DataBound(Func<object, object> handler)
        {
            Handler("dataBound", handler);

            return this;
        }

        public GridEventBuilder DataBound(string handler)
        {
            Handler("dataBound", handler);

            return this;
        }

        public GridEventBuilder ColumnResize(Func<object, object> handler)
        {
            Handler("columnResize", handler);

            return this;
        }

        public GridEventBuilder ColumnResize(string handler)
        {
            Handler("columnResize", handler);

            return this;
        }

        public GridEventBuilder ColumnReorder(Func<object, object> handler)
        {
            Handler("columnReorder", handler);

            return this;
        }

        public GridEventBuilder ColumnReorder(string handler)
        {
            Handler("columnReorder", handler);

            return this;
        }

        public GridEventBuilder ColumnHide(Func<object, object> handler)
        {
            Handler("columnHide", handler);

            return this;
        }

        public GridEventBuilder ColumnHide(string handler)
        {
            Handler("columnHide", handler);

            return this;
        }

        public GridEventBuilder ColumnShow(Func<object, object> handler)
        {
            Handler("columnShow", handler);

            return this;
        }

        public GridEventBuilder ColumnShow(string handler)
        {
            Handler("columnShow", handler);

            return this;
        }
    }
}