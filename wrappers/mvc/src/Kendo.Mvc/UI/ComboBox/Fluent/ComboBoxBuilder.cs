namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="ComboBox"/> component.
    /// </summary>
    public class ComboBoxBuilder : DropDownListBuilderBase<ComboBox, ComboBoxBuilder>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ComboBoxBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public ComboBoxBuilder(ComboBox component)
            : base(component)
        {
        }

        public ComboBoxBuilder AutoBind(bool autoBind)
        {
            Component.AutoBind = autoBind;

            return this;
        }

        public ComboBoxBuilder DataValueField(string field)
        {
            Component.DataValueField = field;

            return this;
        }

        /// <summary>
        /// Use it to enable filtering of items.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ComboBox()
        ///             .Name("ComboBox")
        ///             .Filter("startswith");
        /// %&gt;
        /// </code>
        /// </example>
        public ComboBoxBuilder Filter(string filter)
        {
            Component.Filter = filter;

            return this;
        }

        /// <summary>
        /// Use it to enable filtering of items.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ComboBox()
        ///             .Name("ComboBox")
        ///             .Filter(FilterType.Contains);
        /// %&gt;
        /// </code>
        /// </example>
        public ComboBoxBuilder Filter(FilterType filter)
        {
            Component.Filter = filter.ToString().ToLower();

            return this;
        }

        /// <summary>
        /// Use it to enable highlighting of first matched item.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ComboBox()
        ///             .Name("ComboBox")
        ///             .HighlightFirst(true)
        /// %&gt;
        /// </code>
        /// </example>
        public ComboBoxBuilder HighlightFirst(bool highlightFirst)
        {
            Component.HighlightFirst = highlightFirst;

            return this;
        }

        public ComboBoxBuilder MinLength(int length)
        {

            Component.MinLength = length;

            return this;
        }
        
        /// <summary>
        /// Use it to set selected item index
        /// </summary>
        /// <param name="index">Item index.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ComboBox()
        ///             .Name("ComboBox")
        ///             .SelectedIndex(0);
        /// %&gt;
        /// </code>
        /// </example>
        public ComboBoxBuilder SelectedIndex(int index)
        {
            if (index != -1)
            {
            }

            Component.SelectedIndex = index;

            return this;
        }

        public ComboBoxBuilder Suggest(bool suggest)
        {
            Component.Suggest = suggest;

            return this;
        }

        public ComboBoxBuilder Placeholder(string placeholder)
        {
            Component.Placeholder = placeholder;

            return this;
        }
    }
}