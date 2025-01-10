import AddNewPostForm from "../components/realEstate/AddNewPostForm";


export default function AddNewPost() {
  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-yellow-100 to-gray-200">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Add New Post</h1>
        <AddNewPostForm />
      </div>
    </div>
  );
}
