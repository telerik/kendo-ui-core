using System;
using System.Collections.Generic;
using System.Linq;
using Kendo.Mvc.Resources;

namespace Kendo.Mvc.UI
{
    public class StringOperators : JsonObject
    {
        public StringOperators()
        {
            Operators = new Dictionary<string, string>()
            {
                { "eq", Messages.Filter_StringIsEqualTo },
                { "neq", Messages.Filter_StringIsNotEqualTo },
                { "startswith", Messages.Filter_StringStartsWith },
                { "endswith", Messages.Filter_StringEndsWith },
                { "contains", Messages.Filter_StringContains },
                { "doesnotcontain", Messages.Filter_StringDoesNotContain }
            };
        }

        private const string DefaultIsEqualTo = "Is equal to";
        private const string DefaultIsNotEqualTo = "Is not equal to";
        private const string DefaultStartsWith = "Starts with";
        private const string DefaultEndsWith = "Ends with";
        private const string DefaultContains = "Contains";
        private const string DefaultDoesNotContain = "Does not contain";

        private const int DefaultNumberOfFilters = 6;

        protected override void Serialize(IDictionary<string, object> json)
        {
            bool dirty = false;

            if (Operators.Count != DefaultNumberOfFilters)
            {
                dirty = true;
            }

            if (Operators.ContainsKey("eq") && Operators["eq"] != DefaultIsEqualTo)
            {
                dirty = true;
            }

            if (Operators.ContainsKey("neq") && Operators["neq"] != DefaultIsNotEqualTo)
            {
                dirty = true;
            }

            if (Operators.ContainsKey("startswith") && Operators["startswith"] != DefaultStartsWith)
            {
                dirty = true;
            }

            if (Operators.ContainsKey("endswith") && Operators["endswith"] != DefaultEndsWith)
            {
                dirty = true;
            }

            if (Operators.ContainsKey("contains") && Operators["contains"] != DefaultContains)
            {
                dirty = true;
            }

            if (Operators.ContainsKey("doesnotcontain") && Operators["doesnotcontain"] != DefaultDoesNotContain)
            {
                dirty = true;
            }

            if (dirty)
            {
                foreach (var keyValue in Operators)
                {
                    json[keyValue.Key] = keyValue.Value;
                }
            }
        }

        public IDictionary<string, string> Operators { get; private set; }
    }
}
