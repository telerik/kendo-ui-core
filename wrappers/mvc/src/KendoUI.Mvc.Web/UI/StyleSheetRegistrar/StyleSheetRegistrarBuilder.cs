// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.ComponentModel;

    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="StyleSheetRegistrar"/> component.
    /// </summary>
    public class StyleSheetRegistrarBuilder : ComponentBuilderBase<StyleSheetRegistrar, StyleSheetRegistrarBuilder>, IHideObjectMembers
    {
        private readonly StyleSheetRegistrar styleSheetRegistrar;

        /// <summary>
        /// Initializes a new instance of the <see cref="StyleSheetRegistrarBuilder"/> class.
        /// </summary>
        /// <param name="styleSheetRegistrar">The style sheet registrar.</param>
        public StyleSheetRegistrarBuilder(StyleSheetRegistrar styleSheetRegistrar)
        {
            Guard.IsNotNull(styleSheetRegistrar, "styleSheetRegistrar");

            this.styleSheetRegistrar = styleSheetRegistrar;
        }

        /// <summary>
        /// Performs an implicit conversion from <see cref="StyleSheetRegistrarBuilder"/> to <see cref="StyleSheetRegistrar"/>.
        /// </summary>
        /// <param name="builder">The builder.</param>
        /// <returns>The result of the conversion.</returns>
        public static implicit operator StyleSheetRegistrar(StyleSheetRegistrarBuilder builder)
        {
            Guard.IsNotNull(builder, "builder");

            return builder.ToRegistrar();
        }

        /// <summary>
        /// Returns the internal style sheet registrar.
        /// </summary>
        /// <returns></returns>
        [EditorBrowsable(EditorBrowsableState.Never)]
        public StyleSheetRegistrar ToRegistrar()
        {
            return styleSheetRegistrar;
        }

        /// <summary>
        /// Sets the asset handler path. Path must be a virtual path.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().StyleSheetRegistrar()
        ///            .AssetHandlerPath("~/asset.axd")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual StyleSheetRegistrarBuilder AssetHandlerPath(string value)
        {
            styleSheetRegistrar.AssetHandlerPath = value;

            return this;
        }

        /// <summary>
        /// Configures the <see cref="StyleSheetRegistrar.DefaultGroup"/>.
        /// </summary>
        /// <param name="configureAction">The configure action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().StyleSheetRegistrar()
        ///            .DefaultGroup(group => group
        ///                 .Add("style1.css")
        ///                 .Add("style2.css")
        ///                 .Combined(true)
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public virtual StyleSheetRegistrarBuilder DefaultGroup(Action<WebAssetGroupBuilder> configureAction)
        {
            Guard.IsNotNull(configureAction, "configureAction");

            WebAssetGroupBuilder builder = new WebAssetGroupBuilder(styleSheetRegistrar.DefaultGroup);
            configureAction(builder);

            return this;
        }

        /// <summary>
        /// Executes the provided delegate that is used to register the stylesheet files fluently.
        /// </summary>
        /// <param name="configureAction">The configure action.</param>
        /// <returns></returns>
        public virtual StyleSheetRegistrarBuilder StyleSheets(Action<WebAssetCollectionBuilder> configureAction)
        {
            Guard.IsNotNull(configureAction, "configureAction");

            WebAssetCollectionBuilder builder = new WebAssetCollectionBuilder(WebAssetType.StyleSheet, styleSheetRegistrar.StyleSheets);

            configureAction(builder);

            return this;
        }

        /// <summary>
        /// Renders the <see cref="StyleSheetRegistrar"/>
        /// </summary>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().StyleSheetRegistrar()
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public virtual void Render()
        {
            styleSheetRegistrar.Render();
        }

        public string ToHtmlString()
        {
            return styleSheetRegistrar.ToHtmlString();
        }

        public override string ToString()
        {
            return ToHtmlString();
        }
    }
}