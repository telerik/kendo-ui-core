namespace Kendo.Mvc.UI.Fluent
{
    using Infrastructure;

    public abstract class DataSourceFilterCompositeBuilderBase : IHideObjectMembers
    {
        protected DataSourceFilterCompositeBuilderBase(CompositeFilterDescriptor descriptor)
        {

            Descriptor = descriptor;
        }

        protected CompositeFilterDescriptor Descriptor { get; private set; }
    }
}