namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;
    using System.Web.Mvc;
    using System.Linq.Expressions;
    using Kendo.Mvc.Resources;

    /// <summary>
    /// Defines the fluent API for configuring the TreeListColumn settings.
    /// </summary>
    public class TreeListColumnBuilder<T>: IHideObjectMembers where T : class
    {
        private readonly TreeListColumn container;

        public TreeListColumnBuilder(TreeListColumn settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// HTML attributes of the table cell (&lt;td&gt;) rendered for the column.
        /// </summary>
        /// <param name="value">The value that configures the htmlattributes.</param>
        public TreeListColumnBuilder<T> HtmlAttributes(object value)
        {
            return this.HtmlAttributes(value.ToDictionary());
        }
        
        /// <summary>
        /// HTML attributes of the table cell (&lt;td&gt;) rendered for the column.
        /// </summary>
        /// <param name="value">The value that configures the htmlattributes.</param>
        public TreeListColumnBuilder<T> HtmlAttributes(IDictionary<string,object> value)
        {
            container.HtmlAttributes = value;

            return this;
        }
        
        /// <summary>
        /// The configuration of the column command(s). If set the column would display a button for every command. Commands can be custom or built-in ("edit", "destroy" or "createChild").The "edit" built-in command switches the current table row in edit mode.The "createChild" built-in command adds new child item to the current table row and switches in edit mode.The "destroy" built-in command removes the data item to which the current table row is bound.Custom commands are supported by specifying the click option.
        /// </summary>
        /// <param name="configurator">The action that configures the command.</param>
        public TreeListColumnBuilder<T> Command(Action<TreeListColumnCommandFactory<T>> configurator)
        {
            configurator(new TreeListColumnCommandFactory<T>(container.Command));
            return this;
        }
        
        /// <summary>
        /// Provides a way to specify a custom editing UI for the column. Use the container parameter to create the editing UI.
        /// </summary>
        /// <param name="value">The value that configures the editor.</param>
        public TreeListColumnBuilder<T> Editor(string value)
        {
            container.Editor = value;

            return this;
        }
        
        /// <summary>
        /// If set to true the column value will be HTML-encoded before it is displayed. If set to false the column value will be displayed as is. By default the column value is HTML-encoded.
        /// </summary>
        /// <param name="value">The value that configures the encoded.</param>
        public TreeListColumnBuilder<T> Encoded(bool value)
        {
            container.Encoded = value;

            return this;
        }
        
        /// <summary>
        /// If set to true the column will show the icons that are used for exapdning and collapsing of child rows. By default, the first column of the TreeList is expandable.
        /// </summary>
        /// <param name="value">The value that configures the expandable.</param>
        public TreeListColumnBuilder<T> Expandable(bool value)
        {
            container.Expandable = value;

            return this;
        }
        
        /// <summary>
        /// The field to which the column is bound. The value of this field is displayed by the column during data binding.
		/// The field name should be a valid Javascript identifier and should contain no spaces, no special characters, and the first character should be a letter.
        /// </summary>
        /// <param name="expression">The expression that specifies the field, based on the bound model.</param>
        public TreeListColumnBuilder<T> Field<TValue>(Expression<Func<T, TValue>> expression)
        {
            if (typeof(T).IsPlainType() && !expression.IsBindable())
            {
                throw new InvalidOperationException(Exceptions.MemberExpressionRequired);
            }

            container.Field = expression.MemberWithoutInstance();

            if (typeof(T).IsPlainType())
            {
                var metadata = ModelMetadata.FromLambdaExpression(expression, new ViewDataDictionary<T>());
                container.Title = metadata.DisplayName;
                container.Format = metadata.DisplayFormatString;
            }

            if (string.IsNullOrEmpty(container.Title))
            {
                var asTitle = container.Field.AsTitle();
                if (asTitle != container.Field) {
                    container.Title = asTitle;
                }
            }

            return this;
        }
        
        /// <summary>
        /// The field to which the column is bound. The value of this field is displayed by the column during data binding.
		/// The field name should be a valid Javascript identifier and should contain no spaces, no special characters, and the first character should be a letter.
        /// </summary>
        /// <param name="value">The value that configures the field.</param>
        public TreeListColumnBuilder<T> Field(string value)
        {
            container.Field = value;

            return this;
        }
        
        /// <summary>
        /// The template which renders the footer table cell for the column.The fields which can be used in the template are:
        /// </summary>
        /// <param name="value">The value that configures the footertemplate.</param>
        public TreeListColumnBuilder<T> FooterTemplate(string value)
        {
            container.FooterTemplate = value;

            return this;
        }

        /// <summary>
        /// The template which renders the footer table cell for the column.The fields which can be used in the template are:
        /// </summary>
        /// <param name="value">The value that configures the footertemplate.</param>
        public TreeListColumnBuilder<T> FooterTemplateId(string value)
        {
            container.FooterTemplateId = value;

            return this;
        }
        
        /// <summary>
        /// The format that is applied to the value before it is displayed. Takes the form "{0:format}" where "format" is a standard number format,
		/// custom number format, standard date format or a custom date format.
        /// </summary>
        /// <param name="value">The value that configures the format.</param>
        public TreeListColumnBuilder<T> Format(string value)
        {
            container.Format = value;

            return this;
        }
        
        /// <summary>
        /// HTML attributes of the table header cell (&lt;th&gt;) rendered for the column.
        /// </summary>
        /// <param name="value">The value that configures the headerattributes.</param>
        public TreeListColumnBuilder<T> HeaderAttributes(object value)
        {
            return this.HeaderAttributes(value.ToDictionary());
        }
        
        /// <summary>
        /// HTML attributes of the table header cell (&lt;th&gt;) rendered for the column.
        /// </summary>
        /// <param name="value">The value that configures the headerattributes.</param>
        public TreeListColumnBuilder<T> HeaderAttributes(IDictionary<string,object> value)
        {
            container.HeaderAttributes = value;

            return this;
        }
        
        /// <summary>
        /// The template which renders the column header content. By default the value of the title column option
		/// is displayed in the column header cell.
        /// </summary>
        /// <param name="value">The value that configures the headertemplate.</param>
        public TreeListColumnBuilder<T> HeaderTemplate(string value)
        {
            container.HeaderTemplate = value;

            return this;
        }

        /// <summary>
        /// The template which renders the column header content. By default the value of the title column option
		/// is displayed in the column header cell.
        /// </summary>
        /// <param name="value">The value that configures the headertemplate.</param>
        public TreeListColumnBuilder<T> HeaderTemplateId(string value)
        {
            container.HeaderTemplateId = value;

            return this;
        }
        

        /// <summary>
        /// If set to true the user can click the column header and sort the treelist by the column field when sorting is enabled. If set to false sorting will
		/// be disabled for this column. By default all columns are sortable if sorting is enabled via the sortable option.
        /// </summary>
        /// <param name="enabled">Enables or disables the sortable option.</param>
        public TreeListColumnBuilder<T> Sortable(bool enabled)
        {
            container.Sortable.Enabled = enabled;
            return this;
        }

        
        /// <summary>
        /// If set to true the user can click the column header and sort the treelist by the column field when sorting is enabled. If set to false sorting will
		/// be disabled for this column. By default all columns are sortable if sorting is enabled via the sortable option.
        /// </summary>
        /// <param name="configurator">The action that configures the sortable.</param>
        public TreeListColumnBuilder<T> Sortable(Action<TreeListColumnSortableSettingsBuilder<T>> configurator)
        {
            container.Sortable.Enabled = true;
            
            configurator(new TreeListColumnSortableSettingsBuilder<T>(container.Sortable));
            return this;
        }
        
        /// <summary>
        /// The template which renders the column content. The treelist renders table rows (&lt;tr&gt;) which represent the data source items.
		/// Each table row consists of table cells (&lt;td&gt;) which represent the treelist columns. By default the HTML-encoded value of the field is displayed in the column.
        /// </summary>
        /// <param name="value">The value that configures the template.</param>
        public TreeListColumnBuilder<T> Template(string value)
        {
            container.Template = value;

            return this;
        }

        /// <summary>
        /// The template which renders the column content. The treelist renders table rows (&lt;tr&gt;) which represent the data source items.
		/// Each table row consists of table cells (&lt;td&gt;) which represent the treelist columns. By default the HTML-encoded value of the field is displayed in the column.
        /// </summary>
        /// <param name="value">The value that configures the template.</param>
        public TreeListColumnBuilder<T> TemplateId(string value)
        {
            container.TemplateId = value;

            return this;
        }
        
        /// <summary>
        /// The text that is displayed in the column header cell. If not set the field is used.
        /// </summary>
        /// <param name="value">The value that configures the title.</param>
        public TreeListColumnBuilder<T> Title(string value)
        {
            container.Title = value;

            return this;
        }
        
        /// <summary>
        /// The width of the column. Numeric values are treated as pixels. For more important information, please refer to Column Widths.
        /// </summary>
        /// <param name="value">The value that configures the width.</param>
        public TreeListColumnBuilder<T> Width(string value)
        {
            container.Width = value;

            return this;
        }
        

        /// <summary>
        /// If set to true a filter menu will be displayed for this column when filtering is enabled. If set to false the filter menu will not be displayed. By default a filter menu is displayed
		/// for all columns when filtering is enabled via the filterable option.Can be set to a JavaScript object which represents the filter menu configuration.
        /// </summary>
        /// <param name="enabled">Enables or disables the filterable option.</param>
        public TreeListColumnBuilder<T> Filterable(bool enabled)
        {
            container.Filterable.Enabled = enabled;
            return this;
        }

        
        /// <summary>
        /// If set to true a filter menu will be displayed for this column when filtering is enabled. If set to false the filter menu will not be displayed. By default a filter menu is displayed
		/// for all columns when filtering is enabled via the filterable option.Can be set to a JavaScript object which represents the filter menu configuration.
        /// </summary>
        /// <param name="configurator">The action that configures the filterable.</param>
        public TreeListColumnBuilder<T> Filterable(Action<TreeListColumnFilterableSettingsBuilder<T>> configurator)
        {
            container.Filterable.Enabled = true;
            
            configurator(new TreeListColumnFilterableSettingsBuilder<T>(container.Filterable));
            return this;
        }
        
        //<< Fields

        /// <summary>
        /// The width of the column. Numeric values are treated as pixels. For more important information, please refer to Column Widths.
        /// </summary>
        /// <param name="value">The value that configures the width.</param>
        public TreeListColumnBuilder<T> Width(int value)
        {
            container.Width = value + "px";

            return this;
        }

        /// <summary>
        /// If set to true the user can click the column header and sort the grid by the column field when sorting is enabled. If set to false sorting will
        /// be disabled for this column. By default all columns are sortable if sorting is enabled via the sortable option.
        /// </summary>
        public TreeListColumnBuilder<T> Sortable()
        {
            container.Sortable.Enabled = true;
            return this;
        }

        /// <summary>
        /// If set to true a filter menu will be displayed for this column when filtering is enabled. If set to false the filter menu will not be displayed. By default a filter menu is displayed
        /// for all columns when filtering is enabled via the filterable option. Can be set to a JavaScript object which represents the filter menu configuration.
        /// </summary>
        public TreeListColumnBuilder<T> Filterable()
        {
            container.Filterable.Enabled = true;
            return this;
        }
    }
}

