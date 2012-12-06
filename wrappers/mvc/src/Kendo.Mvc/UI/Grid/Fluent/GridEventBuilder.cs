using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo Grid for ASP.NET MVC events.
    /// </summary>
    public class GridEventBuilder : EventBuilder
    {
        public GridEventBuilder(IDictionary<string, object> events) : base(events)
        {
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the Change client-side event.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param> 
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Grid()
        ///           .Name("Grid")
        ///           .Events(events => events.Change(
        ///                @&lt;text&gt;
        ///                function(e) {
        ///                    //event handling code
        ///                }
        ///                &lt;/text&gt;
        ///           ))
        /// )
        /// </code>
        /// </example>
        public GridEventBuilder Change(Func<object, object> handler)
        {
            Handler("change", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the Change client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Grid()
        ///            .Name("Grid")
        ///            .Events(events => events.Change("gridChange"))
        /// )
        /// </code>
        /// </example>
        public GridEventBuilder Change(string handler)
        {
            Handler("change", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the Edit client-side event.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>    
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Grid()
        ///           .Name("Grid")
        ///           .Events(events => events.Edit(
        ///                @&lt;text&gt;
        ///                function(e) {
        ///                    //event handling code
        ///                }
        ///                &lt;/text&gt;
        ///           ))
        /// )
        /// </code>
        /// </example>
        public GridEventBuilder Edit(Func<object, object> handler)
        {
            Handler("edit", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the Edit client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Grid()
        ///            .Name("Grid")
        ///            .Events(events => events.Edit("gridEdit"))
        /// )
        /// </code>
        /// </example>
        public GridEventBuilder Edit(string handler)
        {
            Handler("edit", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the Save client-side event.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Grid()
        ///           .Name("Grid")
        ///           .Events(events => events.Save(
        ///                @&lt;text&gt;
        ///                function(e) {
        ///                    //event handling code
        ///                }
        ///                &lt;/text&gt;
        ///           ))
        /// )
        /// </code>
        /// </example>
        public GridEventBuilder Save(Func<object, object> handler)
        {
            Handler("save", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the Save client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Grid()
        ///            .Name("Grid")
        ///            .Events(events => events.Save("gridSave"))
        /// )
        /// </code>
        /// </example>
        public GridEventBuilder Save(string handler)
        {
            Handler("save", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the SaveChanges client-side event.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Grid()
        ///           .Name("Grid")
        ///           .Events(events => events.SaveChanges(
        ///                @&lt;text&gt;
        ///                function(e) {
        ///                    //event handling code
        ///                }
        ///                &lt;/text&gt;
        ///           ))
        /// )
        /// </code>
        /// </example>
        public GridEventBuilder SaveChanges(Func<object, object> handler)
        {
            Handler("saveChanges", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the SaveChanges client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Grid()
        ///            .Name("Grid")
        ///            .Events(events => events.SaveChanges("gridSaveChanges"))
        /// )
        /// </code>
        /// </example>
        public GridEventBuilder SaveChanges(string handler)
        {
            Handler("saveChanges", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the DetailExpand client-side event.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Grid()
        ///           .Name("Grid")
        ///           .Events(events => events.DetailExpand(
        ///                @&lt;text&gt;
        ///                function(e) {
        ///                    //event handling code
        ///                }
        ///                &lt;/text&gt;
        ///           ))
        /// )
        /// </code>
        /// </example>
        public GridEventBuilder DetailExpand(Func<object, object> handler)
        {
            Handler("detailExpand", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the DetailExpand client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Grid()
        ///            .Name("Grid")
        ///            .Events(events => events.DetailExpand("gridDetailExpand"))
        /// )
        /// </code>
        /// </example>
        public GridEventBuilder DetailExpand(string handler)
        {
            Handler("detailExpand", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the DetailInit client-side event.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Grid()
        ///           .Name("Grid")
        ///           .Events(events => events.DetailInit(
        ///                @&lt;text&gt;
        ///                function(e) {
        ///                    //event handling code
        ///                }
        ///                &lt;/text&gt;
        ///           ))
        /// )
        /// </code>
        /// </example>
        public GridEventBuilder DetailInit(Func<object, object> handler)
        {
            Handler("detailInit", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the DetailInit client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Grid()
        ///            .Name("Grid")
        ///            .Events(events => events.DetailInit("gridDetailInit"))
        /// )
        /// </code>
        /// </example>
        public GridEventBuilder DetailInit(string handler)
        {
            Handler("detailInit", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the DetailCollapse client-side event.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Grid()
        ///           .Name("Grid")
        ///           .Events(events => events.DetailCollapse(
        ///                @&lt;text&gt;
        ///                function(e) {
        ///                    //event handling code
        ///                }
        ///                &lt;/text&gt;
        ///           ))
        /// )
        /// </code>
        /// </example>
        public GridEventBuilder DetailCollapse(Func<object, object> handler)
        {
            Handler("detailCollapse", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the DetailCollapse client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Grid()
        ///            .Name("Grid")
        ///            .Events(events => events.DetailCollapse("gridDetailCollapse"))
        /// )
        /// </code>
        /// </example>
        public GridEventBuilder DetailCollapse(string handler)
        {
            Handler("detailCollapse", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the Remove client-side event.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Grid()
        ///           .Name("Grid")
        ///           .Events(events => events.Remove(
        ///                @&lt;text&gt;
        ///                function(e) {
        ///                    //event handling code
        ///                }
        ///                &lt;/text&gt;
        ///           ))
        /// )
        /// </code>
        /// </example>
        public GridEventBuilder Remove(Func<object, object> handler)
        {
            Handler("remove", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the Remove client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Grid()
        ///            .Name("Grid")
        ///            .Events(events => events.Remove("gridRemove"))
        /// )
        /// </code>
        /// </example>
        public GridEventBuilder Remove(string handler)
        {
            Handler("remove", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the DataBound client-side event.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Grid()
        ///           .Name("Grid")
        ///           .Events(events => events.DataBound(
        ///                @&lt;text&gt;
        ///                function(e) {
        ///                    //event handling code
        ///                }
        ///                &lt;/text&gt;
        ///           ))
        /// )
        /// </code>
        /// </example>
        public GridEventBuilder DataBound(Func<object, object> handler)
        {
            Handler("dataBound", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the DataBound client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Grid()
        ///            .Name("Grid")
        ///            .Events(events => events.DataBound("gridDataBound"))
        /// )
        /// </code>
        /// </example>
        public GridEventBuilder DataBound(string handler)
        {
            Handler("dataBound", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the ColumnResize client-side event.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Grid()
        ///           .Name("Grid")
        ///           .Events(events => events.ColumnResize(
        ///                @&lt;text&gt;
        ///                function(e) {
        ///                    //event handling code
        ///                }
        ///                &lt;/text&gt;
        ///           ))
        /// )
        /// </code>
        /// </example>
        public GridEventBuilder ColumnResize(Func<object, object> handler)
        {
            Handler("columnResize", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the ColumnResize client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Grid()
        ///            .Name("Grid")
        ///            .Events(events => events.ColumnResize("gridColumnResize"))
        /// )
        /// </code>
        /// </example>
        public GridEventBuilder ColumnResize(string handler)
        {
            Handler("columnResize", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the ColumnReorder client-side event.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Grid()
        ///           .Name("Grid")
        ///           .Events(events => events.ColumnReorder(
        ///                @&lt;text&gt;
        ///                function(e) {
        ///                    //event handling code
        ///                }
        ///                &lt;/text&gt;
        ///           ))
        /// )
        /// </code>
        /// </example>
        public GridEventBuilder ColumnReorder(Func<object, object> handler)
        {
            Handler("columnReorder", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the ColumnReorder client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Grid()
        ///            .Name("Grid")
        ///            .Events(events => events.ColumnReorder("gridColumnReorder"))
        /// )
        /// </code>
        /// </example>
        public GridEventBuilder ColumnReorder(string handler)
        {
            Handler("columnReorder", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the ColumnHide client-side event.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Grid()
        ///           .Name("Grid")
        ///           .Events(events => events.ColumnHide(
        ///                @&lt;text&gt;
        ///                function(e) {
        ///                    //event handling code
        ///                }
        ///                &lt;/text&gt;
        ///           ))
        /// )
        /// </code>
        /// </example>
        public GridEventBuilder ColumnHide(Func<object, object> handler)
        {
            Handler("columnHide", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the ColumnHide client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Grid()
        ///            .Name("Grid")
        ///            .Events(events => events.ColumnHide("gridColumnHide"))
        /// )
        /// </code>
        /// </example>
        public GridEventBuilder ColumnHide(string handler)
        {
            Handler("columnHide", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the ColumnShow client-side event.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Grid()
        ///           .Name("Grid")
        ///           .Events(events => events.ColumnShow(
        ///                @&lt;text&gt;
        ///                function(e) {
        ///                    //event handling code
        ///                }
        ///                &lt;/text&gt;
        ///           ))
        /// )
        /// </code>
        /// </example>
        public GridEventBuilder ColumnShow(Func<object, object> handler)
        {
            Handler("columnShow", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the ColumnShow client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Grid()
        ///            .Name("Grid")
        ///            .Events(events => events.ColumnShow("gridColumnShow"))
        /// )
        /// </code>
        /// </example>
        public GridEventBuilder ColumnShow(string handler)
        {
            Handler("columnShow", handler);

            return this;
        }


        /// <summary>
        /// Defines the name of the JavaScript function that will handle the FilterMenuInit client-side event.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Grid()
        ///           .Name("Grid")
        ///           .Events(events => events.FilterMenuInit(
        ///                @&lt;text&gt;
        ///                function(e) {
        ///                    //event handling code
        ///                }
        ///                &lt;/text&gt;
        ///           ))
        /// )
        /// </code>
        /// </example>
        public GridEventBuilder FilterMenuInit(Func<object, object> handler)
        {
            Handler("filterMenuInit", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the FilterMenuInit client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Grid()
        ///            .Name("Grid")
        ///            .Events(events => events.FilterMenuInit("gridFilterMenuInit"))
        /// )
        /// </code>
        /// </example>
        public GridEventBuilder FilterMenuInit(string handler)
        {
            Handler("filterMenuInit", handler);

            return this;
        }
    }
}