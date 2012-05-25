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
            Block("change", handler);

            return this;
        }

        public GridEventBuilder Change(string handlerName)
        {
            Handler("change", handlerName);

            return this;
        }

        public GridEventBuilder Edit(Func<object, object> handler)
        {
            Block("edit", handler);

            return this;
        }

        public GridEventBuilder Edit(string handlerName)
        {
            Handler("edit", handlerName);

            return this;
        }

        public GridEventBuilder Save(Func<object, object> handler)
        {
            Block("save", handler);

            return this;
        }

        public GridEventBuilder Save(string handlerName)
        {
            Handler("save", handlerName);

            return this;
        }

        public GridEventBuilder SaveChanges(Func<object, object> handler)
        {
            Block("saveChanges", handler);

            return this;
        }

        public GridEventBuilder SaveChanges(string handlerName)
        {
            Handler("saveChanges", handlerName);

            return this;
        }

        public GridEventBuilder DetailExpand(Func<object, object> handler)
        {
            Block("detailExpand", handler);

            return this;
        }

        public GridEventBuilder DetailExpand(string handlerName)
        {
            Handler("detailExpand", handlerName);

            return this;
        }

        public GridEventBuilder DetailInit(Func<object, object> handler)
        {
            Block("detailInit", handler);

            return this;
        }

        public GridEventBuilder DetailInit(string handlerName)
        {
            Handler("detailInit", handlerName);

            return this;
        }

        public GridEventBuilder DetailCollapse(Func<object, object> handler)
        {
            Block("detailCollapse", handler);

            return this;
        }

        public GridEventBuilder DetailCollapse(string handlerName)
        {
            Handler("detailCollapse", handlerName);

            return this;
        }

        public GridEventBuilder Remove(Func<object, object> handler)
        {
            Block("remove", handler);

            return this;
        }

        public GridEventBuilder Remove(string handlerName)
        {
            Handler("remove", handlerName);

            return this;
        }

        public GridEventBuilder DataBound(Func<object, object> handler)
        {
            Block("dataBound", handler);

            return this;
        }

        public GridEventBuilder DataBound(string handlerName)
        {
            Handler("dataBound", handlerName);

            return this;
        }
    }
}