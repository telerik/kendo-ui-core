namespace Kendo.Mvc.UI.Html.Tests
{
    using Kendo.Mvc.UI.Tests;
    using Kendo.Mvc.UI.Tests.Chart;
    using Xunit;

    public class ListViewHtmlBuilderTests
    {
        private readonly ListView<Customer> listView;
        private readonly ListViewHtmlBuilder<Customer> builder;

        public ListViewHtmlBuilderTests()
        {
            listView = ListViewTestHelper.CreateListView<Customer>();
            builder = new ListViewHtmlBuilder<Customer>(listView);
        }

        [Fact]
        public void Build_should_output_listview_wrapper_as_first_child()
        {
            var html = builder.Build();

            Assert.Equal(1, html.Children.Count);
            html.Children[0].TagName.ShouldEqual("div");            
        }

        [Fact]
        public void Build_should_output_specified_listview_wrapper_element()
        {
            listView.TagName = "span";
            var html = builder.Build();

            Assert.Equal(1, html.Children.Count);
            html.Children[0].TagName.ShouldEqual("span");
        }

        [Fact]
        public void Build_should_output_listview_pager_as_second_child()
        {
            listView.Paging.Enabled = true;
            var html = builder.Build();

            Assert.Equal(2, html.Children.Count);
            html.Children[1].TagName.ShouldEqual("div");            
        }

        [Fact]
        public void Build_should_output_listview_pager_with_id()
        {
            listView.Name = "foo";
            listView.Paging.Enabled = true;
            var html = builder.Build();

            html.Children[1].Children[0].Attribute("id").ShouldEqual("foo_pager");
        }       
    }
}
