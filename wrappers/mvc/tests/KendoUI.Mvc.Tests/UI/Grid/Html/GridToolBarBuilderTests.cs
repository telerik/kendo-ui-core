// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html.Tests
{
    using System.Linq;
    using Infrastructure;
    using Moq;
    using UI.Tests;
    using Xunit;

    public class GridToolBarBuilderTests
    {
        private readonly GridToolBarBuilder builder;

        public GridToolBarBuilderTests()
        {
            builder = new GridToolBarBuilder();
        }

        [Fact]
        public void Should_call_all_button_builders()
        {
            const int builderCount = 3;
            var buttonBuilder = new Mock<IGridButtonBuilder>();
            buttonBuilder.Setup(bb => bb.Create(It.IsAny<object>()))
                         .Returns(new HtmlElement("button"))
                         .AtMost(builderCount);

            var buttonBuilders = Enumerable.Repeat(buttonBuilder.Object, builderCount);

            builder.CreateToolBar(buttonBuilders);

            buttonBuilder.Verify();
        }

        [Fact]
        public void Should_append_template_if_such_exists()
        {
            const string templateValue = "foo";

            var node = builder.CreateToolBar(new HtmlTemplate {Html = templateValue});

            node.InnerHtml.ShouldEqual(templateValue);
        }

        [Fact]
        public void Should_create_div()
        {
            var toolBar = builder.CreateToolBar(Enumerable.Empty<IGridButtonBuilder>());

            toolBar.TagName.ShouldEqual("div");
            toolBar.Attribute("class").ShouldContain(UIPrimitives.ToolBar);
            toolBar.Attribute("class").ShouldContain(UIPrimitives.Grid.ToolBar);
        }
    }
}