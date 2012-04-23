// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace KendoUI.Mvc.UI
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Globalization;
    using System.IO;
    using System.Linq;
    using System.Text;
    using System.Web.Script.Serialization;
    using KendoUI.Mvc.Extensions;
    using KendoUI.Mvc.Infrastructure;

    /// <summary>
    /// Class used to build initialization script of jQuery plugin.
    /// </summary>
    public class ClientSideObjectWriter : IClientSideObjectWriter
    {
        private readonly string id;
        private readonly string type;
        private readonly TextWriter writer;

        private bool hasStarted;
        private bool appended;

        /// <summary>
        /// Initializes a new instance of the <see cref="ClientSideObjectWriter"/> class.
        /// </summary>
        /// <param name="id">The id.</param>
        /// <param name="type">The type.</param>
        /// <param name="textWriter">The text writer.</param>
        public ClientSideObjectWriter(string id, string type, TextWriter textWriter)
        {
            Guard.IsNotNullOrEmpty(id, "id");
            Guard.IsNotNullOrEmpty(type, "type");
            Guard.IsNotNull(textWriter, "textWriter");

            this.id = id;
            this.type = type;
            writer = textWriter;
        }

        /// <summary>
        /// Starts writing this instance.
        /// </summary>
        /// <returns></returns>
        public virtual IClientSideObjectWriter Start()
        {
            if (hasStarted)
            {
                throw new InvalidOperationException(Resources.TextResource.YouCannotCallStartMoreThanOnce);
            }

            //Escape meta characters: http://api.jquery.com/category/selectors/
            var selector = @";&,.+*~':""!^$[]()|/".ToCharArray().Aggregate(id, (current, chr) => current.Replace(chr.ToString(), @"\\" + chr));

            writer.Write("jQuery('#{0}').{1}(".FormatWith(selector, type));
            hasStarted = true;

            return this;
        }

        /// <summary>
        /// Appends the specified key value pair to the end of this instance.
        /// </summary>
        /// <param name="keyValuePair">The key value pair.</param>
        /// <returns></returns>
        public virtual IClientSideObjectWriter Append(string keyValuePair)
        {
            EnsureStart();

            if (!string.IsNullOrEmpty(keyValuePair))
            {
                writer.Write(appended ? ", " : "{");
                writer.Write(keyValuePair);

                if (!appended)
                {
                    appended = true;
                }
            }

            return this;
        }

        /// <summary>
        /// Appends the specified name and value to the end of this instance.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        public virtual IClientSideObjectWriter Append(string name, string value)
        {
            Guard.IsNotNullOrEmpty(name, "name");

            if (value.HasValue())
            {
                string formattedValue = QuoteString(value);

                Append("{0}:'{1}'".FormatWith(name, formattedValue));
            }

            return this;
        }

        /// <summary>
        /// Appends the specified name and nullable value to the end of this instance.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        public virtual IClientSideObjectWriter AppendNullableString(string name, string value)
        {
            Guard.IsNotNullOrEmpty(name, "name");

            if (value != null)
            {
                string formattedValue = QuoteString(value);

                Append("{0}:'{1}'".FormatWith(name, formattedValue));
            }

            return this;
        }

        /// <summary>
        /// Appends the specified name and value to the end of this instance.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        public virtual IClientSideObjectWriter Append(string name, int value)
        {
            Guard.IsNotNullOrEmpty(name, "name");

            Append("{0}:{1}".FormatWith(name, value));

            return this;
        }

        /// <summary>
        /// Appends the specified name and value to the end of this instance.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="value">The value.</param>
        /// <param name="defaultValue">The default value.</param>
        /// <returns></returns>
        public virtual IClientSideObjectWriter Append(string name, int value, int defaultValue)
        {
            Guard.IsNotNullOrEmpty(name, "name");

            if (value != defaultValue)
            {
                Append(name, value);
            }

            return this;
        }

        /// <summary>
        /// Appends the specified name and value to the end of this instance.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        public virtual IClientSideObjectWriter Append(string name, int? value)
        {
            Guard.IsNotNullOrEmpty(name, "name");

            if (value.HasValue)
            {
                Append(name, value.Value);
            }

            return this;
        }

        /// <summary>
        /// Appends the specified name and value to the end of this instance.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        public virtual IClientSideObjectWriter Append(string name, double value)
        {
            Guard.IsNotNullOrEmpty(name, "name");

            Append("{0}:'{1}'".FormatWith(name, value));

            return this;
        }

        /// <summary>
        /// Appends the specified name and value to the end of this instance.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        public virtual IClientSideObjectWriter Append(string name, double? value)
        {
            Guard.IsNotNullOrEmpty(name, "name");

            if (value.HasValue)
            {
                Append(name, value.Value);
            }

            return this;
        }

        /// <summary>
        /// Appends the specified name and value to the end of this instance.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        public virtual IClientSideObjectWriter Append(string name, decimal value)
        {
            Guard.IsNotNullOrEmpty(name, "name");

            Append("{0}:'{1}'".FormatWith(name, value));

            return this;
        }

        /// <summary>
        /// Appends the specified name and value to the end of this instance.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        public virtual IClientSideObjectWriter Append(string name, decimal? value)
        {
            Guard.IsNotNullOrEmpty(name, "name");

            if (value.HasValue)
            {
                Append(name, value.Value);
            }

            return this;
        }

        /// <summary>
        /// Appends the specified name and value to the end of this instance.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="value">if set to <c>true</c> [value].</param>
        /// <returns></returns>
        public virtual IClientSideObjectWriter Append(string name, bool value)
        {
            Guard.IsNotNullOrEmpty(name, "name");

            Append("{0}:{1}".FormatWith(name, value.ToString(CultureInfo.InvariantCulture).ToLower(CultureInfo.InvariantCulture)));

            return this;
        }

        /// <summary>
        /// Appends the specified name and value to the end of this instance.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="value">if set to <c>true</c> [value].</param>
        /// <param name="defaultValue">if set to <c>true</c> [default value].</param>
        /// <returns></returns>
        public virtual IClientSideObjectWriter Append(string name, bool value, bool defaultValue)
        {
            Guard.IsNotNullOrEmpty(name, "name");

            if (value != defaultValue)
            {
                Append(name, value);
            }

            return this;
        }

        /// <summary>
        /// Appends the specified name and only the date of the passed <seealso cref="DateTime"/>.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        public virtual IClientSideObjectWriter AppendDateOnly(string name, DateTime value)
        {
            Guard.IsNotNullOrEmpty(name, "name");

            if (value != DateTime.MinValue)
            {
                string dateValue = "new Date({0},{1},{2})".FormatWith(value.Year.ToString("###0", CultureInfo.InvariantCulture), (value.Month - 1).ToString("#0", CultureInfo.InvariantCulture), value.Day.ToString("#0", CultureInfo.InvariantCulture));

                Append("{0}:{1}".FormatWith(name, dateValue));
            }

            return this;
        }

        /// <summary>
        /// Appends the specified name and only the date of the passed <seealso cref="DateTime"/>.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        public virtual IClientSideObjectWriter AppendDateOnly(string name, DateTime? value)
        {
            Guard.IsNotNullOrEmpty(name, "name");

            if (value.HasValue && value != DateTime.MinValue)
            {
                AppendDateOnly(name, value.Value);
            }

            return this;
        }

        /// <summary>
        /// Appends the specified name and only the date of the passed <seealso cref="IEnumerable<DateTime>"/>.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        public virtual IClientSideObjectWriter AppendDatesOnly(string name, IEnumerable<DateTime> collection)
        {
            Guard.IsNotNullOrEmpty(name, "name");

            if (collection.Count() > 0)
            {
                List<DateTime> dates = collection.ToList();
                dates.Sort();

                StringBuilder builder = new StringBuilder();

                int year = -1;
                int month = -1;
                bool yearAppended = false;
                bool monthAppended = false;

                foreach (DateTime date in dates)
                {
                    if (year != date.Year)
                    {
                        if (yearAppended)
                        {
                            if (monthAppended)
                            {
                                builder.Append("]");
                            }
                            builder.Append("}");
                            builder.Append(",");
                            yearAppended = false;
                        }
                        builder.Append("'");
                        builder.Append(date.Year);
                        builder.Append("':{");

                        monthAppended = false;
                        month = -1;
                    }
                    if (month != date.Month)
                    {
                        if (monthAppended)
                        {
                            builder.Append("]");
                            builder.Append(",");
                            monthAppended = false;
                        }
                        builder.Append("'");
                        builder.Append(date.Month - 1);
                        builder.Append("':[");
                    }

                    if (year == date.Year && month == date.Month)
                    {
                        builder.Append(",");
                    }
                    builder.Append(date.Day);

                    if (month != date.Month)
                    {
                        month = date.Month;
                        monthAppended = true;
                    }

                    if (year != date.Year)
                    {
                        year = date.Year;
                        yearAppended = true;
                    }
                }
                builder.Append("]}");
                Append("{0}:{{{1}}}".FormatWith(name, builder.ToString()));
            }

            return this;
        }

        /// <summary>
        /// Appends the specified name and value to the end of this instance.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        public virtual IClientSideObjectWriter Append(string name, DateTime value)
        {
            Guard.IsNotNullOrEmpty(name, "name");

            if (value != DateTime.MinValue)
            {
                string dateValue = "new Date({0},{1},{2},{3},{4},{5},{6})".FormatWith(value.Year.ToString("###0", CultureInfo.InvariantCulture), (value.Month - 1).ToString("#0", CultureInfo.InvariantCulture), value.Day.ToString("#0", CultureInfo.InvariantCulture), value.Hour.ToString("#0", CultureInfo.InvariantCulture), value.Minute.ToString("#0", CultureInfo.InvariantCulture), value.Second.ToString("#0", CultureInfo.InvariantCulture), value.Millisecond.ToString("##0", CultureInfo.InvariantCulture));

                Append("{0}:{1}".FormatWith(name, dateValue));
            }

            return this;
        }

        /// <summary>
        /// Appends the specified name and the dates of the passed <seealso cref="IEnumerable<DateTime>"/>.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        public virtual IClientSideObjectWriter Append(string name, List<DateTime> list)
        {
            Guard.IsNotNullOrEmpty(name, "name");

            StringBuilder builder = new StringBuilder();
            var length = list.Count;

            if (length > 0)
            {
                for (var i = 0; i < length; i++)
                {
                    var date = list[i];
                    builder.Append("new Date({0},{1},{2},{3},{4},{5},{6}){7}".FormatWith(date.Year.ToString("###0", CultureInfo.InvariantCulture), (date.Month - 1).ToString("#0", CultureInfo.InvariantCulture), date.Day.ToString("#0", CultureInfo.InvariantCulture), date.Hour.ToString("#0", CultureInfo.InvariantCulture), date.Minute.ToString("#0", CultureInfo.InvariantCulture), date.Second.ToString("#0", CultureInfo.InvariantCulture), date.Millisecond.ToString("##0", CultureInfo.InvariantCulture), i < length - 1 ? "," : ""));
                }

                Append("{0}:[{1}]".FormatWith(name, builder.ToString()));
            }

            return this;
        }

        /// <summary>
        /// Appends the specified name and value to the end of this instance.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        public virtual IClientSideObjectWriter Append(string name, DateTime? value)
        {
            Guard.IsNotNullOrEmpty(name, "name");

            if (value.HasValue)
            {
                Append(name, value.Value);
            }

            return this;
        }

        /// <summary>
        /// Appends the specified name and value to the end of this instance.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="action">The action.</param>
        /// <returns></returns>
        public virtual IClientSideObjectWriter Append(string name, Action action)
        {
            Guard.IsNotNullOrEmpty(name, "name");

            if (action != null)
            {
                Append("{0}:".FormatWith(name));
                action();
            }

            return this;
        }

        /// <summary>
        /// Appends the specified name and value to the end of this instance.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="action">The action.</param>
        /// <returns></returns>
        public virtual IClientSideObjectWriter Append(string name, Func<object, object> func)
        {
            Guard.IsNotNullOrEmpty(name, "name");

            if (func != null)
            {
                var result = func(this);
                if (result != null)
                {
                    Append("{0}:{1}".FormatWith(name, result.ToString()));
                }
            }

            return this;
        }

        /// <summary>
        /// Appends the specified name and value to the end of this instance.
        /// </summary>
        /// <typeparam name="TEnum">The type of the enum.</typeparam>
        /// <param name="name">The name.</param>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        public virtual IClientSideObjectWriter Append<TEnum>(string name, TEnum value) where TEnum : IComparable, IFormattable
        {
            Guard.IsNotNullOrEmpty(name, "name");

            ClientSideEnumValueAttribute valueAttribute = value.GetType().GetField(value.ToString())
                                                                         .GetCustomAttributes(true)
                                                                         .OfType<ClientSideEnumValueAttribute>()
                                                                         .FirstOrDefault();

            if (valueAttribute != null)
            {
                Append("{0}:{1}".FormatWith(name, valueAttribute.Value));
            }

            return this;
        }

        /// <summary>
        /// Appends the specified name and value to the end of this instance.
        /// </summary>
        /// <typeparam name="TEnum">The type of the enum.</typeparam>
        /// <param name="name">The name.</param>
        /// <param name="value">The value.</param>
        /// <param name="defaultValue">The default value.</param>
        /// <returns></returns>
        public virtual IClientSideObjectWriter Append<TEnum>(string name, TEnum value, TEnum defaultValue) where TEnum : IComparable, IFormattable
        {
            Guard.IsNotNullOrEmpty(name, "name");

            if (!value.Equals(defaultValue))
            {
                Append(name, value);
            }

            return this;
        }

        public virtual IClientSideObjectWriter AppendCollection(string name, IEnumerable value)
        {
            Guard.IsNotNullOrEmpty(name, "name");

            return Append("{0}:{1}".FormatWith(name, new JavaScriptSerializer().Serialize(value)));
        }

        public virtual IClientSideObjectWriter AppendObject(string name, object value)
        {
            Guard.IsNotNullOrEmpty(name, "name");

            return Append("{0}:{1}".FormatWith(name, new JavaScriptSerializer().Serialize(value)));
        }

        /// <summary>
        /// Appends the specified name and Action or String specified in the ClientEvent object.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="event">Client event of the component.</para>
        /// <returns></returns>
        public virtual IClientSideObjectWriter AppendClientEvent(string name, ClientEvent clientEvent)
        {
            Guard.IsNotNullOrEmpty(name, "name");

            if (clientEvent.CodeBlock != null)
            {
                Append(name, clientEvent.CodeBlock);
            }
            else if (clientEvent.InlineCodeBlock != null)
            {
                Append(name, clientEvent.InlineCodeBlock);
            }
            else if (clientEvent.HandlerName.HasValue())
            {
                Append("{0}:{1}".FormatWith(name, clientEvent.HandlerName));
            }

            return this;
        }

        public virtual IClientSideObjectWriter Append(string name, HtmlTemplate htmlTemplate)
        {
            Guard.IsNotNullOrEmpty(name, "name");

            if (htmlTemplate.HasValue())
            {
                if (htmlTemplate.Content != null)
                {
                    EnsureStart();

                    writer.Write(appended ? ", " : "{");
                    writer.Write("{0}:'".FormatWith(name));
                    htmlTemplate.Content();
                    writer.Write("'");

                    return this;
                }

                if (htmlTemplate.Html.HasValue())
                {
                    string formattedValue = QuoteString(htmlTemplate.Html);

                    Append("{0}:'{1}'".FormatWith(name, formattedValue));

                    return this;
                }

                if (htmlTemplate.InlineTemplate != null)
                {
                    var inlineTemplate = htmlTemplate.InlineTemplate(null);

                    if (inlineTemplate != null)
                    {
                        string formattedValue = QuoteString(inlineTemplate.ToString());

                        Append("{0}:'{1}'".FormatWith(name, formattedValue));
                    }
                }
            }

            return this;
        }

        /// <summary>
        /// Completes this instance.
        /// </summary>
        public virtual void Complete()
        {
            EnsureStart();

            if (appended)
            {
                writer.Write("}");
            }

            writer.Write(");");

            hasStarted = false;
            appended = false;
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1502:AvoidExcessiveComplexity", Justification = "Needs refactoring")]
        private static string QuoteString(string value)
        {
            StringBuilder result = new StringBuilder();

            if (!string.IsNullOrEmpty(value))
            {
                int startIndex = 0;
                int count = 0;

                for (int i = 0; i < value.Length; i++)
                {
                    char c = value[i];

                    if (c == '\r' || c == '\t' || c == '\"' || c == '\'' || c == '<' || c == '>' ||
                        c == '\\' || c == '\n' || c == '\b' || c == '\f' || c < ' ')
                    {
                        if (count > 0)
                        {
                            result.Append(value, startIndex, count);
                        }

                        startIndex = i + 1;
                        count = 0;
                    }

                    switch (c)
                    {
                        case '\r':
                            result.Append("\\r");
                            break;
                        case '\t':
                            result.Append("\\t");
                            break;
                        case '\"':
                            result.Append("\\\"");
                            break;
                        case '\\':
                            result.Append("\\\\");
                            break;
                        case '\n':
                            result.Append("\\n");
                            break;
                        case '\b':
                            result.Append("\\b");
                            break;
                        case '\f':
                            result.Append("\\f");
                            break;
                        case '\'':
                        case '>':
                        case '<':
                            AppendAsUnicode(result, c);
                            break;
                        default:
                            if (c < ' ')
                            {
                                AppendAsUnicode(result, c);
                            }
                            else
                            {
                                count++;
                            }

                            break;
                    }
                }

                if (result.Length == 0)
                {
                    result.Append(value);
                }
                else if (count > 0)
                {
                    result.Append(value, startIndex, count);
                }
            }

            return result.ToString();
        }

        private static void AppendAsUnicode(StringBuilder builder, char c)
        {
            builder.Append("\\u");
            builder.AppendFormat(CultureInfo.InvariantCulture, "{0:x4}", (int)c);
        }

        private void EnsureStart()
        {
            if (!hasStarted)
            {
                throw new InvalidOperationException(Resources.TextResource.YouMustHaveToCallStartPriorCallingThisMethod);
            }
        }
    }
}