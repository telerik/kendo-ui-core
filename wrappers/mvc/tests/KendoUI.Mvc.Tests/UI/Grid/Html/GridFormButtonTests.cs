// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html.Tests
{
    using Moq;
    using System.Linq;
    using Telerik.Web.Mvc.Infrastructure;
    using Xunit;

    public class GridFormButtonTests
    {
        private readonly GridFormButtonBuilder button;
        private readonly Mock<IGridHtmlHelper> htmlHelper;

        public GridFormButtonTests()
        {
            button = new GridFormButtonBuilder();
            button.Url = (o) => null;
            
            htmlHelper = new Mock<IGridHtmlHelper>();
            htmlHelper.Setup(h=> h.HiddenForDataKey(It.IsAny<object>())).Returns(new HtmlElement("input"));
            button.HtmlHelper = htmlHelper.Object;
        }

        [Fact]
        public void Should_create_form_tag()
        {
            var result = button.Create(null);

            result.TagName.ShouldEqual("form");
        }

        [Fact]
        public void Should_have_grid_actions_class()
        {
            var result = button.Create(null);

            result.Attribute("class").ShouldEqual(UIPrimitives.Grid.ActionForm);
        }
        
        [Fact]
        public void Should_set_method_to_post()
        {
            var result = button.Create(null);

            result.Attribute("method").ShouldEqual("post");
        }

        [Fact]
        public void Should_set_action_from_url()
        {
            button.Url = (o) => o.ToString();

            var result = button.Create("foo");
            result.Attribute("action").ShouldEqual("foo");
        }

        [Fact]
        public void Should_add_div_inside_form()
        {
            var result = button.Create(null);
            result.Children.Count.ShouldEqual(1);
            result.Children[0].TagName.ShouldEqual("div");
        }

        [Fact]
        public void Should_create_button_inside_div()
        {
            var result = button.Create(null);
            result.Children.Count.ShouldEqual(1);
            result.Children.Last().TagName.ShouldEqual("div");
        }

        [Fact]
        public void Should_create_hidden_fields_for_data_keys()
        {
            button.ShouldAppendDataKeys = true;
            button.Create(null);
            htmlHelper.VerifyAll();
        }
    }
}
