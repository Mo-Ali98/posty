import "regenerator-runtime/runtime";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { MicrophoneIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";

interface SpeechProps {
  setDescription: (desc: string) => void;
}

export function Speech({ setDescription }: SpeechProps) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();
  const [speechRecognitionSupported, setSpeechRecognitionSupported] =
    useState(false);

  useEffect(() => {
    // sets to true or false after component has been mounted
    setSpeechRecognitionSupported(browserSupportsSpeechRecognition);
  }, [browserSupportsSpeechRecognition]);

  if (speechRecognitionSupported === null) return null;

  if (!speechRecognitionSupported) {
    return <span>Browser does not support speech recognition.</span>;
  }

  if (!isMicrophoneAvailable) {
    return <span>No mic available</span>;
  }

  if (listening) {
    setDescription(transcript);
  }

  const handleToggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  return (
    <div className="flex gap-5">
      <Button
        type="button"
        variant="outline"
        size="icon"
        className={classNames(
          "absolute right-3 top-1/2 -translate-y-1/2 text-gray-500",
          { "text-red-500": listening },
        )}
        onClick={handleToggleListening}
      >
        <MicrophoneIcon className="h-5 w-5" />
      </Button>
    </div>
  );
}
