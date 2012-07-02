using System;
using System.Collections.Generic;
using System.Linq;
using Kendo.Mvc.Resources;

namespace Kendo.Mvc.UI
{
    public class EnumOperators : JsonObject
    {
        public EnumOperators()
        {
            Operators = new Dictionary<string, string>()
            {
                { "eq", Messages.Filter_EnumIsEqualTo },
                { "neq", Messages.Filter_EnumIsNotEqualTo }               
            };
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            bool dirty = false;

            if (Operators.Count != DefaultDateOfFilters)
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

            if (dirty)
            {
                foreach (var keyValue in Operators)
                {
                    json[keyValue.Key] = keyValue.Value;
                }
            }
        }

        public IDictionary<string, string> Operators { get; private set; }

        private const int DefaultDateOfFilters = 2;

        private const string DefaultIsEqualTo = "Is equal to";
        private const string DefaultIsNotEqualTo = "Is not equal to";        
    }
}
