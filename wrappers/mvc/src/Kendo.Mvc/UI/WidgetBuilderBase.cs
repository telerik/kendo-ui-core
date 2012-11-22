namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Web;
    using System.Web.Mvc;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// View component Builder base class.
    /// </summary>
    public abstract class WidgetBuilderBase<TViewComponent, TBuilder> : IHtmlString, IHideObjectMembers
        where TViewComponent : WidgetBase
        where TBuilder : WidgetBuilderBase<TViewComponent, TBuilder>
    {
        private TViewComponent component;

        /// <summary>
        /// Initializes a new instance of the <see cref="WidgetBuilderBase&lt;TViewComponent, TBuilder&gt;"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public WidgetBuilderBase(TViewComponent component)
        {
            this.component = component;
        }

        /// <summary>
        /// Gets the view component.
        /// </summary>
        /// <value>The component.</value>
        protected internal TViewComponent Component
        {
            get
            {
                return component;
            }
            set
            {
                component = value;
            }
        }

        public static implicit operator TViewComponent(WidgetBuilderBase<TViewComponent, TBuilder> builder)
        {

            return builder.ToComponent();
        }

        /// <summary>
        /// Returns the internal view component.
        /// </summary>
        /// <returns></returns>
        public TViewComponent ToComponent()
        {
            return Component;
        }

        /// <summary>
        /// Sets the name of the component.
        /// </summary>
        /// <param name="componentName">The name.</param>
        /// <returns></returns>
        public virtual TBuilder Name(string componentName)
        {
            Component.Name = componentName;

            return this as TBuilder;
        }

        /// <summary>
        /// Suppress initialization script rendering. Note that this options should be used in conjunction with <see cref="WidgetFactory.DeferredScripts"/>
        /// </summary>        
        /// <returns></returns>
        public virtual TBuilder Deferred()
        {
            Component.HasDeferredInitialization = true;

            return this as TBuilder;
        }

        internal TBuilder ModelMetadata(ModelMetadata modelMetadata)
        {
            Component.ModelMetadata = modelMetadata;

            return this as TBuilder;
        }

        /// <summary>
        /// Sets the HTML attributes.
        /// </summary>
        /// <param name="attributes">The HTML attributes.</param>
        /// <returns></returns>
        public virtual TBuilder HtmlAttributes(object attributes)
        {
            return HtmlAttributes(attributes.ToDictionary());
        }        
        
        /// <summary>
        /// Sets the HTML attributes.
        /// </summary>
        /// <param name="attributes">The HTML attributes.</param>
        /// <returns></returns>
        public virtual TBuilder HtmlAttributes(IDictionary<string, object> attributes)
        {

            Component.HtmlAttributes.Clear();
            Component.HtmlAttributes.Merge(attributes);

            return this as TBuilder;
        }

        /// <summary>
        /// Renders the component.
        /// </summary>
        public virtual void Render()
        {
            Component.Render();
        }

        public string ToHtmlString()
        {
            return ToComponent().ToHtmlString();
        }

        public MvcHtmlString ToClientTemplate()
        {
            return ToComponent().ToClientTemplate();
        }

        public override string ToString()
        {
            return ToHtmlString();
        }
    }
}