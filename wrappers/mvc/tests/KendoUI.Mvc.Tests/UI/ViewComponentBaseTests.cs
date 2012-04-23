// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Tests
{
    using System;
    using System.IO;
    using System.Web;
    using System.Web.Mvc;

    using Moq;
    using Xunit;

    public class ViewComponentBaseTests
    {
        private readonly ViewContext _viewContext;
        private readonly Mock<HttpContextBase> _httpContext;
        private readonly Mock<IClientSideObjectWriterFactory> _clientSideObjectWriterFactory;

        private readonly Mock<ViewComponentBase> _baseComponent;

        public ViewComponentBaseTests()
        {
            _httpContext = TestHelper.CreateMockedHttpContext();
            _viewContext = new ViewContext { HttpContext = _httpContext.Object };
            _clientSideObjectWriterFactory = new Mock<IClientSideObjectWriterFactory>();

            _baseComponent = new Mock<ViewComponentBase>(_viewContext, _clientSideObjectWriterFactory.Object);
        }

        [Fact]
        public void Script_files_path_should_be_same_as_default_script_files_path_when_new_instance_is_created()
        {
            Assert.Equal(WebAssetDefaultSettings.ScriptFilesPath, _baseComponent.Object.ScriptFilesPath);
        }

        [Fact]
        public void ScriptFileNames_should_be_empty_when_new_instance_is_created()
        {
            Assert.Empty(_baseComponent.Object.ScriptFileNames);
        }

        [Fact]
        public void HtmlAttributes_should_be_empty_when_new_instance_is_created()
        {
            Assert.Empty(_baseComponent.Object.HtmlAttributes);
        }

        [Fact]
        public void Should_be_able_to_set_name()
        {
            _baseComponent.Object.Name = "component";

            Assert.Equal("component", _baseComponent.Object.Name);
        }

        [Fact]
        public void Should_be_able_to_set_script_files_path()
        {
            _baseComponent.Object.ScriptFilesPath = "~/assets/scripts";

            Assert.Equal("~/assets/scripts", _baseComponent.Object.ScriptFilesPath);
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
            ViewComponentBaseTestDouble component = new ViewComponentBaseTestDouble(_viewContext, _clientSideObjectWriterFactory.Object);

            Assert.Throws<InvalidOperationException>(() => component.CheckRequired());
        }

        [Fact]
        public void EnsureRequired_should_not_throw_exception_when_internal_name_is_not_blank()
        {
            ViewComponentBaseTestDouble component = new ViewComponentBaseTestDouble(_viewContext, _clientSideObjectWriterFactory.Object) { Name = "dummyComponent" };

            Assert.DoesNotThrow(component.CheckRequired);
        }

        [Fact]
        public void WriteInitializationScript_should_do_nothing()
        {
            ViewComponentBaseTestDouble component = new ViewComponentBaseTestDouble(_viewContext, _clientSideObjectWriterFactory.Object);

            component.InitializationScript(new Mock<TextWriter>().Object);
        }

        [Fact]
        public void WriteCleanupScript_should_do_nothing()
        {
            ViewComponentBaseTestDouble component = new ViewComponentBaseTestDouble(_viewContext, _clientSideObjectWriterFactory.Object);

            component.CleanupScript(new Mock<TextWriter>().Object);
        }

        [Fact]
        public void Render_should_ensure_required()
        {
            ViewComponentBaseTestDouble component = new ViewComponentBaseTestDouble(_viewContext, _clientSideObjectWriterFactory.Object) { Name = "dummyComponent" };

            component.Render();

            Assert.True(component.HasEnsuredRequired);
        }

        [Fact]
        public void Render_should_write_html()
        {
            ViewComponentBaseTestDouble component = new ViewComponentBaseTestDouble(_viewContext, _clientSideObjectWriterFactory.Object) { Name = "dummyComponent" };

            component.Render();

            Assert.True(component.HasWrittenHtml);
        }
    }
}