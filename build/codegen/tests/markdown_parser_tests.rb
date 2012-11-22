require 'test/unit'
require 'markdown_parser'
require 'component'

class MarkdownParserTests < Test::Unit::TestCase

    def test_parse_sets_component_name
        result = MarkdownParser.parse("# kendo.ui.AutoComplete")

        assert_equal 'kendo.ui.AutoComplete', result.name
    end

    def test_parse_field_from_configuration
        result = MarkdownParser.parse(%{
# kendo.ui.AutoComplete

## Configuration

### foo
        })

        assert_equal 'foo', result.fields[0].name
    end

    def test_parse_field_description
        result = MarkdownParser.parse(%{
# kendo.ui.AutoComplete

## Configuration

### foo
bar
        })

        assert_equal 'bar', result.fields[0].description
    end
end
