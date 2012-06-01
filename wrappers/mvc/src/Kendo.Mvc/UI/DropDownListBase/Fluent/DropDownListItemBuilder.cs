namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring child DropDonwList items.
    /// </summary>
    public class DropDownListItemBuilder : IHideObjectMembers
    {
        private readonly DropDownListItem item;

        /// <summary>
        /// Initializes a new instance of the <see cref="DropDownListItemBuilder"/> class.
        /// </summary>
        /// <param name="item">The item.</param>
        public DropDownListItemBuilder(DropDownListItem item)
        {
            this.item = item;
        }

        /// <summary>
        /// Sets the value for the item.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DropDownList()
        ///             .Name("DropDownList")
        ///             .Items(items => items.Add().Text("First item."))
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownListItemBuilder Text(string value)
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
        ///  &lt;%= Html.Kendo().DropDownList()
        ///             .Name("DropDownList")
        ///             .Items(items => items.Add().Value("1"))
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownListItemBuilder Value(string value)
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
        ///  &lt;%= Html.Kendo().DropDownList()
        ///             .Name("DropDownList")
        ///             .Items(items =>
        ///             {
        ///                 items.Add().Text("First Item").Selected(true);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownListItemBuilder Selected(bool value)
        {
            item.Selected = value;

            return this;
        }
    }
}
