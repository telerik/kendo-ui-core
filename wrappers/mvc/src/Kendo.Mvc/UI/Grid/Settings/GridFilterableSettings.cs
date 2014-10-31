using System.Linq;

namespace Kendo.Mvc.UI
{
    public class GridFilterableSettings : JsonObject
    {
        public GridFilterableSettings()
        {
            Extra = true;
            Mode = GridFilterMode.Menu;
            Messages = new FilterableMessages();
            Operators = new FilterableOperators();
        }

        public bool Enabled { get; set; }

        public bool Extra { get; set; }

        public GridFilterMode Mode { get; set; }

        public FilterableMessages Messages { get; private set; }

        public FilterableOperators Operators { get; set; }

        protected override void Serialize(System.Collections.Generic.IDictionary<string, object> json)
        {
            if (!Extra)
            {
                json["extra"] = false;
            }

            if (Mode == (GridFilterMode.Row | GridFilterMode.Menu))
            {
                json["mode"] = "menu, row";
            }
            else if (Mode != GridFilterMode.Menu)
            {
                json["mode"] = Mode;
            }

            var messages = Messages.ToJson();

            if (messages.Any())
            {
                json["messages"] = messages;
            }

            var operators = Operators.ToJson();

            if (operators.Any())
            {
                json["operators"] = operators;
            }
        }
    }
}