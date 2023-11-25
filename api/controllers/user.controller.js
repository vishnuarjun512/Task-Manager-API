import User from "../models/user.model.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // console.log(`Email-${email} Username-${username} Password-${password}`);
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(201).json({ message: "User Already Registered" });
    }
    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();
    console.log("Saved User :" + savedUser);
    return res.status(200).json({ message: "Register Successful" });
  } catch (error) {
    return res.status(404).json({ message: "Register Function Failed" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(
    //   `Email-${email} Password-${password} ${JSON.stringify(req.body)}`
    // );

    const user = await User.findOne({ email: email });
    if (!user) {
      console.log("Login Email Not Verified - " + user);
      return res
        .status(201)
        .json({ success: false, message: "User Not Authorized" });
    }

    if (user.password !== password) {
      console.log("Password Wrong");
      return res
        .status(201)
        .json({ success: false, message: "Password Wrong" });
    }
    console.log("Login Successful - " + user);
    console.log("User Id " + user._id);
    const authToken = user._id;

    res
      .cookie("authToken", authToken, { httpOnly: true, secure: true })
      .status(200)
      .json({ message: "Login Successful" });
  } catch (error) {
    console.log(error);
  }
};

export const signout = async (req, res) => {
  try {
    res.clearCookie("authToken");
    res.status(200).json("User has been signed out successfully!");
  } catch (error) {
    return res.status(400).json({ success: false, message: "Signout Failed" });
  }
};
