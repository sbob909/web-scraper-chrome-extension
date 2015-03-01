var Config = function () {

};

Config.prototype = {

	sitemapDb: '<use loadConfiguration()>',
	dataDb: '<use loadConfiguration()>',
	dataDbOverwrite: '<use loadConfiguration()>',

	defaults: {
		storageType: "local",
		// this is where sitemap documents are stored
		sitemapDb: "scraper-sitemaps",
		// this is where scraped data is stored.
		// empty for local storage
		dataDb: "",
		dataDbOverwrite: "overwrite"
	},

	/**
	 * Loads configuration from chrome extension sync storage
	 */
	loadConfiguration: function (callback) {

		chrome.storage.sync.get(['sitemapDb', 'dataDb', 'dataDbOverwrite', 'storageType'], function (items) {

			this.storageType = items.storageType || this.defaults.storageType;
			if (this.storageType === 'local') {
				this.sitemapDb = this.defaults.sitemapDb;
				this.dataDb = this.defaults.dataDb;
				this.dataDbOverwrite = this.defaults.dataDbOverwrite;
			}
			else {
				this.sitemapDb = items.sitemapDb || this.defaults.sitemapDb;
				this.dataDb = items.dataDb || this.defaults.dataDb;
				this.dataDbOverwrite = items.dataDbOverwrite || this.defaults.dataDbOverwrite;
			}

			callback();
		}.bind(this));
	},

	/**
	 * Saves configuration to chrome extension sync storage
	 * @param {type} items
	 * @param {type} callback
	 * @returns {undefined}
	 */
	updateConfiguration: function (items, callback) {
		chrome.storage.sync.set(items, callback);
	}
};