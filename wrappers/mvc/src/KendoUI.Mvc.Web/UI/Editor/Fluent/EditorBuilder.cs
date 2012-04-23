// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    using System;
    using Telerik.Web.Mvc.Infrastructure;
    using System.Globalization;

    public class EditorBuilder : ViewComponentBuilderBase<Editor, EditorBuilder>, IHideObjectMembers
    {
        public EditorBuilder(Editor component)
            : base(component)
        {
        }

        /// <summary>
        /// Sets the HTML content that will show initially in the editor.
        /// </summary>
        /// <param name="value">The action which renders the HTML content.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Editor()
        ///            .Name("Editor")
        ///            .Value(() => { %&gt;
        ///                &lt;blockquote&gt;
        ///                    According to Deep Thought, the answer to the ultimate question of
        ///                    life, the universe and everything is &lt;strong&gt;42&lt;/strong&gt;.
        ///                &lt;/blockquote&gt;
        ///             &lt;% })
        ///            .Render();
        /// %&gt;
        /// </code>        
        public EditorBuilder Value(Action value)
        {
            Guard.IsNotNull(value, "value");

            Component.Template.Content = value;

            return this;
        }
        
        public EditorBuilder Value(Func<object, object> value)
        {
            Guard.IsNotNull(value, "value");

            Component.Template.InlineTemplate = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the item should display as a string.
        /// </summary>
        /// <param name="value">An HTML string.</param>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Editor()
        ///             .Name("Editor")
        ///             .Value("&lt;blockquote&gt;A towel has &lt;strong&gt;immense&lt;/strong&gt; psychological value&lt;/blockquote&gt;")
        /// %&gt;
        /// </code>        
        public EditorBuilder Value(string value)
        {
            Component.Template.Html = value;

            return this;
        }
        
        public EditorBuilder ClientEvents(Action<EditorClientEventsBuilder> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new EditorClientEventsBuilder(Component.ClientEvents));

            return this;
        }

        public EditorBuilder Tools(Action<EditorToolFactory> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new EditorToolFactory(Component.DefaultToolGroup));

            return this;
        }

        /// <summary>
        /// Encode HTML content.
        /// </summary>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Editor()
        ///             .Name("Editor")
        ///             .Value("&lt;blockquote&gt;A towel has &lt;strong&gt;immense&lt;/strong&gt; psychological value&lt;/blockquote&gt;")
        ///             .Encode(true)
        /// %&gt;
        /// </code>   
        public EditorBuilder Encode(bool value)
        {
            Guard.IsNotNull(value, "value");

            Component.Encode = value;

            return this;
        }

        public virtual EditorBuilder StyleSheets(Action<WebAssetGroupBuilder> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            var builder = new WebAssetGroupBuilder(Component.StyleSheets);
            configurator(builder);

            return this;
        }

        /// <summary>
        /// Sets the localization culture of the editor.
        /// </summary>
        /// <param name="culture">The culture.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Editor()
        ///             .Name("Editor")
        ///             .Value("&lt;blockquote&gt;A towel has &lt;strong&gt;immense&lt;/strong&gt; psychological value&lt;/blockquote&gt;")
        ///             .Localizable("de-DE")
        /// %&gt;
        /// </code>
        /// </example>
        public EditorBuilder Localizable(string culture)
        {
            var localizationServiceFactory = DI.Current.Resolve<ILocalizationServiceFactory>();
            var cultureInfo = new CultureInfo(culture);
            
            Component.Localization = new EditorLocalization(localizationServiceFactory.Create("EditorLocalization", cultureInfo), cultureInfo);

            return this;
        }

        public EditorBuilder FileBrowser(Action<EditorFileBrowserSettingsBuilder> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            var builder = new EditorFileBrowserSettingsBuilder(Component.FileBrowserSettings);
            
            configurator(builder);

            return this;
        }
    }
}