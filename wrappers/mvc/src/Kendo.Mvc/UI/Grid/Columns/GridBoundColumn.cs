namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Threading;
    using System.Web.Mvc;
    using Kendo.Mvc;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Infrastructure.Implementation;
    using Kendo.Mvc.Resources;
    using Kendo.Mvc.UI.Html;

    public class GridBoundColumn<TModel, TValue> : GridColumnBase<TModel>, IGridBoundColumn, IGridTemplateColumn<TModel> where TModel : class
    {
        private static readonly IDictionary<string, Func<TModel, TValue>> expressionCache = new Dictionary<string, Func<TModel, TValue>>();
        private static readonly ReaderWriterLockSlim syncLock = new ReaderWriterLockSlim();
        /// <summary>
        /// Initializes a new instance of the <see cref="GridBoundColumn{T}"/> class.
        /// </summary>
        /// <param name="value">The property to which the column is bound to.</param>
        public GridBoundColumn(Grid<TModel> grid, Expression<Func<TModel, TValue>> expression)
            : base(grid)
        {
            Guard.IsNotNull(expression, "expression");

            if (typeof(TModel).IsPlainType() && !expression.IsBindable())
            {
                throw new InvalidOperationException(TextResource.MemberExpressionRequired);
            }

            Expression = expression;
            Member = expression.MemberWithoutInstance();
            MemberType = expression.ToMemberExpression().Type();

            Func<TModel, TValue> value;
            var key = expression.ToString();

            using (syncLock.ReadAndWrite())
            {
                if (!expressionCache.TryGetValue(key, out value))
                {
                    using (syncLock.Write())
                    {
                        if (!expressionCache.TryGetValue(key, out value))
                        {
                            expressionCache[key] = value = expression.Compile();
                        }
                    }
                }
            }

            Value = value;
            Aggregates = new List<AggregateFunction>();
            GroupFooterTemplate = new HtmlTemplate<GridAggregateResult>();
            GroupHeaderTemplate = new HtmlTemplate<GridGroupAggregateResult>();

#if MVC2 || MVC3
            if (typeof(TModel).IsPlainType())
            {
                Metadata = ModelMetadata.FromLambdaExpression(expression, new ViewDataDictionary<TModel>());
                MemberType = Metadata.ModelType;
                Title = Metadata.DisplayName;
                Format = Metadata.DisplayFormatString;
                Visible = Metadata.ShowForDisplay;
                ReadOnly = Metadata.IsReadOnly;
            }
#endif
            if (string.IsNullOrEmpty(Title))
            {
                Title = Member.AsTitle();
            }
        }

        /// <summary>
        /// Gets type of the property to which the column is bound to.
        /// </summary>
        public Type MemberType
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether this column is groupable.
        /// </summary>
        /// <value><c>true</c> if groupable; otherwise, <c>false</c>.</value>
        public bool Groupable
        {
            get
            {
                return Settings.Groupable;
            }
            set
            {
                Settings.Groupable = value;
            }
        }

        /// <summary>
        /// Gets the name of the column
        /// </summary>
        [Obsolete("Use the Member property instead")]
        public string Name
        {
            get
            {
                return Member;
            }
            set
            {
                Member = value;
            }
        }

#if MVC2 || MVC3
        public object AdditionalViewData
        {
            get;
            set;
        }

        public bool ReadOnly
        {
            get
            {
                return Settings.ReadOnly;
            }
            set
            {
                Settings.ReadOnly = value;
            }
        }

        public ModelMetadata Metadata
        {
            get;
            private set;
        }

        public string EditorTemplateName
        {
            get;
            set;
        }

#endif

        public string ClientGroupHeaderTemplate
        {
            get;
            set;
        }

        public string ClientGroupFooterTemplate
        {
            get;
            set;
        }

        /// <summary>
        /// Gets a function which returns the value of the property to which the column is bound to.
        /// </summary>
        public Func<TModel, TValue> Value
        {
            get;
            private set;
        }

        public Expression<Func<TModel, TValue>> Expression
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether this <see cref="GridColumnBase&lt;T&gt;"/> is sortable.
        /// </summary>
        /// <value><c>true</c> if sortable; otherwise, <c>false</c>. The default value is <c>true</c>.</value>
        public bool Sortable
        {
            get
            {
                return Settings.Sortable;
            }
            set
            {
                Settings.Sortable = value;
            }
        }

        /// <summary>
        /// Gets or sets a value indicating whether this <see cref="GridColumnBase&lt;T&gt;"/> is filterable.
        /// </summary>
        /// <value><c>true</c> if filterable; otherwise, <c>false</c>. The default value is <c>true</c>.</value>
        public bool Filterable
        {
            get
            {
                return Settings.Filterable;
            }

            set
            {
                Settings.Filterable = value;
            }
        }

        public ICollection<AggregateFunction> Aggregates
        {
            get;
            set;
        }

        public override IGridColumnSerializer CreateSerializer()
        {
            return new GridBoundColumnSerializer(this);
        }

        public string GetSortUrl()
        {
            IList<SortDescriptor> orderBy = new List<SortDescriptor>(Grid.DataProcessor.SortDescriptors);
            SortDescriptor descriptor = orderBy.SingleOrDefault(c => c.Member.IsCaseInsensitiveEqual(Member));

            ListSortDirection? oldDirection = null;

            if (descriptor != null)
            {
                oldDirection = descriptor.SortDirection;

                ListSortDirection? newDirection = oldDirection.Next();

                if (newDirection == null)
                {
                    if (!Grid.Sorting.AllowUnsort)
                    {
                        newDirection = ListSortDirection.Ascending;
                    }
                    else
                    {
                        orderBy.Remove(descriptor);
                    }
                }

                if (newDirection != null)
                {
                    if (Grid.Sorting.SortMode == GridSortMode.SingleColumn)
                    {
                        orderBy.Clear();
                        orderBy.Add(new SortDescriptor { SortDirection = newDirection.Value, Member = descriptor.Member });
                    }
                    else
                    {
                        orderBy[orderBy.IndexOf(descriptor)] = new SortDescriptor { SortDirection = newDirection.Value, Member = descriptor.Member };
                    }
                }
            }
            else
            {
                if (Grid.Sorting.SortMode == GridSortMode.SingleColumn)
                {
                    orderBy.Clear();
                }

                orderBy.Add(new SortDescriptor { Member = Member, SortDirection = ListSortDirection.Ascending });
            }

            return Grid.UrlBuilder.SelectUrl(GridUrlParameters.OrderBy, GridDescriptorSerializer.Serialize(orderBy));
        }

        public ListSortDirection? SortDirection
        {
            get
            {
                var descriptor = Grid.DataProcessor
                                     .SortDescriptors
                                     .FirstOrDefault(column => column.Member.IsCaseInsensitiveEqual(Member));

                if (descriptor == null)
                {
                    return null;
                }

                return descriptor.SortDirection;
            }
        }

        protected override IGridDataCellBuilder CreateDisplayBuilderCore(IGridHtmlHelper htmlHelper)
        {
            if (Template != null || InlineTemplate != null)
            {
                return base.CreateDisplayBuilderCore(htmlHelper);
            }

            IGridDataCellBuilder builder;

#if MVC2 || MVC3
            if (!Format.HasValue() && Encoded && !typeof(TModel).IsDataRow()
#if MVC3

 && !typeof(TModel).IsDynamicObject()
#endif
)
            {
                builder = new GridDisplayForCellBuilder<TModel, TValue>
                {
                    Expression = Expression,
                    ViewContext = Grid.ViewContext
                };
                
                builder.HtmlAttributes.Merge(HtmlAttributes);
                
                return builder;
            }
#endif

            builder = new GridDataCellBuilder<TModel, TValue>
            {
                Encoded = Encoded,
                Format = Format,
                Value = Value,

            };

            builder.HtmlAttributes.Merge(HtmlAttributes);
            
            return builder;
        }

        protected override IGridDataCellBuilder CreateEditBuilderCore(IGridHtmlHelper htmlHelper)
        {
#if MVC2 || MVC3
            if (!ReadOnly)
            {
                var builder = new GridEditorForCellBuilder<TModel, TValue>()
                {
                    Expression = Expression,
                    AdditionalViewData = AdditionalViewData,
                    ViewContext = Grid.ViewContext,
                    TemplateName = EditorTemplateName,
                    Member = Member
                };

                builder.HtmlAttributes.Merge(HtmlAttributes);

                return builder;
            }
#endif
            return CreateDisplayBuilder(htmlHelper);
        }

        protected override IGridDataCellBuilder CreateInsertBuilderCore(IGridHtmlHelper htmlHelper)
        {
            return CreateEditBuilderCore(htmlHelper);
        }

        protected override IGridCellBuilder CreateHeaderBuilderCore()
        {
            IGridCellBuilder builder = null;

            if (Sortable && Grid.Sorting.Enabled && !HeaderTemplate.HasValue())
            {
                builder = new GridSortableHeaderCellBuilder(HeaderHtmlAttributes, GetSortUrl(), SortDirection, Grid.Localization.SortedAsc, Grid.Localization.SortedDesc, AppendHeaderContent);
            }
            else
            {
                builder = base.CreateHeaderBuilderCore();
            }

            if (Filterable && Grid.Filtering.Enabled)
            {
                var filtered = Grid.DataProcessor.FilterDescriptors
                                   .SelectMemberDescriptors()
                                   .Any(filter => filter.Member.IsCaseInsensitiveEqual(Member));

                builder.Decorators.Add(new GridFilterCellDecorator(filtered, Grid.Localization.Filter));
            }

            return builder;
        }

        protected override IGridCellBuilder CreateFooterBuilderCore(IEnumerable<AggregateResult> aggregateResults)
        {
            return new GridFooterCellBuilder(FooterHtmlAttributes, FooterTemplate)
            {
                AggregateResults = CalculateAggregates(aggregateResults)
            };
        }

        protected override IGridCellBuilder CreateGroupFooterBuilderCore(IEnumerable<AggregateResult> aggregateResults)
        {
            return new GridFooterCellBuilder(FooterHtmlAttributes, GroupFooterTemplate)
            {
                AggregateResults = CalculateAggregates(aggregateResults)
            };
        }

        private GridAggregateResult CalculateAggregates(IEnumerable<AggregateResult> aggregateResults)
        {
            return new GridAggregateResult(aggregateResults.Where(r => Aggregates.Any(f => f.FunctionName == r.FunctionName)));
        }

        public HtmlTemplate<GridAggregateResult> GroupFooterTemplate
        {
            get;
            private set;
        }

        public HtmlTemplate<GridGroupAggregateResult> GroupHeaderTemplate
        {
            get;
            private set;
        }
    }
}