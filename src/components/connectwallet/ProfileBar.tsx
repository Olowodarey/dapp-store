import { useDisconnect } from "@starknet-react/core";
import { UserCircle2 } from "lucide-react";

export default function ProfileBar({ address }: { address: string }) {
  const { disconnect } = useDisconnect();

  return (
    <div className="flex items-center space-x-2 px-4 py-2 rounded-full border border-[#2d2f36] bg-[#1c1f26]">
      <UserCircle2 className="w-6 h-6 text-white" />

      <button onClick={() => disconnect()}>disconnect</button>
    </div>
  );
}
