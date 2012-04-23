namespace Telerik.Web.Mvc.Infrastructure.Tests
{
    using System;
    using Xunit;

    public class FilterDescriptorFactoryTests
    {
        [Fact]
        public void Should_create_filter_descriptor()
        {
            FilterDescriptor filterDescriptor = (FilterDescriptor)FilterDescriptorFactory.Create("age~eq~10")[0];
            Assert.Equal(FilterOperator.IsEqualTo, filterDescriptor.Operator);
            Assert.Equal("age", filterDescriptor.Member);
            Assert.Equal(10, Convert.ToInt32(filterDescriptor.Value));
        }

        [Fact]
        public void Should_return_empty_list_when_input_is_null()
        {
            Assert.Equal(0, FilterDescriptorFactory.Create(null).Count);
        }
    }
}
