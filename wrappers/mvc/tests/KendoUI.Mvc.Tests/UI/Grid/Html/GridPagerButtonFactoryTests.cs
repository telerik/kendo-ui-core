// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html.Tests
{
    using Xunit;

    public class GridPagerButtonFactoryTests
    {
        private readonly GridPagerButtonFactory buttonFactory;

        public GridPagerButtonFactoryTests()
        {
            buttonFactory = new GridPagerButtonFactory();
        }

        [Fact]
        public void Should_create_icon_button()
        {
            const string text = "foo";
            const bool enabled = true;
            const string url = "url";

            var button = buttonFactory.CreateButton(GridPagerButtonType.Icon, text, enabled, url);

            button.TagName.ShouldEqual("a");
            button.Attribute("href").ShouldEqual(url);
            button.Children[0].InnerHtml.ShouldEqual(text);
            button.Attribute("class").ShouldNotContain(UIPrimitives.DisabledState);
        }

        [Fact]
        public void Should_add_disabled_css_class_to_icon_button()
        {
            const string text = "foo";
            const bool enabled = false;
            const string url = "url";

            var button = buttonFactory.CreateButton(GridPagerButtonType.Icon, text, enabled, url);

            button.Attribute("class").ShouldContain(UIPrimitives.DisabledState);
        }

        [Fact]
        public void Should_create_numeric_button()
        {
            const string text = "foo";
            const bool enabled = true;
            const string url = "url";

            var button = buttonFactory.CreateButton(GridPagerButtonType.NumericLink, text, enabled, url);

            button.TagName.ShouldEqual("a");
            button.Attribute("href").ShouldEqual(url);
            button.InnerHtml.ShouldEqual(text);
            button.Attribute("class").ShouldContain(UIPrimitives.Link);
            button.Attribute("class").ShouldNotContain(UIPrimitives.ActiveState);
        }

        [Fact]
        public void Should_add_disabled_css_class_to_numeric_button()
        {
            const string text = "foo";
            const bool enabled = false;
            const string url = "url";

            var button = buttonFactory.CreateButton(GridPagerButtonType.NumericLink, text, enabled, url);

            button.Attribute("class").ShouldContain(UIPrimitives.ActiveState);
            button.Attributes().ContainsKey("href").ShouldBeFalse();
        }
    }
}