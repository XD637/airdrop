import { ImSpinner2 } from "react-icons/im";

export default function LoadingSpinner() {
  return (
    <div className="mt-6 flex justify-center">
      <ImSpinner2 className="text-purple-500 animate-spin text-4xl" />
    </div>
  );
}
