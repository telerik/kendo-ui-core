namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.ComponentModel.DataAnnotations;
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
    using System.Text.RegularExpressions;

    public class GridBoundColumn<TModel, TValue> : GridColumnBase<TModel>, IGridBoundColumn, IGridTemplateColumn<TModel> where TModel : class
    {
        private static readonly IDictionary<string, Func<TModel, TValue>> expressionCache = new Dictionary<string, Func<TModel, TValue>>();
        private static readonly ReaderWriterLockSlim syncLock = new ReaderWriterLockSlim();
        
        /// <summary>
        /// Initializes a new instance of the <see cref="GridBoundColumn{TModel, TValue}"/> class.
        /// </summary>
        /// <param name="grid"></param>
        /// <param name="expression"></param>
        public GridBoundColumn(Grid<TModel> grid, Expression<Func<TModel, TValue>> expression)
            : base(grid)
        {
            if (typeof(TModel).IsPlainType() && !expression.IsBindable())
            {
                throw new InvalidOperationException(Exceptions.MemberExpressionRequired);
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
            GroupFooterTemplate = new HtmlTemplate<GridAggregateResult>();
            GroupHeaderTemplate = new HtmlTemplate<GridGroupAggregateResult>();

            if (typeof(TModel).IsPlainType())
            {
                Metadata = ModelMetadata.FromLambdaExpression(expression, new ViewDataDictionary<TModel>());
                MemberType = Metadata.ModelType;
                Title = Metadata.DisplayName;
                Format = Metadata.DisplayFormatString;
                Visible = Metadata.ShowForDisplay;
            }

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

        public object AdditionalViewData
        {
            get;
            set;
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

        public string ClientGroupHeaderTemplate
        {
            get
            {
                return Settings.ClientGroupHeaderTemplate;
            }
            set
            {
                Settings.ClientGroupHeaderTemplate = value;
            }
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
        /// Gets or sets a value indicating whether this <see cref="GridColumnBase{T}"/> is sortable.
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
        /// Gets or sets a value indicating whether this <see cref="GridColumnBase{T}"/> is filterable.
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

        protected override void Serialize(IDictionary<string, object> json)
        {
            base.Serialize(json);

            var aggregates = Grid.DataSource.Aggregates
                    .Where(agg => agg.Member == Member)
                    .SelectMany(agg => agg.Aggregates)
                    .Select(agg => agg.AggregateMethodName.ToLowerInvariant());

            json["field"] = Member;

            if (Format.HasValue())
            {
                json["format"] = Format;
            }

            if (!Groupable)
            {
                json["groupable"] = false;
            }

            if (!Sortable)
            {
                json["sortable"] = false;
            }

            if (!Filterable)
            {
                json["filterable"] = false;
            }

            if (Encoded)
            {
                json["encoded"] = true;
            }

            if (aggregates.Any())
            {
                json["aggregate"] = aggregates;
            }

            string editorHtml = EditorHtml;

            if (Grid.IsInClientTemplate && editorHtml != null)
            {                
                editorHtml = Regex.Replace(editorHtml.Trim(), "(&amp;)#([0-9]+;)", "$1\\#$2")
                                .Replace("\r\n", string.Empty)
                                .Replace("</script>", "<\\/script>")                                
                                .Replace("jQuery(\"#", "jQuery(\"\\#");
            }

            if (!Grid.DataSource.IsReadOnly(Member) && Grid.Editable.Enabled && Grid.IsClientBinding)
            {
                json["editor"] = editorHtml;
            }

            if (ClientGroupHeaderTemplate.HasValue())
            {
                json["groupHeaderTemplate"] = ClientGroupHeaderTemplate;
            }

            if (ClientGroupFooterTemplate.HasValue())
            {
                json["groupFooterTemplate"] = ClientGroupFooterTemplate;
            }

            SerializeValues(json);
        }

        private void SerializeValues(IDictionary<string, object> result)
        {
            if (MemberType != null && MemberType.GetNonNullableType().IsEnum)
            {
                var type = MemberType.GetNonNullableType();
                var values = new List<IDictionary<string, object>>();

                foreach (int value in Enum.GetValues(type))
                {
                    var obj = new Dictionary<string, object>();

                    var name = Enum.GetName(type, value);
                    var member = type.GetMember(name).FirstOrDefault();

                    if (member != null)
                    {
                        var displayAttribute = member.GetCustomAttributes(typeof(DisplayAttribute), true)
                            .OfType<DisplayAttribute>()
                            .FirstOrDefault();

                        if (displayAttribute != null)
                        {
                            name = displayAttribute.GetName();
                        }
                    }

                    obj["value"] = value;
                    obj["text"] = name;

                    values.Add(obj);
                }

                result["values"] = values;
            }
        }

        public string GetSortUrl()
        {
            IList<SortDescriptor> orderBy = new List<SortDescriptor>(Grid.DataSource.OrderBy);
            SortDescriptor descriptor = orderBy.SingleOrDefault(c => c.Member.IsCaseInsensitiveEqual(Member));

            ListSortDirection? oldDirection = null;

            if (descriptor != null)
            {
                oldDirection = descriptor.SortDirection;

                ListSortDirection? newDirection = oldDirection.Next();

                if (newDirection == null)
                {
                    if (!Grid.Sortable.AllowUnsort)
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
                    if (Grid.Sortable.SortMode == GridSortMode.SingleColumn)
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
                if (Grid.Sortable.SortMode == GridSortMode.SingleColumn)
                {
                    orderBy.Clear();
                }

                orderBy.Add(new SortDescriptor { Member = Member, SortDirection = ListSortDirection.Ascending });
            }

            return Grid.UrlBuilder.SelectUrl(GridUrlParameters.Sort, GridDescriptorSerializer.Serialize(orderBy));
        }

        public ListSortDirection? SortDirection
        {
            get
            {
                var descriptor = Grid.DataSource
                                     .OrderBy
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

            if (!Format.HasValue() && Encoded && !typeof(TModel).IsDataRow() && !typeof(TModel).IsDynamicObject())
            {
                builder = new GridDisplayForCellBuilder<TModel, TValue>
                {
                    Expression = Expression,
                    ViewContext = Grid.ViewContext
                };

                builder.HtmlAttributes.Merge(HtmlAttributes);

                return builder;
            }

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
            if (!Grid.DataSource.IsReadOnly(Member))
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
            return CreateDisplayBuilder(htmlHelper);
        }

        protected override IGridDataCellBuilder CreateInsertBuilderCore(IGridHtmlHelper htmlHelper)
        {
            return CreateEditBuilderCore(htmlHelper);
        }

        protected override IGridCellBuilder CreateHeaderBuilderCore()
        {
            IGridCellBuilder builder = null;

            HeaderHtmlAttributes.Add("data-field", Member);
            HeaderHtmlAttributes.Add("data-title", Title);
            if (!Groupable)
            {
                HeaderHtmlAttributes.Add("data-groupable", "false");
            }

            AppendAggregateAttributes();

            if (Sortable && Grid.Sortable.Enabled && !HeaderTemplate.HasValue())
            {
                builder = new GridSortableHeaderCellBuilder(HeaderHtmlAttributes, GetSortUrl(), SortDirection, AppendHeaderContent);
            }
            else
            {
                builder = base.CreateHeaderBuilderCore();
            }

            if (Filterable && Grid.Filterable.Enabled && !Grid.ColumnMenu.Enabled)
            {
                var filtered = Grid.DataSource.Filters
                                   .SelectMemberDescriptors()
                                   .Any(filter => filter.Member.IsCaseInsensitiveEqual(Member));

                builder.Decorators.Add(new GridFilterCellDecorator(filtered));
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
            var aggregates = Grid.DataSource.Aggregates.Where(agg => agg.Member == Member).SelectMany(agg => agg.Aggregates);

            return new GridAggregateResult(aggregateResults.Where(r => aggregates.Any(f => f.FunctionName == r.FunctionName)));
        }

        private void AppendAggregateAttributes()
        {
            var aggregates = Grid.DataSource.Aggregates
                    .Where(agg => agg.Member == Member)
                    .SelectMany(agg => agg.Aggregates)
                    .Select(agg => agg.AggregateMethodName.ToLowerInvariant());

            if (aggregates.Any())
            {
                HeaderHtmlAttributes.Add("data-aggregates", String.Join(",", aggregates.ToArray()));
            }
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