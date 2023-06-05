import { useState } from "react";

type SortProps = {
  onSort: (dir: "asc" | "desc" | "none") => void;
};

const Sort = ({ onSort }: SortProps) => {
  const dirs = ["none", "asc", "desc"] as const;
  const [curIdx, setCurIdx] = useState(0);
  return (
    <button
      onClick={() => {
        setCurIdx((curIdx + 1) % 3);
        onSort(dirs[(curIdx + 1) % 3]);
      }}
    >
      {dirs[curIdx]}
    </button>
  );
};

export default Sort;
