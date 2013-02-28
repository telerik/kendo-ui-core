using Kendo.Mvc.UI.Fluent;
using System;

namespace Kendo.Mvc.UI.Fluent
{
        /// <summary>
    /// Defines the fluent interface for configuring the <see cref="AutoComplete"/> component.
    /// </summary>
    public class AutoCompleteBuilder : DropDownListBuilderBase<AutoComplete, AutoCompleteBuilder>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="AutoCompleteBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public AutoCompleteBuilder(AutoComplete component)
            : base(component)
        {
        }

        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="clientEventsAction">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().AutoComplete()
        ///             .Name("AutoComplete")
        ///             .Events(events =>
        ///                 events.Change("change")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public AutoCompleteBuilder Events(Action<AutoCompleteEventBuilder> clientEventsAction)
        {
            clientEventsAction(new AutoCompleteEventBuilder(Component.Events));

            return this;
        }

        /// <summary>
        /// Use it to enable filtering of items.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().AutoComplete()
        ///             .Name("AutoComplete")
        ///             .Filter("startswith");
        /// %&gt;
        /// </code>
        /// </example>
        public AutoCompleteBuilder Filter(string filter)
        {
            Component.Filter = filter;

            return this;
        }

        /// <summary>
        /// Use it to enable filtering of items.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().AutoComplete()
        ///             .Name("AutoComplete")
        ///             .Filter(FilterType.Contains);
        /// %&gt;
        /// </code>
        /// </example>
        public AutoCompleteBuilder Filter(FilterType filter)
        {
            Component.Filter = filter.ToString().ToLower();

            return this;
        }

        /// <summary>
        /// Use it to enable highlighting of first matched item.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().AutoComplete()
        ///             .Name("AutoComplete")
        ///             .HighlightFirst(true)
        /// %&gt;
        /// </code>
        /// </example>
        public AutoCompleteBuilder HighlightFirst(bool highlightFirst)
        {
            Component.HighlightFirst = highlightFirst;

            return this;
        }

        /// <summary>
        /// Specifies the minimum number of characters that should be typed before the widget queries the dataSource.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().AutoComplete()
        ///             .Name("AutoComplete")
        ///             .MinLength(3)
        /// %&gt;
        /// </code>
        /// </example>
        public AutoCompleteBuilder MinLength(int length)
        {

            Component.MinLength = length;

            return this;
        }

        /// <summary>
        /// A string that appears in the textbox when it has no value.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().AutoComplete()
        ///             .Name("AutoComplete")
        ///             .MinLength(3)
        /// %&gt;
        /// </code>
        /// </example>
        public AutoCompleteBuilder Placeholder(string placeholder)
        {
            Component.Placeholder = placeholder;

            return this;
        }

        /// <summary>
        /// Sets the separator for completion. Empty by default, allowing for only one completion.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().AutoComplete()
        ///             .Name("AutoComplete")
        ///             .Separator(", ")
        /// %&gt;
        /// </code>
        /// </example>
        public AutoCompleteBuilder Separator(string separator)
        {

            Component.Separator = separator;

            return this;
        }

        /// <summary>
        /// Controls whether the AutoComplete should automatically auto-type the rest of text.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().AutoComplete()
        ///             .Name("AutoComplete")
        ///             .Suggest(true)
        /// %&gt;
        /// </code>
        /// </example>
        public AutoCompleteBuilder Suggest(bool suggest)
        {
            Component.Suggest = suggest;

            return this;
        }
    }
}