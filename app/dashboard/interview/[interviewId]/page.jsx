
"use client";
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import Link from 'next/link';
import { useParams } from 'next/navigation'; // Import for accessing params

function Interview() {
  const params = useParams(); // Use `useParams` to access dynamic route parameters
  const [interviewId, setInterviewId] = useState(null);
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    if (params?.interviewId) {
      setInterviewId(params.interviewId); // Set the interviewId from params
    }
  }, [params]);

  useEffect(() => {
    if (interviewId) {
      console.log("Interview ID:", interviewId);
      GetInterviewDetails(interviewId);
    }
  }, [interviewId]);

  const GetInterviewDetails = async (id) => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, id));

      setInterviewData(result[0] || {}); // Safeguard against null results
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col p-5 rounded-lg border">
            {interviewData ? (
              <>
                <h2 className="text-lg">
                  <strong> Job Role/Job Position:</strong> {interviewData.jobPosition}
                </h2>
                <h2 className="text-lg">
                  <strong> Job Description/Tech Stack:</strong> {interviewData.jobdesc}
                </h2>
                <h2 className="text-lg">
                  <strong> Years Of Experience:</strong> {interviewData.jobExperience}
                </h2>
              </>
            ) : (
              <h2>Loading interview details...</h2>
            )}
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-200">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-yellow-500">
              {process.env.NEXT_PUBLIC_INFROMATIONS}
            </h2>
          </div>
        </div>

        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{
                height: 300,
                width: 300,
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-blue-200 rounded-lg border" />
              <Button
                variant="ghost"
                className="border bg-blue-200"
                onClick={() => setWebCamEnabled(true)}
              >
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-end items-end">
        <Link href={`/dashboard/interview/${interviewId}/start`}>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;





