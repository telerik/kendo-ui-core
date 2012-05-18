namespace Kendo.Mvc.UI.Fluent
{
    using Infrastructure;

    public abstract class DataSourceFilterCompositeBuilderBase : IHideObjectMembers
    {
        protected DataSourceFilterCompositeBuilderBase(CompositeFilterDescriptor descriptor)
        {
            Guard.IsNotNull(descriptor, "descriptor");

            Descriptor = descriptor;
        }

        protected CompositeFilterDescriptor Descriptor { get; private set; }
    }
}