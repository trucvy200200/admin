export const columns = () => [
  {
    name: "No.",
    width: "50px",
    cell: (row, index) => <div className="d-flex justify-content-left align-items-center text-primary">{index + 1}</div>
  },
  {
    name: "First name",
    width: "150px",
    cell: (row) => row?.firstName
  },
  {
    name: "Last name",
    width: "150px",
    cell: (row) => row?.lastName
  }
]
