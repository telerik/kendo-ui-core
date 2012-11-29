require 'option'
require 'composite_option'
require 'event'

module CodeGen
    TYPES = ['Object', 'Date', 'Array', 'String', 'Number', 'Boolean']
end

class CodeGen::Component
    attr_reader :name, :full_name, :options, :events

    def initialize(settings)
        @full_name = settings[:name]
        @name = @full_name.split('.').last
        @options = []
        @events = []
    end

    def add_option(settings)
        name = settings[:name].strip.sub(/\s*type\s*[=:][^\.]*\.?/, '')

        description = settings[:description]

        types = settings[:type]

        if types

            types.split('|').each do |type|
                type = type.strip

                if CodeGen::TYPES.include?(type)

                    unless @options.any? { |option| option.name == name && option.type == type }

                        @options.push CodeGen::Option.new(:name => name,
                                           :type => type,
                                           :description => description)

                    end
                end
            end

        end
    end

    def add_event(settings)
        @events.push CodeGen::Event.new(settings)
    end

    def promote_members
        @options.clone.each do |member|
            prefix = member.name + '.'

            members = @options.find_all {|m| m.name.start_with?(prefix)}

            next unless members.any?

            @options.push composite_option(member, members)
        end
    end

    private

    def composite_option(member, members)
        members.each {|m| @options.delete(m) }

        @options.delete(member)

        option = CodeGen::CompositeOption.new(:name => member.name,
                                              :description => member.description,
                                              :type => member.type)

        option.add_options(members)

        option
    end
end

