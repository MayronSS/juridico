import { LoadingState } from "@/components/common/LoadingState";

export default function Loading() {
  return (
    <div className="bg-page py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <LoadingState label="Carregando experiência" />
      </div>
    </div>
  );
}
