// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
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
            Guard.IsNotNull(pager, "pager");

            this.pager = pager;
        }

        /// <summary>
        /// Sets the position at which to display the pager.
        /// </summary>
        /// <param name="value">The pager position.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
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

        /// <summary>
        /// Sets the page size of the grid.
        /// </summary>
        /// <param name="value">The number of items to display in a single page.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Pageable(paging => paging.PageSize(20))
        /// %&gt;
        /// </code>
        /// </example>
        public virtual GridPagerSettingsBuilder PageSize(int value)
        {
            pager.PageSize = value;

            return this;
        }

        /// <summary>
        /// Sets the page size of the grid.
        /// </summary>
        /// <param name="value">The number of items to display in a single page.</param>
        /// <param name="sizesInDropDown">The values shown in the pageSize dropdown</param>
        /// <returns></returns>
        public virtual GridPagerSettingsBuilder PageSize(int value, int[] sizesInDropDown)
        {
            Guard.IsNotNull(sizesInDropDown, "sizesInDropDown");

            pager.PageSize = value;

            pager.PageSizesInDropDown = sizesInDropDown;

            return this;
        }

        /// <summary>
        /// Sets the current page of the grid.
        /// </summary>
        /// <param name="page">The page which the grid should display initially. Must be greater than zero.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Pageable(paging => paging.PageTo(2))
        /// %&gt;
        /// </code>
        /// </example>
        public virtual GridPagerSettingsBuilder PageTo(int page)
        {
            Guard.IsNotZeroOrNegative(page, "page");

            pager.CurrentPage = page;
            
            return this;
        }

        /// <summary>
        /// Sets the pager style.
        /// </summary>
        /// <param name="value">The pager style to set.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
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

        /// <summary>
        /// Sets the total number of items in the data source. Required during Custom binding.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Pageable(paging => paging.Total((int)ViewData["total"]))
        /// %&gt;
        /// </code>
        /// </example>
        public virtual GridPagerSettingsBuilder Total(int value)
        {
            pager.Total = value;

            return this;
        }

        /// <summary>
        /// Enables or disables paging.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
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

        /// <summary>
        /// Enables or disables paging on scroll.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Pageable(paging => paging.PageOnScroll((bool)ViewData["pageOnScroll"]))
        /// %&gt;
        /// </code>
        /// </example>
        /// <remarks>
        /// The PageOnScroll method is useful when you need to enable paging on scroll based on certain conditions.
        /// </remarks>
        public virtual GridPagerSettingsBuilder PageOnScroll(bool value)
        {
            pager.PageOnScroll = value;

            return this;
        }
    }
}