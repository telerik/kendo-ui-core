using System.Linq;

namespace Kendo.Mvc.UI
{
    public class GridColumnMenuSettings : JsonObject
    {
        public GridColumnMenuSettings()
        {
            Sortable = true;
            Filterable = true;
            Columns = true;
            Messages = new ColumnMenuMessages();            
        }

        public bool Enabled { get; set; }

        public bool Sortable { get; set; }

        public bool Filterable { get; set; }

        public bool Columns { get; set; }

        public ColumnMenuMessages Messages { get; private set; }
        

        protected override void Serialize(System.Collections.Generic.IDictionary<string, object> json)
        {
            var messages = Messages.ToJson();

            if (messages.Any())
            {
                json["messages"] = messages;
            }

            if (!Sortable)
            {
                json["sortable"] = false;
            }

            if (!Filterable)
            {
                json["filterable"] = false;
            }

            if (!Columns)
            {
                json["columns"] = false;
            }
        }
    }
}