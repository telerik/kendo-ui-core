// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Globalization;
    using System.Linq;
    using Telerik.Web.Mvc.Infrastructure;
    using System.Collections.Generic;

    public class GridPagingSettings : IClientSerializable
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

        public void SerializeTo(string key, IClientSideObjectWriter writer)
        {
            if (Enabled)
            {
                writer.Append("pageSize", PageSize, 10);
                writer.Append("total", grid.DataProcessor.Total);
                writer.Append("currentPage", grid.DataProcessor.CurrentPage);
                writer.AppendCollection("pageSizesInDropDown", PageSizesInDropDown.Select(v => v.ToString(CultureInfo.InvariantCulture)));

                writer.Append("pageOnScroll", PageOnScroll);
                if (grid.IsClientBinding && PageOnScroll)
                {
                    if (!grid.IsEmpty)
                    {
                        var dataTableEnumerable = grid.DataSource as GridDataTableWrapper;
                        if (dataTableEnumerable != null && dataTableEnumerable.Table != null)
                        {
                            writer.AppendCollection("data",
                                                    grid.DataProcessor.ProcessedDataSource.SerializeToDictionary(
                                                        dataTableEnumerable.Table));

                        }
                        else if (grid.DataProcessor.ProcessedDataSource is IQueryable<AggregateFunctionsGroup>)
                        {
                            IEnumerable<IGroup> grouppedDataSource = grid.DataProcessor.ProcessedDataSource.Cast<IGroup>();
                            writer.AppendCollection("data", grouppedDataSource.Leaves());
                        }
                        else
                        {
                            writer.AppendCollection("data", grid.DataProcessor.ProcessedDataSource);
                        }
                    }
                }                
            }
            else
            {
                writer.Append("pageSize", 0);
            }
        }
    }
}