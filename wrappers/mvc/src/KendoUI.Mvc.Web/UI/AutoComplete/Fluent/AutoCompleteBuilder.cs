// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI.Fluent
{
    using System;

    using Extensions;
    using Infrastructure;
    
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="AutoComplete"/> component.
    /// </summary>
    public class AutoCompleteBuilder : ViewComponentBuilderBase<AutoComplete, AutoCompleteBuilder>, IHideObjectMembers
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
        /// Use it to enable filling the first matched item text.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().AutoComplete()
        ///             .Name("AutoComplete")
        ///             .AutoFill(true)
        /// %&gt;
        /// </code>
        /// </example>
        public AutoCompleteBuilder AutoFill(bool autoFill)
        {
            Guard.IsNotNull(autoFill, "autoFill");

            Component.AutoFill = autoFill;

            return this;
        }

        /// <summary>
        /// Binds the AutoComplete to a List{string}.
        /// </summary>
        /// <param name="dataSource">The data source.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().AutoComplete()
        ///             .Name("AutoComplete")
        ///             .BindTo(new List<string>
        ///             {
        ///                 "ComboBox",
        ///                 "DropDownList",
        ///                 "AutoComplete"
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public AutoCompleteBuilder BindTo(IEnumerable<string> dataSource)
        {
            Guard.IsNotNull(dataSource, "dataSource");

            Component.Items.Clear();

            foreach (string item in dataSource)
            {
                Component.Items.Add(item);
            }

            return this;
        }

        /// <summary>
        /// Use it to configure Data binding.
        /// </summary>
        /// <param name="configurator">Action that configures the data binding options.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().AutoComplete()
        ///             .Name("AutoComplete")
        ///             .DataBinding(dataBinding => dataBinding
        ///                .Ajax().Select("_AjaxLoading", "ComboBox")
        ///             );
        /// %&gt;
        /// </code>
        /// </example>
        public AutoCompleteBuilder DataBinding(Action<AutoCompleteDataBindingConfigurationBuilder> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new AutoCompleteDataBindingConfigurationBuilder(Component.DataBinding));

            return this;
        }

        public AutoCompleteBuilder DropDownHtmlAttributes(object attributes)
        {
            return DropDownHtmlAttributes(attributes.ToDictionary());
        }

        public AutoCompleteBuilder DropDownHtmlAttributes(IDictionary<string, object> attributes)
        {
            Guard.IsNotNull(attributes, "attributes");

            Component.DropDownHtmlAttributes.Clear();
            Component.DropDownHtmlAttributes.Merge(attributes);

            return this;
        }

        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="clientEventsAction">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DropDownList()
        ///             .Name("DropDownList")
        ///             .ClientEvents(events =>
        ///                 events.OnLoad("onLoad")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public AutoCompleteBuilder ClientEvents(Action<DropDownClientEventsBuilder> clientEventsAction)
        {
            Guard.IsNotNull(clientEventsAction, "clientEventsAction");

            clientEventsAction(new DropDownClientEventsBuilder(Component.ClientEvents, Component.ViewContext));

            return this;
        }

        /// <summary>
        /// Configures the effects of the AutoComplete.
        /// </summary>
        /// <param name="effectsAction">The action which configures the effects.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().AutoComplete()
        ///	           .Name("AutoComplete")
        ///	           .Effects(fx =>
        ///	           {
        ///		            fx.Slide()
        ///					  .OpenDuration(AnimationDuration.Normal)
        ///					  .CloseDuration(AnimationDuration.Normal);
        ///	           })
        /// </code>
        /// </example>
        public AutoCompleteBuilder Effects(Action<EffectsBuilder> addEffects)
        {
            Guard.IsNotNull(addEffects, "addAction");

            EffectsBuilderFactory factory = new EffectsBuilderFactory();

            addEffects(factory.Create(Component.Effects));

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
        public AutoCompleteBuilder Filterable(Action<AutoCompleteFilterSettingsBuilder> filtering)
        {
            Guard.IsNotNull(filtering, "filtering");

            filtering(new AutoCompleteFilterSettingsBuilder(Component.Filtering));

            return this;
        }

        /// <summary>
        /// Use it to enable multiple values.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().AutoComplete()
        ///             .Name("AutoComplete")
        ///             .Multiple();
        /// %&gt;
        /// </code>
        /// </example>
        public AutoCompleteBuilder Multiple()
        {
            Component.Multiple.Enabled = true;

            return this;
        }

        /// <summary>
        /// Use it to configure autocompleting multiple values.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().AutoComplete()
        ///             .Name("AutoComplete")
        ///             .Multiple(multi => multi.Enabled(true)
        ///                                     .Separator(" "));
        /// %&gt;
        /// </code>
        /// </example>
        public AutoCompleteBuilder Multiple(Action<AutoCompleteMultipleValuesSettingsBuilder> multi)
        {
            Guard.IsNotNull(multi, "multi");

            multi(new AutoCompleteMultipleValuesSettingsBuilder(Component.Multiple));

            return this;
        }

        /// <summary>
        /// Use it to enable highlighting of first matched item.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().AutoComplete()
        ///             .Name("AutoComplete")
        ///             .HighlightFirstMatch(true)
        /// %&gt;
        /// </code>
        /// </example>
        public AutoCompleteBuilder HighlightFirstMatch(bool highlightFirstMatch)
        {
            Guard.IsNotNull(highlightFirstMatch, "highlightFirstMatch");

            Component.HighlightFirstMatch = highlightFirstMatch;

            return this;
        }

        /// <summary>
        /// Enables or disables the autocomplete.
        /// </summary>
        /// <param name="allowSpinner"></param>
        /// <returns></returns>
        public AutoCompleteBuilder Enable(bool value)
        {
            Component.Enabled = value;

            return this;
        }

        /// <summary>
        /// Sets whether provided List{string} should be encoded before rendering.
        /// </summary>
        /// <param name="isEncoded">Whether the property should be encoded. Default: true.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().AutoComplete()
        ///             .Name("AutoComplete")
        ///             .BindTo(new List<string>
        ///             {
        ///                 "ComboBox",
        ///                 "DropDownList",
        ///                 "AutoComplete"
        ///             })
        ///             .Encode(false)
        /// %&gt;
        /// </code>
        /// </example>
        public AutoCompleteBuilder Encode(bool isEncoded)
        {
            Component.Encoded = isEncoded;

            return this;
        }

        /// <summary>
        /// Sets value of the input.
        /// </summary>
        /// <param name="value">Value which will be rendered as a input text.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().AutoComplete()
        ///             .Name("AutoComplete")
        ///             .BindTo(new List<string>
        ///             {
        ///                 "ComboBox",
        ///                 "DropDownList",
        ///                 "AutoComplete"
        ///             })
        ///             .Value("ComboBox")
        /// %&gt;
        /// </code>
        /// </example>
        public AutoCompleteBuilder Value(string value)
        {
            Component.Value = value;

            return this;
        }
    }
}