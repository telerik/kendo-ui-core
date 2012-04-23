// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Collections.Generic;
    using Telerik.Web.Mvc.Extensions;
    using Telerik.Web.Mvc.Infrastructure;

    /// <summary>
    /// View component Builder base class.
    /// </summary>
    public abstract class ViewComponentBuilderBase<TViewComponent, TBuilder> : ComponentBuilderBase<TViewComponent, TBuilder>, IHideObjectMembers
        where TViewComponent : ViewComponentBase
        where TBuilder : ViewComponentBuilderBase<TViewComponent, TBuilder>
    {
        private TViewComponent component;

        /// <summary>
        /// Initializes a new instance of the <see cref="ViewComponentBuilderBase&lt;TViewComponent, TBuilder&gt;"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        protected ViewComponentBuilderBase(TViewComponent component)
        {
            Guard.IsNotNull(component, "component");
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

        /// <summary>
        /// Performs an implicit conversion from <see cref="Telerik.Web.Mvc.UI.ViewComponentBuilderBase&lt;TViewComponent,TBuilder&gt;"/> to TViewComponent.
        /// </summary>
        /// <param name="builder">The builder.</param>
        /// <returns>The result of the conversion.</returns>
        public static implicit operator TViewComponent(ViewComponentBuilderBase<TViewComponent, TBuilder> builder)
        {
            Guard.IsNotNull(builder, "builder");

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
        /// Sets the web asset key for the component.
        /// </summary>
        /// <param name="key">The key.</param>
        /// <returns></returns>
        public virtual TBuilder AssetKey(string key)
        {
            Component.AssetKey = key;

            return this as TBuilder;
        }

        /// <summary>
        /// Sets the Scripts files path.. Path must be a virtual path.
        /// </summary>
        /// <param name="path">The path.</param>
        /// <returns></returns>
        public virtual TBuilder ScriptFilesPath(string path)
        {
            Component.ScriptFilesPath = path;

            return this as TBuilder;
        }

        /// <summary>
        /// Sets the Script file names.
        /// </summary>
        /// <param name="names">The names.</param>
        /// <returns></returns>
        public virtual TBuilder ScriptFileNames(params string[] names)
        {
            Guard.IsNotNullOrEmpty(names, "names");

            Component.ScriptFileNames.Clear();
            Component.ScriptFileNames.AddRange(names);

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
            Guard.IsNotNull(attributes, "attributes");

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

        public override string ToString()
        {
            return ToHtmlString();
        }
    }
}