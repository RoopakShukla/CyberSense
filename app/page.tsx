"use client";

import Hero from "@/components/Hero";
import TextBar from "@/components/TextBar";
import { useEffect, useState } from "react";

const App = () => {
  const [chat, setChat] = useState<any>([]);

  const handleChat = (chatPart: any) => {
    setChat((prevChat: any) => [...prevChat, chatPart]);
  };

  useEffect(() => {
    console.log(JSON.stringify(chat));
  }, [chat]);

  return (
    <main className="flex flex-col items-center flex-1 justify-between">
      <div className="flex flex-col flex-1">
        {!chat ||
          (chat.length === 0 && (
            <div className="flex flex-col flex-1 justify-center">
              <Hero />
            </div>
          ))}
        {chat && (
          <div>
            {chat.map((chatPart: any, idx: number) => (
              <div
                className="flex flex-col"
                key={idx}
                dangerouslySetInnerHTML={{
                  __html: chatPart.parts.text,
                }}
              ></div> 
            ))}
          </div>
        )}
      </div>
      <div className="w-full flex flex-col items-center">
        <TextBar updateChat={handleChat} />
        <p className="pb-4 text-xs text-gray-300 font-inter">
          Powered by Gemini. It may display inaccurate info, so double-check its
          responses.
        </p>
      </div>
    </main>
  );
};

export default App;
