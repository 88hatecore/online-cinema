export interface ITableItem {
	_id: string;
	editUrl: string;
	items: string[];
}

export interface IAdminTableItem {
	tableItem: ITableItem;
	removeHandler: () => void;
}
