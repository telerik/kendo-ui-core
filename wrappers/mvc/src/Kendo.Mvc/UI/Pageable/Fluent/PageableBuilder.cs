using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring <see cref="Grid{T}.Pageable"/>
    /// </summary>
    public class PageableBuilder : IHideObjectMembers
    {
        private readonly PageableSettings pager;

        /// <summary>
        /// Initializes a new instance of the <see cref="PageableBuilder"/> class.
        /// </summary>
        /// <param name="pager">The pager.</param>
        public PageableBuilder(PageableSettings pager)
        {
            this.pager = pager;
        }

        /// <summary>
        /// Sets the page sizes of the grid.
        /// </summary>
        /// <param name="pageSizes">The values shown in the pageSize dropdown</param>
        public PageableBuilder PageSizes(int[] pageSizes)
        {
            pager.PageSizes = pageSizes;

            return this;
        }

        /// <summary>
        /// Sets the page sizes of the grid.
        /// </summary>
        /// <param name="enabled">A value indicating whether to enable the page sizes dropdown</param>
        public PageableBuilder PageSizes(bool enabled)
        {
            if (enabled)
            {
                pager.PageSizes = new [] { 5, 10, 20 };
            }
            else
            {
                pager.PageSizes = null;
            }

            return this;
        }

        /// <summary>
        /// Sets the number of buttons displayed in the numeric pager. Default is 10.
        /// </summary>
        /// <param name="pageSizes">The value</param>
        public PageableBuilder ButtonCount(int value)
        {
            pager.ButtonCount = value;

            return this;
        }

        public PageableBuilder Numeric(bool enabled)
        {
            pager.Numeric = enabled;

            return this;
        }

        public PageableBuilder Info(bool enabled)
        {
            pager.Info = enabled;

            return this;
        }

        public PageableBuilder Input(bool enabled)
        {
            pager.Input = enabled;

            return this;
        }

        public PageableBuilder Refresh(bool enabled)
        {
            pager.Refresh = enabled;

            return this;
        }

        public PageableBuilder Messages(Action<PageableMessagesBuilder> configurator)
        {
            configurator(new PageableMessagesBuilder(pager.Messages));

            return this;
        }

        public PageableBuilder PreviousNext(bool enabled)
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
        public PageableBuilder Enabled(bool value)
        {
            pager.Enabled = value;

            return this;
        }
    }
}