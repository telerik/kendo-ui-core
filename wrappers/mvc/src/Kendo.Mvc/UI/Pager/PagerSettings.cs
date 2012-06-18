using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    public class PagerSettings : JsonObject
    {
        public PagerSettings()
        {
            Messages = new PagerMessages();
            Numeric = true;
            Info = true;
            PreviousNext = true;
        }

        public bool AutoBind { get; set; }

        public PagerMessages Messages { get; private set; }

        public bool Numeric { get; set; }

        public bool Info { get; set; }

        public bool Input { get; set; }

        public bool PreviousNext { get; set; }

        public bool Enabled { get; set; }

        public bool Refresh { get; set; }

        public int[] PageSizes { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (!AutoBind)
            {
                json["autoBind"] = AutoBind;
            }

            if (Input)
            {
                json["input"] = Input;
            }

            if (!Numeric)
            {
                json["numeric"] = Numeric;
            }

            if (!Info)
            {
                json["info"] = Info;
            }

            if (!PreviousNext)
            {
                json["previousNext"] = PreviousNext;
            }

            if (Refresh)
            {
                json["refresh"] = Refresh;
            }

            if (PageSizes != null && PageSizes.Length > 0)
            {
                json["pageSizes"] = PageSizes;
            }

            var messages = Messages.ToJson();

            if (messages.Keys.Any())
            {
                json["messages"] = messages;
            }
        }
    }
}