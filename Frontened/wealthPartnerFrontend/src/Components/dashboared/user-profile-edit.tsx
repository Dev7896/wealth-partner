"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { hover, motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type {
  BasicInfo,
  AccountInfo,
  Preferences,
  SupportQuery,
} from "./user-profile-types";
import { showMessage } from "../LoginSections/SignupUtility";
import axios from "axios";
import Cookies from "js-cookie";

export default function UserProfileEdit() {
  const [activeTab, setActiveTab] = useState("basic-info");
  const [userData, setUserData] = useState<any>(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<BasicInfo & AccountInfo & Preferences & SupportQuery>();

  const fetchUserData = async () => {
    const email = Cookies.get("email");

    if (!email) return; // Ensure email is available before making the request

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/profile",
        {
          email,
        }
      );

      const userData = response.data;
      setUserData(userData);
      console.log(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  

  useEffect(() => {
    // ✅ Use an Immediately Invoked Function Expression (IIFE)
    (async () => {
      // console.log("user creation happening");
      await fetchUserData();
    })();
  }, []);

  useEffect(() => {
    if (userData?.dateOfBirth) {
      // Convert ISODate to YYYY-MM-DD
      const formattedDate = new Date(userData.dateOfBirth)
        .toISOString()
        .split("T")[0];
      setValue("dateOfBirth", formattedDate);
    }
  }, [userData, setValue]);

  const onSubmit = (formData: any) => {
    const email = Cookies.get("email");
    const updatedUserData = { ...userData, ...formData }; // Merge old data with new form data

    axios
      .post("http://localhost:8080/api/user/update", updatedUserData)
      .then((response) => {
        showMessage("Profile updated successfully!", "success");
        setUserData(updatedUserData); // Update state with latest user data
        console.log(formData)
        // fetchUserData() ;
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        showMessage("Failed to update profile", "error");
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
          <TabsTrigger value="account-info">Account Info</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>
        <form className=" w-full " onSubmit={handleSubmit(onSubmit)}>
          <TabsContent value="basic-info">
            <BasicInfoSection
              userData={userData}
              register={register}
              errors={errors}
            />
          </TabsContent>
          <TabsContent value="account-info">
            <AccountInfoSection
              userData={userData}
              register={register}
              errors={errors}
            />
          </TabsContent>
          <TabsContent value="preferences">
            <PreferencesSection userData={userData} register={register} />
          </TabsContent>
          <TabsContent value="support">
            <SupportSection
              userData={userData}
              register={register}
              errors={errors}
            />
          </TabsContent>
          <Button type="submit" className="mt-4">
            Save Changes
          </Button>
        </form>
      </Tabs>
    </motion.div>
  );
}

// Basic Info Section
function BasicInfoSection({
  register,
  errors,
  userData,
}: {
  register: any;
  errors: any;
  userData: any;
}) {
  // Provide default values to prevent accessing properties of null
  const defaultUserData = userData || {
    phone: "",
    dateOfBirth: "",
    income: "",
    businessName: "",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>
          Update your basic profile information here.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
            defaultValue={Cookies.get("email")}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            {...register("phone")}
            defaultValue={defaultUserData.phone}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dob">Date of Birth</Label>
          <Input
            id="dob"
            type="date"
            {...register("dateOfBirth")}
            defaultValue={defaultUserData.dateOfBirth}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="income">Income</Label>
          <Input
            id="income"
            type="number"
            {...register("income")}
            defaultValue={defaultUserData.income}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name</Label>
          <Input
            id="businessName"
            {...register("businessName")}
            defaultValue={defaultUserData.businessName}
          />
        </div>
      </CardContent>
    </Card>
  );
}

// Account Info Section
function AccountInfoSection({
  register,
  errors,
  userData,
}: {
  register: any;
  errors: any;
  userData: any;
}) {
  // Provide default values to prevent accessing properties of null
  const defaultUserData = userData || {
    username: "",
    loginInfo: "",
    deviceInfo: "",
    securityAnswer: "",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
        <CardDescription>
          Manage your account details and security settings.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            {...register("username", { required: "Username is required" })}
            defaultValue={defaultUserData.username} // Set default value
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="loginInfo">Login Information</Label>
          <Input
            id="loginInfo"
            type="password"
            {...register("loginInfo")}
            defaultValue={defaultUserData.loginInfo} // Set default value
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="deviceInfo">Device Info</Label>
          <Input
            id="deviceInfo"
            {...register("deviceInfo")}
            disabled
            defaultValue={defaultUserData.deviceInfo} // Set default value
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="securityAnswer">Security Answer</Label>
          <Input
            id="securityAnswer"
            type="password"
            {...register("securityAnswer")}
            defaultValue={defaultUserData.securityAnswer} // Set default value
          />
        </div>
      </CardContent>
    </Card>
  );
}

// Preferences Section
function PreferencesSection({
  register,
  userData,
}: {
  register: any;
  userData: any;
}) {
  // Provide default values to avoid accessing properties of null
  const defaultUserData = userData || {
    emailNotifications: "off",
    siteNotifications: "off",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>Customize your notification settings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="emailNotifications">Email Notifications</Label>
          <Switch
            id="emailNotifications"
            defaultChecked={defaultUserData.emailNotifications === "on"}
            {...register("emailNotifications")}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="siteNotifications">Site Notifications</Label>
          <Switch
            id="siteNotifications"
            defaultChecked={defaultUserData.siteNotifications === "on"}
            {...register("siteNotifications")}
          />
        </div>
      </CardContent>
    </Card>
  );
}

// Support Section
function SupportSection({
  register,
  errors,
  userData,
}: {
  register: any;
  errors: any;
  userData: any;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Support</CardTitle>
        <CardDescription>
          Submit your queries or report issues here.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Subject Input */}
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            placeholder="Enter your subject..."
            {...register("subject", { required: "Subject is required" })}
            defaultValue={userData?.subject || ""}
          />
          {errors.subject && (
            <p className="text-red-500 text-sm">{errors.subject.message}</p>
          )}
        </div>

        {/* Message Input */}
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Describe your issue or query..."
            {...register("message", { required: "Message is required" })}
            defaultValue={userData?.message || ""}
            className="min-h-[120px]"
          />
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message.message}</p>
          )}
        </div>
      </CardContent>

      {/* Submit Button */}
      <CardFooter>
        <Button type="submit" className="w-full">
          Submit Support Request
        </Button>
      </CardFooter>
    </Card>
  );
}
