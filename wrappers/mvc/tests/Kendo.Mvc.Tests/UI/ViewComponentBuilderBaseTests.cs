namespace Kendo.Mvc.UI.Tests
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