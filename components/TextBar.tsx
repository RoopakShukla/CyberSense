"use client";

import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Paperclip, Mic, Send, X } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "./ui/button";
import { supportedFileTypes } from "@/lib/utils";
import { getPrompt } from "@/lib/api";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const TextBar = ({ updateChat }: { updateChat: (userPrmopt: any) => void }) => {
  const { toast } = useToast();

  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<any>([]);
  const [base64Files, setBase64Files] = useState<any>([]);
  const [path, setPath] = useState<string[]>([]);

  const [micOn, setMicOn] = useState(false);

  useEffect(() => {
    console.log(base64Files);
  }, [base64Files]);

  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = e.target.files![0];

    if (files.length === 0 && path.length === 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64string = reader.result?.toString();
        const base64 = base64string?.replace(/^data:.+;base64,/, "");

        setBase64Files([
          {
            inlineData: {
              data: base64,
              mimeType: fileUploaded.type,
            },
          },
        ]);
      };
      reader.readAsDataURL(fileUploaded);

      setFiles([fileUploaded]);
      setPath([e.target.value]);

      e.target.value = "";
    } else {
      if (path.includes(e.target.value)) {
        toast({
          description: "File already exists",
        });
      } else if (fileUploaded.size > 20971520) {
        toast({
          description: "File size cannot exceed 20MB",
        });
      } else if (!supportedFileTypes.includes(fileUploaded.type)) {
        toast({
          description:
            "File type " +
            fileUploaded.type.split("/")[1] +
            " is not supported",
        });
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64string = reader.result?.toString();
          const base64 = base64string?.replace(/^data:.+;base64,/, "");

          setBase64Files([
            ...base64Files,
            {
              inlineData: {
                data: base64,
                mimeType: fileUploaded.type,
              },
            },
          ]);
        };
        reader.readAsDataURL(fileUploaded);

        setFiles([...files, fileUploaded]);
        setPath([...path, e.target.value]);

        e.target.value = "";
      }
    }
  };

  const handleSubmit = async () => {
    if (micOn) {
      setMicOn(false);
      SpeechRecognition.stopListening();
    }

    if (value.trim()) {
      setLoading(true);
      updateChat({ role: "user", parts: { text: value } });
      setValue("");

      const modelResponse = await getPrompt({ text: value, file: base64Files });

      updateChat({ role: "model", parts: { text: modelResponse } });
      setLoading(false);
    }
  };

  const handleMic = () => {
    if (value === "") {
      resetTranscript();
    }

    if (micOn) {
      setMicOn(false);
      SpeechRecognition.stopListening();
    } else {
      if (!browserSupportsSpeechRecognition) {
        return toast({
          description: "Your browser does not support speech recognition",
        });
      }

      setMicOn(true);

      SpeechRecognition.startListening({
        continuous: true,
      });
    }
  };

  useEffect(() => {
    setValue(transcript);
  }, [transcript]);

  return (
    <main className="w-[864px] z-10 mx-6 mb-3 min-h-[76px] flex flex-col rounded-[32px] bg-[#292C31] shadow-xl">
      {files.length > 0 && (
        <div className="h-56 p-4 grid grid-cols-2 gap-4 grid-rows-2 text-slate-200">
          {files.map((file: any) => (
            <div
              className="flex flex-row bg-[#1E1E1E] p-6 rounded-2xl items-center justify-between"
              key={file.name}
            >
              <div className="w-[50%] items-center">
                <p className="overflow-hidden text-ellipsis text-nowrap">
                  {file.name}
                </p>
                <p>{file.name.split(".")[1].toUpperCase()}</p>
              </div>
              <div className="flex flex-row justify-center items-center">
                <Button className="bg-transparent p-0 hover:bg-transparent">
                  <X
                    className="w-6 h-6"
                    onClick={() => {
                      setFiles(files.filter((f: any) => f !== file));
                      setPath(
                        path.filter(
                          (p: any) => p !== "C:\\fakepath\\" + file.name
                        )
                      );
                    }}
                  />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="w-full flex flex-row">
        <TextareaAutosize
          name="textbar"
          id="textbar"
          value={value}
          placeholder="“Summarize an audit report”"
          onChange={handleChange}
          maxRows={8}
          className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-[#3D4147] hover:scrollbar-thumb-[#595F6A] scrollbar-track-[#292C31] w-full bg-[#292C31] ml-8 px-0 py-6 text-lg text-white resize-none outline-none"
        />
        <div className="flex flex-row gap-8 px-8 items-end">
          <Button
            className="my-4 bg-transparent p-0 hover:bg-transparent"
            disabled={files.length === 3}
          >
            <label htmlFor="files" className="cursor-pointer">
              <Paperclip />
            </label>
            <input
              id="files"
              className="hidden"
              type="file"
              onChange={handleFiles}
            ></input>
          </Button>
          <Button
            className="my-4 bg-transparent p-0 hover:bg-transparent rounded-full"
            onClick={handleMic}
          >
            {micOn ? <Mic color="#a5b4fc" /> : <Mic />}
          </Button>
          <Button
            className="my-4 bg-transparent p-0 hover:bg-transparent"
            disabled={value === "" || loading}
            onClick={handleSubmit}
          >
            <Send />
          </Button>
        </div>
      </div>
    </main>
  );
};

export default TextBar;
