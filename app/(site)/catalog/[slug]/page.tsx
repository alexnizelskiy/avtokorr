import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { financeBreakdown } from "@/content/catalog";
import { countryLabels, statusLabels } from "@/lib/car-labels";
import { getCarBySlug, listCarsForCatalog } from "@/services/cars";
import { toCarDetail } from "@/lib/car-map";
import { Gallery } from "@/components/catalog/Gallery";
import { CarCard } from "@/components/catalog/CarCard";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dbCar = await getCarBySlug(slug);
  if (!dbCar) return { title: "Автомобиль не найден" };
  const car = toCarDetail(dbCar);
  return {
    title: `${car.title}, ${car.year} — ${car.price}`,
    description: car.description,
  };
}

export default async function CarPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dbCar = await getCarBySlug(slug);
  if (!dbCar) notFound();
  const car = toCarDetail(dbCar);

  const images = dbCar.media.length > 0 ? dbCar.media.map((m) => m.url) : car.cover ? [car.cover] : [];
  const fin = financeBreakdown(car.price);
  const similar = (await listCarsForCatalog())
    .map(toCarDetail)
    .filter((c) => c.slug !== car.slug && (c.country === car.country || c.brand === car.brand))
    .slice(0, 4);

  return (
    <>
      <section className="section car-detail">
        <div className="crumbs">
          <Link href="/">Главная</Link> <span>›</span> <Link href="/catalog">Каталог</Link>{" "}
          <span>›</span> {car.title}
        </div>

        <div className="detail">
          <Gallery images={images} />

          <aside className="detail-aside">
            <div className="d-status">
              ● {statusLabels[car.status]} · {countryLabels[car.country]}
            </div>
            <h1 className="d-title">
              {car.title}, {car.year}
            </h1>
            <div className="d-sub">
              {car.engine} · {car.transmission} · {car.drivetrain} · {car.color}
            </div>

            <div className="pricebox">
              <div className="big num">{car.price}</div>
              <div className="prow">
                <span>Цена покупки (аукцион)</span>
                <b className="num">{fin.purchase}</b>
              </div>
              <div className="prow">
                <span>Доставка и растаможка</span>
                <b className="num">{fin.delivery}</b>
              </div>
              <div className="prow">
                <span>Комиссия и оформление</span>
                <b className="num">{fin.commission}</b>
              </div>
            </div>

            <div className="cta">
              <button className="btn btn-green">Оставить заявку</button>
              <button className="btn btn-soft">Получить расчёт</button>
              <button className="btn btn-soft">Написать менеджеру</button>
            </div>

            <div className="specs">
              <div className="c">
                <div className="k">Пробег</div>
                <div className="v num">{car.mileage} км</div>
              </div>
              <div className="c">
                <div className="k">Двигатель</div>
                <div className="v">{car.engine}</div>
              </div>
              <div className="c">
                <div className="k">Коробка</div>
                <div className="v">{car.transmission}</div>
              </div>
              <div className="c">
                <div className="k">Привод</div>
                <div className="v">{car.drivetrain}</div>
              </div>
              <div className="c">
                <div className="k">Аукц. оценка</div>
                <div className="v">{car.auctionGrade}</div>
              </div>
              <div className="c">
                <div className="k">VIN</div>
                <div className="v">{car.vin}</div>
              </div>
            </div>
          </aside>
        </div>

        <div className="car-desc">
          <h2 className="sec-title">Описание</h2>
          <p>{car.description}</p>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="section" style={{ paddingBottom: 40 }}>
          <h2 className="sec-title">Похожие автомобили</h2>
          <div className="grid">
            {similar.map((c) => (
              <CarCard key={c.id} car={c} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
