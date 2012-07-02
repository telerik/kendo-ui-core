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
            Dates = new DateOperators();
            Enums = new EnumOperators();
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

        public DateOperators Dates
        {
            get;
            private set;
        }

        public EnumOperators Enums
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

            var dates = Dates.ToJson();

            if (dates.Any())
            {
                json["date"] = dates;
            }

            var enums = Enums.ToJson();

            if (enums.Any())
            {
                json["enums"] = enums;
            }
        }
    }
}