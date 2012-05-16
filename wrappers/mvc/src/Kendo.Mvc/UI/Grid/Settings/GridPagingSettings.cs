namespace Kendo.Mvc.UI
{
    using System.Linq;
    using Kendo.Mvc.Infrastructure;

    public class GridPagingSettings
    {
        private readonly IGrid grid;

        private int pageSize = 10;
        private int total = 0;
        private bool pageOnScroll = false;

        public GridPagingSettings(IGrid grid)
        {
            this.grid = grid;
            Style = GridPagerStyles.NextPreviousAndNumeric;
            CurrentPage = 1;
            PageSizesInDropDown = new[] {5, 10, 20, 50};            
        }
        
        public int CurrentPage
        {
            get;
            set;
        }

        public bool Enabled
        {
            get;
            set;
        }

        public int PageSize 
        {
            get
            {
                return pageSize;
            }

            set
            {
                Guard.IsNotZeroOrNegative(value, "value");
                pageSize = value;
            }
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
                Guard.IsNotNegative(value, "value");

                total = value;
            }
        }

        public bool PageOnScroll
        {
            get
            {
                return pageOnScroll;
            }
            set
            {
                pageOnScroll = value;
                if (pageOnScroll)
                {
                    grid.Scrolling.Enabled = true;
                }
            }
        }
    }
}