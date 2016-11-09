require 'jekyll-assets'

module Jekyll
  module AssetsPlugin
    class AssetPath
        # Monkey patch to_s so it uses the baseurl option istead of assets.baseurl thus avoiding duplication
        # Original implementation: https://github.com/ixti/jekyll-assets/blob/master/lib/jekyll/assets_plugin/asset_path.rb#L34

        def to_s
            "#{@asset.site.baseurl}/assets/#{path}#{query}#{anchor}"
        end
    end
  end
end
