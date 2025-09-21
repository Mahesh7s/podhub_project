import { useState } from "react";
import userService from "../../../services/user.service";

export default function Settings() {
  const [userId, setUserId] = useState("");
  const [points, setPoints] = useState("");

  const handleUpdatePoints = async () => {
    await userService.updatePoints(userId, Number(points));
    alert("Points updated!");
    setUserId("");
    setPoints("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Platform Settings</h1>
      <div className="mt-4">
        <h2 className="font-semibold">Update Loyalty Points</h2>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <input
          type="number"
          placeholder="Points"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={handleUpdatePoints}
          className="bg-brand text-white px-3 py-2 rounded"
        >
          Update
        </button>
      </div>
    </div>
  );
}
