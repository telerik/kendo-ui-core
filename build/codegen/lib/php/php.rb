module CodeGen::PHP::Wrappers

    module Options
        def component_class
            Component
        end

        def composite_option_class
            CompositeOption
        end

        def option_class
            Option
        end

        def event_class
            Event
        end

        def array_option_class
            ArrayOption
        end
    end


COMPOSITE_OPTION_SETTER = ERB.new(%{
    /**
    * <%= description %>
    * @param <%= php_types %> $value
    * @return <%= owner.php_type %>
    */
    public function <%= php_name %>($value) {
        return $this->setProperty('<%= name %>', $value);
    }
})

COMPOSITE_OPTION_PROPERTIES = ERB.new(%{//>> Properties
<%= unique_options.map { |option| option.to_setter }.join %>

<% if content? %>
    /**
    * Sets the HTML content of the <%= php_class %>.
    * @param string $value
    * @return <%= owner.php_type %>
    */
    public function content($value) {
        return $this->setProperty('content', $value);
    }

    /**
    * Starts output bufferring. Any following markup will be set as the content of the <%= php_class %>.
    */
    public function startContent() {
        ob_start();
    }

    /**
    * Stops output bufferring and sets the preceding markup as the content of the <%= php_class %>.
    */
    public function endContent() {
        $this->content(ob_get_clean());
    }
<% if recursive %>
    /**
    * Adds one or more <%= php_type %>.
    * @param <%= php_types %>,... $value
    * @return <%= owner.owner.php_type %>
    */
    public function addItem($value) {
        return $this->add('items', func_get_args());
    }
<% end %><% end %>
//<< Properties}, 0, '<%>')

    COMPOSITE_OPTION = ERB.new(File.read("build/codegen/lib/php/composite_option.php.erb"), 0, '%<>')

    class CompositeOption < CodeGen::PHP::CompositeOption
        include Options

        def to_setter
            COMPOSITE_OPTION_SETTER.result(binding)
        end

        def to_php(filename)
            php = File.exists?(filename) ? File.read(filename) : COMPOSITE_OPTION.result(binding)

            php.sub(/\/\/>> Properties(.|\n)*\/\/<< Properties/, COMPOSITE_OPTION_PROPERTIES.result(binding))
        end
    end

DATA_SOURCE_SETTER = ERB.new(%{
    /**
    * Sets the data source of the <%= owner.php_class %>.
    * @param array|\\Kendo\\Data\\DataSource $value
    * @return <%= owner.php_type %>
    */
    public function dataSource($value) {
        return $this->setProperty('dataSource', $value);
    }
})

HIERARCHY_DATA_SOURCE_SETTER = ERB.new(%{
    /**
    * Sets the data source of the <%= owner.php_class %>.
    * @param array|\\Kendo\\Data\\HierarchicalDataSource $value
    * @return <%= owner.php_type %>
    */
    public function dataSource($value) {
        return $this->setProperty('dataSource', $value);
    }
})

OPTION_SETTER = ERB.new(%{
    /**
    * <%= description %>
    * @param <%= php_types %> $value
    * @return <%= owner.php_type %>
    */
    public function <%= php_name %>($value) {
        return $this->setProperty('<%= name %>', $value);
    }
})

FUNCTION_SETTER = ERB.new(%{
    /**
    * Sets the <%= name %> option of the <%= owner.php_class %>.
    * <%= description %>
    * @param string|\\Kendo\\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return <%= owner.php_type %>
    */
    public function <%= php_name %>($value) {
        if (is_string($value)) {
            $value = new \\Kendo\\JavaScriptFunction($value);
        }

        return $this->setProperty('<%= name %>', $value);
    }
})
    class Option < CodeGen::PHP::Option
        include Options

        def to_setter
            if @name == 'dataSource'
                return (@owner.name == 'TreeView' ? HIERARCHY_DATA_SOURCE_SETTER : DATA_SOURCE_SETTER).result(binding);
            end

            return FUNCTION_SETTER.result(binding) if @type[0] == 'Function' && @type.size == 1

            OPTION_SETTER.result(binding)
        end
    end

EVENT_SETTER = ERB.new(%{
    /**
    * Sets the <%= name %> event of the <%= owner.php_class %>.
    * <%= description %>
    * @param string|\\Kendo\\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return <%= owner.php_type %>
    */
    public function <%= name %>($value) {
        if (is_string($value)) {
            $value = new \\Kendo\\JavaScriptFunction($value);
        }

        return $this->setProperty('<%= name %>', $value);
    }
})
    class Event < CodeGen::PHP::Event
        def to_setter
            EVENT_SETTER.result(binding)
        end
    end

ARRAY_SETTER = ERB.new(%{
    /**
    * Adds <%= item.php_class %> to the <%= owner.php_class %>.
    * @param <%= item.php_types %>,... $value one or more <%= item.php_class %> to add.
    * @return <%= owner.php_type %>
    */
    public function add<%= item.name.pascalize %>($value) {
        return $this->add('<%= name %>', func_get_args());
    }
})
    class ArrayOption < CompositeOption
        include CodeGen::Array

        def item_class
            ArrayItem
        end

        def to_setter
            ARRAY_SETTER.result(binding)
        end
    end

    class ArrayItem < CompositeOption
        include CodeGen::PHP::ArrayItem
    end

    COMPONENT = ERB.new(File.read("build/codegen/lib/php/component.php.erb"), 0, '%<>')

COMPONENT_PROPERTIES = ERB.new(%{//>> Properties
<%= unique_options.map { |option| option.to_setter }.join %><%= events.map { |events| events.to_setter }.join %>
<% if content? %>
    /**
    * Sets the HTML content of the <%= php_class %>.
    * @param string $value
    * @return <%= php_type %>
    */
    public function content($value) {
        return $this->setProperty('content', $value);
    }

    /**
    * Starts output bufferring. Any following markup will be set as the content of the <%= php_class %>.
    */
    public function startContent() {
        ob_start();
    }

    /**
    * Stops output bufferring and sets the preceding markup as the content of the <%= php_class %>.
    */
    public function endContent() {
        $this->content(ob_get_clean());
    }
<% end %>
//<< Properties})

    class Component < CodeGen::PHP::Component
        include Options

        def to_php(filename)
            php = File.exists?(filename) ? File.read(filename) : COMPONENT.result(binding)

            php.sub(/\/\/>> Properties(.|\n)*\/\/<< Properties/, COMPONENT_PROPERTIES.result(binding))
        end
    end

    class Generator
        include Rake::DSL

        def initialize(path)
            @path = path
        end

        def component(component)
            write_php(component)

            composite_options(component.composite_options)
        end

        def write_php(component)
            filename = "#{@path}/#{component.path}/#{component.php_class}.php"

            $stderr.puts("Updating #{filename}") if VERBOSE

            ensure_path(filename)

            File.write(filename, component.to_php(filename))
        end

        def composite_options(options)
            options.each do |option|

                write_php(option) unless option.instance_of?(ArrayOption)

                composite_options(option.composite_options)

            end

        end
    end
end
