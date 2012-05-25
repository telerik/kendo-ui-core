using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI.Fluent
{
    public class EventBuilder : IHideObjectMembers
    {
        protected IDictionary<string, object> Events { get; private set; }

        public EventBuilder(IDictionary<string, object> events)
        {
            Events = events;
        }

        protected void Handler(string name, string handlerName)
        {
            Events[name] = new ClientEvent { HandlerName = handlerName };
        }

        protected void Block(string name, Func<object, object> handler)
        {
            Events[name] = new ClientEvent { InlineCodeBlock = handler };
        }
    }
}
