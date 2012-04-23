// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Collections;
    using System.Collections.Generic;
    using System.Web.Mvc;

    public interface IGridBindingContext
    {
        IEnumerable DataSource
        {
            get;
        }

        int CurrentPage
        {
            get;
        }

        int PageSize
        {
            get;
        }

        int Total
        {
            get;
        }

        bool EnableCustomBinding
        {
            get;
        }

        ControllerBase Controller
        {
            get;
        }

        IList<GroupDescriptor> GroupDescriptors
        {
            get;
        }

        IList<SortDescriptor> SortDescriptors
        {
            get;
        }

        IList<CompositeFilterDescriptor> FilterDescriptors
        {
            get;
        }

        IEnumerable<AggregateDescriptor> Aggregates
        {
            get;
        }

        string Prefix(string parameter);
    }
}