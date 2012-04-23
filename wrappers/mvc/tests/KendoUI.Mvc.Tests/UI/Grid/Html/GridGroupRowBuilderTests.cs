// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html.Tests
{
    using System.Linq;
    using Html;
    using Xunit;
    using Extensions;

    public class GridGroupRowBuilderTests
    {
        private const int Colspan = 2;
        private readonly GridGroupRowBuilder builder;

        public GridGroupRowBuilderTests()
        {
            builder = new GridGroupRowBuilder(delegate { }, Colspan);
        }

        [Fact]
        public void Should_render_tr()
        {
            builder.CreateRow().TagName.ShouldEqual("tr");
        }

        [Fact]
        public void Should_render_td_as_first_child_node()
        {
            builder.CreateRow().Children.First().TagName.ShouldEqual("td");
        }

        [Fact]
        public void Should_render_p_as_first_child_of_inner_td_node()
        {
            builder.CreateRow().Children.First()
                               .Children.First()
                               .TagName.ShouldEqual("p");
        }

        [Fact]
        public void Should_inner_p_node_should_have_css_class_applied()
        {
            builder.CreateRow().Children.First()
                               .Children.First()
                               .Attribute("class")
                               .ShouldEqual(UIPrimitives.ResetStyle);
        }

        [Fact]
        public void Should_render_button_as_td_child()
        {
            builder.CreateRow().Children.SelectRecursive(node => node.Children)
                .Any(n => n.TagName == "a" && n.Attribute("class").Split(' ').Contains("t-collapse")).ShouldBeTrue();
        }

        [Fact]
        public void Should_set_colspan_to_td()
        {
            builder.CreateRow().Children.First()
                               .Attribute("colspan")
                               .ShouldEqual(Colspan.ToString());
        }
    }
}