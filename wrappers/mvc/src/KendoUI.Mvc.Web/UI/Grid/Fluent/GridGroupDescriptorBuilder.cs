namespace KendoUI.Mvc.UI.Fluent
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
