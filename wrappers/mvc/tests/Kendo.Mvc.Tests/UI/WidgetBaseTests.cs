namespace Kendo.Mvc.UI.Tests
{
    using System;
    using System.IO;
    using System.Web;
    using System.Web.Mvc;

    using Moq;
    using Xunit;

    public class WidgetBaseTests
    {
        private readonly ViewContext _viewContext;
        private readonly Mock<HttpContextBase> _httpContext;

        private readonly Mock<WidgetBase> _baseComponent;

        public WidgetBaseTests()
        {
            _httpContext = TestHelper.CreateMockedHttpContext();
            _viewContext = new ViewContext { HttpContext = _httpContext.Object, Writer = TextWriter.Null };
            _baseComponent = new Mock<WidgetBase>(_viewContext, null);
        }

        [Fact]
        public void HtmlAttributes_should_be_empty_when_new_instance_is_created()
        {
            Assert.Empty(_baseComponent.Object.HtmlAttributes);
        }

        [Fact]
        public void Id_should_not_have_dot()
        {
            _baseComponent.Object.Name = "person.name";

            Assert.DoesNotContain(".", _baseComponent.Object.Id);
        }

        [Fact]
        public void EnsureRequired_should_throw_exception_when_internal_name_is_blank()
        {
            WidgetBaseTestDouble component = new WidgetBaseTestDouble(_viewContext, null);

            Assert.Throws<InvalidOperationException>(() => component.CheckRequired());
        }

        [Fact]
        public void EnsureRequired_should_not_throw_exception_when_internal_name_is_not_blank()
        {
            WidgetBaseTestDouble component = new WidgetBaseTestDouble(_viewContext, null) { Name = "dummyComponent" };

            Assert.DoesNotThrow(component.CheckRequired);
        }

        [Fact]
        public void Render_should_ensure_required()
        {
            WidgetBaseTestDouble component = new WidgetBaseTestDouble(_viewContext, null) { Name = "dummyComponent" };

            component.Render();

            Assert.True(component.HasEnsuredRequired);
        }

        [Fact]
        public void Render_should_write_html()
        {
            WidgetBaseTestDouble component = new WidgetBaseTestDouble(_viewContext, null) { Name = "dummyComponent" };

            component.Render();

            Assert.True(component.HasWrittenHtml);
        }

        [Fact]
        public void HasDeferredInitialization_should_add_scripts_to_the_context()
        {
            WidgetBaseTestDouble component = new WidgetBaseTestDouble(_viewContext, null) { Name = "dummyComponent", HasDeferredInitialization = true };
                        
            component.Render();

            _httpContext.Object.Items.Contains(WidgetBase.DeferredScriptsKey).ShouldBeTrue();
        }

        [Fact]
        public void HasDeferredInitialization_should_not_render_scripts()
        {
            WidgetBaseTestDouble component = new WidgetBaseTestDouble(_viewContext, null) { Name = "dummyComponent", HasDeferredInitialization = true };

            component.ToHtmlString().Contains("<script>").ShouldBeFalse();
        }

        [Fact]
        public void HasDeferredInitialization_false_should_render_scripts()
        {
            WidgetBaseTestDouble component = new WidgetBaseTestDouble(_viewContext, null) { Name = "dummyComponent", HasDeferredInitialization = false };

            component.ToHtmlString().Contains("<script>").ShouldBeTrue();
        }
    }
}