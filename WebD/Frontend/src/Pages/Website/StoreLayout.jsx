import React from "react";

const StoreLayout = () => {
  let stackNumber = 1; // Initialize stack number counter

  return (
    <div className="w-full h-screen mt-4 mb-4 ml-4 mr-4">
      <div className="w-full h-10 bg-slate-200">
        <div className="w-8 h-full mx-auto text-center">ENTRANCE</div>
      </div>
      <div className="h-full mx-auto bg-slate-300 p-4 rounded-lg shadow-lg overflow-auto">
        <div className="flex flex-col justify-center items-center gap-12">
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex w-full gap-8 relative">
              {/* Left Wing */}
              <div className="flex flex-col flex-1 gap-1 relative border p-4 rounded-lg bg-white shadow-md">
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-center p-1">
                  <div className="text-lg font-bold rotate-90 text-gray-400 p-1">{`Row-${
                    rowIndex + 1
                  }-L`}</div>
                </div>
                <div className="flex justify-between gap-1">
                  {Array.from({ length: 3 }).map(() => (
                    <div
                      key={stackNumber}
                      id={`Stack-${stackNumber}`}
                      className="border p-4 rounded-lg bg-gray-100 shadow-sm flex-1 text-center"
                    >
                      Stack {stackNumber++}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between gap-1">
                  {Array.from({ length: 3 }).map(() => (
                    <div
                      key={stackNumber}
                      id={`Stack-${stackNumber}`}
                      className="border p-4 rounded-lg bg-gray-100 shadow-sm flex-1 text-center"
                    >
                      Stack {stackNumber++}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Wing */}
              <div className="flex flex-col flex-1 gap-1 relative border p-4 rounded-lg bg-white shadow-md">
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-center p-1">
                  <div className="text-lg font-bold rotate-90 text-gray-400 p-1">{`Row-${
                    rowIndex + 1
                  }-R`}</div>
                </div>
                <div className="flex justify-between gap-1">
                  {Array.from({ length: 3 }).map(() => (
                    <div
                      key={stackNumber}
                      id={`Stack-${stackNumber}`}
                      className="border p-4 rounded-lg bg-gray-100 shadow-sm flex-1 text-center"
                    >
                      Stack {stackNumber++}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between gap-1">
                  {Array.from({ length: 3 }).map(() => (
                    <div
                      key={stackNumber}
                      id={`Stack-${stackNumber}`}
                      className="border p-4 rounded-lg bg-gray-100 shadow-sm flex-1 text-center"
                    >
                      Stack {stackNumber++}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreLayout;
