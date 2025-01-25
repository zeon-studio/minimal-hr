import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { employeeInfoById } from "@/lib/employeeInfo";
import { TAsset } from "@/redux/features/assetApiSlice/assetType";

const AssetPreview = ({ assetData }: { assetData: Partial<TAsset> }) => {
  return (
    <DialogContent
      className="max-w-4xl overflow-y-auto h-[90vh]"
      onPointerDownOutside={(e) => e.preventDefault()}
    >
      <DialogTitle className="mb-4">Asset Details</DialogTitle>
      <div className="row justify-between items-center">
        <div className="lg:col-6 mb-4">
          <div className="font-medium mb-1">Name</div>
          <div className="p-2 bg-light rounded">{assetData.name}</div>
        </div>
        <div className="lg:col-6 mb-4">
          <div className="font-medium mb-1">Type</div>
          <div className="p-2 bg-light rounded">{assetData.type}</div>
        </div>
        <div className="lg:col-6 mb-4">
          <div className="font-medium mb-1">Price</div>
          <div className="p-2 bg-light rounded">
            {assetData.price}{" "}
            <span className="uppercase">{assetData.currency}</span>
          </div>
        </div>
        <div className="lg:col-6 mb-4">
          <div className="font-medium mb-1">User</div>
          <div className="p-2 bg-light rounded">
            {assetData.user ? employeeInfoById(assetData.user).name : "N/A"}
          </div>
        </div>
        <div className="lg:col-6 mb-4">
          <div className="font-medium mb-1">Serial Number</div>
          <div className="p-2 bg-light rounded">{assetData.serial_number}</div>
        </div>
        <div className="lg:col-6 mb-4">
          <div className="font-medium mb-1">Purchase Date</div>
          <div className="p-2 bg-light rounded">
            {assetData.purchase_date
              ? new Date(assetData.purchase_date).toDateString()
              : "N/A"}
          </div>
        </div>
        <div className="lg:col-6 mb-4">
          <div className="font-medium mb-1">Status</div>
          <div className="p-2 bg-light rounded">{assetData.status}</div>
        </div>
        <div className="lg:col-6 mb-4">
          <div className="font-medium mb-1">Note</div>
          <div className="p-2 bg-light rounded">{assetData.note || "N/A"}</div>
        </div>

        <div className="col-12">
          <div className="font-medium mb-3">Asset Logs</div>
          {assetData.logs?.map((log, index) => (
            <div className="border mb-4 p-3 rounded" key={index}>
              <div className="row">
                <div className="lg:col-6 mb-2">
                  <div className="font-medium mb-1">Type</div>
                  <div className="p-2 bg-light rounded">{log.type}</div>
                </div>
                <div className="lg:col-6 mb-2">
                  <div className="font-medium mb-1">Date</div>
                  <div className="p-2 bg-light rounded">
                    {new Date(log.date).toDateString()}
                  </div>
                </div>
                <div className="lg:col-12 mb-2">
                  <div className="font-medium mb-1">Description</div>
                  <div className="p-2 bg-light rounded">{log.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DialogContent>
  );
};

export default AssetPreview;
