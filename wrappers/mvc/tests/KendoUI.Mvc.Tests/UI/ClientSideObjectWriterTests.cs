// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Tests
{
    using Moq;
    using System;
    using System.Collections.Generic;
    using System.IO;
    using Telerik.Web.Mvc.Extensions;
    using Xunit;

    public class ClientSideObjectWriterTests
    {
        private const string Id = "myId";
        private const string Type = "myObject";

        private readonly Mock<TextWriter> _writer;
        private readonly ClientSideObjectWriter _objectWriter;

        public ClientSideObjectWriterTests()
        {
            _writer = new Mock<TextWriter>();
            _objectWriter = new ClientSideObjectWriter(Id, Type, _writer.Object);
        }

        [Fact]
        public void Start_should_write_id_type_and_opening_bracket()
        {
            _writer.Setup(w => w.Write("jQuery('#{0}').{1}(".FormatWith(Id, Type))).Verifiable();

            _objectWriter.Start();

            _writer.Verify();
        }

        [Fact]
        public void Start_should_throw_exception_when_called_more_than_once()
        {
            _objectWriter.Start();

            Assert.Throws<InvalidOperationException>(() => _objectWriter.Start());
        }

        [Fact]
        public void Append_should_write_json_start_when_previously_not_appended()
        {
            _writer.Setup(w => w.Write(It.IsAny<string>())).Verifiable();

            _objectWriter.Start()
                         .Append("key:'value'");

            _writer.Verify(w => w.Write("{"));
            _writer.Verify(w => w.Write("key:'value'"));
        }

        [Fact]
        public void Append_should_write_comma_when_previously_appended()
        {
            _writer.Setup(w => w.Write(It.IsAny<string>())).Verifiable();

            _objectWriter.Start()
                         .Append("key1:'value1'")
                         .Append("key2:'value2'");

            _writer.Verify(w => w.Write(", "));
            _writer.Verify(w => w.Write("key2:'value2'"));
        }

        [Fact]
        public void Append_should_throw_exception_if_begin_is_not_called_previously()
        {
            Assert.Throws<InvalidOperationException>(() => _objectWriter.Append("foo:'bar'"));
        }

        [Fact]
        public void Should_be_able_to_append_string_value()
        {
            _writer.Setup(w => w.Write(It.IsAny<string>())).Verifiable();

            _objectWriter.Start()
                         .Append("foo", "bar");

            _writer.Verify(w => w.Write("foo:'bar'"));
        }

        [Fact]
        public void Should_be_able_to_append_string_value_with_special_characters()
        {
            _writer.Setup(w => w.Write(It.IsAny<string>())).Verifiable();

            _objectWriter.Start().Append("foo", "\r\tf\"\'<a>\\adw\n\b\f");

            _writer.Verify();
        }

        [Fact]
        public void AppendNullableString_Should_be_able_to_append_string_value()
        {
            _writer.Setup(w => w.Write(It.IsAny<string>())).Verifiable();

            string test = "test";

            _objectWriter.Start()
                         .AppendNullableString("foo", test);

            _writer.Verify(w => w.Write("foo:'test'"));
        }

        [Fact]
        public void AppendNullableString_should_be_able_to_append_empty_string()
        {
            _writer.Setup(w => w.Write(It.IsAny<string>())).Verifiable();

            string test = "";

            _objectWriter.Start()
                         .AppendNullableString("foo", test);

            _writer.Verify(w => w.Write("foo:''"));
        }

        [Fact]
        public void AppendNullableString_should_not_serialize_if_string_is_null()
        {
            _writer.Setup(w => w.Write(It.IsAny<string>())).Verifiable();

            string test = null;

            _objectWriter.Start()
                         .AppendNullableString("foo", test);

            _writer.Verify(w => w.Write("foo:''"), Times.Never());
        }

        [Fact]
        public void Should_be_able_to_append_nullable_integer_value()
        {
            _writer.Setup(w => w.Write(It.IsAny<string>())).Verifiable();

            _objectWriter.Start()
                         .Append("foo", (int?) 5);

            _writer.Verify(w => w.Write("foo:5"));
        }

        [Fact]
        public void Should_be_able_to_append_nullable_double_value()
        {
            double? value = 5.12;

            _writer.Setup(w => w.Write(It.IsAny<string>())).Verifiable();

            _objectWriter.Start()
                         .Append("foo", value);

            _writer.Verify(w => w.Write("foo:'" + value.ToString() + "'"));
        }

        [Fact]
        public void Should_be_able_to_append_nullable_decimal_value()
        {
            decimal? value = 5.0m;

            _writer.Setup(w => w.Write(It.IsAny<string>())).Verifiable();

            _objectWriter.Start()
                         .Append("foo", value);

            _writer.Verify(w => w.Write("foo:'" + value.ToString() + "'"));
        }

        [Fact]
        public void Should_be_able_to_append_integer_value_with_default_value()
        {
            _writer.Setup(w => w.Write(It.IsAny<string>())).Verifiable();

            _objectWriter.Start()
                         .Append("foo", 5, 0);

            _writer.Verify(w => w.Write("foo:5"));
        }

        [Fact]
        public void Should_be_able_to_append_integer_value_without_default_value()
        {
            _writer.Setup(w => w.Write(It.IsAny<string>())).Verifiable();

            _objectWriter.Start()
                         .Append("foo", 0);

            _writer.Verify(w => w.Write("foo:0"));
        }

        [Fact]
        public void Should_be_able_to_append_boolean_with_default_value()
        {
            _writer.Setup(w => w.Write(It.IsAny<string>())).Verifiable();

            _objectWriter.Start()
                         .Append("foo", true, false);

            _writer.Verify(w => w.Write("foo:true"));
        }

        [Fact]
        public void Should_be_able_to_append_boolean_without_default_value()
        {
            _writer.Setup(w => w.Write(It.IsAny<string>())).Verifiable();

            _objectWriter.Start()
                         .Append("foo", true);

            _writer.Verify(w => w.Write("foo:true"));
        }

        [Fact]
        public void Should_be_able_to_AppendDateOnly_only_date_value()
        {
            _writer.Setup(w => w.Write(It.IsAny<string>())).Verifiable();

            _objectWriter.Start()
                         .AppendDateOnly("foo", new DateTime(2000, 1, 1, 23, 59, 59, 999));

            _writer.Verify(w => w.Write("foo:new Date(2000,0,1)"));
        }

        [Fact]
        public void Should_be_able_to_nullable_Date_Only_only_date_value()
        {
            _writer.Setup(w => w.Write(It.IsAny<string>())).Verifiable();

            DateTime? date = new DateTime(2000, 1, 1, 23, 59, 59, 999);

            _objectWriter.Start()
                         .AppendDateOnly("foo", date);

            _writer.Verify(w => w.Write("foo:new Date(2000,0,1)"));
        }

        [Fact]
        public void Should_not_append_nullable_Date_if_it_is_null()
        {
            _writer.Setup(w => w.Write(It.IsAny<string>())).Verifiable();

            _objectWriter.Start()
                         .AppendDateOnly("foo", null);

            _writer.Verify(w => w.Write(It.IsAny<string>()), Times.Exactly(1));
        }

        [Fact]
        public void Should_be_able_to_append_nullable_date_time_value()
        {
            _writer.Setup(w => w.Write(It.IsAny<string>())).Verifiable();

            _objectWriter.Start()
                         .Append("foo", (DateTime?) new DateTime(2000, 1, 1, 23, 59, 59, 999));

            _writer.Verify(w => w.Write("foo:new Date(2000,0,1,23,59,59,999)"));
        }

        [Fact]
        public void Should_be_able_to_append_date_time_value()
        {
            _writer.Setup(w => w.Write(It.IsAny<string>())).Verifiable();

            _objectWriter.Start()
                         .Append("foo", new DateTime(2000, 1, 1, 23, 59, 59, 999));

            _writer.Verify(w => w.Write("foo:new Date(2000,0,1,23,59,59,999)"));
        }

        [Fact]
        public void Should_be_able_to_append_action()
        {
            _writer.Setup(w => w.Write(It.IsAny<string>())).Verifiable();

            _objectWriter.Start()
                         .Append("foo", () => {});

            _writer.Verify(w => w.Write("foo:"));
        }

        [Fact]
        public void Should_be_able_to_append_enum_with_default_value()
        {
            _writer.Setup(w => w.Write(It.IsAny<string>())).Verifiable();

            _objectWriter.Start()
                         .Append("dummy", DummyEnum.Bar, DummyEnum.Foo);

            _writer.Verify(w => w.Write("dummy:'bar'"));
        }

        [Fact]
        public void Complete_should_write_json_end_when_when_previously_appended()
        {
            _writer.Setup(w => w.Write(It.IsAny<string>())).Verifiable();

            _objectWriter.Start()
                         .Append("key", "value")
                         .Complete();

            _writer.Verify(w => w.Write("}"));
        }

        [Fact]
        public void Complete_should_write_closing_Id_and_type_bracket()
        {
            _writer.Setup(w => w.Write(It.IsAny<string>())).Verifiable();

            _objectWriter.Start()
                         .Complete();

            _writer.Verify(w => w.Write(");"));
        }

        [Fact]
        public void Should_be_able_to_proceed_again_once_Complete_is_called()
        {
            _objectWriter.Start().Append("foo", "bar").Complete();

            Assert.DoesNotThrow(() => _objectWriter.Start().Append("baz", "yeda").Complete());
        }

        [Fact]
        public void AppendDatesOnly_should_write_json_object_created_by_collection_with_one_date() 
        {
            const string name = "dates";
            DateTime date = new DateTime(2000, 10, 23);

            _objectWriter.Start().AppendDatesOnly(name, new List<DateTime> { date });

            _writer.Verify(w => w.Write(name+":{'2000':{'9':[23]}}"));
        }

        [Fact]
        public void AppendDatesOnly_should_write_json_object_created_by_collection_with_two_date_same_years()
        {
            const string name = "dates";
            DateTime date = new DateTime(2000, 10, 23);
            DateTime date1 = new DateTime(2000, 9, 23);

            _objectWriter.Start().AppendDatesOnly(name, new List<DateTime> { date, date1 });

            _writer.Verify(w => w.Write(name + ":{'2000':{'8':[23],'9':[23]}}"));
        }

        [Fact]
        public void AppendDatesOnly_should_write_json_object_created_by_collection_with_three_diff_months_and_same_year()
        {
            const string name = "dates";
            DateTime date = new DateTime(2000, 5, 23);
            DateTime date1 = new DateTime(2000, 9, 23);
            DateTime date2 = new DateTime(2000, 3, 23);

            _objectWriter.Start().AppendDatesOnly(name, new List<DateTime> { date, date1, date2 });

            _writer.Verify(w => w.Write(name + ":{'2000':{'2':[23],'4':[23],'8':[23]}}"));
        }

        [Fact]
        public void AppendDatesOnly_should_write_json_object_created_by_collection_with_two_date_same_years_and_months()
        {
            const string name = "dates";
            DateTime date = new DateTime(2000, 10, 23);
            DateTime date1 = new DateTime(2000, 10, 20);

            _objectWriter.Start().AppendDatesOnly(name, new List<DateTime> { date, date1 });

            _writer.Verify(w => w.Write(name + ":{'2000':{'9':[20,23]}}"));
        }

        [Fact]
        public void AppendDatesOnly_should_write_json_object_created_by_collection_with_three_date_same_years_and_months()
        {
            const string name = "dates";
            DateTime date = new DateTime(2000, 10, 23);
            DateTime date1 = new DateTime(2000, 10, 28);
            DateTime date2 = new DateTime(2000, 10, 15);

            _objectWriter.Start().AppendDatesOnly(name, new List<DateTime> { date, date1, date2 });

            _writer.Verify(w => w.Write(name + ":{'2000':{'9':[15,23,28]}}"));
        }

        [Fact]
        public void AppendDatesOnly_should_write_json_object_created_by_collection_with_two_diff_years_and_months()
        {
            const string name = "dates";
            DateTime date = new DateTime(2000, 10, 23);
            DateTime date1 = new DateTime(2001, 9, 23);

            _objectWriter.Start().AppendDatesOnly(name, new List<DateTime> { date, date1 });

            _writer.Verify(w => w.Write(name + ":{'2000':{'9':[23]},'2001':{'8':[23]}}"));
        }

        [Fact]
        public void AppendDatesOnly_should_write_json_object_created_by_collection_with_three_diff_years_and_months()
        {
            const string name = "dates";
            DateTime date = new DateTime(2000, 10, 23);
            DateTime date1 = new DateTime(2001, 9, 23);
            DateTime date2 = new DateTime(1989, 9, 22);

            _objectWriter.Start().AppendDatesOnly(name, new List<DateTime> { date, date1, date2 });

            _writer.Verify(w => w.Write(name + ":{'1989':{'8':[22]},'2000':{'9':[23]},'2001':{'8':[23]}}"));
        }

        [Fact]
        public void AppendClientEvent_should_append_action_if_it_is_not_null() 
        {
            _writer.Setup(w => w.Write(It.IsAny<string>())).Verifiable();

            ClientEvent clientEvent = new ClientEvent();
            clientEvent.CodeBlock = () => { };

            _objectWriter.Start()
                         .AppendClientEvent("foo", clientEvent);

            _writer.Verify(w => w.Write("foo:"));
        }

        [Fact]
        public void AppendClientEvent_should_append_third_param_if_action_is_null() 
        {
            _writer.Setup(w => w.Write(It.IsAny<string>())).Verifiable();

            ClientEvent clientEvent = new ClientEvent();
            clientEvent.HandlerName = "test";

            _objectWriter.Start()
            .AppendClientEvent("foo", clientEvent);

            _writer.Verify(w => w.Write("foo:test"));
        }
    }

    public enum DummyEnum
    {
        [ClientSideEnumValue("'foo'")]
        Foo = 0,
        [ClientSideEnumValue("'bar'")]
        Bar = 1
    }
}