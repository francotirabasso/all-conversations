import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import svgPaths from "@/imports/svg-kokprctbpi";

interface SaveViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, description: string) => void;
}

export function SaveViewModal({ isOpen, onClose, onSave }: SaveViewModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    if (title.trim()) {
      onSave(title.trim(), description.trim());
      setTitle("");
      setDescription("");
      onClose();
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && handleCancel()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-[rgba(0,0,0,0.65)] z-[1000] flex items-center justify-center">
          <Dialog.Content className="bg-white relative rounded-[16px] w-[600px] max-w-[90vw] shadow-[0px_2px_16px_0px_rgba(0,0,0,0.3)] border border-[rgba(28,28,28,0.11)]">
            <div className="content-stretch flex flex-col gap-[16px] items-start p-[32px] relative w-full">
              {/* Header */}
              <div className="relative shrink-0 w-full">
                <div className="content-stretch flex items-start pr-[32px] relative w-full">
                  <Dialog.Title asChild>
                    <p className="flex-[1_0_0] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[1.2] min-h-px min-w-px relative text-[#1c1c1c] text-[27px] whitespace-pre-wrap">
                      Save as new
                    </p>
                  </Dialog.Title>
                </div>
              </div>

              <Dialog.Description className="sr-only">
                Save the current filter configuration as a new view
              </Dialog.Description>

              {/* Body */}
              <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                {/* Title Input */}
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                  <div className="content-stretch flex flex-col items-start justify-center pb-[4px] relative shrink-0 w-full">
                    <p className="font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[1.4] min-w-full relative shrink-0 text-[#3a3a3a] text-[15px] w-[min-content] whitespace-pre-wrap">
                      View title
                    </p>
                  </div>
                  <div className="bg-[#f9f9f9] relative rounded-[8px] shrink-0 w-full border-2 border-[#4aa9ea]">
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter view title"
                      className="w-full px-[12px] py-[8px] bg-transparent font-['SF_Pro:Regular',sans-serif] font-normal leading-[1.2] text-[#3a3a3a] text-[15px] outline-none rounded-[8px]"
                      autoFocus
                    />
                  </div>
                </div>

                {/* Description Textarea */}
                <div className="content-stretch flex flex-col h-[105px] items-start relative shrink-0 w-full">
                  <div className="content-stretch flex flex-col items-start justify-center pb-[4px] relative shrink-0 w-full">
                    <p className="font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[1.4] min-w-full relative shrink-0 text-[#3a3a3a] text-[15px] w-[min-content] whitespace-pre-wrap">
                      Description (Optional)
                    </p>
                  </div>
                  <div className="bg-[rgba(28,28,28,0.02)] flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] w-full border border-[rgba(28,28,28,0.17)]">
                    <div className="relative h-full">
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Type here"
                        className="w-full h-full px-[12px] py-[8px] bg-transparent font-['SF_Pro:Regular',sans-serif] font-normal leading-[1.2] text-[#3a3a3a] text-[15px] outline-none rounded-[8px] resize-none placeholder:text-[#808080]"
                      />
                      <div className="absolute bottom-[3.22px] right-[3.22px] size-[7.778px] pointer-events-none">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.77817 7.77818">
                          <g>
                            <path d={svgPaths.p366ad6f0} fill="#1C1C1C" fillOpacity="0.5" />
                            <path d={svgPaths.p2c1d54c0} fill="#1C1C1C" fillOpacity="0.5" />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="content-stretch flex items-start justify-end relative shrink-0 w-full">
                <div className="content-stretch flex gap-[8px] items-center">
                  <button
                    onClick={handleCancel}
                    className="bg-[rgba(0,0,0,0)] content-stretch flex items-center justify-center px-[6px] py-[8px] relative rounded-[8px] shrink-0 cursor-pointer hover:bg-[rgba(0,0,0,0.05)] transition-colors"
                  >
                    <div className="content-stretch flex items-center justify-center px-[6px] relative shrink-0">
                      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[#3a3a3a] text-[15px] whitespace-nowrap">
                        <p className="leading-[1.2]">Cancel</p>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={!title.trim()}
                    className="bg-[#7c52ff] content-stretch flex items-center justify-center px-[6px] py-[8px] relative rounded-[8px] shrink-0 cursor-pointer hover:bg-[#6B45E6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="content-stretch flex items-center justify-center px-[6px] relative shrink-0">
                      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[15px] text-white whitespace-nowrap">
                        <p className="leading-[1.2]">Save</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Close Button */}
              <Dialog.Close asChild>
                <button className="absolute bg-[rgba(0,0,0,0)] content-stretch flex items-center justify-center p-[8px] right-[8px] rounded-[8px] top-[8px] cursor-pointer hover:bg-[rgba(0,0,0,0.05)] transition-colors">
                  <div className="relative shrink-0 size-[18px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                      <g>
                        <path d={svgPaths.p2e4a7880} stroke="#3A3A3A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      </g>
                    </svg>
                  </div>
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}