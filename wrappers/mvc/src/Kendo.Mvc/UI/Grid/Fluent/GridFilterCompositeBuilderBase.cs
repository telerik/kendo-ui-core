namespace Kendo.Mvc.UI.Fluent
{
    using Infrastructure;

    public abstract class GridFilterCompositeBuilderBase : IHideObjectMembers
    {
        protected GridFilterCompositeBuilderBase(CompositeFilterDescriptor descriptor)
        {
            Guard.IsNotNull(descriptor, "descriptor");

            Descriptor = descriptor;
        }

        protected CompositeFilterDescriptor Descriptor { get; private set; }
    }
}