// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace KendoUI.Mvc.UI
{
    using System.Collections.Generic;
    using System.Linq;

    public class GridSortSettings : IClientSerializable
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

        public void SerializeTo(string key, IClientSideObjectWriter writer)
        {
            if (Enabled)
            {
                writer.Append("sortMode", SortMode == GridSortMode.MultipleColumn ? "multi" : "single");
                writer.Append("allowUnsort", AllowUnsort);
                if (grid.DataProcessor.SortDescriptors.Any())
                {
                    writer.Append("orderBy", GridDescriptorSerializer.Serialize(grid.DataProcessor.SortDescriptors));
                }
            }
        }
    }
}