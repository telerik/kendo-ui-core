namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="ComboBox"/> component.
    /// </summary>
    public class ComboBoxBuilder : DropDownBuilderBase<ComboBox, ComboBoxBuilder>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ComboBoxBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public ComboBoxBuilder(ComboBox component)
            : base(component)
        {
        }

        /// <summary>
        /// Use it to enable filtering of items.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().ComboBox()
        ///             .Name("ComboBox")
        ///             .Filterable();
        /// %&gt;
        /// </code>
        /// </example>
        public ComboBoxBuilder Filterable()
        {
            Component.Filtering.Enabled = true;

            return this;
        }

        /// <summary>
        /// Use it to configure filtering settings.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().ComboBox()
        ///             .Name("ComboBox")
        ///             .Filterable(filtering => filtering.Enabled(true)
        ///                                               .FilterMode(AutoCompleteFilterMode.Contains));
        /// %&gt;
        /// </code>
        /// </example>
        public ComboBoxBuilder Filterable(Action<ComboBoxFilterSettingsBuilder> filtering)
        {
            Guard.IsNotNull(filtering, "filtering");

            filtering(new ComboBoxFilterSettingsBuilder(Component.Filtering));

            return this;
        }

        /// <summary>
        /// Sets the HTML attributes of the input element.
        /// </summary>
        /// <param name="attributes">The HTML attributes.</param>
        public ComboBoxBuilder InputHtmlAttributes(object attributes)
        {
            return InputHtmlAttributes(attributes.ToDictionary());
        }

        /// <summary>
        /// Sets the HTML attributes of the input element.
        /// </summary>
        /// <param name="attributes">The HTML attributes.</param>
        public ComboBoxBuilder InputHtmlAttributes(IDictionary<string, object> attributes)
        {
            Guard.IsNotNull(attributes, "attributes");

            Component.InputHtmlAttributes.Clear();
            Component.InputHtmlAttributes.Merge(attributes);

            return this;
        }

        /// <summary>
        /// Use it to enable filling the first matched item text.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().ComboBox()
        ///             .Name("ComboBox")
        ///             .AutoFill(true)
        /// %&gt;
        /// </code>
        /// </example>
        public ComboBoxBuilder AutoFill(bool autoFill)
        {
            Guard.IsNotNull(autoFill, "autoFill");

            Component.AutoFill = autoFill;

            return this;
        }

        /// <summary>
        /// Use it to enable case insensitive bahavior of the combobox. If true the combobox will select the first matching item ignoring its casing.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().ComboBox()
        ///             .Name("ComboBox")
        ///             .IgnoreCase(true)
        /// %&gt;
        /// </code>
        /// </example>
        public ComboBoxBuilder IgnoreCase(bool ignoreCase)
        {
            Guard.IsNotNull(ignoreCase, "ignoreCase");

            Component.IgnoreCase = ignoreCase;

            return this;
        }

        /// <summary>
        /// Use it to configure Data binding.
        /// </summary>
        /// <param name="configurator">Action that configures the data binding options.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().ComboBox()
        ///             .Name("ComboBox")
        ///             .DataBinding(dataBinding => dataBinding
        ///                .Ajax().Select("_AjaxLoading", "ComboBox")
        ///             );
        /// %&gt;
        /// </code>
        /// </example>
        public ComboBoxBuilder DataBinding(Action<AutoCompleteDataBindingConfigurationBuilder> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new AutoCompleteDataBindingConfigurationBuilder(Component.DataBinding));

            return this;
        }

        /// <summary>
        /// Use it to enable highlighting of first matched item.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().ComboBox()
        ///             .Name("ComboBox")
        ///             .HighlightFirstMatch(true)
        /// %&gt;
        /// </code>
        /// </example>
        public ComboBoxBuilder HighlightFirstMatch(bool highlightFirstMatch)
        {
            Guard.IsNotNull(highlightFirstMatch, "highlightFirstMatch");

            Component.HighlightFirstMatch = highlightFirstMatch;

            return this;
        }

        /// <summary>
        /// Use it to set selected item index
        /// </summary>
        /// <param name="index">Item index.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().ComboBox()
        ///             .Name("ComboBox")
        ///             .SelectedIndex(0);
        /// %&gt;
        /// </code>
        /// </example>
        public ComboBoxBuilder SelectedIndex(int index)
        {
            if(index != -1) Guard.IsNotNegative(index, "index");

            Component.SelectedIndex = index;

            return this;
        }

        /// <summary>
        /// Enables or disables the combobox.
        /// </summary>
        public ComboBoxBuilder Enable(bool value)
        {
            Component.Enabled = value;

            return this;
        }


        /// <summary>
        /// Sets whether to open items list on focus.
        /// </summary>
        public ComboBoxBuilder OpenOnFocus(bool value)
        {
            Component.OpenOnFocus = value;

            return this;
        }
    }
}