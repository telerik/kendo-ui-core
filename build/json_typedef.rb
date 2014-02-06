require 'erb'
require 'codegen/lib/options'
require 'codegen/lib/markdown_parser'
require 'codegen/lib/component'

JSONTYPEDEF = ERB.new(File.read("build/codegen/lib/json-typedef/kendo.json.erb"), 0, '%<>')

COMPONENT_TYPEDEF = ERB.new(%{
        "kendo<%= plugin%>": {
            "!type": "fn(options: ?) -> jQuery.fn",
             "!doc": "Initializes a Kendo UI <%= plugin%> widget"
        }}, 0, '-')

module CodeGen::JsonTypeDef
    class Component < CodeGen::Component
        include CodeGen::TypeScript::Options

        def plugin
            return 'Mobile' + @name if @full_name.include?('mobile')

            @name
        end

        def namespace
            @full_name.sub('.' + @name, '')
        end

        def json_typedef
            return unless @full_name.include?('ui')
            
            COMPONENT_TYPEDEF.result(binding)
        end

        def add_method(settings)
            description = settings[:description]
            result = settings[:result]

            if description =~ /Gets?\/Sets?/i || description =~ /gets?\s+or\s+sets?/i

                settings[:result] = nil

                super(:description => description,
                      :name => settings[:name],
                      :result => result)
            end

            super(settings)
        end
    end
end

def get_json_typedef(name, sources)

    sources = sources.find_all { |source| !CodeGen::TypeScript::EXCLUDE.include?(source) && source.end_with?('.md') }

    components = sources.map do |source|
        parser = CodeGen::MarkdownParser.new

        File.open(source, 'r:bom|utf-8') do |file|
            parser.parse(file.read, CodeGen::JsonTypeDef::Component)
        end
    end

    components = components.sort { |a, b| a.plugin <=> b.plugin }

    namespaces = components.group_by { |component| component.namespace }

    JSONTYPEDEF.result(binding)
end

namespace :json_typedef do
    %w(master production).each do |branch|
        namespace branch do
            desc "Generate JSON TypeDef from #{branch} docs"
            task :test do
                sh "cd docs && git fetch && git reset --hard origin/#{branch}"

                path = "dist/kendo.all.json"

                dependencies = FileList["docs/api/web/*.md"]
                                .include('docs/api/framework/*.md')
                                .include('docs/api/dataviz/*.md')
                                .include('docs/api/mobile/*.md')

                File.write(path, get_json_typedef(path, dependencies))

                sh "node_modules/jshint/bin/jshint #{path}"
            end
        end
    end
end

