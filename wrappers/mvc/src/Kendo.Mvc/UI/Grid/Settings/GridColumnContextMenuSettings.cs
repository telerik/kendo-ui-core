namespace Kendo.Mvc.UI
{
    public class GridColumnContextMenuSettings
    {
        private readonly IGrid grid;

        public GridColumnContextMenuSettings(IGrid grid)
        {
            this.grid = grid;                        
        }

        public bool Enabled
        {
            get;
            set;
        }        
    }
}
