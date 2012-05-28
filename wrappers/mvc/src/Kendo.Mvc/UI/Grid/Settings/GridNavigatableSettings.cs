namespace Kendo.Mvc.UI
{
    public class GridNavigatableSettings
    {
        private readonly IGrid grid;

        public GridNavigatableSettings(IGrid grid)
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
