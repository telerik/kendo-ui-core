// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Tests
{
    using Moq;
    using System;
    using System.Collections.Generic;
    using System.Web;
    using System.Web.Mvc;
    using Telerik.Web.Mvc.Infrastructure;
    using Xunit;

    public class ScriptRegistrarTests
    {
        private readonly Mock<HttpContextBase> httpContext;
        private readonly ViewContext viewContext;
        private readonly WebAssetCollection scripts;
        private readonly IList<IScriptableComponent> scriptableComponents;
        private readonly Mock<IWebAssetCollectionResolver> resolver;
        private readonly Mock<ScriptWrapperBase> scriptWrapper;

        private readonly ScriptRegistrar scriptRegistrar;

        public ScriptRegistrarTests()
        {
            httpContext = TestHelper.CreateMockedHttpContext();
            scripts = new WebAssetCollection(WebAssetDefaultSettings.ScriptFilesPath);
            scriptableComponents = new List<IScriptableComponent>();
            resolver = new Mock<IWebAssetCollectionResolver>();
            scriptWrapper = new Mock<ScriptWrapperBase>();

            viewContext = new ViewContext
                               {
                                   HttpContext = httpContext.Object,
                                   ViewData = new ViewDataDictionary()
                               };

            scriptRegistrar = new ScriptRegistrar(scripts, scriptableComponents, viewContext, resolver.Object, scriptWrapper.Object);
        }

        [Fact]
        public void Should_throw_exception_when_new_instance_is_created_for_the_same_http_context()
        {
            Assert.Throws<InvalidOperationException>(() => new ScriptRegistrar(scripts, scriptableComponents, viewContext, resolver.Object, scriptWrapper.Object));
        }

        [Fact]
        public void Should_be_able_to_change_framework_script_file_names()
        {
            ScriptRegistrar.FrameworkScriptFileNames.Add("foo.js");

            Assert.Equal(2, ScriptRegistrar.FrameworkScriptFileNames.Count);

            ScriptRegistrar.FrameworkScriptFileNames.RemoveAt(1);
        }

        [Fact]
        public void AssetHandlerPath_should_be_set_to_default_asset_handler_path_when_new_instance_is_created()
        {
            Assert.Equal(WebAssetHttpHandler.DefaultPath, scriptRegistrar.AssetHandlerPath);
        }

        [Fact]
        public void Register_should_add_specified_component_in_scriptable_component_collection()
        {
            Mock<IScriptableComponent> component = new Mock<IScriptableComponent>();

            scriptRegistrar.Register(component.Object);

            Assert.Contains(component.Object, scriptableComponents);
        }

        [Fact]
        public void Register_should_not_add_the_same_component_more_than_once()
        {
            Mock<IScriptableComponent> component = new Mock<IScriptableComponent>();

            scriptRegistrar.Register(component.Object);
            scriptRegistrar.Register(component.Object);

            Assert.Equal(1, scriptableComponents.Count);
        }

        private void SetupComponent(string assetKey)
		{
			Mock<IScriptableComponent> component = new Mock<IScriptableComponent>();

            component.SetupGet(c => c.AssetKey).Returns(assetKey);
            component.SetupGet(c=> c.ScriptFilesPath).Returns("~/Scripts");
            component.SetupGet(c=> c.ScriptFileNames).Returns(new [] {"component.js"});
            scriptRegistrar.Register(component.Object);
		}

        private void SetupForRender()
        {
            Mock<IScriptableComponent> component1 = new Mock<IScriptableComponent>();

            component1.SetupGet(c => c.AssetKey).Returns("foo");
            component1.SetupGet(c => c.ScriptFilesPath).Returns(WebAssetDefaultSettings.ScriptFilesPath);
            component1.SetupGet(c => c.ScriptFileNames).Returns(new List<string> { "site1.js", "site2.js" });

            scriptRegistrar.Register(component1.Object);

            Mock<IScriptableComponent> component2 = new Mock<IScriptableComponent>();

            component2.SetupGet(c => c.ScriptFilesPath).Returns(WebAssetDefaultSettings.ScriptFilesPath);
            component2.SetupGet(c => c.ScriptFileNames).Returns(new List<string> { "site3.js", "site4.js" });

            scriptRegistrar.Register(component2.Object);

            scriptRegistrar.OnDocumentReadyActions.Add(delegate { });
            scriptRegistrar.OnWindowUnloadActions.Add(delegate { });
            scriptRegistrar.OnDocumentReadyActions.Add(delegate { });
            scriptRegistrar.OnWindowUnloadActions.Add(delegate { });

            scriptWrapper.SetupGet(w => w.OnPageLoadStart).Returns(string.Empty);
            scriptWrapper.SetupGet(w => w.OnPageLoadEnd).Returns(string.Empty);
            scriptWrapper.SetupGet(w => w.OnPageUnloadStart).Returns(string.Empty);
            scriptWrapper.SetupGet(w => w.OnPageUnloadEnd).Returns(string.Empty);

            httpContext.Setup(context => context.Response.Output.Write(It.IsAny<string>())).Verifiable();
            httpContext.Setup(context => context.Response.Output.WriteLine(It.IsAny<string>())).Verifiable();
        }
    }
}