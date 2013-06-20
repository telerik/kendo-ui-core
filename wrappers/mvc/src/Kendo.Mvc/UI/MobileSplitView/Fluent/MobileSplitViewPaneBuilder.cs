namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the MobileSplitViewPane settings.
    /// </summary>
    public class MobileSplitViewPaneBuilder: IHideObjectMembers
    {
        private readonly MobileSplitViewPane container;

        public MobileSplitViewPaneBuilder(MobileSplitViewPane settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The id of tha pane.
        /// </summary>
        /// <param name="value">The value that configures the id.</param>
        public MobileSplitViewPaneBuilder Id(string value)
        {
            container.Id = value;

            return this;
        }
        
        /// <summary>
        /// The value that configures the initial.
        /// </summary>
        /// <param name="value">The value that configures the initial.</param>
        public MobileSplitViewPaneBuilder Initial(string value)
        {
            container.Initial = value;

            return this;
        }
        
        /// <summary>
        /// The value that configures the layout.
        /// </summary>
        /// <param name="value">The value that configures the layout.</param>
        public MobileSplitViewPaneBuilder Layout(string value)
        {
            container.Layout = value;

            return this;
        }
        
        /// <summary>
        /// The text displayed in the loading popup. Setting this value to false will disable the loading popup.
        /// </summary>
        /// <param name="value">The value that configures the loading.</param>
        public MobileSplitViewPaneBuilder Loading(string value)
        {
            container.Loading = value;

            return this;
        }
        
        /// <summary>
        /// The default View transition.
        /// </summary>
        /// <param name="value">The value that configures the transition.</param>
        public MobileSplitViewPaneBuilder Transition(string value)
        {
            container.Transition = value;

            return this;
        }
        
        //<< Fields

        /// <summary>
        /// Sets the HTML content which the pane should display.
        /// </summary>
        /// <param name="value">The action which renders the content.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().MobileSplitView()
        ///            .Name("View")
        ///            .Panes(panes => panes.Add()
        ///                 .Content(() =>
        ///                          {
        ///                              %&gt;
        ///                                  &lt;strong&gt; View Content &lt;/strong&gt;
        ///                              &lt;%
        ///                          })
        ///                 )
        ///            .Render();
        /// %&gt;
        /// </code>
        public MobileSplitViewPaneBuilder Content(Action value)
        {
            container.Content.Content = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the pane should display.
        /// </summary>
        /// <param name="value">The content wrapped in a regular HTML tag or text tag (Razor syntax).</param>
        /// <code lang="CS">
        ///  @(Html.Kendo().MobileSplitView()
        ///       .Name("View")
        ///       .Panes(panes => panes.Add()
        ///         .Content(
        ///               @&lt;text&gt;
        ///                       Some text
        ///                       &lt;strong&gt; View Content &lt;/strong&gt;
        ///               &lt;/text&gt;        
        ///         ))
        ///  )
        /// </code>
        public MobileSplitViewPaneBuilder Content(Func<object, object> value)
        {
            container.Content.InlineTemplate = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the pane should display as a string.
        /// </summary>
        /// <param name="value">The action which renders the view content.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().MobileSplitView()
        ///            .Name("View")
        ///            .Panes(panes => panes.Add().Content("&lt;strong&gt; View Content &lt;/strong&gt;"))
        ///            .Render();
        /// %&gt;
        /// </code>
        public MobileSplitViewPaneBuilder Content(string value)
        {

            container.Content.Html = value;

            return this;
        }
        
        /// <summary>
        /// Sets the HTML attributes.
        /// </summary>
        /// <param name="attributes">The HTML attributes.</param>
        /// <returns></returns>
        public virtual MobileSplitViewPaneBuilder HtmlAttributes(object attributes)
        {
            return HtmlAttributes(attributes.ToDictionary());
        }

        /// <summary>
        /// Sets the HTML attributes.
        /// </summary>
        /// <param name="attributes">The HTML attributes.</param>
        /// <returns></returns>
        public virtual MobileSplitViewPaneBuilder HtmlAttributes(IDictionary<string, object> attributes)
        {

            container.HtmlAttributes.Clear();
            container.HtmlAttributes.Merge(attributes);

            return this;
        }

        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().MobileSplitView()
        ///             .Name("MobileSplitView")
        ///             .Panes(panes => panes.Add()
        ///                 .Events(events => events
        ///                     .Navigate("onNavigate")
        ///                 ))
        /// %&gt;
        /// </code>
        /// </example>
        public MobileSplitViewPaneBuilder Events(Action<MobileSplitViewPaneEventBuilder> configurator)
        {

            configurator(new MobileSplitViewPaneEventBuilder(container.Events));

            return this;
        }
    }
}

