"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect } from 'react'
import { useState } from 'react';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview({params}) {
     const [interviewData,setInterviewData]=useState();
     const [mockInterviewQuestion,setMockInterviewQuestion]=useState();
     const [activeQuestionIndex,setActiveQuestionIndex]=useState(0);

    useEffect(()=>{
        GetInterviewDetails();
    },[]);

    console.log(mockInterviewQuestion )
     const GetInterviewDetails = async () => {
        try {
          const result = await db
            .select()
            .from(MockInterview)
            .where(eq(MockInterview.mockId, params.interviewId)); 
    
         const jsonMockResp=JSON.parse(result[0].jsonMockResp);
          setMockInterviewQuestion(jsonMockResp);
          setInterviewData(result[0]);
        } catch (error) {
          console.error("Error fetching interview details:", error);
        }
      };
  return (
    <div>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/* Questions */}
        <QuestionsSection  mockInterviewQuestion={mockInterviewQuestion} activeQuestionIndex={activeQuestionIndex}/>

        {/* video/Auto recording */}
        <RecordAnswerSection
         mockInterviewQuestion={mockInterviewQuestion} activeQuestionIndex={activeQuestionIndex} interviewData={interviewData}
         />
      
    </div>

          <div className="flex justify-end gap-6 ">
        
        {activeQuestionIndex > 0 && (
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)} >
            Previous Question
          </Button>
        )}

        {/* Show the "Next Question" button only if not on the last question */}
        {activeQuestionIndex < mockInterviewQuestion?.length - 1 && (
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)} >
            Next Question
          </Button>
        )}

        {/* Show the "End Interview" button only on the last question */}
        {activeQuestionIndex === mockInterviewQuestion?.length - 1 && (
          <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}>
          <Button >
            End Interview
          </Button>
          </Link>
        )}
      </div>

    </div>
  )
}

export default StartInterview
