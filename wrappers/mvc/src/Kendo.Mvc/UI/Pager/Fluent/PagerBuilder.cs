using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring <see cref="Grid{T}.Paging"/>
    /// </summary>
    public class PagerBuilder : IHideObjectMembers
    {
        private readonly PagerSettings pager;

        /// <summary>
        /// Initializes a new instance of the <see cref="PagerBuilder"/> class.
        /// </summary>
        /// <param name="pager">The pager.</param>
        public PagerBuilder(PagerSettings pager)
        {
            this.pager = pager;
        }

        /// <summary>
        /// Sets the page sizes of the grid.
        /// </summary>
        /// <param name="pageSizes">The values shown in the pageSize dropdown</param>
        public PagerBuilder PageSizes(int[] pageSizes)
        {
            pager.PageSizes = pageSizes;

            return this;
        }

        /// <summary>
        /// Sets the page sizes of the grid.
        /// </summary>
        /// <param name="enabled">A value indicating whether to enable the page sizes dropdown</param>
        public PagerBuilder PageSizes(bool enabled)
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

        public PagerBuilder Numeric(bool enabled)
        {
            pager.Numeric = enabled;

            return this;
        }

        public PagerBuilder Info(bool enabled)
        {
            pager.Info = enabled;

            return this;
        }

        public PagerBuilder Input(bool enabled)
        {
            pager.Input = enabled;

            return this;
        }

        public PagerBuilder Refresh(bool enabled)
        {
            pager.Refresh = enabled;

            return this;
        }

        public PagerBuilder Messages(Action<PagerMessagesBuilder> configurator)
        {
            configurator(new PagerMessagesBuilder(pager.Messages));

            return this;
        }

        public PagerBuilder PreviousNext(bool enabled)
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
        public PagerBuilder Enabled(bool value)
        {
            pager.Enabled = value;

            return this;
        }
    }
}