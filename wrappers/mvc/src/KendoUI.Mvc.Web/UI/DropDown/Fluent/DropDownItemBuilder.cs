namespace Telerik.Web.Mvc.UI.Fluent
{
    using System.Web.Mvc;

    using Infrastructure;    

    /// <summary>
    /// Defines the fluent interface for configuring child DropDonwList items.
    /// </summary>
    public class DropDownItemBuilder : IHideObjectMembers
    {
        private readonly DropDownItem item;

        /// <summary>
        /// Initializes a new instance of the <see cref="DropDownItemBuilder"/> class.
        /// </summary>
        /// <param name="item">The item.</param>
        public DropDownItemBuilder(DropDownItem item)
        {
            Guard.IsNotNull(item, "item");

            this.item = item;
        }

        /// <summary>
        /// Sets the value for the item.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DropDownList()
        ///             .Name("DropDownList")
        ///             .Items(items => items.Add().Text("First item."))
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownItemBuilder Text(string value)
        {
            item.Text = value;

            return this;
        }

        /// <summary>
        /// Sets the value for the item.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DropDownList()
        ///             .Name("DropDownList")
        ///             .Items(items => items.Add().Value("1"))
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownItemBuilder Value(string value)
        {
            item.Value = value;

            return this;
        }

        /// <summary>
        /// Define when the item will be expanded on intial render.
        /// </summary>
        /// <param name="value">If true the item will be selected.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DropDownList()
        ///             .Name("DropDownList")
        ///             .Items(items =>
        ///             {
        ///                 items.Add().Text("First Item").Selected(true);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownItemBuilder Selected(bool value)
        {
            item.Selected = value;

            return this;
        }
    }
}
