namespace Kendo.Mvc.UI.Fluent
{
    using System;

    public class EditorBuilder : WidgetBuilderBase<Editor, EditorBuilder>, IHideObjectMembers
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
        ///  &lt;% Html.Kendo().Editor()
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

            Component.Template.Content = value;

            return this;
        }
        
        public EditorBuilder Value(Func<object, object> value)
        {

            Component.Template.InlineTemplate = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the item should display as a string.
        /// </summary>
        /// <param name="value">An HTML string.</param>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Editor()
        ///             .Name("Editor")
        ///             .Value("&lt;blockquote&gt;A towel has &lt;strong&gt;immense&lt;/strong&gt; psychological value&lt;/blockquote&gt;")
        /// %&gt;
        /// </code>        
        public EditorBuilder Value(string value)
        {
            Component.Template.Html = value;

            return this;
        }
        
        public EditorBuilder Events(Action<EditorEventBuilder> configurator)
        {

            configurator(new EditorEventBuilder(Component.Events));

            return this;
        }

        public EditorBuilder Tools(Action<EditorToolFactory> configurator)
        {

            configurator(new EditorToolFactory(Component.DefaultToolGroup));

            return this;
        }

        /// <summary>
        /// Encode HTML content.
        /// </summary>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Editor()
        ///             .Name("Editor")
        ///             .Value("&lt;blockquote&gt;A towel has &lt;strong&gt;immense&lt;/strong&gt; psychological value&lt;/blockquote&gt;")
        ///             .Encode(true)
        /// %&gt;
        /// </code>   
        public EditorBuilder Encode(bool value)
        {
            Component.Encode = value;

            return this;
        }

        public EditorBuilder Messages(Action<EditorMessagesBuilder> configurator)
        {
            configurator(new EditorMessagesBuilder(Component.Messages));

            return this;
        }

        /// <summary>
        /// Sets the CSS files that will be registered in the Editor's iframe
        /// </summary>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Editor()
        ///             .Name("Editor")
        ///             .StyleSheets(styleSheets => styleSheets.Add("editorStyles.css"))
        /// %&gt;
        /// </code>        
        public EditorBuilder StyleSheets(Action<EditorStyleSheetBuilder> configurator)
        {
            configurator(new EditorStyleSheetBuilder(Component.StyleSheets));

            return this;
        }

        public EditorBuilder FileBrowser(Action<EditorFileBrowserSettingsBuilder> configurator)
        {
            var builder = new EditorFileBrowserSettingsBuilder(Component.FileBrowserSettings, Component.ViewContext, Component.UrlGenerator);

            configurator(builder);

            return this;
        }
    }
}