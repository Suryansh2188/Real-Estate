import EditProfileForm from '../components/realEstate/EditProfileForm';
// import { useNavigate } from 'react-router-dom';

export default function EditAgentProfile() {
//   const navigate = useNavigate();
 

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-yellow-100 to-gray-200">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold">Edit Profile</h1>
        </div>
        <EditProfileForm />
      </div>
    </div>
  );
}
