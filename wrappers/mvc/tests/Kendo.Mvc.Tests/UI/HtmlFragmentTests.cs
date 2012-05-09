namespace Kendo.Mvc.UI.Tests
{
    using Kendo.Mvc.Infrastructure;
    using Xunit;

    public class HtmlFragmentTests
    {
        [Fact]
        public void Should_render_as_empty_if_no_children()
        {
            var fragment = new HtmlFragment();

            fragment.InnerHtml.ShouldBeEmpty();
        }

        [Fact]
        public void Should_render_only_its_children()
        {
            var fragment = new HtmlFragment();
            fragment.Children.Add(new HtmlElement("a"));

            fragment.ToString().ShouldEqual("<a></a>");
        }

        [Fact]
        public void Should_append_to_container()
        {
            var fragment = new HtmlFragment();
            var container = new HtmlElement("div");
            
            fragment.AppendTo(container);

            container.Children[0].ShouldBeSameAs(fragment);
        }
    }
}
