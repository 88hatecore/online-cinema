import { FC } from "react";

import SkeletonLoader from "../../SkeletonLoader";

import styles from "./AdminTable.module.scss";
import AdminTableHeader from "./AdminTableHeader";
import AdminTableItem from "./AdminTableItem";
import { ITableItem } from "./admin-table.interface";

interface IAdminTable {
	tableItems: ITableItem[];
	isLoading: boolean;
	headerItems: string[];
	removeHandler: (id: string) => void;
}

const AdminTable: FC<IAdminTable> = ({
	headerItems,
	isLoading,
	removeHandler,
	tableItems,
}) => {
	return (
		<div>
			<AdminTableHeader headerItems={headerItems} />
			{isLoading ? (
				<SkeletonLoader count={1} height={48} className="mt-4" />
			) : tableItems.length ? (
				tableItems.map((tableItem) => (
					<AdminTableItem
						key={tableItem._id}
						removeHandler={() => removeHandler(tableItem._id)}
						tableItem={tableItem}
					/>
				))
			) : (
				<div className={styles.notFound}>Element not found</div>
			)}
		</div>
	);
};

export default AdminTable;
