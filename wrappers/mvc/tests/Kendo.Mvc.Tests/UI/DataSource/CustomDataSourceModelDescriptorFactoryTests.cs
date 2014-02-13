namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Tests;
    using Xunit;

    public class CustomDataSourceModelDescriptorFactoryTests
    {
        private readonly CustomDataSourceModelDescriptorFactory<Customer> builder;
        private readonly ModelDescriptor descriptor;

        public CustomDataSourceModelDescriptorFactoryTests()
        {
            descriptor = new ModelDescriptor(typeof(Customer));
            builder = new CustomDataSourceModelDescriptorFactory<Customer>(descriptor);
        }

        [Fact]
        public void ClearFields_should_clear_generated_fields()
        {
            builder.ClearFields();

            descriptor.Fields.Count.ShouldEqual(0);
        }
    }
}
