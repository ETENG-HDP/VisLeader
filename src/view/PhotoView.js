{{#class "Ext.carousel.Carousel"}}
	xtype: 'photoview',
	config: {
		listeners: {
			deactivate: function(oldActiveItem, view, newActiveItem, eOpts) {
				oldActiveItem.destroy();
			}
		}
	}
{{/class}}