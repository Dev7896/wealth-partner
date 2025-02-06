import { PuffLoader } from "react-spinners";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen absolute ">
      <PuffLoader className="z-50 absolute left-0.5 top-0.5" color="#3498db" size={100} />
    </div>
  );
};

export default LoadingPage;
