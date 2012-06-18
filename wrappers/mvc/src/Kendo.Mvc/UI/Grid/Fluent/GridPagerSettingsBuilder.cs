namespace Kendo.Mvc.UI.Fluent
{
    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring <see cref="Grid{T}.Paging"/>
    /// </summary>
    public class GridPagerSettingsBuilder : IHideObjectMembers
    {
        private readonly GridPagerSettings pager;

        /// <summary>
        /// Initializes a new instance of the <see cref="GridPagerSettingsBuilder"/> class.
        /// </summary>
        /// <param name="pager">The pager.</param>
        public GridPagerSettingsBuilder(GridPagerSettings pager)
        {
            this.pager = pager;
        }

        /// <summary>
        /// Sets the page sizes of the grid.
        /// </summary>
        /// <param name="pageSizes">The values shown in the pageSize dropdown</param>
        public GridPagerSettingsBuilder PageSizes(int[] pageSizes)
        {
            pager.PageSizes = pageSizes;

            return this;
        }

        public GridPagerSettingsBuilder Numeric(bool enabled)
        {
            pager.Numeric = enabled;

            return this;
        }

        public GridPagerSettingsBuilder Info(bool enabled)
        {
            pager.Info = enabled;

            return this;
        }

        public GridPagerSettingsBuilder Input(bool enabled)
        {
            pager.Input = enabled;

            return this;
        }

        public GridPagerSettingsBuilder Refresh(bool enabled)
        {
            pager.Refresh = enabled;

            return this;
        }

        public GridPagerSettingsBuilder PreviousNext(bool enabled)
        {
            pager.PreviousNext = enabled;

            return this;
        }
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