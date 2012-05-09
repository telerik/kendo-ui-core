namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.IO;
    using System.Linq;
    using System.Text;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.Script.Serialization;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    using System.Web.UI;

    /// <summary>
    /// Manages ASP.NET MVC javascript files and statements.
    /// </summary>
    public class ScriptRegistrar : IScriptableComponentContainer
    {
        internal const string jQuery = "jquery-1.7.1.js";
        internal const string jQueryValidation = "jquery.validate.js";

        /// <summary>
        /// Used to ensure that the same instance is used for the same HttpContext.
        /// </summary>
        public static readonly string Key = typeof(ScriptRegistrar).AssemblyQualifiedName;

        private static readonly IList<string> frameworkScriptFileNames = new List<string> { jQuery };
        private static readonly IList<string> validationScriptFileNames = new List<string> { jQueryValidation };

        private readonly IList<IScriptableComponent> scriptableComponents;

        private string assetHandlerPath;
        private bool hasRendered;

        private readonly IWebAssetCollectionResolver resolver;

        /// <summary>
        /// Initializes a new instance of the <see cref="ScriptRegistrar"/> class.
        /// </summary>
        /// <param name="scripts">The scripts.</param>
        /// <param name="scriptableComponents">The scriptable components.</param>
        /// <param name="viewContext">The view context.</param>
        /// <param name="assetItemMerger">The asset merger.</param>
        /// <param name="scriptWrapper">The script wrapper.</param>
        public ScriptRegistrar(WebAssetCollection scripts, IList<IScriptableComponent> scriptableComponents, ViewContext viewContext, IWebAssetCollectionResolver resolver, ScriptWrapperBase scriptWrapper)
        {
            this.resolver = resolver;

            if (viewContext.HttpContext.Items[Key] != null)
            {
                throw new InvalidOperationException(Resources.TextResource.OnlyOneScriptRegistrarIsAllowedInASingleRequest);
            }

            viewContext.HttpContext.Items[Key] = this;

            OutputScriptFiles = true;

            DefaultGroup = new WebAssetGroup("default", false) { DefaultPath = WebAssetDefaultSettings.ScriptFilesPath };
            Scripts = scripts;
            Scripts.Insert(0, DefaultGroup);

            this.scriptableComponents = scriptableComponents;
            ViewContext = viewContext;
            ScriptWrapper = scriptWrapper;
            AssetHandlerPath = WebAssetHttpHandler.DefaultPath;

            OnDocumentReadyActions = new List<Action>();
            OnDocumentReadyStatements = new List<string>();
            OnWindowUnloadActions = new List<Action>();
            OnWindowUnloadStatements = new List<string>();
        }

        public bool OutputScriptFiles
        {
            get;
            set;
        }

        public bool CombinedComponentFile
        {
            get;
            set;
        }

        public IList<IScriptableComponent> ScriptableComponents
        {
            get
            {
                return scriptableComponents;
            }
        }

        public static ScriptRegistrar Current
        {
            get
            {
                return (ScriptRegistrar)HttpContext.Current.Items[Key];
            }
        }

        /// <summary>
        /// Gets the framework script file names.
        /// </summary>
        /// <value>The framework script file names.</value>
        public static IList<string> FrameworkScriptFileNames
        {
            get
            {
                return frameworkScriptFileNames;
            }
        }

        /// <summary>
        /// Gets the validation script file names.
        /// </summary>
        /// <value>The validation script file names.</value>
        public static IList<string> ValidationScriptFileNames
        {
            get
            {
                return validationScriptFileNames;
            }
        }

        /// <summary>
        /// Gets or sets a value indicating whether [exclude framework scripts].
        /// </summary>
        /// <value>
        /// <c>true</c> if [exclude framework scripts]; otherwise, <c>false</c>.
        /// </value>
        public bool ExcludeFrameworkScripts
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether [exclude validation scripts].
        /// </summary>
        /// <value>
        /// <c>true</c> if [exclude validation scripts]; otherwise, <c>false</c>.
        /// </value>
        public bool ExcludeValidationScripts
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the asset handler path. Path must be a virtual path. The default value is set to <see cref="WebAssetHttpHandler.DefaultPath"/>.
        /// </summary>
        /// <value>The asset handler path.</value>
        public string AssetHandlerPath
        {
            get
            {
                return assetHandlerPath;
            }

            set
            {
                Guard.IsNotVirtualPath(value, "value");

                assetHandlerPath = value;
            }
        }

        /// <summary>
        /// Gets the default script group.
        /// </summary>
        /// <value>The default group.</value>
        public WebAssetGroup DefaultGroup
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether [enable globalization].
        /// </summary>
        /// <value><c>true</c> if [enable globalization]; otherwise, <c>false</c>.</value>
        public bool EnableGlobalization
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the scripts that will be rendered in the view.
        /// </summary>
        /// <value>The scripts.</value>
        public WebAssetCollection Scripts
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets the on document ready actions.
        /// </summary>
        /// <value>The on page load actions.</value>
        public IList<Action> OnDocumentReadyActions
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets the on document ready statements that is used in <code>RenderAction</code>.
        /// </summary>
        /// <value>The on page load actions.</value>
        public IList<string> OnDocumentReadyStatements
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets the on window unload actions.
        /// </summary>
        /// <value>The on page unload actions.</value>
        public IList<Action> OnWindowUnloadActions
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets the on window unload statements.that is used in <code>RenderAction</code>.
        /// </summary>
        /// <value>The on page load actions.</value>
        public IList<string> OnWindowUnloadStatements
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets the view context.
        /// </summary>
        /// <value>The view context.</value>
        protected ViewContext ViewContext
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets the script wrapper that is used to write the script statements.
        /// </summary>
        /// <value>The script wrapper.</value>
        protected ScriptWrapperBase ScriptWrapper
        {
            get;
            private set;
        }

        /// <summary>
        /// Registers the scriptable component.
        /// </summary>
        /// <param name="component">The component.</param>
        public virtual void Register(IScriptableComponent component)
        {
            Guard.IsNotNull(component, "component");

            if (!IsRegistered(component))
            {
                scriptableComponents.Add(component);
            }
        }

        public bool IsRegistered(IScriptableComponent component)
        {
            return scriptableComponents.Contains(component);
        }

        /// <summary>
        /// Writes the scripts in the response.
        /// </summary>
        public void Render()
        {
            if (hasRendered)
            {
                throw new InvalidOperationException(Resources.TextResource.YouCannotCallRenderMoreThanOnce);
            }
#if MVC1
            var baseWriter = ViewContext.HttpContext.Response.Output;
#else
            var baseWriter = ViewContext.Writer;
#endif
            using (HtmlTextWriter textWriter = new HtmlTextWriter(baseWriter))
            {
                Write(baseWriter);
            }

            hasRendered = true;
        }

        /// <summary>
        /// Writes all script source and script statements.
        /// </summary>
        /// <param name="writer">The writer.</param>
        protected virtual void Write(TextWriter writer)
        {
            if (OutputScriptFiles)
            {
                WriteScriptSources(writer);
            }
            WriteScriptStatements(writer);
        }

        public string ToHtmlString()
        {
            using (var output = new StringWriter())
            {
                Write(output);
                return output.ToString();
            }
        }

        private void WriteScriptSources(TextWriter writer)
        {
            var scriptFiles = CollectScriptFiles();

            foreach (string script in scriptFiles)
            {
                writer.WriteLine("<script type=\"text/javascript\" src=\"{0}\"></script>".FormatWith(script));
            }
        }

        internal IEnumerable<string> CollectScriptFiles()
        {
            bool isSecured = ViewContext.HttpContext.Request.IsSecureConnection;
            bool canCompress = ViewContext.HttpContext.Request.CanCompress();

            CopyFrameworkScriptFiles();

            CopyScriptFilesFromComponents();

            return resolver.Resolve(new ResolverContext
            {
                ContentType = "text/javascript",
                HttpHandlerPath = AssetHandlerPath,
                IsSecureConnection = isSecured,
                SupportsCompression = canCompress
            }, Scripts);
        }

        private bool OutputGlobalization
        {
            get
            {
                return (EnableGlobalization && CultureInfo.CurrentCulture.Name != "en-US");
            }
        }
        private void WriteScriptStatements(TextWriter writer)
        {
            string cleanUpScripts = WriteCleanUpScripts().ToString();

            bool shouldWriteOnDocumentReady = scriptableComponents.Any() || OnDocumentReadyActions.Any() || OnDocumentReadyStatements.Any() || OutputGlobalization;
            bool shouldWriteOnWindowUnload = OnWindowUnloadActions.Any() || OnWindowUnloadStatements.Any() || cleanUpScripts.Trim().HasValue();

            if (shouldWriteOnDocumentReady || shouldWriteOnWindowUnload)
            {
                bool isFirst;

                writer.WriteLine("<script type=\"text/javascript\">{0}//<![CDATA[".FormatWith(Environment.NewLine));

                // pageLoad

                if (shouldWriteOnDocumentReady)
                {
                    writer.WriteLine(ScriptWrapper.OnPageLoadStart);

                    // globalization
                    if (OutputGlobalization)
                    {
                        var globalizationInfo = new GlobalizationInfo(CultureInfo.CurrentCulture);

                        writer.WriteLine("if(!jQuery.telerik) jQuery.telerik = {};");
                        writer.Write("jQuery.telerik.cultureInfo=");
                        writer.Write(new JavaScriptSerializer().Serialize(globalizationInfo.ToDictionary()));
                        writer.WriteLine(";");
                    }

                    isFirst = true;

                    foreach (IScriptableComponent component in scriptableComponents.Where(s => !s.IsSelfInitialized))
                    {
                        if (!isFirst)
                        {
                            writer.WriteLine();
                        }

                        component.WriteInitializationScript(writer);
                        isFirst = false;
                    }

                    isFirst = true;

                    foreach (Action action in OnDocumentReadyActions)
                    {
                        if (!isFirst)
                        {
                            writer.WriteLine();
                        }

                        action();

                        isFirst = false;
                    }

                    isFirst = true;

                    foreach (string statement in OnDocumentReadyStatements)
                    {
                        if (!isFirst)
                        {
                            writer.WriteLine();
                        }

                        writer.Write(statement);

                        isFirst = false;
                    }

                    writer.WriteLine(ScriptWrapper.OnPageLoadEnd);
                }

                // pageUnload
                if (shouldWriteOnWindowUnload)
                {
                    writer.WriteLine(ScriptWrapper.OnPageUnloadStart);

                    isFirst = true;

                    foreach (Action action in OnWindowUnloadActions)
                    {
                        if (!isFirst)
                        {
                            writer.WriteLine();
                        }

                        action();

                        isFirst = false;
                    }

                    isFirst = true;

                    foreach (string statement in OnWindowUnloadStatements)
                    {
                        if (!isFirst)
                        {
                            writer.WriteLine();
                        }

                        writer.Write(statement);

                        isFirst = false;
                    }

                    writer.WriteLine(cleanUpScripts); // write clean up scripts

                    writer.WriteLine(ScriptWrapper.OnPageUnloadEnd);
                }

                writer.Write("//]]>{0}</script>".FormatWith(Environment.NewLine));
            }
        }

        private StringBuilder WriteCleanUpScripts()
        {
            bool isFirst = true;

            StringWriter cleanupWriter = new StringWriter();

            foreach (IScriptableComponent component in scriptableComponents)
            {
                if (!isFirst)
                {
                    cleanupWriter.WriteLine();
                }

                component.WriteCleanupScript(cleanupWriter);

                isFirst = false;
            }

            return cleanupWriter.GetStringBuilder();
        }

        private void CopyScriptFilesFromComponents()
        {
            foreach (IScriptableComponent component in scriptableComponents)
            {
                string assetKey = string.IsNullOrEmpty(component.AssetKey) ? "default" : component.AssetKey;
                string filesPath = component.ScriptFilesPath;

                if (assetKey.IsCaseInsensitiveEqual("default") && WebAssetDefaultSettings.ScriptFilesPath.IsCaseInsensitiveEqual(filesPath))
                {
                    if (!DefaultGroup.DefaultPath.IsCaseInsensitiveEqual(WebAssetDefaultSettings.ScriptFilesPath))
                    {
                        filesPath = DefaultGroup.DefaultPath;
                    }
                }

                component.ScriptFileNames.Each(source =>
                {
                    var include = !CombinedComponentFile;

                    if (ValidationScriptFileNames.Contains(source))
                    {
                        include = !ExcludeValidationScripts;
                    }

                    if (include) 
                    {
                        Scripts.Add(assetKey, PathHelper.CombinePath(filesPath, source));
                    }
                });

                if (CombinedComponentFile)
                {
                    Scripts.Add(assetKey, PathHelper.CombinePath(filesPath, "telerik.all.js"));
                }
            }
        }

        private void CopyFrameworkScriptFiles()
        {
            if (!ExcludeFrameworkScripts)
            {
                FrameworkScriptFileNames.Reverse().Each(source => DefaultGroup.Items.Insert(0, new WebAsset(PathHelper.CombinePath(DefaultGroup.DefaultPath, source))));
            }
        }
    }
}