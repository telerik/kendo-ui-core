namespace KendoUI.Mvc.UI.Fluent
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