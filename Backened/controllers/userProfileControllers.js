const UserProfile =require( "../models/UserProfile.js") ;

// ✅ Get User Profile (Create if Not Exists)
 const getData = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });
    const username = email.split('@')[0] ;

    let user = await UserProfile.findOne({ email });

    // If user doesn't exist, create a new one
    if (!user) {
      user = await UserProfile.create({
        businessName: "New Business",
        dateOfBirth: new Date("2000-01-01"),
        deviceInfo: "chrome",
        email,
        emailNotifications: "on",
        income: 0,
        loginInfo: "",
        phone: "",
        securityAnswer: "",
        siteNotifications: "on",
        username: username,
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Update User Profile
 const updateData = async (req, res) => {
  try {
    const { email, ...updateFields } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const user = await UserProfile.findOneAndUpdate(
      { email },
      { $set: updateFields },
      { new: true, upsert: true } // Creates new user if not found
    );

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getData,
  updateData
}