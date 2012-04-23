// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    using System.ComponentModel;

    using Infrastructure;

    public class GridSortDescriptorBuilder
    {
        public GridSortDescriptorBuilder(SortDescriptor descriptor)
        {
            Guard.IsNotNull(descriptor, "descriptor");

            Descriptor = descriptor;
        }

        protected SortDescriptor Descriptor { get; private set; }

        public virtual void Ascending()
        {
            Descriptor.SortDirection = ListSortDirection.Ascending;
        }

        public virtual void Descending()
        {
            Descriptor.SortDirection = ListSortDirection.Descending;
        }

        public virtual void Order(ListSortDirection direction)
        {
            Descriptor.SortDirection = direction;
        }
    }
}