import Link from "next/link";
import { CarForm } from "@/components/admin/CarForm";
import { createCarAction } from "../actions";

export default function NewCarPage() {
  return (
    <div>
      <div className="admin-crumbs">
        <Link href="/admin/cars">← К списку авто</Link>
      </div>
      <h1 className="admin-title">Новый автомобиль</h1>
      <CarForm action={createCarAction} submitLabel="Создать" />
    </div>
  );
}
