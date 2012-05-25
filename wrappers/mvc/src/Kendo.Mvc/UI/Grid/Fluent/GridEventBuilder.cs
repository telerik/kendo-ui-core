namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    public class GridEventBuilder : IHideObjectMembers
    {
        private readonly IDictionary<string, object> events;

        public GridEventBuilder(IDictionary<string, object> events)
        {
            this.events = events;
        }

        public GridEventBuilder Change(Func<object, object> handler)
        {
            events["change"] = new ClientEvent { InlineCodeBlock = handler };

            return this;
        }

        public GridEventBuilder Change(string handlerName)
        {
            events["change"] = new ClientEvent { HandlerName = handlerName };

            return this;
        }

        public GridEventBuilder Edit(Func<object, object> handler)
        {
            events["edit"] = new ClientEvent { InlineCodeBlock = handler };

            return this;
        }

        public GridEventBuilder Edit(string handlerName)
        {
            events["edit"] = new ClientEvent { HandlerName = handlerName };

            return this;
        }

        public GridEventBuilder Save(Func<object, object> handler)
        {
            events["save"] = new ClientEvent { InlineCodeBlock = handler };

            return this;
        }

        public GridEventBuilder Save(string handlerName)
        {
            events["save"] = new ClientEvent { HandlerName = handlerName };

            return this;
        }

        public GridEventBuilder SaveChanges(Func<object, object> handler)
        {
            events["saveChanges"] = new ClientEvent { InlineCodeBlock = handler };

            return this;
        }

        public GridEventBuilder SaveChanges(string handlerName)
        {
            events["saveChanges"] = new ClientEvent { HandlerName = handlerName };

            return this;
        }

        public GridEventBuilder DetailExpand(Func<object, object> handler)
        {
            events["detailExpand"] = new ClientEvent { InlineCodeBlock = handler };

            return this;
        }

        public GridEventBuilder DetailExpand(string handlerName)
        {
            events["detailExpand"] = new ClientEvent { HandlerName = handlerName };

            return this;
        }

        public GridEventBuilder DetailInit(Func<object, object> handler)
        {
            events["detailInit"] = new ClientEvent { InlineCodeBlock = handler };

            return this;
        }

        public GridEventBuilder DetailInit(string handlerName)
        {
            events["detailInit"] = new ClientEvent { HandlerName = handlerName };

            return this;
        }

        public GridEventBuilder DetailCollapse(Func<object, object> handler)
        {
            events["detailCollapse"] = new ClientEvent { InlineCodeBlock = handler };

            return this;
        }

        public GridEventBuilder DetailCollapse(string handlerName)
        {
            events["detailCollapse"] = new ClientEvent { HandlerName = handlerName };

            return this;
        }

        public GridEventBuilder Remove(Func<object, object> handler)
        {
            events["remove"] = new ClientEvent { InlineCodeBlock = handler };

            return this;
        }

        public GridEventBuilder Remove(string handlerName)
        {
            events["remove"] = new ClientEvent { HandlerName = handlerName };

            return this;
        }

        public GridEventBuilder DataBound(Func<object, object> handler)
        {
            events["dataBound"] = new ClientEvent { InlineCodeBlock = handler };

            return this;
        }

        public GridEventBuilder DataBound(string handlerName)
        {
            events["dataBound"] = new ClientEvent { HandlerName = handlerName };

            return this;
        }
    }
}