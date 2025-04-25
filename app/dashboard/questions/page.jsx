import React from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronsUpDown } from 'lucide-react';

function Questions() {
  return (
    <div className='p-10 bg-slate-100 rounded-lg shadow-lg max-w-4xl mx-auto'>
      <h2 className='font-bold text-2xl  text-gray-900'>
        Frequently Asked Questions
      </h2>
      <p className='text-start text-gray-600 mt-5 mb-5'>
        Here are some common questions about our AI Mock Interview Generator.
      </p>

      <div className='space-y-5'>
        <Collapsible>
          <CollapsibleTrigger className='w-full flex  justify-between p-4 text-left text-lg font-semibold bg-white border rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-800'>
            What is an AI Mock Interview Generator?
            <ChevronsUpDown/>
          </CollapsibleTrigger>
          <CollapsibleContent className='p-4 text-gray-700 bg-gray-50 border rounded-lg'>
            The AI Mock Interview Generator is a platform that simulates real job interviews. It uses AI to provide tailored questions, feedback, and insights to help candidates improve their interview skills.
          </CollapsibleContent>
        </Collapsible>

        <Collapsible>
          <CollapsibleTrigger className='w-full p-4 flex  justify-between text-left text-lg font-semibold bg-white border rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-800'>
            How does the AI evaluate my performance?
            <ChevronsUpDown/>
          </CollapsibleTrigger>
          <CollapsibleContent className='p-4  text-gray-700 bg-gray-50 border rounded-lg'>
            The AI evaluates your performance based on your responses, tone, and confidence. It provides detailed feedback on areas like communication, technical expertise, and problem-solving skills.
          </CollapsibleContent>
        </Collapsible>

        <Collapsible>
          <CollapsibleTrigger className='w-full flex  justify-between p-4 text-left text-lg font-semibold bg-white border rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-800'>
            Can I choose specific topics or job roles?
            <ChevronsUpDown/>
          </CollapsibleTrigger>
          <CollapsibleContent className='p-4 text-gray-700 bg-gray-50 border rounded-lg'>
            Yes! You can select specific topics or job roles to tailor your mock interview. This ensures the questions and feedback align with your career goals.
          </CollapsibleContent>
        </Collapsible>

        <Collapsible>
          <CollapsibleTrigger className='w-full flex  justify-between p-4 text-left text-lg font-semibold bg-white border rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-800'>
          
            Is the platform suitable for both technical and non-technical roles?
            <ChevronsUpDown/>
            
          </CollapsibleTrigger>
          <CollapsibleContent className='p-4 text-gray-700 bg-gray-50 border rounded-lg'>
            Absolutely! The platform supports mock interviews for various roles, including technical, managerial, and creative positions. You can customize your interview accordingly.
          </CollapsibleContent>
        </Collapsible>

        <Collapsible>
          <CollapsibleTrigger className='w-full flex  justify-between p-4 text-left text-lg font-semibold bg-white border rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-800'>
            How secure is my data?
            <ChevronsUpDown/>
          </CollapsibleTrigger>
          <CollapsibleContent className='p-4 text-gray-700 bg-gray-50 border rounded-lg'>
            Your data is secure and encrypted. We comply with industry standards to ensure your privacy and protect your personal and performance information.
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}

export default Questions;
