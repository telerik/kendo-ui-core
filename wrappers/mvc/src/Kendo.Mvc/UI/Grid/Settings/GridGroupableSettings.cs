namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public class GridGroupableSettings : JsonObject
    {
        public GridGroupableSettings()
        {
            Groups = new List<GroupDescriptor>();
            Visible = true;
            Messages = new GroupableMessages();
        }

        public bool Enabled { get; set; }

        public bool Visible { get; set; }

        public bool ShowFooter { get; set; }

        public IList<GroupDescriptor> Groups { get; private set; }
        
        public GroupableMessages Messages { get; private set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            var messages = Messages.ToJson();

            if (messages.Keys.Any())
            {
                json["messages"] = messages;
            }

            if (ShowFooter)
            {
                json["showFooter"] = ShowFooter;
            }
        }
    }
}