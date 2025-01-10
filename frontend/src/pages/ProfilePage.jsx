// File: src/components/ProfilePage.jsx
import UserInfoCard from "../components/realEstate/UserInfoCard";
import AboutMeCard from "../components/realEstate/AboutMeCard";
import MyListing from "../components/realEstate/MyListing";
import Chat from "../components/realEstate/Chat";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-gray-200 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="md:flex gap-2">
          <div className="md:w-1/2">
            <UserInfoCard />
            <AboutMeCard />
          </div>
          <div className="md:w-1/2">
            <Chat />
          </div>
        </div>
      <MyListing />
      </div>
    </div>
  );
};

export default ProfilePage;
