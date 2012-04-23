// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Tests
{
    using Moq;
    using System;
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Telerik.Web.Mvc.Infrastructure;
    using Xunit;

    public class ScriptRegistrarBuilderTests
    {
        private readonly ScriptRegistrar _scriptRegistrar;
        private readonly ScriptRegistrarBuilder _builder;

        public ScriptRegistrarBuilderTests()
        {
            ViewContext viewContext = new ViewContext
                                          {
                                              HttpContext = TestHelper.CreateMockedHttpContext().Object,
                                              ViewData = new ViewDataDictionary()
                                          };

            _scriptRegistrar = new ScriptRegistrar(new WebAssetCollection(WebAssetDefaultSettings.ScriptFilesPath), 
                new List<IScriptableComponent>(), 
                viewContext, 
                new Mock<IWebAssetCollectionResolver>().Object, new Mock<ScriptWrapperBase>().Object);

            _builder = new ScriptRegistrarBuilder(_scriptRegistrar);
        }

        [Fact]
        public void ToRegistrar_should_return_internal_script_registrar()
        {
            Assert.Same(_scriptRegistrar, _builder.ToRegistrar());
        }

        [Fact]
        public void ScriptRegistrar_operator_should_return_internal_script_registrar()
        {
            ScriptRegistrar scriptRegistrar = _builder;

            Assert.Same(_scriptRegistrar, scriptRegistrar);
        }

        [Fact]
        public void AssetHandlerPath_should_set_script_manager_asset_handler_path()
        {
            const string HandlerPath = "~/assets/scripts/asset.axd";

            _builder.AssetHandlerPath(HandlerPath);

            Assert.Equal(HandlerPath, _scriptRegistrar.AssetHandlerPath);
        }

        [Fact]
        public void Should_be_able_to_configure_default_group()
        {
            int previousCount = _scriptRegistrar.DefaultGroup.Items.Count;

            _builder.DefaultGroup(group => group.Add("foo.js"));

            Assert.Equal((previousCount + 1), _scriptRegistrar.DefaultGroup.Items.Count);
        }

        [Fact]
        public void Should_be_able_to_configure_scripts()
        {
            int previousCount = _scriptRegistrar.Scripts.Count;

            _builder.Scripts(script => script.Add("~/Scripts/script1.js").Add("~/Scripts/script2"));

            Assert.Equal((previousCount + 2), _scriptRegistrar.Scripts.Count);
        }

        [Fact]
        public void Should_be_able_to_exclude_jQuery()
        {
            _builder.jQuery(false);

            Assert.True(_scriptRegistrar.ExcludeFrameworkScripts);
        }

        [Fact]
        public void Should_be_able_to_exclude_jQuery_validation()
        {
            _builder.jQueryValidation(false);

            Assert.True(_scriptRegistrar.ExcludeValidationScripts);
        }

        [Fact]
        public void OnDocumentReady_should_add_new_action_in_on_document_ready_action_collection()
        {
            Action onLoad = delegate { };

            _builder.OnDocumentReady(onLoad);

            Assert.Same(onLoad, _scriptRegistrar.OnDocumentReadyActions[_scriptRegistrar.OnDocumentReadyActions.Count - 1]);
        }

        [Fact]
        public void OnDocumentReady_should_add_new_statement_in_on_document_ready_statement_collection()
        {
            _builder.OnDocumentReady("var foo = 'bar';");

            Assert.Contains("var foo = 'bar';", _scriptRegistrar.OnDocumentReadyStatements);
        }

        [Fact]
        public void OnDocumentReady_should_add_new_statement_in_on_document_ready_statement_collection_when_using_razor_overload()
        {
            _builder.OnDocumentReady((s) => "var foo = 'bar';");

            Assert.Contains("var foo = 'bar';", _scriptRegistrar.OnDocumentReadyStatements);
        }

        [Fact]
        public void OnWindowUnload_should_add_new_action_in_on_window_unload_action_collection()
        {
            Action onUnload = delegate { };

            _builder.OnWindowUnload(onUnload);

            Assert.Same(onUnload, _scriptRegistrar.OnWindowUnloadActions[_scriptRegistrar.OnWindowUnloadActions.Count - 1]);
        }

        [Fact]
        public void OnWindowUnload_should_add_new_statement_in_on_window_unload_statement_collection()
        {
            _builder.OnWindowUnload("foo.dispose();");

            Assert.Contains("foo.dispose();", _scriptRegistrar.OnWindowUnloadStatements);
        }

        [Fact]
        public void Globalization_should_set_EnableGlobalization_property() 
        {
            const bool enable = true;

            _builder.Globalization(enable);

            Assert.True(_scriptRegistrar.EnableGlobalization);
        }
    }
}