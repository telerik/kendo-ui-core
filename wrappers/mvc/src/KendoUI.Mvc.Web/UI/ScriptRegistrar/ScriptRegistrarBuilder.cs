namespace KendoUI.Mvc.UI
{
    using System;
    using System.ComponentModel;

    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="ScriptRegistrar"/> component.
    /// </summary>
    public class ScriptRegistrarBuilder : ComponentBuilderBase<ScriptRegistrar, ScriptRegistrarBuilder>, IHideObjectMembers
    {
        private readonly ScriptRegistrar scriptRegistrar;

        /// <summary>
        /// Initializes a new instance of the <see cref="ScriptRegistrarBuilder"/> class.
        /// </summary>
        /// <param name="scriptRegistrar">The script registrar.</param>
        public ScriptRegistrarBuilder(ScriptRegistrar scriptRegistrar)
        {
            Guard.IsNotNull(scriptRegistrar, "scriptRegistrar");

            this.scriptRegistrar = scriptRegistrar;
        }

        /// <summary>
        /// Performs an implicit conversion from <see cref="ScriptRegistrarBuilder"/> to <see cref="ScriptRegistrar"/>.
        /// </summary>
        /// <param name="builder">The builder.</param>
        /// <returns>The result of the conversion.</returns>
        public static implicit operator ScriptRegistrar(ScriptRegistrarBuilder builder)
        {
            Guard.IsNotNull(builder, "builder");

            return builder.ToRegistrar();
        }

        /// <summary>
        /// Returns the internal script registrar.
        /// </summary>
        /// <returns></returns>
        [EditorBrowsable(EditorBrowsableState.Never)]
        public ScriptRegistrar ToRegistrar()
        {
            return scriptRegistrar;
        }

        /// <summary>
        /// Sets the asset handler path. Path must be a virtual path.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().ScriptRegistrar()
        ///            .AssetHandlerPath("~/asset.axd")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual ScriptRegistrarBuilder AssetHandlerPath(string value)
        {
            scriptRegistrar.AssetHandlerPath = value;

            return this;
        }

        /// <summary>
        /// Configures the <see cref="ScriptRegistrar.DefaultGroup"/>.
        /// </summary>
        /// <param name="configureAction">The configure action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().ScriptRegistrar()
        ///            .DefaultGroup(group => group
        ///                 .Add("script1.js")
        ///                 .Add("script2.js")
        ///                 .Combined(true)
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public virtual ScriptRegistrarBuilder DefaultGroup(Action<WebAssetGroupBuilder> configureAction)
        {
            Guard.IsNotNull(configureAction, "configureAction");

            WebAssetGroupBuilder builder = new WebAssetGroupBuilder(scriptRegistrar.DefaultGroup);
            configureAction(builder);

            return this;
        }

        /// <summary>
        /// Enables globalization support.
        /// </summary>
        /// <param name="enable">if set to <c>true</c> [enable].</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().ScriptRegistrar()
        ///            .Globalization(true)
        /// %&gt;
        /// </code>
        /// </example>
        public virtual ScriptRegistrarBuilder Globalization(bool enable)
        {
            scriptRegistrar.EnableGlobalization = enable;
            
            return this;
        }

        /// <summary>
        /// Includes the jQuery script files. By default jQuery JavaScript is included. 
        /// </summary>
        /// <remarks>
        /// Telerik Extensions for ASP.NET MVC require jQuery so make sure you manually include the JavaScript file
        /// if you disable the automatic including.
        /// </remarks>
        /// <param name="enable">if set to <c>true</c> [enable].</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().ScriptRegistrar()
        ///            .jQuery(false)
        /// %&gt;
        /// </code>
        /// </example>
        public virtual ScriptRegistrarBuilder jQuery(bool enable)
        {
            scriptRegistrar.ExcludeFrameworkScripts = !enable;

            return this;
        }

        public ScriptRegistrarBuilder CombinedComponentFile(bool enable)
        {
            scriptRegistrar.CombinedComponentFile = enable;

            return this;
        }

        /// <summary>
        /// Sets whether the jQuery validation script files will be registered. By default jQuery Validation JavaScript is included, if needed.
        /// </summary>
        /// <remarks>
        /// Telerik Extensions for ASP.NET MVC use jQuery validation
        /// </remarks>
        /// <param name="enable">if set to <c>true</c> [enable].</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().ScriptRegistrar()
        ///            .jQueryValidation(false)
        /// %&gt;
        /// </code>
        /// </example>
        public virtual ScriptRegistrarBuilder jQueryValidation(bool enable)
        {
            scriptRegistrar.ExcludeValidationScripts = !enable;

            return this;
        }

        /// <summary>
        /// Executes the provided delegate that is used to register the script files fluently in different groups.
        /// </summary>
        /// <param name="configureAction">The configure action.</param>
        /// <returns></returns>
        public virtual ScriptRegistrarBuilder Scripts(Action<WebAssetCollectionBuilder> configureAction)
        {
            Guard.IsNotNull(configureAction, "configureAction");

            WebAssetCollectionBuilder builder = new WebAssetCollectionBuilder(WebAssetType.JavaScript, scriptRegistrar.Scripts);

            configureAction(builder);

            return this;
        }

        /// <summary>
        /// Defines the inline handler executed when the DOM document is ready (using the $(document).ready jQuery event)
        /// </summary>
        /// <param name="onDocumentReadyAction">The action defining the inline handler</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().ScriptRegistrar()
        ///           .OnDocumentReady(() =>
        ///           {
        ///             %&gt;
        ///             function() {
        ///                 alert("Document is ready");
        ///             }
        ///             &lt;%
        ///           })
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public virtual ScriptRegistrarBuilder OnDocumentReady(Action onDocumentReadyAction)
        {
            Guard.IsNotNull(onDocumentReadyAction, "onDocumentReadyAction");

            scriptRegistrar.OnDocumentReadyActions.Add(onDocumentReadyAction);

            return this;
        }

        /// <summary>
        /// Defines the inline handler executed when the DOM document is ready (using the $(document).ready jQuery event)
        /// </summary>
        /// <param name="onDocumentReadyAction">The code of the inline handler wrapped in a text tag (Razor syntax)</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Telerik().ScriptRegistrar()
        ///       .OnDocumentReady(
        ///         @&lt;text&gt;
        ///             alert("Document is ready");
        ///         &lt;/text&gt;
        ///       })
        /// )
        /// </code>
        /// </example>
        public virtual ScriptRegistrarBuilder OnDocumentReady(Func<object, object> onDocumentReadyFunc)
        {
            Guard.IsNotNull(onDocumentReadyFunc, "onDocumentReadyFunc");

            var result = onDocumentReadyFunc(this);
            if (result != null)
            {
                scriptRegistrar.OnDocumentReadyStatements.Add(result.ToString());
            }

            return this;
        }

        /// <summary>
        /// Appends the specified statement in $(document).ready jQuery event. This method should be
        /// used in <code>Html.RenderAction()</code>.
        /// </summary>
        /// <param name="statements">The statements.</param>
        /// <returns></returns>
        public virtual ScriptRegistrarBuilder OnDocumentReady(string statements)
        {
            Guard.IsNotNullOrEmpty(statements, "statements");

            scriptRegistrar.OnDocumentReadyStatements.Add(statements);

            return this;
        }

        /// <summary>
        /// Defines the inline handler executed when the DOM window object is unloaded.
        /// </summary>
        /// <param name="onWindowUnloadAction">The action defining the inline handler</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().ScriptRegistrar()
        ///           .OnWindowUnload(() =>
        ///           {
        ///             %&gt;
        ///             function() {
        ///                 // event handler code
        ///             }
        ///             &lt;%
        ///           })
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public virtual ScriptRegistrarBuilder OnWindowUnload(Action onWindowUnloadAction)
        {
            Guard.IsNotNull(onWindowUnloadAction, "onWindowUnloadAction");

            scriptRegistrar.OnWindowUnloadActions.Add(onWindowUnloadAction);

            return this;
        }

        /// <summary>
        /// Appends the specified statement window unload event. This method should be
        /// used in <code>Html.RenderAction()</code>.
        /// </summary>
        /// <param name="statements">The statements.</param>
        /// <returns></returns>
        public virtual ScriptRegistrarBuilder OnWindowUnload(string statements)
        {
            Guard.IsNotNullOrEmpty(statements, "statements");

            scriptRegistrar.OnWindowUnloadStatements.Add(statements);

            return this;
        }

        /// <summary>
        /// Renders the <see cref="ScriptRegistrar"/>
        /// </summary>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().ScriptRegistrar()
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public virtual void Render()
        {
            scriptRegistrar.Render();
        }

        public ScriptRegistrarBuilder OutputScriptFiles(bool value)
        {
            scriptRegistrar.OutputScriptFiles = value;
            return this;
        }

        public string ToHtmlString()
        {
            return scriptRegistrar.ToHtmlString();
        }
        
        public override string ToString()
        {
            Render();
            return null;
        }        
    }
}