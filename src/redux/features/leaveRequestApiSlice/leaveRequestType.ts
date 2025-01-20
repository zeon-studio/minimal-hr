export type TLeaveRequest = {
  employee_id: string;
  leave_type: "casual" | "sick" | "earned" | "without_pay";
  start_date: Date;
  end_date: Date;
  day_count: number;
  reason: string;
  status: "pending" | "approved" | "rejected";
  submit_date: Date;
  response_date: Date;
  createdAt: Date;
};

export type TLeaveRequestState<T = TLeaveRequest[]> = {
  loading: boolean;
  result: T;
  meta: {
    total: number;
  };
  error: boolean;
};
