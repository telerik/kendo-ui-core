namespace Telerik.Web.Mvc.UI.Tests.Grid
{
    using System.Collections;
    using System.Collections.Generic;
    using System.Web.Mvc;

    using Xunit;

    public class GridActionBindingContextTests
    {
        private readonly GridActionBindingContext bindingContext;
        private readonly IDictionary<string, ValueProviderResult> valueProvider;
        private readonly IEnumerable dataSource;

        public GridActionBindingContextTests()
        {
            valueProvider = new Dictionary<string, ValueProviderResult>();
            dataSource = new object[]{};
            bindingContext = new GridActionBindingContext(false, new ControllerTestDouble(valueProvider, new ViewDataDictionary()), dataSource, 0);
        }

        [Fact]
        public void PageSize_is_determined_from_page_size_parameter_name()
        {
            valueProvider.Add(GridUrlParameters.PageSize, 2);

            Assert.Equal(2, bindingContext.PageSize);
        }

        [Fact]
        public void PageSize_returns_zero_if_page_is_not_passed()
        {
            Assert.Equal(0, bindingContext.PageSize);
        }

        [Fact]
        public void DataSource_returns_data_pointed_by_the_result()
        {
            Assert.Same(dataSource, bindingContext.DataSource);
        }

        [Fact]
        public void Should_prefix()
        {
            Assert.Equal("test", bindingContext.Prefix("test"));
        }
    }
}