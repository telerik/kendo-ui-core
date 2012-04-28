namespace KendoUI.Mvc.UI
{
    using System.Collections.Generic;
    using System.Linq;

    public class GridToolBarSettings<T> where T : class
    {
        public GridToolBarSettings(Grid<T> grid)
        {
            Commands = new List<GridActionCommandBase>();
            Grid = grid;
            Template = new HtmlTemplate();
        }

        public GridToolBarPosition Position
        {
            get;
            set;
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
    }
}