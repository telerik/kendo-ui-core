namespace KendoUI.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.Routing;
    using System.Web.UI;
    using KendoUI.Mvc.Extensions;
    using KendoUI.Mvc.Infrastructure;
    using KendoUI.Mvc.Resources;

    /// <summary>
    /// View component base class.
    /// </summary>
    public abstract class ViewComponentBase : IViewComponent, IScriptableComponent, IHtmlAttributesContainer
    {
        private string name;

        /// <summary>
        /// Initializes a new instance of the <see cref="ViewComponentBase"/> class.
        /// </summary>
        /// <param name="viewContext">The view context.</param>
        /// <param name="clientSideObjectWriterFactory">The client side object writer factory.</param>
        protected ViewComponentBase(ViewContext viewContext, IClientSideObjectWriterFactory clientSideObjectWriterFactory)
        {
            Guard.IsNotNull(viewContext, "viewContext");
            Guard.IsNotNull(clientSideObjectWriterFactory, "clientSideObjectWriterFactory");

            ViewContext = viewContext;
            ClientSideObjectWriterFactory = clientSideObjectWriterFactory;

            ScriptFileNames = new List<string>();

            HtmlAttributes = new RouteValueDictionary();

            IsSelfInitialized = (ViewContext.HttpContext.Items["$SelfInitialize$"] != null) || ViewContext.HttpContext.Request.IsAjaxRequest();
        }

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
                Guard.IsNotNullOrEmpty(value, "value");
                if (value.Contains("<#="))
                {
                    IsSelfInitialized = true;
                }
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
                return HtmlAttributes.ContainsKey("id") ?
                       (string)HtmlAttributes["id"] :
                       (!string.IsNullOrEmpty(Name) ? Name.Replace(".", HtmlHelper.IdAttributeDotReplacement) : null);
            }
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
        /// Gets or sets the asset key.
        /// </summary>
        /// <value>The asset key.</value>
        public string AssetKey
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the script file names.
        /// </summary>
        /// <value>The script file names.</value>
        public IList<string> ScriptFileNames
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets the client side object writer factory.
        /// </summary>
        /// <value>The client side object writer factory.</value>
        public IClientSideObjectWriterFactory ClientSideObjectWriterFactory
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

        /// <summary>
        /// Renders the component.
        /// </summary>
        public void Render()
        {
#if MVC1
            var baseWriter = ViewContext.HttpContext.Response.Output;
#else
            var baseWriter = ViewContext.Writer;
#endif
            using (HtmlTextWriter textWriter = new HtmlTextWriter(baseWriter))
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

        /// <summary>
        /// Writes the cleanup script.
        /// </summary>
        /// <param name="writer">The writer.</param>
        public virtual void WriteCleanupScript(TextWriter writer)
        {
        }

        public bool IsSelfInitialized
        {
            get;
            private set;
        }

        public virtual void VerifySettings()
        {
            if (string.IsNullOrEmpty(Name))
            {
                throw new InvalidOperationException(Resources.TextResource.NameCannotBeBlank);
            }

            if (!Name.Contains("<#=") && Name.IndexOf(" ") != -1)
            {
                throw new InvalidOperationException(Resources.TextResource.NameCannotContainSpaces);
            }

            this.ThrowIfClassIsPresent("t-" + GetType().GetTypeName().ToLowerInvariant() + "-rtl", TextResource.Rtl);
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
                writer.AddAttribute(HtmlTextWriterAttribute.Type, "text/javascript");
                writer.RenderBeginTag(HtmlTextWriterTag.Script);

                WriteInitializationScript(writer);
                writer.RenderEndTag();
            }
        }
    }
}