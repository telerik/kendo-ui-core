require 'jekyll-sitemap'

module Jekyll

	#override the method from the original Jekyll-sitemap gem so it always uses our template instead of using their built-in template
	class JekyllSitemap < Jekyll::Generator
		def source_path
			File.expand_path('sitemap.xml', File.dirname(__FILE__))
		end
	end
	JekyllSitemap.new.source_path

end
