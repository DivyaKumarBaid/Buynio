import VerifyForm from "@/components/signup/VerifyForm";

export default function Verify({ params }: { params: { id: string } }) {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center p-4">
      <VerifyForm id={params.id}/>
    </div>
  );
}
