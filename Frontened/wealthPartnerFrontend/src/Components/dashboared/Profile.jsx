import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import {
  Edit,
  Save,
  Person,
  Email,
  Phone,
  LocationOn,
  Business,
} from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      address: "123 Main St, City, Country",
      company: "Inventory Inc.",
    },
  });

  const onSubmit = (data) => {
    console.log("Profile Updated:", data);
    setIsEditing(false);
  };

  return (
    <Box sx={{ padding: 3, maxWidth: "100%", margin: "auto" }}>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
        <Avatar sx={{ width: 80, height: 80, marginRight: 2 }}>JD</Avatar>
        <Typography variant="h4">Profile</Typography>
        <IconButton
          onClick={() => setIsEditing(!isEditing)}
          sx={{ marginLeft: "auto" }}
        >
          {isEditing ? <Save /> : <Edit />}
        </IconButton>
      </Box>

      <form className="flex flex-col gap-4 w-full  border-gray-300 p-6 shadow-xl rounded-lg" onSubmit={handleSubmit(onSubmit)}>
        <div className="lg:flex  gap-12">
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <Person sx={{ marginRight: 2 }} />
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Name"
                  disabled={!isEditing}
                  variant="outlined"
                />
              )}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <Email sx={{ marginRight: 2 }} />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Email"
                  disabled={!isEditing}
                  variant="outlined"
                />
              )}
            />
          </Box>
        </div>
        <div className="lg:flex gap-12">
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <Phone sx={{ marginRight: 2 }} />
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Phone"
                  disabled={!isEditing}
                  variant="outlined"
                />
              )}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <LocationOn sx={{ marginRight: 2 }} />
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Address"
                  disabled={!isEditing}
                  variant="outlined"
                />
              )}
            />
          </Box>
        </div>
        <div className="lg:flex gap-12">
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <Business sx={{ marginRight: 2 }} />
          <Controller
            name="company"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Company"
                disabled={!isEditing}
                variant="outlined"
              />
            )}
          />
        </Box>
        
        {isEditing && (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Save Changes
          </Button>
        )}
        </div>
      </form>
    </Box>
  );
};

export default ProfilePage;
