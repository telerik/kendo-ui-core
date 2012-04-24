#if MVC2 || MVC3
namespace KendoUI.Mvc.UI.Html.Tests
{
    using System;
    using KendoUI.Mvc.Extensions;
    using KendoUI.Mvc.UI.Tests;
    using Xunit;

    public class GridEditorForCellBuilderTests : IDisposable
    {
        private readonly MockViewEngine viewEngine;
        private readonly Customer customer;

        public GridEditorForCellBuilderTests()
        {
            viewEngine = new MockViewEngine();
            customer = new Customer();
        }

        [Fact]
        public void Should_create_editor()
        {
            var builder = ArrangeBuilderForAddress();
            customer.Address = "foo";

            var td = builder.CreateCell(customer);

            td.Children[0].InnerHtml.ShouldEqual(@"<input class=""text-box single-line"" id=""Address"" name=""Address"" type=""text"" value=""foo"" />");
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

        private GridEditorForCellBuilder<Customer, string> ArrangeBuilderForAddress()
        {
            return new GridEditorForCellBuilder<Customer, string>
            {
                Expression = c => c.Address,
                ViewContext = TestHelper.CreateViewContext(),
                Callback = delegate { }
            };
        }
    }
}
#endif