namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.Linq;
    using Extensions;

    public class GridToolBarSettings<T> : JsonObject
        where T : class
    {
        public GridToolBarSettings(Grid<T> grid)
        {
            Commands = new List<GridActionCommandBase>();
            Grid = grid;
            Template = new HtmlTemplate();
        }

        public Grid<T> Grid
        {
            get;
            private set;
        }

        public bool Enabled
        {
            get
            {
                return Commands.Any() || Template.HasValue();
            }
        }

        public IList<GridActionCommandBase> Commands
        {
            get;
            private set;
        }

        public HtmlTemplate Template
        {
            get;
            private set;
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            var commands = new List<IDictionary<string, object>>();

            Commands.Each(command =>
            {
                commands.Add(command.Serialize(Grid.UrlBuilder));
            });

            if (commands.Any())
            {
                json["command"] = commands;
            }
        }
    }
}