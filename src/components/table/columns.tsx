"use client";

import { ColumnDef } from "@tanstack/react-table";
import StatusBadge from "../StatusBadge";
import { formatDateTime } from "@/lib/utils";
import AppointmentModal from "../AppointmentModal";
import { Appointment } from "@/types/appwrite.types";

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium"> {row.index + 1}</p>,
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => (
      <p className="text-14-medium"> {row.original.users.name}</p>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={row.original.status as Status} />
        </div>
      );
    },
  },
  {
    accessorKey: "schedule",
    header: "Schedule",
    cell: ({ row }) => {
      return (
        <div className="text-14-regular min-w-[]">
          {formatDateTime(row.original.schedule).dateTime}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Action</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex gap-1">
          <AppointmentModal
            type="schedule"
            userId={data.users.$id}
            appointment={data}
          />
          <AppointmentModal
            type="cancel"
            userId={data.users.$id}
            appointment={data}
          />
        </div>
      );
    },
  },
];
