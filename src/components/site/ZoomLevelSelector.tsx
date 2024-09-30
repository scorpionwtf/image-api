import { prisma } from "@/lib/db";
import { $Enums } from "@prisma/client";
import { Session } from "next-auth";
import { useEffect, useState } from "react";


interface ZoomLevelSelectorProps {
  zoomLevel: number;
  setZoomLevel: (level: number) => void;
  session?: Session | null; // Optionally pass session if required
  error?: string | null; // Optionally pass error if required
  setError?: (error: string | null) => void; // Optionally pass setError if required
  IsProSelected: number;
  setIsProSelected: (level: number) => void;
}

const ZoomLevelSelector: React.FC<ZoomLevelSelectorProps> = ({ zoomLevel, setZoomLevel, session, error, setError, IsProSelected, setIsProSelected }) => {
  const [isProUser, setIsProUser] = useState<boolean | null>(null); 


  useEffect(() => {
    const checkUserPlan = async () => {
      if (session && session.user && session.user.id) {
        try {
          // User is authenticated, check their plan
          const user = await prisma.user.findUnique({
            where: { id: session.user.id },
          });
          setIsProUser(user?.plan === $Enums.UserPlan.PRO);
        } catch (err) {
          console.error("Error fetching user plan:", err);
          if (setError) {
            setError("Failed to fetch user plan.");
          }
        }
      } else {
        setIsProUser(false); // Not authenticated
      }
    };

    checkUserPlan();
  }, [session, setError]); // Run effect when session changes

  return (
    <div className="flex justify-center mb-6">
      <button
        onClick={() => { setZoomLevel(2); setIsProSelected(0); }}
        className={`px-4 py-2 ${zoomLevel === 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'} rounded-l border border-black/10 shadow-lg`}
      >
        200%
      </button>
      <button
        onClick={() => { setZoomLevel(4); setIsProSelected(0); }}
        className={`px-4 py-2 ${zoomLevel === 4 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'} border border-x-0 border-black/10 shadow-lg`}
      >
        400%
      </button>

      {isProUser ? ( // Loading state or user plan check in progress
        <button
        onClick={() => setZoomLevel(8)}
        className={`px-4 py-2 ${zoomLevel === 8 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'} rounded-r border border-black/10 shadow-lg`}
      >
        800%
      </button>
      ) :  (
        <a href="/#pricing">
          <button
            onClick={() => { setZoomLevel(2); }}
            className={'px-4 py-2 bg-gradient-to-l font-bold from-slate-100 to-pink-500 text-gray-800 rounded-r border border-black/10 shadow-lg border-r-inherit'}
          >
            800% 
            <span className="text-yellow-500 font-bold bg-purple-700 px-2 rounded-full p-1">Pro</span>
          </button>
        </a>
      ) 
      }
    </div>
  );
};

export default ZoomLevelSelector;
