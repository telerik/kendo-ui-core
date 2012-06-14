namespace Kendo.Mvc.UI.Fluent
{
    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring <see cref="ListView{T}.Paging"/>
    /// </summary>
    public class ListViewPagerSettingsBuilder : IHideObjectMembers
    {
        private readonly ListViewPagingSettings pager;

        /// <summary>
        /// Initializes a new instance of the <see cref="ListViewPagerSettingsBuilder"/> class.
        /// </summary>
        /// <param name="pager">The pager.</param>
        public ListViewPagerSettingsBuilder(ListViewPagingSettings pager)
        {
            this.pager = pager;
        }
        
        /// <summary>
        /// Enables or disables paging.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ListView(Model)
        ///             .Name("Grid")
        ///             .Pageable(paging => paging.Enabled((bool)ViewData["enablePaging"]))
        /// %&gt;
        /// </code>
        /// </example>
        /// <remarks>
        /// The Enabled method is useful when you need to enable paging based on certain conditions.
        /// </remarks>
        public ListViewPagerSettingsBuilder Enabled(bool value)
        {
            pager.Enabled = value;

            return this;
        }
    }
}