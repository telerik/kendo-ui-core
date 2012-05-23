namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Web.Mvc;
    using System.Collections.Generic;

    using Extensions;
    using Infrastructure;


    public class DropDownBuilderBase<TDropDown, TDropDownBuilder> : ViewComponentBuilderBase<TDropDown, TDropDownBuilder>, IHideObjectMembers
        where TDropDown : ViewComponentBase, IDropDown
        where TDropDownBuilder : ViewComponentBuilderBase<TDropDown, TDropDownBuilder>
    {
        public DropDownBuilderBase(TDropDown component)
            : base(component)
        {
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
        public TDropDownBuilder ClientEvents(Action<DropDownClientEventsBuilder> clientEventsAction)
        {
            Guard.IsNotNull(clientEventsAction, "clientEventsAction");

            clientEventsAction(new DropDownClientEventsBuilder(Component.ClientEvents));

            return this as TDropDownBuilder;
        }

        ///// <summary>
        ///// Configures the effects of the dropdownlist.
        ///// </summary>
        ///// <param name="effectsAction">The action which configures the effects.</param>
        ///// <example>
        ///// <code lang="CS">
        ///// &lt;%= Html.Telerik().DropDownList()
        /////	           .Name("DropDownList")
        /////	           .Effects(fx =>
        /////	           {
        /////		            fx.Slide()
        /////					  .OpenDuration(AnimationDuration.Normal)
        /////					  .CloseDuration(AnimationDuration.Normal);
        /////	           })
        ///// </code>
        ///// </example>
        //public TDropDownBuilder Effects(Action<EffectsBuilder> addEffects)
        //{
        //    Guard.IsNotNull(addEffects, "addAction");

        //    EffectsBuilderFactory factory = new EffectsBuilderFactory();

        //    addEffects(factory.Create(Component.Effects));

        //    return this as TDropDownBuilder;
        //}

        /// <summary>
        /// Defines the items in the DropDownList
        /// </summary>
        /// <param name="addAction">The add action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DropDownList()
        ///             .Name("DropDownList")
        ///             .Items(items =>
        ///             {
        ///                 items.Add().Text("First Item");
        ///                 items.Add().Text("Second Item");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public TDropDownBuilder Items(Action<DropDownItemFactory> addAction)
        {
            Guard.IsNotNull(addAction, "addAction");

            Component.Items.Clear();

            DropDownItemFactory factory = new DropDownItemFactory(Component.Items);

            addAction(factory);

            return this as TDropDownBuilder;
        }

        /// <summary>
        /// Binds the DropDownList to a list of DropDownItem.
        /// </summary>
        /// <param name="dataSource">The data source.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DropDownList()
        ///             .Name("DropDownList")
        ///             .BindTo(new List<DropDownItem>
        ///             {
        ///                 new DropDownItem{
        ///                     Text = "Text1",
        ///                     Value = "Value1"
        ///                 },
        ///                 new DropDownItem{
        ///                     Text = "Text2",
        ///                     Value = "Value2"
        ///                 }
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public TDropDownBuilder BindTo(IEnumerable<DropDownItem> dataSource)
        {
            Guard.IsNotNull(dataSource, "dataSource");

            Component.Items.Clear();

            foreach (DropDownItem item in dataSource) 
            {
                Component.Items.Add(item);
            }

            return this as TDropDownBuilder;
        }

        /// <summary>
        /// Binds the DropDownList to a list of SelectListItem.
        /// </summary>
        /// <param name="dataSource">The data source.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DropDownList()
        ///             .Name("DropDownList")
        ///             .BindTo(new List<SelectListItem>
        ///             {
        ///                 new SelectListItem{
        ///                     Text = "Text1",
        ///                     Value = "Value1"
        ///                 },
        ///                 new SelectListItem{
        ///                     Text = "Text2",
        ///                     Value = "Value2"
        ///                 }
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public TDropDownBuilder BindTo(IEnumerable<SelectListItem> dataSource)
        {
            Guard.IsNotNull(dataSource, "dataSource");

            Component.Items.Clear();

            foreach (SelectListItem item in dataSource) 
            {
                Component.Items.Add(new DropDownItem { 
                    Text = item.Text,
                    Value = item.Value,
                    Selected = item.Selected
                });
            }

            return this as TDropDownBuilder;
        }

        /// <summary>
        /// Use it to set the Id of the child DropDownList component.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DropDownList()
        ///             .Name("DropDownList")
        ///             .BindTo(new List<DropDownItem>
        ///             {
        ///                 new DropDownItem{
        ///                     Text = "Text1",
        ///                     Value = "Value1"
        ///                 },
        ///                 new DropDownItem{
        ///                     Text = "Text2",
        ///                     Value = "Value2"
        ///                 }
        ///             })
        ///             .CascadeTo("DropDownList2")
        /// %&gt;
        /// </code>
        /// </example>
        public TDropDownBuilder CascadeTo(string id)
        {
            Component.CascadeTo = id;

            return this as TDropDownBuilder;
        }

        public TDropDownBuilder DropDownHtmlAttributes(object attributes) 
        {
            return DropDownHtmlAttributes(attributes.ToDictionary());
        }

        public TDropDownBuilder DropDownHtmlAttributes(IDictionary<string, object> attributes)
        {
            Guard.IsNotNull(attributes, "attributes");

            Component.DropDownHtmlAttributes.Clear();
            Component.DropDownHtmlAttributes.Merge(attributes);

            return this as TDropDownBuilder;
        }

        /// <summary>
        /// Sets the HTML attributes of the hidden input element.
        /// </summary>
        /// <param name="attributes">The HTML attributes.</param>
        public TDropDownBuilder HiddenInputHtmlAttributes(object attributes)
        {
            return HiddenInputHtmlAttributes(attributes.ToDictionary());
        }

        /// <summary>
        /// Sets the HTML attributes of the hidden input element.
        /// </summary>
        /// <param name="attributes">The HTML attributes.</param>
        public TDropDownBuilder HiddenInputHtmlAttributes(IDictionary<string, object> attributes)
        {
            Guard.IsNotNull(attributes, "attributes");

            Component.HiddenInputHtmlAttributes.Clear();
            Component.HiddenInputHtmlAttributes.Merge(attributes);

            return this as TDropDownBuilder;
        }

        /// <summary>
        /// Sets whether the Text property of the DropDownItem should be encoded when it is rendered.
        /// </summary>
        /// <param name="isEncoded">Whether the property should be encoded. Default: true.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DropDownList()
        ///             .Name("DropDownList")
        ///             .Encode(true)
        ///             .BindTo(new List<DropDownItem>
        ///             {
        ///                 new DropDownItem{
        ///                     Text = "&lt;h1&gt;Text1&lt;/h1&gt;",
        ///                     Value = "Value1"
        ///                 },
        ///                 new DropDownItem{
        ///                     Text = "Text2",
        ///                     Value = "Value2"
        ///                 }
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public TDropDownBuilder Encode(bool isEncoded)
        {
            Component.Encoded = isEncoded;

            return this as TDropDownBuilder;
        }

        /// <summary>
        /// The text for a default empty item. This parameter can be null.
        /// </summary>
        /// <param name="placeholder">Text of the default empty item.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DropDownList()
        ///             .Name("DropDownList")
        ///             .Placeholder("-- Select Item --")
        ///             .BindTo(new List<DropDownItem>
        ///             {
        ///                 new DropDownItem{
        ///                     Text = "&lt;h1&gt;Text1&lt;/h1&gt;",
        ///                     Value = "Value1"
        ///                 },
        ///                 new DropDownItem{
        ///                     Text = "Text2",
        ///                     Value = "Value2"
        ///                 }
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public TDropDownBuilder Placeholder(string placeholder)
        {
            Component.Placeholder = placeholder;

            return this as TDropDownBuilder;
        }

        /// <summary>
        /// Sets selected item depending on its value.
        /// </summary>
        /// <param name="value">Value of the item which should be selected.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DropDownList()
        ///             .Name("DropDownList")
        ///             .Encode(true)
        ///             .BindTo(new List<DropDownItem>
        ///             {
        ///                 new DropDownItem{
        ///                     Text = "&lt;h1&gt;Text1&lt;/h1&gt;",
        ///                     Value = "Value1"
        ///                 },
        ///                 new DropDownItem{
        ///                     Text = "Text2",
        ///                     Value = "Value2"
        ///                 }
        ///             })
        ///             .Value("Value1")
        /// %&gt;
        /// </code>
        /// </example>
        public TDropDownBuilder Value(string value)
        {
            Component.Value = value;

            return this as TDropDownBuilder;
        }
    }
}
