namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.Routing;
    using System.Web.UI;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Resources;

    public abstract class WidgetBase : IWidget, IScriptableComponent
    {
        internal static readonly string DeferredScriptsKey = "$DeferredScriptsKey$";

        private string name;        

        /// <summary>
        /// Initializes a new instance of the <see cref="WidgetBase"/> class.
        /// </summary>
        /// <param name="viewContext">The view context.</param>
        /// <param name="clientSideObjectWriterFactory">The client side object writer factory.</param>
        protected WidgetBase(ViewContext viewContext, ViewDataDictionary viewData = null)
        {
            ViewContext = viewContext;
            ViewData = viewData ?? viewContext.ViewData;

            HtmlAttributes = new RouteValueDictionary();

            IsSelfInitialized = true;

            Events = new Dictionary<string, object>();
        }

        public IJavaScriptInitializer Initializer
        {
            get;
            set;
        }

        protected WidgetBase(ViewContext viewContext, IJavaScriptInitializer initializer, ViewDataDictionary viewData = null)
            : this(viewContext, viewData)
        {
            Initializer = initializer;
        }

        /// <summary>
        /// Gets the client events of the grid.
        /// </summary>
        /// <value>The client events.</value>
        public IDictionary<string, object> Events { get; private set; }

        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        /// <value>The name.</value>
        public string Name
        {
            get
            {
                return name;
            }

            set
            {                
                name = value;
            }
        }

        /// <summary>
        /// Gets the id.
        /// </summary>
        /// <value>The id.</value>
        public string Id
        {
            get
            {
                // Return from htmlattributes if user has specified
                // otherwise build it from name
                return this.SanitizeId(HtmlAttributes.ContainsKey("id") ? (string)HtmlAttributes["id"] : Name);                
            }
        }

        public ModelMetadata ModelMetadata
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the HTML attributes.
        /// </summary>
        /// <value>The HTML attributes.</value>
        public IDictionary<string, object> HtmlAttributes
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets or sets the view context to rendering a view.
        /// </summary>
        /// <value>The view context.</value>
        public ViewContext ViewContext
        {
            get;
            private set;
        }

        public ViewDataDictionary ViewData
        {
            get;
            private set;
        }

        /// <summary>
        /// Renders the component.
        /// </summary>
        public void Render()
        {
            using (HtmlTextWriter textWriter = new HtmlTextWriter(ViewContext.Writer))
            {
                WriteHtml(textWriter);
            }
        }

        /// <summary>
        /// Writes the initialization script.
        /// </summary>
        /// <param name="writer">The writer.</param>
        public virtual void WriteInitializationScript(TextWriter writer)
        {
            
        }

        public bool IsSelfInitialized
        {
            get;
            private set;
        }

        public bool IsInClientTemplate
        {
            get;
            private set;
        }

        public bool HasDeferredInitialization
        {
            get;
            set;
        }

        public string Selector
        {
            get
            { 
                return (IsInClientTemplate ? "\\#" : "#") + Id;
            }
        }

        public virtual void VerifySettings()
        {
            if (string.IsNullOrEmpty(Name))
            {
                throw new InvalidOperationException(Resources.Exceptions.NameCannotBeBlank);
            }

            if (!Name.Contains("<#=") && Name.IndexOf(" ") != -1)
            {
                throw new InvalidOperationException(Resources.Exceptions.NameCannotContainSpaces);
            }

            this.ThrowIfClassIsPresent("k-" + GetType().GetTypeName().ToLowerInvariant() + "-rtl", Exceptions.Rtl);
        }

        public string ToHtmlString()
        {
            using (var output = new StringWriter())
            {
                WriteHtml(new HtmlTextWriter(output));
                return output.ToString();
            }
        }

        /// <summary>
        /// Writes the HTML.
        /// </summary>
        protected virtual void WriteHtml(HtmlTextWriter writer)
        {
            VerifySettings();

            if (IsSelfInitialized)
            {
                if (HasDeferredInitialization)
                {
                    WriteDeferredScriptInitialization();            
                }
                else 
                {
                    writer.RenderBeginTag(HtmlTextWriterTag.Script);
                    WriteInitializationScript(writer);
                    writer.RenderEndTag();
                }
            }
        }

        protected virtual void WriteDeferredScriptInitialization() 
        {
            var scripts = new StringWriter();
            WriteInitializationScript(scripts);
            AppendScriptToContext(scripts.ToString());
        }

        private void AppendScriptToContext(string script)
        {
            var items = ViewContext.HttpContext.Items;
            var current = "";
            if (items.Contains(DeferredScriptsKey))
            {
                current = (string)items[DeferredScriptsKey];
            }
            items[DeferredScriptsKey] = current + script;
        }

        public MvcHtmlString ToClientTemplate()
        {
            IsInClientTemplate = true;
            return MvcHtmlString.Create(ToHtmlString().Replace("</script>", "<\\/script>"));
        }
    }
}