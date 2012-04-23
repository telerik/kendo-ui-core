// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Tests
{
    using System.Web.Mvc;

    using Moq;
    using Xunit;

    public class ViewComponentBuilderBaseTests
    {
        private readonly Mock<ViewComponentBaseTestDouble> _component;
        private readonly ViewComponentBuilderBase<ViewComponentBaseTestDouble, ViewComponentBuilderBaseTestDouble> _builder;

        public ViewComponentBuilderBaseTests()
        {
            ViewContext viewContext = new ViewContext { HttpContext = TestHelper.CreateMockedHttpContext().Object };

            _component = new Mock<ViewComponentBaseTestDouble>(viewContext, new Mock<IClientSideObjectWriterFactory>().Object);
            _builder = new ViewComponentBuilderBaseTestDouble(_component.Object);
        }

        [Fact]
        public void Component_should_return_the_same_component_which_is_passed_in_constructor()
        {
            Assert.Same(_component.Object, _builder.Component);
        }

        [Fact]
        public void Component_operator_should_return_internal_component()
        {
            ViewComponentBaseTestDouble component = _builder;

            Assert.Same(_component.Object, component);
        }

        [Fact]
        public void ToComponent_should_return_internal_component()
        {
            ViewComponentBaseTestDouble component = _builder.ToComponent();

            Assert.Same(_component.Object, component);
        }

        [Fact]
        public void Should_be_able_to_set_name()
        {
            _builder.Name("dummyComponent");

            Assert.Equal("dummyComponent", _component.Object.Name);
        }

        [Fact]
        public void Should_be_able_to_set_asset_key()
        {
            _builder.AssetKey("xxx");

            Assert.Equal("xxx", _component.Object.AssetKey);
        }

        [Fact]
        public void Should_be_able_to_set_script_files_path()
        {
            _builder.ScriptFilesPath("~/assets/scripts");

            Assert.Equal("~/assets/scripts", _component.Object.ScriptFilesPath);
        }

        [Fact]
        public void Should_be_able_to_set_script_file_names()
        {
            _builder.ScriptFileNames("dummy1.js", "dummy2.js");

            Assert.Contains("dummy1.js", _component.Object.ScriptFileNames);
            Assert.Contains("dummy2.js", _component.Object.ScriptFileNames);
        }

        [Fact]
        public void Should_be_able_to_set_html_attributes()
        {
            _builder.HtmlAttributes(new { @class = "foo" });

            Assert.Equal("foo", _component.Object.HtmlAttributes["class"]);
        }

        [Fact]
        public void Render_should_not_throw_exception()
        {
            ViewComponentBuilderBaseTestDouble builder = new ViewComponentBuilderBaseTestDouble(_component.Object);

            Assert.DoesNotThrow(builder.Render);
        }
    }

    public class ViewComponentBuilderBaseTestDouble : ViewComponentBuilderBase<ViewComponentBaseTestDouble, ViewComponentBuilderBaseTestDouble>
    {
        public ViewComponentBuilderBaseTestDouble(ViewComponentBaseTestDouble component) : base(component)
        {
        }
    }
}