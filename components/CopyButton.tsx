import { useState } from "react";

interface CopyButtonTypes {
  content: string;
}

export default function CopyButton({ content }: CopyButtonTypes) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2100);
  };

  return (
    <button onClick={copy} className="bg-link/25 p-2 rounded-md text-white">
      {copied ? (
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          data-v-4fa90e7f=""
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 13.295L10.913 18 18 6"
          ></path>
        </svg>
      ) : (
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          data-v-4fa90e7f=""
        >
          <rect width="9" height="13" x="6.5" y="6.5" rx="1.5"></rect>
          <path d="M8.5 6A1.5 1.5 0 0110 4.5h6A1.5 1.5 0 0117.5 6v10a1.5 1.5 0 01-1.5 1.5"></path>
        </svg>
      )}
    </button>
  );
}
