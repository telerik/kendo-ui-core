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

        protected void Handler(string name, string handler)
        {
            Events[name] = new ClientHandlerDescriptor { HandlerName = handler };
        }

        protected void Handler(string name, Func<object, object> handler)
        {
            Events[name] = new ClientHandlerDescriptor { TemplateDelegate = handler };
        }
    }
}
