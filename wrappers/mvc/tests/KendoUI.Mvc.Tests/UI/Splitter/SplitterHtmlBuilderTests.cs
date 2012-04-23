namespace Telerik.Web.Mvc.UI.Html.Tests
{
    using Telerik.Web.Mvc.UI.Tests;
    using Telerik.Web.Mvc.UI.Tests.Extensions;
    using Xunit;

    public class SplitterHtmlBuilderTests
    {
        private readonly Splitter splitter;
        private readonly SplitterPane pane;
        private readonly SplitterHtmlBuilder builder;

        public SplitterHtmlBuilderTests()
        {
            splitter = SplitterTestHelper.CreateSplitter();
            pane = new SplitterPane();
            builder = new SplitterHtmlBuilder(splitter);
        }

        [Fact]
        public void CreateSplitter_outputs_div()
        {
            builder.CreateSplitter().TagName.ShouldEqual("div");
        }

        [Fact]
        public void CreateSplitter_sets_id()
        {
            const string id = "mySplitter";

            splitter.Name = id;

            builder.CreateSplitter().Attribute("id").ShouldEqual(id);
        }

        [Fact]
        public void CreateSplitter_applies_HtmlAttributes()
        {
            splitter.HtmlAttributes.Add("foo", "bar");

            builder.CreateSplitter().Attribute("foo").ShouldEqual("bar");
        }

        [Fact]
        public void CreateSplitter_outputs_necessary_classes()
        {
            builder.CreateSplitter().ShouldHaveClasses(UIPrimitives.Widget, UIPrimitives.Splitter.Horizontal);
        }

        [Fact]
        public void CreateSplitter_honors_orientation()
        {
            splitter.Orientation = SplitterOrientation.Vertical;

            builder.CreateSplitter()
                .ShouldHaveClasses(UIPrimitives.Widget, UIPrimitives.Splitter.Vertical)
                .ShouldNotHaveClass(UIPrimitives.Splitter.Horizontal);
        }

        [Fact]
        public void CreatePane_outputs_div()
        {
            builder.CreatePane(pane).TagName.ShouldEqual("div");
        }

        [Fact]
        public void CreatePane_applies_HtmlAttributes()
        {
            pane.HtmlAttributes.Add("foo", "bar");

            builder.CreatePane(pane).Attribute("foo").ShouldEqual("bar");
        }

        [Fact]
        public void CreatePane_outputs_pane_class()
        {
            builder.CreatePane(pane).ShouldHaveClasses(UIPrimitives.Splitter.Pane);
        }

        [Fact]
        public void CreatePane_outputs_scrollable_class_if_pane_is_scrollable()
        {
            pane.Scrollable = true;

            builder.CreatePane(pane).ShouldHaveClasses(UIPrimitives.Scrollable);
        }

        [Fact]
        public void CreatePane_does_not_output_scrollable_class_if_pane_is_not_scrollable()
        {
            pane.Scrollable = false;

            builder.CreatePane(pane).ShouldNotHaveClasses(UIPrimitives.Scrollable);
        }

        [Fact]
        public void CreatePane_outputs_content()
        {
            const string templateHtml = "<strong>foo</strong>";

            pane.Template.Html = templateHtml;

            builder.CreatePane(pane).InnerHtml.ShouldEqual(templateHtml);
        }
    }
}
