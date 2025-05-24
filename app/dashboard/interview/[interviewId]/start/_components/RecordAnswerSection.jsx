"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { chatSession } from "@/utils/GeminiAiModal";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { Mic } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import { toast } from "sonner";

function RecordAnswerSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const user = useUser();
  const [loading, setLoading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
    speechRecognitionProperties: {
      lang: "en-US",
      interimResults: true,
    },
  });

  useEffect(() => {
    if (error) {
      toast.error(`Speech recognition error: ${error}`);
      console.error(error);
    }
  }, [error]);

  useEffect(() => {
    // Combine all results into a single answer
    const fullAnswer = results.map((result) => result?.transcript).join(" ");
    setUserAnswer(fullAnswer);
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      updateUserAnswer();
    }
  }, [isRecording, userAnswer]);
  console.log(userAnswer);
  const handleRecording = async () => {
    try {
      if (isRecording) {
        stopSpeechToText();
      } else {
        // Clear previous results when starting new recording
        setResults([]);
        setUserAnswer("");
        await startSpeechToText();
      }
    } catch (err) {
      toast.error("Failed to toggle recording");
      console.error(err);
    }
  };

  const updateUserAnswer = async () => {
    if (!userAnswer || userAnswer.length < 10) {
      toast.warning("Answer is too short to submit");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, 
                            User Answer: ${userAnswer}, 
                            Please provide rating and feedback for this answer in JSON format with rating (1-5) and feedback fields. Also include a suggestion for improvement like specific youtube youtube link.`;

      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = result.response.text().replace(/```json|```/g, "");
      const JsonFeedbackResp = JSON.parse(mockJsonResp);
      console.log(JsonFeedbackResp);
      await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        suggestion: JsonFeedbackResp?.suggestion,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-yyyy"),
      });

      toast.success("Answer recorded successfully");
      setResults([]);
    } catch (error) {
      toast.error("Failed to save answer");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center my-20">
      <div
        className="flex flex-col justify-center items-center bg-black rounded-lg p-5 relative"
        style={{
          height: "500px",
          width: "100%",
          maxWidth: "800px",
        }}
      >
        <Image
          src={"/webcam.png"}
          width={200}
          height={400}
          className="absolute"
          alt="webcam"
        />
        <Webcam
          mirrored={true}
          style={{
            height: "90%",
            width: "90%",
            zIndex: 10,
          }}
        />
      </div>

      <Button
        variant="outline"
        className="my-10"
        onClick={handleRecording}
        disabled={loading}
      >
        {isRecording ? (
          <span className="flex gap-2 text-red-500">
            <Mic /> Stop Recording
          </span>
        ) : (
          "Record Answer"
        )}
      </Button>

      {/* Debug button (remove in production) */}
      <Button
        variant="secondary"
        onClick={() =>
          console.log({
            userAnswer,
            results,
            isRecording,
            error,
          })
        }
      >
        Debug Info
      </Button>
    </div>
  );
}

export default RecordAnswerSection;
