"use client";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { ClipboardCopy } from "lucide-react";

interface CopyButtonProps {
  data: string;
  label: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ data, label }) => {
  const handleCopy = (data: string) => {
    navigator.clipboard.writeText(data).then(() => {
      toast.success(`Copied ${label}!`);
    });
  };

  return (
    <Button onClick={() => handleCopy(data)} variant="default" className="bg-violet-500 hover:bg-violet-500/80">
      <ClipboardCopy />
    </Button>
  );
};

export default CopyButton;
