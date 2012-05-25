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
        protected ViewComponentBase(ViewContext viewContext, IClientSideObjectWriterFactory clientSideObjectWriterFactory, ViewDataDictionary viewData = null)
        {
            ViewContext = viewContext;
            ViewData = viewData ?? viewContext.ViewData;
            ClientSideObjectWriterFactory = clientSideObjectWriterFactory;

            HtmlAttributes = new RouteValueDictionary();

            IsSelfInitialized = true;

            Events = new Dictionary<string, object>();
        }

        public IJavaScriptInitializer Initializer
        {
            get;
            set;
        }

        protected ViewComponentBase(ViewContext viewContext, IJavaScriptInitializer initializer, ViewDataDictionary viewData = null)
            : this(viewContext, (IClientSideObjectWriterFactory)null, viewData)
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
                return TagBuilder.CreateSanitizedId(HtmlAttributes.ContainsKey("id") ? (string)HtmlAttributes["id"] : Name);
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

            this.ThrowIfClassIsPresent("k-" + GetType().GetTypeName().ToLowerInvariant() + "-rtl", TextResource.Rtl);
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
                writer.RenderBeginTag(HtmlTextWriterTag.Script);
                WriteInitializationScript(writer);
                writer.RenderEndTag();
            }
        }
    }
}