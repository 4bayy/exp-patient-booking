import { EnquiryData } from "@/types/form";
const APP_URL = process.env.NEXT_BASE_URL;


//----------------- Create a new enquiry ---------------

export async function createEnquiry(data: EnquiryData) {
  const response = await fetch("/api/server/Enquiry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create enquiry");
  }

  return response.json();
}