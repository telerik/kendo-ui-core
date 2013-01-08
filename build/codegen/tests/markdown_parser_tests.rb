require 'test/unit'
require 'markdown_parser'
require 'options'
require 'component'

class MarkdownParserTests < Test::Unit::TestCase

    def test_parse_sets_component_name
        result = CodeGen::MarkdownParser.new.parse("# kendo.ui.AutoComplete")

        assert_equal 'AutoComplete', result.name
    end

    def test_parse_option_from_configuration_section
        result = CodeGen::MarkdownParser.new.parse(%{
# kendo.ui.AutoComplete

## Configuration

### foo `String`
        })

        assert_equal 'foo', result.options[0].name
    end

    def test_parse_multiple_options
        result = CodeGen::MarkdownParser.new.parse(%{
# kendo.ui.AutoComplete

## Configuration

### foo `String`

### bar `Number`
        })

        assert_equal 2, result.options.size
    end

    def test_parse_option_default_value
        result = CodeGen::MarkdownParser.new.parse(%{
# kendo.ui.AutoComplete

## Configuration

### boo `String`*(default: true)*

        })

        assert_equal 'true', result.options[0].default
    end

    def test_parse_option_type
        result = CodeGen::MarkdownParser.new.parse(%{
# kendo.ui.AutoComplete

## Configuration

### foo `String`
        })

        assert_equal 'String', result.options[0].type[0]
    end

    def test_parse_option_description
        result = CodeGen::MarkdownParser.new.parse(%{
# kendo.ui.AutoComplete

## Configuration


### foo `String`

bar `foo`

bar `foo`

        })

        assert_equal 'bar foobar foo', result.options[0].description
    end

    def test_parse_multiple_option_description
        result = CodeGen::MarkdownParser.new.parse(%{
# kendo.ui.AutoComplete

## Configuration

### foo `String`

bar `foo`

### bar `String`

bar `foo`

        })

        assert_equal 'bar foo', result.options[0].description
    end

    def test_parse_method_from_methods_section
        result = CodeGen::MarkdownParser.new.parse(%{
# kendo.ui.AutoComplete

## Methods

### foo
        })

        assert_equal 'foo', result.methods[0].name
    end

    def test_parse_multiple_methods
        result = CodeGen::MarkdownParser.new.parse(%{
# kendo.ui.AutoComplete

## Methods

### foo

### bar
        })

        assert_equal 'bar', result.methods[1].name
    end

    def test_parse_method_description
        result = CodeGen::MarkdownParser.new.parse(%{
# kendo.ui.AutoComplete

## Methods

### foo

Foo

        })

        assert_equal 'Foo', result.methods[0].description
    end

    def test_parse_method_parameter
        result = CodeGen::MarkdownParser.new.parse(%{
# kendo.ui.AutoComplete

## Methods

### foo

#### Parameters

##### bar `String`

        })

        assert_equal 'bar', result.methods[0].parameters[0].name
    end

    def test_parse_method_parameter_optional
        result = CodeGen::MarkdownParser.new.parse(%{
# kendo.ui.AutoComplete

## Methods

### foo

#### Parameters

##### bar `String` *(optional)*

        })

        assert_equal true, result.methods[0].parameters[0].optional
    end

    def test_parse_composite_method_parameter
        result = CodeGen::MarkdownParser.new.parse(%{
# kendo.ui.AutoComplete

## Methods

### foo

#### Parameters

##### bar `Object`

##### bar.baz `String`

        })

        assert_equal 'baz', result.methods[0].parameters[0].parameters[0].name
    end

    def test_parse_multiple_composite_method_parameter
        result = CodeGen::MarkdownParser.new.parse(%{
# kendo.ui.AutoComplete

## Methods

### foo

#### Parameters

##### bar `Object`

##### bar.baz `Object`

##### bar.baz.boo `String`

        })

        assert_equal 'boo', result.methods[0].parameters[0].parameters[0].parameters[0].name
    end

    def test_parse_composite_method_parameter_with_many_parameters
        result = CodeGen::MarkdownParser.new.parse(%{
# kendo.ui.AutoComplete

## Methods

### foo

#### Parameters

##### bar `Object`

##### bar.baz `String`

##### bar.boo `String`

        })

        assert_equal 'boo', result.methods[0].parameters[0].parameters[1].name
    end

    def test_parse_method_parameter_description
        result = CodeGen::MarkdownParser.new.parse(%{
# kendo.ui.AutoComplete

## Methods

### foo

#### Parameters

##### bar `String`

Bar

        })

        assert_equal 'Bar', result.methods[0].parameters[0].description
    end

    def test_parse_empty_parameters
        result = CodeGen::MarkdownParser.new.parse(%{
# kendo.ui.AutoComplete

## Methods

### foo

### bar

#### Parameters

##### baz `String`

        })

        assert_equal 0, result.methods[0].parameters.size
    end

    def test_parse_method_parameter_type
        result = CodeGen::MarkdownParser.new.parse(%{
# kendo.ui.AutoComplete

## Methods

### foo

#### Parameters

##### bar `String`

Bar

        })

        assert_equal 'String', result.methods[0].parameters[0].type[0]
    end

    def test_method_result_empty
        result = CodeGen::MarkdownParser.new.parse(%{
# kendo.ui.AutoComplete

## Methods

### foo

### bar

#### Returns

`String` Foo
        })

        assert_equal nil, result.methods[0].result
    end

    def test_parse_method_result_type
        result = CodeGen::MarkdownParser.new.parse(%{
# kendo.ui.AutoComplete

## Methods

### foo

#### Returns

`String` Foo
        })

        assert_equal 'String', result.methods[0].result.type
    end

    def test_parse_method_result_description
        result = CodeGen::MarkdownParser.new.parse(%{
# kendo.ui.AutoComplete

## Methods

### foo

#### Returns

`String` Foo
        })

        assert_equal 'Foo', result.methods[0].result.description
    end

    def test_parse_event_from_events_section
        result = CodeGen::MarkdownParser.new.parse(%{
# kendo.ui.AutoComplete

## Configuration

### foo `String`

## Events

### bar
        })

        assert_equal 'bar', result.events[0].name
    end

    def test_parse_event_data
        result = CodeGen::MarkdownParser.new.parse(%{
# kendo.ui.AutoComplete

## Configuration

### foo `String`

## Events

### bar

#### Event Data

##### e.foo
        })

        assert_equal 'foo', result.events[0].options[0].name
    end

    def test_parse_nested_event_data
        result = CodeGen::MarkdownParser.new.parse(%{
# kendo.ui.AutoComplete

## Configuration

### foo `String`

## Events

### bar

#### Event Data

##### e.foo `Object`

##### e.foo.bar `String`
        })

        assert_equal 'bar', result.events[0].options[0].options[0].name
    end

    def test_parse_event_data_type
        result = CodeGen::MarkdownParser.new.parse(%{
# kendo.ui.AutoComplete

## Configuration

### foo `String`

## Events

### bar

#### Event Data

##### e.foo `String`
        })

        assert_equal 'String', result.events[0].options[0].type[0]
    end

    def test_parse_event_data_description
        result = CodeGen::MarkdownParser.new.parse(%{
# kendo.ui.AutoComplete

## Configuration

### foo `String`

## Events

### bar

#### Event Data

##### e.foo `String`

Bar
        })

        assert_equal 'Bar', result.events[0].options[0].description
    end
    def test_parse_multiple_events
        result = CodeGen::MarkdownParser.new.parse(%{
# kendo.ui.AutoComplete

## Configuration

### foo `String`

## Events

### bar

### baz
        })

        assert_equal 2, result.events.size
    end

    def test_parse_event_description
        result = CodeGen::MarkdownParser.new.parse(%{
# kendo.ui.AutoComplete

## Configuration

### foo `String`

## Events

### bar

Bar
        })

        assert_equal 'Bar', result.events[0].description
    end

    def test_parse_nested_options
        result = CodeGen::MarkdownParser.new.parse(%{
# kendo.ui.AutoComplete

## Configuration

### foo `Object`

### foo.bar `Object`
        })

        assert_equal 'bar', result.options[0].options[0].name
    end
end
