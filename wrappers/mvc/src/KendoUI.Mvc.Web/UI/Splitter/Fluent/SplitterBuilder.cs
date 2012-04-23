// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    using System;
    using Telerik.Web.Mvc.Infrastructure;

    public class SplitterBuilder : ViewComponentBuilderBase<Splitter, SplitterBuilder>, IHideObjectMembers
    {
        public SplitterBuilder(Splitter component)
            : base(component)
        {
        }

        /// <summary>
        /// Sets the splitter orientation.
        /// </summary>
        /// <param name="value">The desired orientation.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Splitter()
        ///             .Name("Splitter")
        ///             .Orientation(SplitterOrientation.Vertical)
        /// %&gt;
        /// </code>
        /// </example>
        public SplitterBuilder Orientation(SplitterOrientation value)
        {
            Component.Orientation = value;

            return this;
        }

        /// <summary>
        /// Defines the panes in the splitter.
        /// </summary>
        /// <param name="configurePanes">The action that configures the panes.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Splitter()
        ///             .Name("Splitter")
        ///             .Panes(panes => {
        ///                 panes.Add().LoadContentFrom("Navigation", "Shared");
        ///                 panes.Add().LoadContentFrom("Index", "Home");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public SplitterBuilder Panes(Action<SplitterPaneFactory> configurePanes)
        {
            Guard.IsNotNull(configurePanes, "configurePanes");

            var paneFactory = new SplitterPaneFactory(Component, Component.ViewContext);

            configurePanes(paneFactory);

            return this;
        }

        /// <summary>
        /// Configures the client events for the splitter.
        /// </summary>
        /// <param name="configureClientEvents">The action that configures the client events.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Splitter()
        ///             .Name("Splitter")
        ///             .ClientEvents(events => events
        ///                 .OnLoad("onLoad")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public SplitterBuilder ClientEvents(Action<SplitterClientEventsBuilder> configureClientEvents)
        {
            Guard.IsNotNull(configureClientEvents, "configureClientEvents");

            var clientEventsBuilder = new SplitterClientEventsBuilder(Component.ClientEvents);

            configureClientEvents(clientEventsBuilder);

            return this;
        }
    }
}