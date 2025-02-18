"use client";

import UserInfo from "@/components/user-info";
import { useDialog } from "@/hooks/useDialog";
import { employeeInfoById } from "@/lib/employee-info";
import { TLeaveYear } from "@/redux/features/leaveApiSlice/leaveType";
import { Button } from "@/ui/button";
import { Dialog, DialogTrigger } from "@/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { TableCell, TableRow } from "@/ui/table";
import { Ellipsis } from "lucide-react";
import { memo, useMemo, useState } from "react";
import LeaveUpdate from "./leave-update";

const LeavePage = ({ leave }: { leave: TLeaveYear[] }) => {
  const [leaveId, setLeaveId] = useState<string>("");

  return (
    <>
      {leave?.map((item) => (
        <MemoizedLeaveModal
          leaveId={leaveId}
          setLeaveId={setLeaveId}
          key={item.employee_id}
          item={item}
        />
      ))}
    </>
  );
};

export default LeavePage;

const LeaveModal = ({
  item,
  leaveId,
  setLeaveId,
}: {
  item: TLeaveYear;
  leaveId: string;
  setLeaveId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { isDialogOpen, onDialogChange } = useDialog();

  // Simulate fetching leave data
  const singleLeave = useMemo(() => {
    return leaveId === item.employee_id ? item : null;
  }, [leaveId, item]);

  return (
    <DropdownMenu key={item.employee_id}>
      <TableRow>
        <TableCell>
          <UserInfo
            className="min-w-[200px]"
            user={employeeInfoById(item.employee_id!)}
          />
        </TableCell>
        <TableCell className="border-r border-border">{item.year}</TableCell>
        <TableCell className="text-center">{item.casual.allotted}</TableCell>
        <TableCell className="text-center">{item.casual.consumed}</TableCell>
        <TableCell className="text-center border-r border-border">
          {item.casual.allotted - item.casual.consumed}
        </TableCell>
        <TableCell className="text-center">{item.earned.allotted}</TableCell>
        <TableCell className="text-center">{item.earned.consumed}</TableCell>
        <TableCell className="text-center border-r border-border">
          {item.earned.allotted - item.earned.consumed}
        </TableCell>
        <TableCell className="text-center">{item.sick.allotted}</TableCell>
        <TableCell className="text-center">{item.sick.consumed}</TableCell>
        <TableCell className="text-center border-r border-border">
          {item.sick.allotted - item.sick.consumed}
        </TableCell>
        <TableCell className="text-center">
          {item.without_pay.allotted}
        </TableCell>
        <TableCell className="text-center">
          {item.without_pay.consumed}
        </TableCell>
        <TableCell className="text-center border-r border-border">
          {item.without_pay.allotted - item.without_pay.consumed}
        </TableCell>

        <TableCell className="text-right">
          <DropdownMenuTrigger>
            <Ellipsis className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* edit */}
            <DropdownMenuItem asChild>
              <Dialog
                modal={true}
                open={isDialogOpen}
                onOpenChange={onDialogChange}
              >
                <DialogTrigger
                  asChild
                  onClick={() => setLeaveId(item?.employee_id!)}
                >
                  <Button
                    className="w-full justify-start"
                    variant={"ghost"}
                    size={"sm"}
                  >
                    Edit
                  </Button>
                </DialogTrigger>
                {singleLeave && (
                  <LeaveUpdate
                    leave={singleLeave!}
                    onDialogChange={onDialogChange}
                  />
                )}
              </Dialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </TableCell>
      </TableRow>
    </DropdownMenu>
  );
};

const MemoizedLeaveModal = memo(LeaveModal);
