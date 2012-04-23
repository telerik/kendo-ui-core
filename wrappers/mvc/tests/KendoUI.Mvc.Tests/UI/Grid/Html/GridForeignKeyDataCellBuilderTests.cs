// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    using Telerik.Web.Mvc.Extensions;
    using Telerik.Web.Mvc.UI.Tests;
    using Xunit;
    using System.Collections.Generic;
    using System.Web.Mvc;
    using System;

    public class GridForeignKeyDataCellBuilderTests
    {
        private readonly Record record;

        public GridForeignKeyDataCellBuilderTests()
        {
            record = new Record();
        }

        [Fact]
        public void Should_return_td()
        {
            var builder = ArrangeBuilder();

            record.Id = 1;

            builder.CreateCell(record).TagName.ShouldEqual("td");
        }

        [Fact]
        public void Should_not_encode_content()
        {
            const int itemWithLessThenCharacterId = 1; 
            var builder = ArrangeBuilder();

            record.ForeignId = itemWithLessThenCharacterId;

            builder.Encoded = false;

            builder.CreateCell(record).InnerHtml.ShouldEqual("<");
        }

        [Fact]
        public void Should_encode_content_if_encoded_is_true()
        {
            const int itemWithLessThenCharacterId = 1; 

            var builder = ArrangeBuilder();

            record.ForeignId = itemWithLessThenCharacterId;

            builder.Encoded = true;

            builder.CreateCell(record).InnerHtml.ShouldEqual("&lt;");
        }

        [Fact]
        public void Should_output_nbsp_if_value_is_null()
        {
            var builder = ArrangeBuilder();

            builder.CreateCell(record).InnerHtml.ShouldEqual("&nbsp;");
        }

        [Fact]
        public void Should_apply_format()
        {
            record.ForeignId = 2;
            var builder = ArrangeBuilder();

            builder.Format = "[{0}]";

            builder.CreateCell(record).InnerHtml.ShouldEqual("[Foreign2]");
        }

        [Fact]
        public void Should_append_html_attributes()
        {
            var builder = ArrangeBuilder();

            builder.HtmlAttributes.Merge(new { foo = "bar" });

            builder.CreateCell(record).Attribute("foo").ShouldEqual("bar");
        }

        [Fact]
        public void Should_output_nbsp_if_dataItem_is_null()
        {
            var builder = ArrangeBuilder();

            builder.CreateCell(null).InnerHtml.ShouldEqual("&nbsp;");
        }       

        [Fact]
        public void Should_output_foreign_text()
        {
            record.ForeignId = 2;
            var builder = ArrangeBuilder();

            builder.CreateCell(record).InnerHtml.ShouldEqual("Foreign2");
        }

        [Fact]
        public void Should_output_nbsp_if_item_does_not_exists()
        {
            const int nonExsistingId = 42;

            record.ForeignId = nonExsistingId;

            var builder = ArrangeBuilder();

            builder.CreateCell(record).InnerHtml.ShouldEqual("&nbsp;");
        }

        [Fact]
        public void Should_output_foreign_text_if_item_is_preselected()
        {
            record.ForeignId = 2;

            var builder = new GridForeignKeyDataCellBuilder<Record, int?>
            {
                Value = r => r.ForeignId,
                Data = new SelectList(ForeignRecords, "Id", "Name", 3),
                Callback = delegate { }
            };

            builder.CreateCell(record).InnerHtml.ShouldEqual("Foreign3");
        }

        private GridForeignKeyDataCellBuilder<Record, int?> ArrangeBuilder()
        {
            return new GridForeignKeyDataCellBuilder<Record, int?>
            {                
                Value = r => r.ForeignId,
                Data = new SelectList(ForeignRecords, "Id", "Name"),
                Callback = delegate { }
            };
        }

        IEnumerable<ForeignRecord> ForeignRecords
        {
            get
            {
                yield return new ForeignRecord { Id = 1, Name = "<" };
                yield return new ForeignRecord { Id = 2, Name = "Foreign2" };
                yield return new ForeignRecord { Id = 3, Name = "Foreign3" };
                yield return new ForeignRecord { Id = 4, Name = "Foreign4" };
                yield return new ForeignRecord { Id = 5, Name = "Foreign5" };
            }
        }

        class Record
        {
            public int Id { get; set; }
            public int? ForeignId { get; set; }
        }

        class ForeignRecord
        {
            public int Id { get; set; }
            public string Name { get; set; }
        }
    }
}
