class TimeStampTag < Liquid::Block
    def initialize(tag_name, markup, tokens)
        @text = markup
        super
    end

    def render(context)
        contents = super
        content = Liquid::Template.parse(contents).render context
		# aim for YYYY-MM-DD format https://www.google.com/sitemaps/protocol.html#lastmoddef
       `git log -1 --format=%cd --date=short #{content}`.strip
    end
end

Liquid::Template.register_tag('timestamp', TimeStampTag)