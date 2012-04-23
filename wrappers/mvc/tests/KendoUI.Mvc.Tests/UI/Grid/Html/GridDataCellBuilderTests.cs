

namespace KendoUI.Mvc.UI.Html
{
    using KendoUI.Mvc.Extensions;
    using KendoUI.Mvc.UI.Tests;
    using Xunit;

    public class GridDataCellBuilderTests
    {
        private readonly Customer customer;
        
        public GridDataCellBuilderTests()
        {
            customer = new Customer();
        }

        [Fact]
        public void Should_return_td()
        {
            var builder = ArrangeBuilderForAddress();

            customer.Address = "foo";
            
            builder.CreateCell(customer).TagName.ShouldEqual("td");
        }
        
        [Fact]
        public void Should_not_encode_content()
        {
            var builder = ArrangeBuilderForAddress();

            customer.Address = "<";
            
            builder.Encoded = false;

            builder.CreateCell(customer).InnerHtml.ShouldEqual(customer.Address);
        }

        [Fact]
        public void Should_encode_content_if_encoded_is_true()
        {
            var builder = ArrangeBuilderForAddress();

            customer.Address = "<";

            builder.Encoded = true;

            builder.CreateCell(customer).InnerHtml.ShouldEqual("&lt;");
        }

        [Fact]
        public void Should_output_nbsp_if_value_is_null()
        {
            var builder = ArrangeBuilderForAddress();

            builder.CreateCell(customer).InnerHtml.ShouldEqual("&nbsp;");
        }

        [Fact]
        public void Should_apply_format()
        {
            var builder = ArrangeBuilderForAddress();

            builder.Format = "[{0}]";
            customer.Address = "foo";

            builder.CreateCell(customer).InnerHtml.ShouldEqual("[foo]");
        }

        [Fact]
        public void Should_append_html_attributes()
        {
            var builder = ArrangeBuilderForAddress();

            builder.HtmlAttributes.Merge(new { foo = "bar" });

            builder.CreateCell(customer).Attribute("foo").ShouldEqual("bar");
        }

        [Fact]
        public void Should_output_nbsp_if_dataItem_is_null()
        {
            var builder = ArrangeBuilderForAddress();

            builder.CreateCell(null).InnerHtml.ShouldEqual("&nbsp;");
        }
        
        [Fact]
        public void Should_output_zero()
        {
            var builder = new GridDataCellBuilder<Customer, int>
            {
                Value = c => c.Id,
                Callback = delegate { }
            };

            customer.Id = 0;

            builder.CreateCell(customer).InnerHtml.ShouldEqual("0");
        }

        private GridDataCellBuilder<Customer, string> ArrangeBuilderForAddress()
        {
            return new GridDataCellBuilder<Customer, string>
            {
                Value = c => c.Address,
                Callback = delegate { }
            };
        }
    }
}
