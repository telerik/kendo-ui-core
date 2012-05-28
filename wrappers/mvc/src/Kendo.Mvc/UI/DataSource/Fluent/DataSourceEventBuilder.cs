using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI.Fluent
{
    public class DataSourceEventBuilder : EventBuilder
    {
        public DataSourceEventBuilder(IDictionary<string, object> events) : base(events)
        {
        }

        public DataSourceEventBuilder Change(string handler)
        {
            Handler("change", handler);

            return this;
        }

        public DataSourceEventBuilder Change(Func<object, object> handler)
        {
            Handler("change", handler);

            return this;
        }

        public DataSourceEventBuilder RequestStart(string handler)
        {
            Handler("requestStart", handler);

            return this;
        }

        public DataSourceEventBuilder RequestStart(Func<object, object> handler)
        {
            Handler("requestStart", handler);

            return this;
        }

        public DataSourceEventBuilder Error(string handler)
        {
            Handler("error", handler);

            return this;
        }

        public DataSourceEventBuilder Error(Func<object, object> handler)
        {
            Handler("error", handler);

            return this;
        }
    }
}