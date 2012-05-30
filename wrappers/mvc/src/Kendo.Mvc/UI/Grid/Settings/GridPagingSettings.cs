namespace Kendo.Mvc.UI
{
    using System.Linq;
    using Kendo.Mvc.Infrastructure;

    public class GridPagingSettings
    {
        private readonly IGrid grid;

        private int total = 0;

        public GridPagingSettings(IGrid grid)
        {
            this.grid = grid;
            Style = GridPagerStyles.NextPreviousAndNumeric;
            PageSizesInDropDown = new[] {5, 10, 20, 50};            
        }
        
        public bool Enabled
        {
            get;
            set;
        }

        public GridPagerStyles Style
        {
            get;
            set;
        }

        public GridPagerPosition Position 
        { 
            get; 
            set; 
        }

        public int[] PageSizesInDropDown
        {
            get; set;
        }

        public int Total
        {
            get
            {
                return total;
            }
            set
            {

                total = value;
            }
        }
    }
}