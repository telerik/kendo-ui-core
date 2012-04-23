// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Collections.Generic;
    using System.Linq;
    
    class GridPluginSerializer
    {
        private readonly IGrid grid;

        public GridPluginSerializer(IGrid grid)
        {
            this.grid = grid;
        }

        public IEnumerable<string> Serialize()
        {
            var result = new List<string>();

            if (grid.Grouping.Enabled)
            {
                result.Add("grouping");
            }

            if (grid.Editing.Enabled)
            {
                result.Add("editing");
            }

            if (grid.Filtering.Enabled)
            {
                result.Add("filtering");
            }

            if (grid.Resizing.Enabled)
            {
                result.Add("resizing");
            }            
            
            if (grid.Reordering.Enabled)
            {
                result.Add("reordering");
            }
            
            return result;
        }
        
        public void SerializeTo(IClientSideObjectWriter writer)
        {
            var result = Serialize();
            if (result.Any())
            {
                writer.AppendCollection("plugins", result);
            }
        }
    }
}
