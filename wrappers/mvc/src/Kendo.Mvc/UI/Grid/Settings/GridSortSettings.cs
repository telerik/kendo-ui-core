namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.Linq;

    public class GridSortSettings
    {
        private readonly IGrid grid;

        public GridSortSettings(IGrid grid)
        {
            this.grid = grid;
            
            OrderBy = new List<SortDescriptor>();

            AllowUnsort = true;
        }

        public bool Enabled
        {
            get;
            set;
        }

        public GridSortMode SortMode
        {
            get;
            set;
        }

        public bool AllowUnsort
        {
            get;
            set;
        }

        public IList<SortDescriptor> OrderBy
        {
            get;
            private set;
        }
    }
}