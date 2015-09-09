Ext.define('VisLeader.model.free.ImagePublishVO', {
    extend: 'Ext.data.Model',
	config: {
		identifier: 'uuid',
		idProperty: 'id',
		fields: ['id', 'img_path', 'hidden', 'border','img_path_online']
	}
});