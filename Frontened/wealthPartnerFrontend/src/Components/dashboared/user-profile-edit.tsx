"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import type { BasicInfo, AccountInfo, Preferences, SupportQuery } from "./user-profile-types"

export default function UserProfileEdit() {
  const [activeTab, setActiveTab] = useState("basic-info")
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BasicInfo & AccountInfo & Preferences & SupportQuery>()

  const onSubmit = (data: BasicInfo & AccountInfo & Preferences & SupportQuery) => {
    console.log(data)
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    })
  }

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
            <BasicInfoSection register={register} errors={errors} />
          </TabsContent>
          <TabsContent value="account-info">
            <AccountInfoSection register={register} errors={errors} />
          </TabsContent>
          <TabsContent value="preferences">
            <PreferencesSection register={register} />
          </TabsContent>
          <TabsContent value="support">
            <SupportSection register={register} errors={errors} />
          </TabsContent>
          <Button type="submit" className="mt-4">
            Save Changes
          </Button>
        </form>
      </Tabs>
    </motion.div>
  )
}

// Basic Info Section
function BasicInfoSection({ register, errors }: { register: any; errors: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>Update your basic profile information here.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email", { required: "Email is required" })} />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" {...register("phone")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dob">Date of Birth</Label>
          <Input id="dob" type="date" {...register("dateOfBirth")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="income">Income</Label>
          <Input id="income" type="number" {...register("income")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name</Label>
          <Input id="businessName" {...register("businessName")} />
        </div>
      </CardContent>
    </Card>
  )
}

// Account Info Section
function AccountInfoSection({ register, errors }: { register: any; errors: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
        <CardDescription>Manage your account details and security settings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" {...register("username", { required: "Username is required" })} />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="loginInfo">Login Information</Label>
          <Input id="loginInfo" type="password" {...register("loginInfo")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="deviceInfo">Device Info</Label>
          <Input id="deviceInfo" {...register("deviceInfo")} disabled />
        </div>
        <div className="space-y-2">
          <Label htmlFor="securityAnswer">Security Answer</Label>
          <Input id="securityAnswer" type="password" {...register("securityAnswer")} />
        </div>
      </CardContent>
    </Card>
  )
}

// Preferences Section
function PreferencesSection({ register }: { register: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>Customize your notification settings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="emailNotifications">Email Notifications</Label>
          <Switch id="emailNotifications" {...register("emailNotifications")} />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="siteNotifications">Site Notifications</Label>
          <Switch id="siteNotifications" {...register("siteNotifications")} />
        </div>
      </CardContent>
    </Card>
  )
}

// Support Section
function SupportSection({ register, errors }: { register: any; errors: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Support</CardTitle>
        <CardDescription>Submit your queries or report issues here.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" {...register("subject", { required: "Subject is required" })} />
          {errors.subject && <p className="text-red-500">{errors.subject.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" {...register("message", { required: "Message is required" })} />
          {errors.message && <p className="text-red-500">{errors.message.message}</p>}
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit">Submit Support Request</Button>
      </CardFooter>
    </Card>
  )
}

