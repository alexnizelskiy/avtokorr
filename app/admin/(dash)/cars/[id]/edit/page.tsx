import Link from "next/link";
import { notFound } from "next/navigation";
import { getCarById } from "@/services/cars";
import { CarForm } from "@/components/admin/CarForm";
import { updateCarAction } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditCarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = await getCarById(id);
  if (!car) notFound();

  const action = updateCarAction.bind(null, id);

  return (
    <div>
      <div className="admin-crumbs">
        <Link href="/admin/cars">← К списку авто</Link>
      </div>
      <h1 className="admin-title">
        {car.brand} {car.model}
      </h1>
      <CarForm action={action} car={car} submitLabel="Сохранить изменения" />
    </div>
  );
}
