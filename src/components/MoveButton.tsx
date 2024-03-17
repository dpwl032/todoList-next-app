"use client";

import { useRouter } from "next/navigation";
import React from "react";

const MoveButton = () => {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() => {
          router.push("/report");
        }}
        className="mx-8 my-8 btn btn-outline btn-primary"
      >
        할일정보통계보러가기
      </button>
    </div>
  );
};

export default MoveButton;
