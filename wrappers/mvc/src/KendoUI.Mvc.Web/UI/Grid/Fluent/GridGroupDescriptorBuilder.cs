// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    public class GridGroupDescriptorBuilder<T>
        where T : class
    {
        private readonly GroupDescriptor descriptor;
        
        public GridGroupDescriptorBuilder(GroupDescriptor descriptor)
        {
            this.descriptor = descriptor;
        }
    }
}
