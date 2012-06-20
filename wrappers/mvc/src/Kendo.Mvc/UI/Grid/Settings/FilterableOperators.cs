using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    public class FilterableOperators : JsonObject
    {
        public FilterableOperators()
        {
            Strings = new StringOperators();
            Numbers = new NumberOperators();
            DateOperators = new Dictionary<string, string>();
        }

        public StringOperators Strings
        {
            get;
            private set;
        }

        public NumberOperators Numbers
        {
            get;
            private set;
        }

        public IDictionary<string, string> DateOperators
        {
            get;
            private set;
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            var strings = Strings.ToJson();

            if (strings.Any())
            {
                json["string"] = strings;
            }

            var numbers = Numbers.ToJson();

            if (numbers.Any())
            {
                json["number"] = numbers;
            }

            var dates = DateOperators;

            if (dates.Any())
            {
                json["date"] = dates;
            }
        }
    }
}