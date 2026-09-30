import PatientForm from "@/components/forms/PatientForm";
import Image from "next/image";
import Banner from "../../../../assets/banner.jpg";
import OnBoardingForm from "@/components/forms/onBoard";
import { Button } from "@base-/react";
import { getAllSpa, getuserById } from "@/services/onboard.service";
import { email } from "zod";
import { useDispatch } from "react-redux";
import { setUserId } from "@/redux/onboardSlice";

interface PageProps {
  params: Promise<{
    userid: string;
  }>;
}

const spaOptions = [
  {
    "id": "820d1ea6-9693-4af1-af39-c2b637c5748b",
    "name": "Adelaide Medical Spa",
    "address": "14 King William Street",
    "city": "Adelaide",
    "state": "SA",
    "country": "Australia",
    "pincode": "5000",
    "phone": "+61 8 7234 5678",
    "email": "info@adelaidespa.com.au",
    "imageUrl": "https://images.unsplash.com/photo-1518611012118-696072aa579a",
    "rating": 4.8,
    "reviews": 521,
    "openingHours": "Mon-Sat 8:00 AM - 5:30 PM"
  },
  {
    "id": "620f76b9-df32-460d-898b-5ab1b20e1c5a",
    "name": "Brisbane Health Spa",
    "address": "102 Queen Street",
    "city": "Brisbane",
    "state": "QLD",
    "country": "Australia",
    "pincode": "4000",
    "phone": "+61 7 3456 8912",
    "email": "contact@brisbanehealthspa.com.au",
    "imageUrl": "https://images.unsplash.com/photo-1515377905703-c4788e51af15",
    "rating": 4.7,
    "reviews": 754,
    "openingHours": "Mon-Sat 8:30 AM - 6:30 PM"
  },
  {
    "id": "7a86690e-185c-4d20-9aa6-91f6843c6e89",
    "name": "Gold Coast Luxury Wellness",
    "address": "88 Surfers Paradise Boulevard",
    "city": "Gold Coast",
    "state": "QLD",
    "country": "Australia",
    "pincode": "4217",
    "phone": "+61 7 5555 8899",
    "email": "bookings@goldcoastwellness.com.au",
    "imageUrl": "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8",
    "rating": 5,
    "reviews": 1598,
    "openingHours": "Daily 8:00 AM - 8:00 PM"
  },
  {
    "id": "04d0f33e-b574-494e-a256-4e8c188f07a2",
    "name": "Melbourne Rejuvenation Centre",
    "address": "18 Collins Street",
    "city": "Melbourne",
    "state": "VIC",
    "country": "Australia",
    "pincode": "3000",
    "phone": "+61 3 9234 7821",
    "email": "hello@melbspa.com.au",
    "imageUrl": "https://images.unsplash.com/photo-1519823551278-64ac92734fb1",
    "rating": 4.8,
    "reviews": 986,
    "openingHours": "Mon-Sun 9:00 AM - 8:00 PM"
  },
  {
    "id": "6aaf2dd1-56df-4327-a462-721306d01f27",
    "name": "Perth Beauty & Wellness",
    "address": "60 Hay Street",
    "city": "Perth",
    "state": "WA",
    "country": "Australia",
    "pincode": "6000",
    "phone": "+61 8 6345 7812",
    "email": "support@perthbeauty.com.au",
    "imageUrl": "https://images.unsplash.com/photo-1507652313519-d4e9174996dd",
    "rating": 4.6,
    "reviews": 632,
    "openingHours": "Mon-Fri 9:00 AM - 6:00 PM"
  },
  {
    "id": "cf147c5f-ae94-454a-a665-342335c6d82f",
    "name": "Sydney Wellness & Skin Clinic",
    "address": "25 George Street",
    "city": "Sydney",
    "state": "NSW",
    "country": "Australia",
    "pincode": "2000",
    "phone": "+61 2 9123 4567",
    "email": "info@sydneywellness.com.au",
    "imageUrl": "https://images.unsplash.com/photo-1544161515-4ab6ce6db874",
    "rating": 4.9,
    "reviews": 1245,
    "openingHours": "Mon-Sat 8:00 AM - 7:00 PM"
  }
]



const PatientOnbaord = async ({ params }: PageProps) => {

  const { userid } = await params;
  const spas = await getAllSpa();
  const user = await getuserById(userid);
  // console.log("User data", user);
  if (!user) {
    console.log("User is undefined");
  return;
}

  const userData = {
    userId : userid,
    fullName: user.data.fullName,
    email: user.data.email,
  };
  console.log("User data", userData);

  return (
    <main className="min-h-screen ">
      {/* Left */}
      <div className="flex w-full items-center justify-center px-6 py-10">
        <div className="w-full max-w-4xl">
          {/* client onBoarding */}
          <OnBoardingForm
            spaOptions={spaOptions}
            userData={userData}
          ></OnBoardingForm>
        </div>
      </div>
    </main>
  );
};

export default PatientOnbaord;
