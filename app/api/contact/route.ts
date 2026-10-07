import { NextRequest, NextResponse } from "next/server";
import { ContactInquiry } from "@/lib/types";

// Basic email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body: ContactInquiry = await req.json();

    // 1. Validation
    if (!body.name || body.name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter a valid name (minimum 2 characters)." },
        { status: 400 }
      );
    }

    if (!body.email || !EMAIL_REGEX.test(body.email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!body.description || body.description.trim().length < 10) {
      return NextResponse.json(
        { error: "Please describe your project or inquiry (minimum 10 characters)." },
        { status: 400 }
      );
    }

    // 2. Sanitization
    const sanitizedSubmission: ContactInquiry = {
      name: body.name.trim().slice(0, 100),
      email: body.email.trim().toLowerCase().slice(0, 100),
      phoneOrWhatsApp: body.phoneOrWhatsApp ? body.phoneOrWhatsApp.trim().slice(0, 50) : undefined,
      projectType: body.projectType ? body.projectType.trim().slice(0, 50) : "General Inquiry",
      budgetRange: body.budgetRange ? body.budgetRange.trim().slice(0, 50) : "Undisclosed",
      timeline: body.timeline ? body.timeline.trim().slice(0, 50) : "Flexible",
      description: body.description.trim().slice(0, 2000),
    };

    // Safe server-side processing (can send to Telegram, Resend, Supabase, or internal webhook)
    console.log(`[Contact Submission] Received inquiry from: ${sanitizedSubmission.name} <${sanitizedSubmission.email}> | Type: ${sanitizedSubmission.projectType}`);

    return NextResponse.json({
      success: true,
      message: "Your project inquiry has been received successfully. Mohamed will respond within 24 hours.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to process inquiry. Please try again or reach out directly via email or WhatsApp." },
      { status: 500 }
    );
  }
}
