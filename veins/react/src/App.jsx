import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { PageNotFound } from "./pages/PageNotFound";
import { Posts } from "./pages/Posts";
import { ContactUs } from "./pages/ContactUs";
import { Leaderboard } from "./pages/Leaderboard";
import { Login } from "./pages/Login";
import { SignupAs } from "./pages/SignupAs";
import { SignupUser } from "./pages/SignupUser";
import { CreatePost } from "./pages/CreatePost";
import { EditPost } from "./pages/EditPost";
import { SignupNurse } from "./pages/SignupNurse";
import { SignupRequests } from "./pages/SignupRequests";
import { SingleSignupRequest } from "./pages/SingleSignupRequest";
import { Users } from "./pages/Users";
import { Profile } from "./pages/Profile";
import ManagePosts from "./pages/ManagePosts";
import { ExpectedDonors } from "./pages/ExpectedDonors";
import { NursePermission } from "./permissions/NursePermission";
import { LoggedinPermission } from "./permissions/LoggedinPermission";
import { NurseOrAdminPermission } from "./permissions/NurseOrAdminPermission";
import { AdminPermission } from "./permissions/AdminPermission";
import { Mission } from "./pages/Mission";
import { UserProfile } from "./pages/UserProfile";

function App() {
  return (
    <>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/signup" element={<SignupAs />} />
        <Route path="/signupuser" element={<SignupUser />} />
        <Route path="/signupnurse" element={<SignupNurse />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userprofile/:id" element={<UserProfile />} />

        {/* logged in routes */}
        <Route path="/posts/create" element={<CreatePost />} />
        <Route
          path="/manageposts"
          element={
            <LoggedinPermission>
              <ManagePosts />
            </LoggedinPermission>
          }
        />
        <Route
          path="/manageposts/:id/edit"
          element={
            <LoggedinPermission>
              <EditPost />
            </LoggedinPermission>
          }
        />
        <Route
          path="/profile"
          element={
            <LoggedinPermission>
              <Profile />
            </LoggedinPermission>
          }
        />

        {/* logged in and is nurse routes */}
        <Route
          path="/expecteddonors"
          element={
            <NursePermission>
              <ExpectedDonors />
            </NursePermission>
          }
        />

        {/* logged in and is admin routes */}
        <Route
          path="/signuprequests"
          element={
            <AdminPermission>
              <SignupRequests />
            </AdminPermission>
          }
        />
        <Route
          path="/signuprequests/:id"
          element={
            <AdminPermission>
              <SingleSignupRequest />
            </AdminPermission>
          }
        />

        {/* logged in and common routes between nurses and admin */}
        <Route
          path="/users"
          element={
            <NurseOrAdminPermission>
              <Users />
            </NurseOrAdminPermission>
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
export default App;
