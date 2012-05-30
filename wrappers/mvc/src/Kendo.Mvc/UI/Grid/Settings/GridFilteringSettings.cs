namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    public class GridFilteringSettings
    {
        public GridFilteringSettings()
        {
            Filters = new List<CompositeFilterDescriptor>();
        }

        public bool Enabled
        {
            get;
            set;
        }

        public bool ShowOrOption
        {
            get;
            set;
        }

        public IList<CompositeFilterDescriptor> Filters
        {
            get;
            private set;
        }
    }
}