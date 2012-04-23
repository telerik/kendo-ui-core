// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Collections;
    using System.Collections.Generic;
    using System.Web.Mvc;
    
    public class GridActionBindingContext : IGridBindingContext
    {
        public GridActionBindingContext(bool enableCustomBinding, ControllerBase controller, IEnumerable dataSource, int total)
        {
            EnableCustomBinding = enableCustomBinding;
            Controller = controller;
            DataSource = dataSource;
            Total = total;
            SortDescriptors = new List<SortDescriptor>();
            GroupDescriptors = new List<GroupDescriptor>();
            FilterDescriptors = new List<CompositeFilterDescriptor>();
            Aggregates = new List<AggregateDescriptor>();
            CurrentPage = 1;
        }

        public bool EnableCustomBinding
        {
            get;
            private set;
        }

        public IEnumerable DataSource
        {
            get;
            set;
        }

        public IList<SortDescriptor> SortDescriptors
        {
            get;
            private set;
        }

        public int CurrentPage
        {
            get;
            private set;
        }

        public IList<CompositeFilterDescriptor> FilterDescriptors
        {
            get;
            private set;
        }

        public IList<GroupDescriptor> GroupDescriptors
        {
            get;
            private set;
        }

        public int PageSize
        {
            get 
            {
                return this.GetGridParameter<int>(GridUrlParameters.PageSize); 
            }
        }

        public ControllerBase Controller
        {
            get;
            private set;
        }

        public int Total
        {
            get;
            set;
        }

        public string Prefix(string parameter)
        {
            return parameter;
        }

        public IEnumerable<AggregateDescriptor> Aggregates
        {
            get;
            private set;
        }
    }
}