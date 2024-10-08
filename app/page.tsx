"use client";

import Hero from "@/components/Hero";
import TextBar from "@/components/TextBar";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";

const App = () => {
  const [chat, setChat] = useState<any>([]);
  const ref = useRef<HTMLDivElement>(null);

  const handleChat = (chatPart: any) => {
    setChat((prevChat: any) => [...prevChat, chatPart]);
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  return (
    <main className="flex flex-col items-center flex-1 justify-between overflow-y-scroll scrollbar-thin scrollbar-thumb-[#3D4147] scrollbar-track-transparent">
      <div className="flex flex-col flex-1 mb-36 mt-4">
        {!chat ||
          (chat.length === 0 && (
            <div className="flex flex-col flex-1 justify-center">
              <Hero />
            </div>
          ))}
        {chat && chat.length > 0 && (
          <div className="w-[850px] max-sm:w-[360px] max-md:w-[576px] max-lg:w-[768px] flex flex-col flex-1 justify-end gap-2">
            {chat.map((chatPart: any, idx: number) =>
              chatPart.role === "user" ? (
                <>
                  {chatPart.parts.file.length != 0 ? (
                    <div className="w-full flex flex-col items-end gap-1 animate-slide-up">
                      {chatPart.parts.file.map((file: any, idx: number) => (
                        <div
                          className="w-fit flex flex-row gap-2 p-6 max-sm:p-4 max-md:p-5 bg-[#333333] rounded-3xl"
                          key={idx}
                        >
                          <p className="max-sm:text-xs">{file.name}</p>
                          <p className="max-sm:text-xs">
                            ({file.type.split("/")[1].toUpperCase()})
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  <div
                    key={idx}
                    className="w-full flex flex-col items-end animate-slide-up"
                    ref={ref}
                  >
                    <div className="w-fit bg-[#292C31] py-4 px-6 rounded-3xl rounded-br-sm">
                      <div className="text-justify max-sm:text-sm text-gray-300 font-inter">
                        {chatPart.parts.text}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div
                  key={idx}
                  className="w-fit bg-[#1E1E1E] py-4 px-6 rounded-3xl rounded-bl-sm  animate-slide-up"
                  ref={ref}
                >
                  <div className="text-justify max-sm:text-sm text-gray-300 font-consolas">
                    <Markdown>{chatPart.parts.text}</Markdown>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
      <div className="w-fit flex flex-col items-center fixed bottom-0 pt-4 bg-[#151515]">
        <TextBar updateChat={handleChat} />
        <p className="pb-4 px-2 text-xs max-sm:text-[10px] max-sm:w-[300px] max-sm:pb-2 max-sm:text-wrap text-gray-300 font-inter">
          Powered by Gemini. It may display inaccurate info, so double-check its
          responses.
        </p>
      </div>
    </main>
  );
};

export default App;
