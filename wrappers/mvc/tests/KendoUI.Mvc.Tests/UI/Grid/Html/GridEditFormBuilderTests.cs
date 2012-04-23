// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html.Tests
{
    using System;
    using System.Linq;
    using Infrastructure;
    using Moq;
    using Xunit;

    public class GridEditFormBuilderTests
    {
        [Fact]
        public void Should_call_formBuilder_result()
        {
            var formBuilder = new Mock<IGridFormBuilder>();
            formBuilder.Setup(fb => fb.CreateForm()).Returns(new HtmlElement("form")).Verifiable();
            var builder = new GridEditFormBuilder(formBuilder.Object, () => new HtmlElement("input"), Enumerable.Empty<Func<IHtmlNode>>());

            builder.CreateForm();

            formBuilder.Verify();
        }

        [Fact]
        public void Should_append_editors_to_the_form_container()
        {
            var formBuilder = new Mock<IGridFormBuilder>();
            var form = new HtmlElement("form");
            formBuilder.Setup(fb => fb.CreateForm()).Returns(form);

            var editor = new HtmlElement("input");
            var builder = new GridEditFormBuilder(formBuilder.Object, () => editor, Enumerable.Empty<Func<IHtmlNode>>());

            builder.CreateForm();

            var formContainer = form.Children[0];

            formContainer.Children[0].ShouldBeSameAs(editor);
        }

        [Fact]
        public void Should_append_buttons_to_the_form_container()
        {
            var formBuilder = new Mock<IGridFormBuilder>();
            var form = new HtmlElement("form");
            formBuilder.Setup(fb => fb.CreateForm()).Returns(form);

            var counter = 0;
            Func<IHtmlNode> buttonBuilder = () =>
                                                {
                                                    ++counter;
                                                    return new HtmlElement("button");
                                                };

            var buttons = new[] {buttonBuilder, buttonBuilder, buttonBuilder};

            var builder = new GridEditFormBuilder(formBuilder.Object, () => new HtmlElement("foo"), buttons);

            builder.CreateForm();

            counter.ShouldEqual(3);
        }
    }
}