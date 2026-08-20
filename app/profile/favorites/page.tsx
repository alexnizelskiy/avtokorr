import Link from "next/link";
import { Heart } from "@phosphor-icons/react/dist/ssr";

export const dynamic = "force-dynamic";

export default function FavoritesPage() {
  return (
    <div>
      <h1 className="page-title">Избранное</h1>
      <div className="cat-empty">
        <Heart size={40} weight="regular" style={{ color: "var(--muted)" }} />
        <p>Здесь появятся автомобили, которые вы отметили сердечком в каталоге.</p>
        <Link href="/catalog" className="btn btn-green">
          Перейти в каталог
        </Link>
      </div>
    </div>
  );
}
