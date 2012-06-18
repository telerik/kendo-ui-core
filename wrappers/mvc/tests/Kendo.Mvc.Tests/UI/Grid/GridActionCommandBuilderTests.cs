namespace Kendo.Mvc.UI.Fluent.Tests
{
    using System.Collections.Generic;
    using System.Web.Mvc;
    using System;
    using Kendo.Mvc.UI.Html;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Tests;
    using Xunit;
    public class GridActionCommandBuilderTests
    {
        internal static GridActionCommandBaseDouble command;
        internal static GridActionCommandBuilderBaseDouble builder;

        public GridActionCommandBuilderTests()
        {
            command = new GridActionCommandBaseDouble();
            builder = new GridActionCommandBuilderBaseDouble(command);
        }
        //TODO: Implement command button types
        /*
        [Fact]
        public void ButtonType_should_set_type_of_the_button()
        {
            var type = GridButtonType.ImageAndText;

            builder.ButtonType(type);

            Assert.Equal(type, command.ButtonType);
        }
        
        [Fact]
        public void ButtonType_should_return_builder()
        {
            Assert.IsType(typeof(GridActionCommandBuilderBaseDouble), builder.ButtonType(GridButtonType.ImageAndText));
        }
        */

        //TODO: Implement command button html attributes
        //[Fact]
        //public void HtmlAttributes_should_set_HtmlAttributes_property() 
        //{
        //    var style = new { style = "width:10px" };

        //    builder.HtmlAttributes(style);

        //    Assert.Equal( style.style.ToString(), command.HtmlAttributes["style"].ToString());
        //}

        //[Fact]
        //public void HtmlAttributes_should_return_builder()
        //{
        //    var style = new { style = "width:10px" };

        //    Assert.IsType(typeof(GridActionCommandBuilderBaseDouble), builder.HtmlAttributes(style));
        //}

        //[Fact]
        //public void ImageHtmlAttributes_should_set_ImageHtmlAttributes_property()
        //{
        //    var style = new { style = "width:10px" };

        //    builder.ImageHtmlAttributes(style);

        //    Assert.Equal(style.style.ToString(), command.ImageHtmlAttributes["style"].ToString());
        //}

        //[Fact]
        //public void ImageHtmlAttributes_should_return_builder()
        //{
        //    var style = new { style = "width:10px" };

        //    Assert.IsType(typeof(GridActionCommandBuilderBaseDouble), builder.ImageHtmlAttributes(style));
        //}
    }

    public class GridActionCommandBaseDouble : GridActionCommandBase 
    {
        public GridActionCommandBaseDouble() : base() { }

        public override string Name
        {
            get { throw new System.NotImplementedException(); }
        }

        public override IEnumerable<IGridButtonBuilder> CreateDisplayButtons(IGridUrlBuilder urlBuilder, IGridHtmlHelper htmlHelper)
        {
            // TODO: Implement this method
            throw new NotImplementedException();
        }

        public override IEnumerable<IGridButtonBuilder> CreateEditButtons(IGridUrlBuilder urlBuilder, IGridHtmlHelper htmlHelper)
        {
            // TODO: Implement this method
            throw new NotImplementedException();
        }
    }

    public class GridActionCommandBuilderBaseDouble : GridActionCommandBuilderBase<GridActionCommandBase, GridActionCommandBuilderBaseDouble>
    {
        public GridActionCommandBuilderBaseDouble(GridActionCommandBase command) : base(command) { }
    }
}
