{{#class 'Ext.data.Model'}}
	xtype:'freeVO',
	config:{
		identifier:'uuid',
		fields:[
			'customer_id',
			'customer_name',//客户名称
			'budget_id',//费用预算ID
			'bill_code',//单据编号
			'application_item',//申请项，1：现场有奖促销 2：订货会  3：广告费  4：收款会 5：新产品发布会 6：年终答谢会 7：现场观摩会 8：其他
			'application_expense',//申请费用总金额
			'start_date',//费用发生开始日期
			'end_date',//费用发生结束日期
			'application_id',//申请ID
			'application_user',//申请人
			'application_date',//申请日期
			'opperation_user',//审核/关闭人
			'opperation_date',//审核/关闭日期
			'state',//状态，1：制单，2：审核，3：执行，4：关闭
			'ref_state',
			'ref_season',
			'status',
			'close_reason',//关闭原因
			'remark',//备注
			'corp_id'
		]	

	}
{{/class}}