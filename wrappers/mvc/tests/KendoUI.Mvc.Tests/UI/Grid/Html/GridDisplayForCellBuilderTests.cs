
#if MVC2 || MVC3
namespace KendoUI.Mvc.UI.Html.Tests
{
    using System;
    using KendoUI.Mvc.Extensions;
    using KendoUI.Mvc.UI.Tests;
    using Xunit;

    public class GridDisplayForCellBuilderTests : IDisposable
    {
        private readonly MockViewEngine viewEngine;
        private readonly Customer customer;

        public GridDisplayForCellBuilderTests()
        {
            viewEngine = new MockViewEngine();
            customer = new Customer();
        }

        [Fact]
        public void Should_use_display_for()
        {
            var builder = ArrangeBuilderForAddress();
            customer.Address = "foo";

            builder.CreateCell(customer).InnerHtml.ShouldEqual(customer.Address);
        }

        [Fact]
        public void Should_return_nbsp_if_data_item_is_null()
        {
            var builder = ArrangeBuilderForAddress();
            builder.CreateCell(null).InnerHtml.ShouldEqual("&nbsp;");
        }
        
        [Fact]
        public void Should_apply_html_attributes()
        {
            var builder = ArrangeBuilderForAddress();
            builder.HtmlAttributes.Merge(new { foo = "bar" });
            
            builder.CreateCell(customer).Attribute("foo").ShouldEqual("bar");
        }

        public void Dispose()
        {
            viewEngine.Dispose();
        }

        private GridDisplayForCellBuilder<Customer, string> ArrangeBuilderForAddress()
        {
            return new GridDisplayForCellBuilder<Customer, string>
            {
                Expression = c => c.Address,
                ViewContext = TestHelper.CreateViewContext(),
                Callback = delegate {}
            };
        }
    }
}
#endif