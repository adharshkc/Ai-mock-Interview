"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAiModal";
import { LoaderCircleIcon, FileTextIcon, AlertCircleIcon } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { useRouter } from "next/navigation";

// Enhanced tech skills list with weights (commonality)
const TECH_SKILLS = [
  // Programming Languages
  { skill: "javascript", weight: 90 },
  { skill: "typescript", weight: 80 },
  { skill: "python", weight: 85 },
  { skill: "java", weight: 75 },
  { skill: "c\\+\\+", weight: 70 },
  { skill: "c#", weight: 70 },
  { skill: "php", weight: 50 },
  { skill: "ruby", weight: 45 },
  { skill: "go", weight: 60 },
  { skill: "rust", weight: 55 },
  { skill: "swift", weight: 50 },
  { skill: "kotlin", weight: 55 },
  { skill: "scala", weight: 40 },
  { skill: "r", weight: 40 },
  { skill: "sql", weight: 80 },
  
  // Frontend Frameworks & Libraries
  { skill: "react", weight: 85 },
  { skill: "angular", weight: 70 },
  { skill: "vue", weight: 65 },
  { skill: "svelte", weight: 50 },
  { skill: "next\\.js", weight: 75 },
  { skill: "node\\.js", weight: 80 },
  { skill: "express", weight: 70 },
  
  // Backend Frameworks
  { skill: "django", weight: 65 },
  { skill: "flask", weight: 60 },
  { skill: "spring", weight: 70 },
  { skill: "laravel", weight: 50 },
  { skill: "rails", weight: 55 },
  { skill: "asp\\.net", weight: 65 },
  
  // Databases
  { skill: "mysql", weight: 75 },
  { skill: "postgresql", weight: 70 },
  { skill: "mongodb", weight: 65 },
  { skill: "sqlite", weight: 60 },
  { skill: "redis", weight: 55 },
  { skill: "firebase", weight: 60 },
  
  // Cloud & DevOps
  { skill: "aws", weight: 80 },
  { skill: "azure", weight: 70 },
  { skill: "gcp", weight: 65 },
  { skill: "docker", weight: 75 },
  { skill: "kubernetes", weight: 70 },
  { skill: "terraform", weight: 65 },
  
  // Tools
  { skill: "git", weight: 90 },
  { skill: "jenkins", weight: 60 },
  { skill: "webpack", weight: 65 },
  { skill: "jest", weight: 60 },
  { skill: "cypress", weight: 55 },
];

// Display versions (without escaping) for UI
const DISPLAY_SKILLS = {
  "c\\+\\+": "c++",
  "next\\.js": "next.js",
  "node\\.js": "node.js",
  "asp\\.net": "asp.net",
  "three\\.js": "three.js"
};

