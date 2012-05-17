namespace Kendo.Mvc.UI.Fluent
{
    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Window.Actions"/>.
    /// </summary>
    public class WindowActionsBuilder
    {
        private readonly IWindowButtonsContainer container;

        /// <summary>
        /// Initializes a new instance of the <see cref="WindowActionsBuilder"/> class.
        /// </summary>
        /// <param name="container">The <see cref="IWindowButton" /> instance that is to be configured</param>
        public WindowActionsBuilder(IWindowButtonsContainer container)
        {
            Guard.IsNotNull(container, "container");

            this.container = container;
        }

        /// <summary>
        /// Configures the window to show a close button
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .Actions(buttons => buttons.Close())
        /// %&gt;
        /// </code>
        /// </example>
        public WindowActionsBuilder Close() 
        {
            return this.Close("#");
        }

        /// <summary>
        /// Configures the window to show a close button and sets a fallback URL for environments where JavaScript is turned off.
        /// </summary>
        /// <param name="url">The fallback URL</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .Actions(buttons => buttons.Close(Url.Action("Home", "Index")))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowActionsBuilder Close(string url)
        {
            return AddButton("Close", UIPrimitives.Icons.Close, url);
        }

        /// <summary>
        /// Configures the window to show a minimize button
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .Actions(buttons => buttons.Maximize())
        /// %&gt;
        /// </code>
        /// </example>
        public WindowActionsBuilder Maximize()
        {
            return this.Maximize("#");
        }

        /// <summary>
        /// Configures the window to show a minimize button and sets a fallback URL for environments where JavaScript is turned off.
        /// </summary>
        /// <param name="url">The fallback URL</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .Actions(buttons => buttons.Maximize(Url.Action("Home", "Index")))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowActionsBuilder Maximize(string url)
        {
            return AddButton("Maximize", UIPrimitives.Icons.Maximize, url);
        }

        /// <summary>
        /// Configures the window to show a refresh button
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .Actions(buttons => buttons.Refresh())
        /// %&gt;
        /// </code>
        /// </example>
        public WindowActionsBuilder Refresh()
        {
            return this.Refresh("#");
        }

        /// <summary>
        /// Configures the window to show a refresh button and sets a fallback URL for environments where JavaScript is turned off.
        /// </summary>
        /// <param name="url">The fallback URL</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .Actions(buttons => buttons.Refresh(Url.Action("Home", "Index")))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowActionsBuilder Refresh(string url)
        {
            return AddButton("Refresh", UIPrimitives.Icons.Refresh, url);
        }

        /// <summary>
        /// Configures the window to show no buttons in its titlebar.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .Actions(buttons => buttons.Clear())
        /// %&gt;
        /// </code>
        /// </example>
        public WindowActionsBuilder Clear()
        {
            return ClearButtons();
        }

        private WindowActionsBuilder AddButton(string name, string cssClass, string url)
        {
            container.Container.Add(new HeaderButton { Name = name, CssClass = cssClass, Url = url });

            return this;
        }

        private WindowActionsBuilder ClearButtons()
        {
            container.Container.Clear();

            return this;
        }
    }
}
