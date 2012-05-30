namespace Kendo.Mvc.UI.Fluent
{
    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring <see cref="Grid{T}.Paging"/>
    /// </summary>
    public class GridPagerSettingsBuilder : IHideObjectMembers
    {
        private readonly GridPagingSettings pager;

        /// <summary>
        /// Initializes a new instance of the <see cref="GridPagerSettingsBuilder"/> class.
        /// </summary>
        /// <param name="pager">The pager.</param>
        public GridPagerSettingsBuilder(GridPagingSettings pager)
        {

            this.pager = pager;
        }

        //TODO: pager positions
        /*
        /// <summary>
        /// Sets the position at which to display the pager.
        /// </summary>
        /// <param name="value">The pager position.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///             .Name("Grid")
        ///             .Pageable(paging => paging.Position(GridPagerPosition.Bottom))
        /// %&gt;
        /// </code>
        /// </example>
        public virtual GridPagerSettingsBuilder Position(GridPagerPosition value)
        {
            pager.Position = value;

            return this;
        }
        */

        /*TODO: page sizes dropdown
        /// <summary>
        /// Sets the page size of the grid.
        /// </summary>
        /// <param name="value">The number of items to display in a single page.</param>
        /// <param name="sizesInDropDown">The values shown in the pageSize dropdown</param>
        /// <returns></returns>
        public virtual GridPagerSettingsBuilder PageSize(int value, int[] sizesInDropDown)
        {

            pager.PageSize = value;

            pager.PageSizesInDropDown = sizesInDropDown;

            return this;
        }

        */

        /*TODO: Page styles
        /// <summary>
        /// Sets the pager style.
        /// </summary>
        /// <param name="value">The pager style to set.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///             .Name("Grid")
        ///             .Pageable(paging => paging.Style(GridPagerStyles.PageInput | GridPagerStyles.Numeric))
        /// %&gt;
        /// </code>
        /// </example>
        public virtual GridPagerSettingsBuilder Style(GridPagerStyles value)
        {
            pager.Style = value;

            return this;
        }
        */

        /// <summary>
        /// Enables or disables paging.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///             .Name("Grid")
        ///             .Pageable(paging => paging.Enabled((bool)ViewData["enablePaging"]))
        /// %&gt;
        /// </code>
        /// </example>
        /// <remarks>
        /// The Enabled method is useful when you need to enable paging based on certain conditions.
        /// </remarks>
        public GridPagerSettingsBuilder Enabled(bool value)
        {
            pager.Enabled = value;

            return this;
        }
    }
}