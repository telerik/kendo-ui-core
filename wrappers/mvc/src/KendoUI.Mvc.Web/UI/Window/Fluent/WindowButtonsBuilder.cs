// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Window.Buttons"/>.
    /// </summary>
    public class WindowButtonsBuilder
    {
        private readonly IWindowButtonsContainer container;

        /// <summary>
        /// Initializes a new instance of the <see cref="WindowButtonsBuilder"/> class.
        /// </summary>
        /// <param name="container">The <see cref="IWindowButton" /> instance that is to be configured</param>
        public WindowButtonsBuilder(IWindowButtonsContainer container)
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
        ///             .Buttons(buttons => buttons.Close())
        /// %&gt;
        /// </code>
        /// </example>
        public WindowButtonsBuilder Close() 
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
        ///             .Buttons(buttons => buttons.Close(Url.Action("Home", "Index")))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowButtonsBuilder Close(string url)
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
        ///             .Buttons(buttons => buttons.Maximize())
        /// %&gt;
        /// </code>
        /// </example>
        public WindowButtonsBuilder Maximize()
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
        ///             .Buttons(buttons => buttons.Maximize(Url.Action("Home", "Index")))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowButtonsBuilder Maximize(string url)
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
        ///             .Buttons(buttons => buttons.Refresh())
        /// %&gt;
        /// </code>
        /// </example>
        public WindowButtonsBuilder Refresh()
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
        ///             .Buttons(buttons => buttons.Refresh(Url.Action("Home", "Index")))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowButtonsBuilder Refresh(string url)
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
        ///             .Buttons(buttons => buttons.Clear())
        /// %&gt;
        /// </code>
        /// </example>
        public WindowButtonsBuilder Clear()
        {
            return ClearButtons();
        }

        private WindowButtonsBuilder AddButton(string name, string cssClass, string url)
        {
            container.Container.Add(new HeaderButton { Name = name, CssClass = cssClass, Url = url });

            return this;
        }

        private WindowButtonsBuilder ClearButtons()
        {
            container.Container.Clear();

            return this;
        }
    }
}
