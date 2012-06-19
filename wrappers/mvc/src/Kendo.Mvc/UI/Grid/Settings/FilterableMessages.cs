using System;
using System.Collections.Generic;
using System.Linq;
using Kendo.Mvc.Resources;

namespace Kendo.Mvc.UI
{
    public class FilterableMessages : JsonObject
    {
        public FilterableMessages()
        {
            Info = Messages.Filter_Info;
            IsTrue = Messages.Filter_IsTrue;
            IsFalse = Messages.Filter_IsFalse;
            Filter = Messages.Filter_Filter;
            Clear = Messages.Filter_Clear;
            And = Messages.Filter_And;
            Or = Messages.Filter_Or;
        }

        public string Info { get; set; }
        public string IsTrue { get; set; }
        public string IsFalse { get; set; }
        public string Filter { get; set; }
        public string Clear { get; set; }
        public string And { get; set; }
        public string Or { get; set; }

        private const string DefaultInfo = "Show items with value that:";
        private const string DefaultIsTrue = "is true";
        private const string DefaultIsFalse = "is false";
        private const string DefaultFilter = "Filter";
        private const string DefaultClear = "Clear";
        private const string DefaultAnd = "And";
        private const string DefaultOr = "Or";

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Info != DefaultInfo)
            {
                json["info"] = Info;
            }

            if (IsTrue != DefaultIsTrue)
            {
                json["isTrue"] = IsTrue;
            }

            if (IsFalse != DefaultIsFalse)
            {
                json["isFalse"] = IsFalse;
            }

            if (Filter != DefaultFilter)
            {
                json["filter"] = Filter;
            }

            if (Clear != DefaultClear)
            {
                json["clear"] = Clear;
            }

            if (And != DefaultAnd)
            {
                json["and"] = And;
            }

            if (Or != DefaultOr)
            {
                json["or"] = Or;
            }
        }
    }
}
