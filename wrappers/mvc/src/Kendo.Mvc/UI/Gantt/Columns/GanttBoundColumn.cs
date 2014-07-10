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

    public class GanttBoundColumn<TModel, ТValue> : GanttColumnBase<TModel>, IGanttBoundColumn
        where TModel : class, IGanttTask
    {
        private static readonly IDictionary<string, Func<TModel, ТValue>> expressionCache = new Dictionary<string, Func<TModel, ТValue>>();
        private static readonly ReaderWriterLockSlim syncLock = new ReaderWriterLockSlim();
        
        /// <summary>
        /// Initializes a new instance of the <see cref="GanttBoundColumn{TModel, TValue}"/> class.
        /// </summary>
        /// <param name="Gantt"></param>
        /// <param name="expression"></param>
        public GanttBoundColumn(Expression<Func<TModel, ТValue>> expression)
            : base()
        {
            if (typeof(TModel).IsPlainType() && !expression.IsBindable())
            {
                throw new InvalidOperationException(Exceptions.MemberExpressionRequired);
            }

            Expression = expression;
            Member = expression.MemberWithoutInstance();
            MemberType = expression.ToMemberExpression().Type();

            Func<TModel, ТValue> value;
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

            if (typeof(TModel).IsPlainType())
            {
                Metadata = ModelMetadata.FromLambdaExpression(expression, new ViewDataDictionary<TModel>());
                MemberType = Metadata.ModelType;
                Title = Metadata.DisplayName;
                Format = Metadata.DisplayFormatString;
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

        /// <summary>
        /// Gets a function which returns the value of the property to which the column is bound to.
        /// </summary>
        public Func<TModel, ТValue> Value
        {
            get;
            private set;
        }

        public Expression<Func<TModel, ТValue>> Expression
        {
            get;
            private set;
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            base.Serialize(json);

            json["field"] = Member;

            SerializeValues(json);
        }

        private void SerializeValues(IDictionary<string, object> result)
        {
            if (MemberType != null && MemberType.GetNonNullableType().IsEnum)
            {
                var type = MemberType.GetNonNullableType();
                var values = new List<IDictionary<string, object>>();
                var underlyingType = Enum.GetUnderlyingType(type);

                foreach (var value in Enum.GetValues(type))
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

                    obj["value"] = Convert.ChangeType(value, underlyingType);
                    obj["text"] = name;

                    values.Add(obj);
                }

                result["values"] = values;
            }
        }
    }
}