

namespace KendoUI.Mvc.UI
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