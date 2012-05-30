namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    public class GridCommandColumnSettings: GridColumnSettings
    {
        public GridCommandColumnSettings()
        {
            Commands = new List<GridActionCommandBase>();
        }

        public IList<GridActionCommandBase> Commands
        {
            get;
            private set;
        }
    }
}
