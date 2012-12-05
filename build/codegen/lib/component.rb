require 'option'
require 'composite_option'
require 'event'

module CodeGen
    TYPES = ['Object', 'Date', 'Array', 'String', 'Number', 'Boolean', 'Function']

class Component
    attr_reader :name, :full_name, :options, :events

    def initialize(settings)
        @full_name = settings[:name]
        @name = @full_name.split('.').last
        @options = []
        @events = []
    end

    def import(metadata)
        metadata[:options].each do |option|

            add_option(option)

        end
    end

    def add_option(settings)
        name = settings[:name].strip.sub(/\s*type\s*[=:][^\.]*\.?/, '')

        description = settings[:description]

        types = settings[:type]

        return unless types

        parents = @options.find_all { |option| name.start_with?(option.name + '.') && option.type =~ /Object|Array/ }

        parents.map! do |parent|
            unless parent.instance_of?(CompositeOption)
                @options.delete(parent)

                parent = CompositeOption.new(:name => parent.name,
                                             :owner => self,
                                             :type => parent.type,
                                             :description => parent.description)
                @options.push(parent)
            end

            parent
        end

        types.split('|').each do |type|
            type = type.strip

            next unless TYPES.include?(type)

            next if @options.any? { |option| option.name == name && option.type == type }

            if parents.any?

                parents.each do |parent|

                    parent.add_option(:name => name,
                                      :type => type,
                                      :description => description)
                end

            else

                @options.push Option.new(:name => name,
                                         :owner => self,
                                         :type => type,
                                         :description => description)

            end
        end
    end

    def add_event(settings)
        @events.push Event.new(settings)
    end
end

end #module CodeGen