// Threshold for considering a skill relevant (weight out of 100)
const RELEVANT_SKILL_THRESHOLD = 60;

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobdesc, setJobdesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [extractedSkills, setExtractedSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [extractingResume, setExtractingResume] = useState(false);
  const [extractError, setExtractError] = useState("");
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  // Load PDF.js dynamically when component mounts
  useEffect(() => {
    const loadPdfJs = async () => {
      if (typeof window !== 'undefined') {
        try {
          window.pdfjsLib = await import('pdfjs-dist/webpack');
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = 
            '//cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/build/pdf.worker.min.js';
        } catch (error) {
          console.error("Error loading PDF.js:", error);
        }
      }
    };
    
    loadPdfJs();
  }, []);

  // Get display version of a skill
  const getDisplaySkill = (skill) => {
    return DISPLAY_SKILLS[skill] || skill;
  };

  // Extract relevant technical skills from text
  const extractRelevantSkills = (text) => {
    if (!text) return [];
    
    const lowerText = text.toLowerCase();
    const foundSkills = [];
    
    // Find all skills mentioned in the text that are in our TECH_SKILLS list
    TECH_SKILLS.forEach(({ skill, weight }) => {
      try {
        const pattern = new RegExp(`\\b${skill}\\b`, 'i');
        if (pattern.test(lowerText) ){
          foundSkills.push({
            skill,
            weight,
            display: getDisplaySkill(skill)
          });
        }
      } catch (error) {
        console.error(`Error with regex for skill: ${skill}`, error);
      }
    });
    
    // Sort by weight (most common first) and filter for relevant skills
    return foundSkills
      .sort((a, b) => b.weight - a.weight)
      .filter(skill => skill.weight >= RELEVANT_SKILL_THRESHOLD)
      .map(skill => skill.skill);
  };

  // When skills are extracted, update the job description
  const updateJobDescriptionWithSkills = (skills) => {
    if (skills.length > 0) {
      const displaySkills = skills.map(skill => getDisplaySkill(skill));
      setJobdesc(prev => {
        // Only update if the field is empty or if we're adding to existing content
        if (!prev || prev.trim() === "") {
          return displaySkills.join(", ");
        }
        return prev;
      });
    }
  };

  // Function to extract text from PDF
  const extractTextFromPDF = async (file) => {
    setExtractingResume(true);
    setExtractError("");
    
    try {
      if (!window.pdfjsLib) {
        throw new Error("PDF.js library not loaded yet");
      }
      
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let extractedText = "";
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        extractedText += pageText + "\n";
      }
      
      const skills = extractRelevantSkills(extractedText);
      setExtractedSkills(skills);
      updateJobDescriptionWithSkills(skills);
      
      setResumeText(extractedText);
      return extractedText;
    } catch (error) {
      console.error("Error extracting text from PDF:", error);
      setExtractError("Failed to extract text from PDF. Please enter resume details manually below.");
      return "";
    } finally {
      setExtractingResume(false);
    }
  };

  // Handle file upload
  const handleResumeChange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeFile(file);
      await extractTextFromPDF(file);
    }
  };

  // Handle manual resume input
  const handleManualResumeInput = (event) => {
    const text = event.target.value;
    setResumeText(text);
    
    const skills = extractRelevantSkills(text);
    setExtractedSkills(skills);
    updateJobDescriptionWithSkills(skills);
  };

  // Toggle a skill
  const toggleSkill = (skill) => {
    setExtractedSkills(prev => {
      if (prev.includes(skill)) {
        return prev.filter(s => s !== skill);
      } else {
        return [...prev, skill].sort();
      }
    });
    
    // Also update job description when skills change
    setJobdesc(prev => {
      const displaySkill = getDisplaySkill(skill);
      if (prev.includes(displaySkill)) {
        return prev
          .split(", ")
          .filter(s => s !== displaySkill)
          .join(", ");
      } else {
        return prev ? `${prev}, ${displaySkill}` : displaySkill;
      }
    });
  };

  // Add a custom skill
  const [newSkill, setNewSkill] = useState("");
  const addCustomSkill = () => {
    if (newSkill && !extractedSkills.includes(newSkill.toLowerCase())) {
      const lowerSkill = newSkill.toLowerCase();
      setExtractedSkills(prev => [...prev, lowerSkill].sort());
      setJobdesc(prev => prev ? `${prev}, ${newSkill}` : newSkill);
      setNewSkill("");
    }
  };

  // Handle Enter key for adding skills
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && newSkill) {
      e.preventDefault();
      addCustomSkill();
    }
  };

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    
    try {
      // Create prompt with resume skills included
      const InputPrompt =
        "Job Position : " +
        jobPosition +
        " ,Job description/Tech Stack :" +
        jobdesc +
        " , Years of Experience:" +
        jobExperience +
        " .Depending upon the Job Position, Job description and Years of Experience give me " +
        process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +
        " interview questions along with answers in json format only just array containing questions with answers in pure json format only";
      
      const result = await chatSession.sendMessage(InputPrompt);
      const MockJsonresp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "")
        .trim();
      
      console.log(MockJsonresp);
      setJsonResponse(MockJsonresp);

      // Store data in database
      try {
        const resp = await db
          .insert(MockInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResp: MockJsonresp,
            jobPosition: jobPosition,
            jobdesc: jobdesc,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD-MM-yyyy"),
          })
          .returning({ mockId: MockInterview.mockId });
        
        if (resp) {
          setOpenDialog(false);
          router.push("/dashboard/interview/" + resp[0]?.mockId);
        }
      } catch (error) {
        console.log("Database error:", error);
      }
    } catch (error) {
      console.log("Error generating interview:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-slate-200 hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New Interview</h2>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your mock interview
            </DialogTitle>
            <div>
              <p className="text-sm text-muted-foreground">
                Upload your resume and add details about your job position/role, job description, and
                years of experience:
              </p>
              <form onSubmit={onSubmit}>
                <div>
                  <div className="mt-2 my-3">
                    <label>Upload Resume (PDF)</label>
                    <Input
                      type="file"
                      accept=".pdf"
                      onChange={handleResumeChange}
                    />
                    {extractingResume && (
                      <div className="flex items-center mt-2 text-sm text-blue-600">
                        <LoaderCircleIcon className="animate-spin mr-2" size={16} />
                        Extracting text and skills from resume...
                      </div>
                    )}
                    {extractError && (
                      <div className="flex items-center mt-2 text-sm text-red-600">
                        <AlertCircleIcon className="mr-2" size={16} />
                        {extractError}
                      </div>
                    )}
                    {resumeText && !extractingResume && !extractError && (
                      <div className="flex items-center mt-2 text-sm text-green-600">
                        <FileTextIcon className="mr-2" size={16} />
                        Resume text extracted successfully!
                      </div>
                    )}
                  </div>
                  
                  {/* Extracted Skills Section */}
                  <div className="mt-4 mb-2">
                    <label className="font-medium">Relevant Technical Skills</label>
                    <p className="text-sm text-gray-500 mb-2">
                      These skills were extracted from your resume and are commonly sought in tech roles.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {extractedSkills.length > 0 ? (
                        extractedSkills.map((skill, index) => (
                          <div 
                            key={index}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                          >
                            {getDisplaySkill(skill)}
                            <button 
                              type="button"
                              className="ml-2 text-blue-600 hover:text-blue-800"
                              onClick={() => toggleSkill(skill)}
                            >
                              ×
                            </button>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">
                          No technical skills extracted yet. Upload a resume or add skills manually.
                        </p>
                      )}
                    </div>
                    
                    {/* Add custom skill */}
                    <div className="flex mt-2">
                      <Input
                        placeholder="Add a technical skill manually"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="mr-2"
                      />
                      <Button 
                        type="button" 
                        onClick={addCustomSkill}
                        disabled={!newSkill}
                        size="sm"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4 my-2">
                    <label>Resume Content {extractError ? "(Enter manually)" : "(Review & Edit)"}</label>
                    <Textarea
                      placeholder="Enter or edit your resume content here..."
                      rows={4}
                      value={resumeText}
                      onChange={handleManualResumeInput}
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      You can edit the extracted text or enter your resume details manually.
                    </p>
                  </div>
                  
                  <div className="mt-4 my-2">
                    <label>Mock Role</label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      required
                      onChange={(event) => setJobPosition(event.target.value)}
                    />
                  </div>
                  <div className="mt-2 my-3">
                    <label>Mock Description/Tech Stack (In short)</label>
                    <Textarea
                      placeholder="Ex. React, Angular, NodeJS, MySQL"
                      required
                      value={jobdesc}
                      onChange={(event) => setJobdesc(event.target.value)}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      The most relevant technical skills from your resume have been pre-filled here.
                    </p>
                  </div>
                  <div className="mt-2 my-3">
                    <label>Years of Experience</label>
                    <Input
                      placeholder="Ex. 5"
                      type="number"
                      required
                      max="50"
                      onChange={(event) => setJobExperience(event.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={loading || extractingResume}
                  >
                    {loading ? (
                      <>
                        <LoaderCircleIcon className="mr-2 animate-spin" />
                        Generating from AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;